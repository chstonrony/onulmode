"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FeedbackToast from "@/components/trash/FeedbackToast";
import { useLocale } from "@/context/LocaleContext";
import { buildResultUrl } from "@/lib/resultCard";

const ROSE = "#C8607A";
const INK  = "#2A2520";

/* ── 감정 칩 정의 ── */
const EMOTION_CHIPS = [
  { k: "지쳤어",   bg: "#F0E0DC", tc: "#B87878" },
  { k: "짜증나",   bg: "#F0D8D4", tc: "#C06858" },
  { k: "서운해",   bg: "#D8E4EE", tc: "#6888A8" },
  { k: "답답해",   bg: "#D8DCE8", tc: "#607098" },
  { k: "억울해",   bg: "#E4DCED", tc: "#8878B0" },
  { k: "불안해",   bg: "#E8D8EE", tc: "#9068A8" },
  { k: "허무해",   bg: "#D8E8DC", tc: "#6898A0" },
  { k: "무기력해", bg: "#E0DDD8", tc: "#887870" },
  { k: "외로워",   bg: "#F5EBCC", tc: "#A09848" },
  { k: "슬퍼",     bg: "#D8E0EE", tc: "#5878A8" },
  { k: "화났어",   bg: "#F0D8D8", tc: "#B85858" },
  { k: "귀찮아",   bg: "#E0E4D8", tc: "#788860" },
  { k: "막막해",   bg: "#D8DDE4", tc: "#586878" },
  { k: "질렸어",   bg: "#E8E0C8", tc: "#907840" },
  { k: "후회돼",   bg: "#E4D8E4", tc: "#906890" },
  { k: "모르겠어", bg: "#EDE4D4", tc: "#8A8070" },
] as const;

/* ── 카드 흩뿌리기 데이터 (고정값 — 리렌더 시 안 바뀜) ── */
const SCATTER = [
  { rot: -7,  tx: -8,  ty:  10, z: 4 },
  { rot:  5,  tx:  6,  ty:  -8, z: 7 },
  { rot: -3,  tx: -4,  ty:  14, z: 2 },
  { rot:  9,  tx:  10, ty:  -4, z: 6 },
  { rot: -6,  tx: -12, ty:   6, z: 5 },
  { rot:  4,  tx:  8,  ty:  -2, z: 8 },
  { rot: -10, tx:  0,  ty:  12, z: 3 },
  { rot:  7,  tx: -6,  ty:  -6, z: 6 },
  { rot: -4,  tx:  14, ty:   4, z: 4 },
  { rot:  8,  tx: -10, ty:   8, z: 7 },
  { rot: -5,  tx:  4,  ty: -12, z: 2 },
  { rot:  3,  tx: -8,  ty:   2, z: 5 },
  { rot: -8,  tx:  6,  ty:  10, z: 6 },
  { rot:  6,  tx: -2,  ty:  -8, z: 3 },
  { rot: -2,  tx:  10, ty:   6, z: 7 },
  { rot:  5,  tx: -6,  ty:  -4, z: 4 },
];

/* ── 파티클 ── */
interface Particle {
  id: number;
  angle: number;
  dist: number;
  color: string;
  w: number;
  mx: number;  // mouth x
  my: number;  // mouth y
}

/* ── 날아가는 카드 ── */
interface FlyingCard {
  id: number;
  label: string;
  bg: string;
  tc: string;
  startX: number;
  startY: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  initRot: number;
  chipKey: string;
}

/* ── Web Audio 파쇄음 ── */
function playShredSound() {
  try {
    // 비디오 파일의 오디오 트랙을 그대로 재생
    const audio = new Audio("/videos/shredder-desktop.mp4");
    audio.volume = 1.0;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    // 영상 전체가 아닌 파쇄 구간만 — 2초 후 페이드아웃
    setTimeout(() => {
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.08);
        } else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 50);
    }, 1800);
  } catch {}
}

export default function MainPage() {
  const router       = useRouter();
  const { t }        = useLocale();
  const heroMediaRef = useRef<HTMLDivElement>(null);

  const [toast, setToast]             = useState<string | null>(null);
  const [count, setCount]             = useState(0);
  const [phase, setPhase]             = useState<null | "processing" | "done">(null);
  const [currentLabel, setLabel]      = useState("");
  const [dumpedLabels, setDumped]     = useState<string[]>([]);
  const [shaking, setShaking]         = useState(false);
  const [flyingCards, setFlyingCards] = useState<FlyingCard[]>([]);
  const [particles, setParticles]     = useState<Particle[]>([]);
  const [eatenKeys, setEatenKeys]     = useState<Set<string>>(new Set()); // 먹힌 카드

  /* 파쇄기 입 좌표 */
  function getMouthPos() {
    const el = document.getElementById("shredder-mouth-target");
    if (el) {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    if (heroMediaRef.current) {
      const r = heroMediaRef.current.getBoundingClientRect();
      return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.22 };
    }
    return { x: window.innerWidth / 2, y: 220 };
  }

  /* 파티클 분출 */
  function spawnParticles(mx: number, my: number, tc: string) {
    const COLORS = [tc, "#F5EFE0", "#D8CEC0", ROSE, "#E8D8B0"];
    const newP: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 18) * 360,
      dist: 30 + Math.random() * 55,
      color: COLORS[i % COLORS.length],
      w: 3 + Math.random() * 5,
      mx, my,
    }));
    setParticles(p => [...p, ...newP]);
    setTimeout(() => setParticles(p => p.filter(x => !newP.some(n => n.id === x.id))), 700);
  }

  /* 카드가 입에 도착 */
  function onCardArrived(cardId: number, label: string, tc: string, chipKey: string) {
    setFlyingCards(p => p.filter(c => c.id !== cardId));
    setEatenKeys(prev => new Set([...prev, chipKey])); // 먹힌 카드 기록
    const mouth = getMouthPos();
    playShredSound();
    spawnParticles(mouth.x, mouth.y, tc);
    setShaking(true);
    setTimeout(() => setShaking(false), 420);

    // 0.3초 후 다음 단계
    setTimeout(() => {
      setLabel(label);
      setDumped(prev => [...new Set([...prev, label])].slice(-3));
      setPhase("processing");
      setTimeout(() => setPhase("done"), 1900);
      setCount(n => n + 1);
      setTimeout(() => {
        const DONE = [t.home.done1, t.home.done2, t.home.done3, t.home.done4, t.home.done5];
        setToast(DONE[Math.floor(Math.random() * DONE.length)]);
        setTimeout(() => setToast(null), 3000);
      }, 2100);
    }, 300);
  }

  /* 칩 클릭 */
  function handleChipClick(
    e: React.MouseEvent<HTMLButtonElement>,
    chipKey: string, label: string, bg: string, tc: string, initRot: number,
  ) {
    if (eatenKeys.has(chipKey)) return; // 이미 먹힌 카드는 무시
    const rect  = e.currentTarget.getBoundingClientRect();
    const mouth = getMouthPos();
    setFlyingCards(prev => [...prev, {
      id: Date.now(), label, bg, tc,
      startX: rect.left, startY: rect.top,
      width: rect.width, height: rect.height,
      dx: mouth.x - rect.left - rect.width  / 2,
      dy: mouth.y - rect.top  - rect.height / 2,
      initRot,
      chipKey,  // 어느 칩인지 추적
    }]);
  }

  function goToResult() {
    const seed = Date.now() % 999983;
    router.push(buildResultUrl(dumpedLabels.length ? dumpedLabels : [currentLabel], seed));
  }
  function resetMachine() { setPhase(null); } // eatenKeys는 유지 (먹힌 카드 그대로)

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", overflowX: "hidden" }}>

      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 24px 0", zIndex: 10, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700 }}>오늘무드</span>
          <svg width="12" height="12" viewBox="0 0 14 14">
            <path d="M7 1L8.3 5H12.5L9.2 7.8L10.5 12L7 9.5L3.5 12L4.8 7.8L1.5 5H5.7Z" fill={ROSE} opacity="0.85" />
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {count > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
              style={{ fontSize: 9, fontFamily: "monospace", color: "#7A6858", background: "#F0E8D4", border: "1px solid #C8B898", borderRadius: 2, padding: "2px 8px" }}>
              ×{count} 파쇄
            </motion.span>
          )}
          <Link href="/archive" style={{ fontSize: 13, color: "#7A7260", fontFamily: "var(--font-serif)", textDecoration: "none" }}>
            {t.nav.archive}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="hero-section" style={{ paddingTop: 20 }}>
        <div
          ref={heroMediaRef}
          className={`hero-media${shaking ? " shaking" : ""}`}
          style={{ position: "relative" }}
        >
          <video autoPlay muted loop playsInline className="desktop-video">
            <source src="/videos/shredder-desktop.mp4" type="video/mp4" />
          </video>
          <video autoPlay muted loop playsInline className="mobile-video">
            <source src="/videos/shredder-mobile.mp4" type="video/mp4" />
          </video>

          {/* 파쇄기 입 타겟 — 위치 조정 시 top % 변경 */}
          <div
            id="shredder-mouth-target"
            style={{
              position: "absolute", top: "22%", left: "50%",
              width: 4, height: 4,
              transform: "translateX(-50%)",
              pointerEvents: "none",
              /* 디버그: border: "2px solid red", */
            }}
          />
        </div>

        <div className="hero-overlay">
          <h1>
            {t.home.headline1}<br />
            <span style={{ borderBottom: `3px solid ${ROSE}`, paddingBottom: 2 }}>
              {t.home.headline2}
            </span>
          </h1>
          <Link href="/release" className="hero-cta">
            {t.home.cta} →
          </Link>
          <p style={{ fontSize: 12, color: "#9A8E80", fontFamily: "var(--font-serif)", fontWeight: 300, marginTop: 14 }}>
            {t.home.caption}
          </p>
        </div>
      </section>

      {/* 감정 카드 — 흩어진 메모지 배치 */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        style={{ padding: "28px 16px 96px", background: "#efe3cf" }}
      >
        <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#9A9080", textAlign: "center", marginBottom: 18 }}>
          {t.home.emotionLabel}
          {t.home.emotionWord ? ` ${t.home.emotionWord}` : ""}
          {t.home.emotionSuffix ? ` ${t.home.emotionSuffix}` : ""}
        </p>

        {/* 흩어진 그리드 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", position: "relative" }}>
          {EMOTION_CHIPS.map((em, idx) => {
            const sc    = SCATTER[idx] ?? { rot: 0, tx: 0, ty: 0, z: 1 };
            const label = t.emotions[em.k as keyof typeof t.emotions] ?? em.k;
            return (
              <div
                key={em.k}
                style={{
                  position: "relative",
                  zIndex: sc.z,
                  transform: `translate(${sc.tx}px, ${sc.ty}px) rotate(${sc.rot}deg)`,
                  display: "inline-block",
                  opacity: eatenKeys.has(em.k) ? 0 : 1,
                  pointerEvents: eatenKeys.has(em.k) ? "none" : "auto",
                  transition: "opacity 0.3s ease",
                }}
              >
                <button
                  onClick={e => handleChipClick(e, em.k, label, em.bg, em.tc, sc.rot)}
                  style={{
                    background: em.bg,
                    border: "none",
                    padding: "10px 18px 13px",
                    fontSize: 14,
                    fontFamily: "var(--font-serif)",
                    color: em.tc,
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: 2,
                    boxShadow: "3px 5px 16px rgba(42,37,32,0.16), inset 0 1px 0 rgba(255,255,255,0.5)",
                    position: "relative",
                    overflow: "hidden",
                    display: "block",
                    minWidth: 64,
                    textAlign: "center",
                    /* 테이프 효과 줄 */
                    backgroundImage: `repeating-linear-gradient(
                      transparent, transparent 20px,
                      rgba(180,160,140,0.07) 20px, rgba(180,160,140,0.07) 21px
                    )`,
                    transition: "transform 0.12s, box-shadow 0.12s",
                  }}
                  onMouseDown={e => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(0.95)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "1px 2px 8px rgba(42,37,32,0.2)";
                  }}
                  onMouseUp={e => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "3px 5px 16px rgba(42,37,32,0.16), inset 0 1px 0 rgba(255,255,255,0.5)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "3px 5px 16px rgba(42,37,32,0.16), inset 0 1px 0 rgba(255,255,255,0.5)";
                  }}
                >
                  {/* 접힌 귀퉁이 */}
                  <div style={{
                    position: "absolute", bottom: 0, right: 0, width: 0, height: 0,
                    borderStyle: "solid", borderWidth: "0 0 12px 12px",
                    borderColor: `transparent transparent rgba(42,37,32,0.1) transparent`,
                  }} />
                  {label}
                </button>
              </div>
            );
          })}
        </div>

        {count > 0 && (
          <p style={{ textAlign: "center", fontSize: 10, fontFamily: "monospace", color: "#9A9280", marginTop: 20, letterSpacing: "0.07em" }}>
            {t.home.statusIdle.replace("{n}", String(count))}
          </p>
        )}
      </motion.div>

      {/* ── 날아가는 카드 ── */}
      <AnimatePresence>
        {flyingCards.map(card => (
          <motion.div
            key={card.id}
            style={{
              position: "fixed",
              left: card.startX,
              top:  card.startY,
              width: card.width,
              height: card.height,
              background: card.bg,
              color: card.tc,
              borderRadius: 2,
              padding: "10px 18px 13px",
              fontSize: 14,
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "4px 8px 24px rgba(42,37,32,0.28)",
              pointerEvents: "none",
              zIndex: 200,
              transformOrigin: "center center",
              willChange: "transform, opacity",
            }}
            initial={{
              x: 0, y: 0,
              scale: 1,
              rotate: card.initRot,
              opacity: 1,
            }}
            animate={{
              // 단계:  시작  →  커짐  →  유지  →  이동   →  도착직전  →  찌그러짐
              x:       [0,     0,      0,      card.dx * 0.7,  card.dx * 0.92, card.dx],
              y:       [0,     0,      0,      card.dy * 0.7,  card.dy * 0.92, card.dy],
              scale:   [1,     1.32,   1.32,   0.9,            0.55,           0.18],
              rotate:  [card.initRot, card.initRot + 5, card.initRot + 5, 22, 30, 38],
              opacity: [1,     1,      1,      1,              0.85,           0],
              scaleX:  [1,     1,      1,      1,              0.8,            0.3],
            }}
            transition={{
              duration: 1.65,  // 더 느리게 — 씹히는 느낌
              times:    [0, 0.08, 0.2, 0.65, 0.88, 1],
              ease:     "easeInOut",
            }}
            onAnimationComplete={() => onCardArrived(card.id, card.label, card.tc, card.chipKey)}
          >
            {card.label}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── 파티클 ── */}
      <AnimatePresence>
        {particles.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          return (
            <motion.div
              key={p.id}
              initial={{ x: p.mx, y: p.my, opacity: 0.9, scale: 1 }}
              animate={{
                x: p.mx + Math.cos(rad) * p.dist,
                y: p.my + Math.sin(rad) * p.dist,
                opacity: 0,
                scale: 0.3,
                rotate: Math.random() * 180,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "fixed",
                width: p.w,
                height: p.w * 2.5,
                background: p.color,
                borderRadius: 1,
                pointerEvents: "none",
                zIndex: 199,
                top: 0, left: 0,
                marginLeft: -p.w / 2,
                marginTop: -p.w,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* ── 파쇄 오버레이 ── */}
      <AnimatePresence>
        {phase === "processing" && (
          <motion.div key="processing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,22,18,0.78)" }}
          >
            <motion.div initial={{ scale: 0.88, y: 8 }} animate={{ scale: 1, y: 0 }}
              style={{ background: "rgba(20,17,14,0.96)", border: `1.5px solid ${ROSE}`, borderRadius: 4, padding: "22px 36px", textAlign: "center", boxShadow: `0 0 36px ${ROSE}44` }}>
              <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }}
                style={{ fontSize: 11, fontFamily: "monospace", color: ROSE, letterSpacing: "0.14em", marginBottom: 10 }}>
                ■ PROCESSING
              </motion.p>
              <p style={{ fontSize: 16, fontFamily: "var(--font-serif)", color: "#F5EFE0" }}>
                {currentLabel}{t.home.processing}
              </p>
              <p style={{ fontSize: 10, color: "#554E40", fontFamily: "monospace", marginTop: 8 }}>overthinking overloaded</p>
            </motion.div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div key="done"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,22,18,0.68)" }}
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -2 }} animate={{ scale: 1, rotate: -1 }}
              transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.35 }}
              style={{ background: "#F5EFE0", border: `2px solid ${INK}`, borderRadius: 3, padding: "20px 26px 22px", textAlign: "center", boxShadow: "5px 5px 0 rgba(42,37,32,0.85)", maxWidth: 300, width: "86%" }}
            >
              <p style={{ fontSize: 10, fontFamily: "monospace", color: ROSE, letterSpacing: "0.1em", marginBottom: 10 }}>✓ COMPLETE</p>
              <p style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, lineHeight: 1.4, marginBottom: 18, whiteSpace: "pre-line" }}>
                {t.home.completeTitle}
              </p>
              <button onClick={goToResult} style={{ width: "100%", height: 44, background: ROSE, border: "none", borderRadius: 3, fontSize: 13, fontFamily: "var(--font-serif)", color: "#F5EFE0", fontWeight: 700, cursor: "pointer", marginBottom: 8, boxShadow: `0 3px 12px ${ROSE}55` }}>
                결과 카드 만들기 →
              </button>
              <button onClick={resetMachine} style={{ width: "100%", height: 34, background: "transparent", border: `1px solid ${INK}22`, borderRadius: 3, fontSize: 12, fontFamily: "var(--font-serif)", color: "#8A8270", cursor: "pointer" }}>
                또 있음 → 추가 투입
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FeedbackToast message={toast} />
    </div>
  );
}
