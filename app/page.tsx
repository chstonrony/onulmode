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

/* ── 감정 칩 — 상태 이상 코드 시스템 ── */
const EMOTION_CHIPS = [
  // 눅눅계열 — 축 처지고 습기찬 상태
  { k: "눅눅함",            bg: "#D8DEE8", tc: "#4868A8" },
  { k: "마음침수",           bg: "#CDD4EA", tc: "#3A60A0" },
  { k: "흐물거림",           bg: "#D0D8E4", tc: "#50688A" },
  { k: "감정곰팡이",         bg: "#D4D8D0", tc: "#5A7060" },
  // 과열계열 — 머리 과부하 상태
  { k: "속끓임",            bg: "#F0D8D0", tc: "#C06050" },
  { k: "생각폭주",           bg: "#F0DDD0", tc: "#B86840" },
  { k: "뇌과부하",           bg: "#EED4CC", tc: "#B05848" },
  // 버팀계열 — 안 무너졌는데 위험한 상태
  { k: "버텨짐",            bg: "#D8E0D4", tc: "#60785A" },
  { k: "멀쩡한척",           bg: "#D4DDD0", tc: "#587050" },
  { k: "억지로괜찮음",       bg: "#D8E4DC", tc: "#507858" },
  { k: "간신유지",           bg: "#D8DDD4", tc: "#5A7060" },
  // 새벽감성계열 — 오늘무드 핵심 감성
  { k: "새벽됨",            bg: "#D0D4E8", tc: "#484888" },
  { k: "울컥전",            bg: "#D4D0EA", tc: "#504888" },
  { k: "멍밤",              bg: "#CDD0E4", tc: "#404878" },
  // 공허계열 — 텅 빈 느낌
  { k: "텅울림",            bg: "#E0D8EC", tc: "#806090" },
  { k: "비어버림",           bg: "#E4DEE8", tc: "#786888" },
  { k: "감정증발",           bg: "#E4E0EC", tc: "#705880" },
  // 병맛 특수계열 — 오늘무드 시그니처
  { k: "혼자삭힘",           bg: "#E8D8C8", tc: "#907050" },
  { k: "웃고있지만위험함",    bg: "#EAD4D4", tc: "#B07070" },
  { k: "사회생활가능판정",    bg: "#DDE0D8", tc: "#607058" },
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
  { rot: -4,  tx: -6,  ty:   8, z: 5 },
  { rot:  7,  tx:  4,  ty: -10, z: 3 },
  { rot: -9,  tx: 12,  ty:   2, z: 6 },
  { rot:  3,  tx: -4,  ty:  -6, z: 4 },
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

/* ── 클릭 효과음 (철컥) ── */
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctx.resume().then(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.065);
      osc.start();
      osc.stop(ctx.currentTime + 0.065);
      setTimeout(() => ctx.close().catch(() => {}), 300);
    });
  } catch {}
}

/* ── Web Audio 파쇄음 (드르륵 + 철컥 + 으적 레이어) ── */
function playShredSound() {
  try {
    const audio = new Audio("/videos/shredder-desktop.mp4");
    audio.volume = 1.0;
    audio.currentTime = 0;
    audio.play().catch(() => {});
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

    // Web Audio 레이어: 드르륵 + 철컥 + 으적
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctx.resume().then(() => {
      const sr = ctx.sampleRate;

      // 드르륵 — 거친 기계 그라인드
      const grindBuf = ctx.createBuffer(1, Math.floor(sr * 0.9), sr);
      const gd = grindBuf.getChannelData(0);
      for (let i = 0; i < gd.length; i++) {
        const t = i / sr;
        const pulse = Math.abs(Math.sin(Math.PI * 16 * t)) > 0.45 ? 1 : 0.25;
        gd[i] = (Math.random() * 2 - 1) * 0.65 * pulse + Math.sin(2 * Math.PI * 48 * t) * 0.28;
      }
      const grind = ctx.createBufferSource();
      grind.buffer = grindBuf;
      const grindGain = ctx.createGain();
      grindGain.gain.setValueAtTime(0.42, ctx.currentTime);
      grindGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9);
      const grindFilter = ctx.createBiquadFilter();
      grindFilter.type = "bandpass";
      grindFilter.frequency.value = 550;
      grindFilter.Q.value = 2.2;
      grind.connect(grindFilter);
      grindFilter.connect(grindGain);
      grindGain.connect(ctx.destination);
      grind.start();

      // 철컥 — 두 번 기계음 충격
      [0.04, 0.32].forEach(delay => {
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.type = "sawtooth";
        const t0 = ctx.currentTime + delay;
        clickOsc.frequency.setValueAtTime(140, t0);
        clickOsc.frequency.exponentialRampToValueAtTime(30, t0 + 0.08);
        clickGain.gain.setValueAtTime(0.38, t0);
        clickGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.11);
        clickOsc.start(t0);
        clickOsc.stop(t0 + 0.11);
      });

      // 으적 — 찢기는 끝 소리
      setTimeout(() => {
        const tearBuf = ctx.createBuffer(1, Math.floor(sr * 0.28), sr);
        const td = tearBuf.getChannelData(0);
        for (let i = 0; i < td.length; i++) {
          td[i] = (Math.random() * 2 - 1) * (1 - i / td.length) * 0.75;
        }
        const tear = ctx.createBufferSource();
        tear.buffer = tearBuf;
        const tearGain = ctx.createGain();
        tearGain.gain.setValueAtTime(0.3, ctx.currentTime);
        const tearFilter = ctx.createBiquadFilter();
        tearFilter.type = "highpass";
        tearFilter.frequency.value = 1800;
        tear.connect(tearFilter);
        tearFilter.connect(tearGain);
        tearGain.connect(ctx.destination);
        tear.start();
      }, 580);

      setTimeout(() => ctx.close().catch(() => {}), 2200);
    });
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
    playClickSound();
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px 0", zIndex: 10, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700 }}>오늘무드</span>
          <svg width="12" height="12" viewBox="0 0 14 14">
            <path d="M7 1L8.3 5H12.5L9.2 7.8L10.5 12L7 9.5L3.5 12L4.8 7.8L1.5 5H5.7Z" fill={ROSE} opacity="0.85" />
          </svg>
          {/* 가동 상태 */}
          <span style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9A6A", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6A9A6A", display: "inline-block" }} />
            우걱이 가동 중
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {count > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
              style={{ fontSize: 9, fontFamily: "monospace", color: "#7A6858", background: "#F0E8D4", border: "1px solid #C8B898", borderRadius: 2, padding: "2px 8px" }}>
              ×{count} 파쇄 완료
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
        {/* 기계 상태 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, padding: "7px 12px", background: INK, borderRadius: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#6A9A6A", display: "inline-block" }} />
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9A6A", letterSpacing: "0.12em" }}>
              EMOTION INPUT TERMINAL
            </span>
          </div>
          <span style={{ fontSize: 9, fontFamily: "monospace", color: "#3A3028", letterSpacing: "0.08em" }}>
            {eatenKeys.size > 0 ? `${eatenKeys.size}개 투입됨` : "대기 중"}
          </span>
        </div>

        <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#7A7060", textAlign: "center", marginBottom: 16 }}>
          {t.home.emotionLabel} <strong style={{ color: INK }}>{t.home.emotionWord}</strong>{t.home.emotionSuffix ? ` ${t.home.emotionSuffix}` : ""}
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
                  transform: `translate(${sc.tx}px, ${sc.ty}px)`,
                  display: "inline-block",
                  opacity: eatenKeys.has(em.k) ? 0 : 1,
                  pointerEvents: eatenKeys.has(em.k) ? "none" : "auto",
                  transition: "opacity 0.3s ease",
                }}
              >
              <div style={{
                display: "inline-block",
                animation: `float-paper ${2.1 + (idx % 5) * 0.38}s ease-in-out ${(idx * 0.31) % 2.4}s infinite`,
                '--r': `${sc.rot}deg`,
              } as React.CSSProperties}>
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
              </div>
            );
          })}
        </div>

        {count > 0 && (
          <p style={{ textAlign: "center", fontSize: 10, fontFamily: "monospace", color: "#9A9280", marginTop: 20, letterSpacing: "0.07em" }}>
            {t.home.statusIdle.replace("{n}", String(count))}
          </p>
        )}

        {/* 힌트 */}
        {count === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: "center", marginTop: 20, padding: "12px 16px", border: "1px dashed #C8BEB0", borderRadius: 2 }}
          >
            <motion.p animate={{ y: [-2, 2, -2] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: 13, color: ROSE, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 4 }}>
              ↑ 카드 눌러봐 — 우걱이가 씹어먹음
            </motion.p>
            <p style={{ fontSize: 10, color: "#B4A890", fontFamily: "monospace" }}>
              결과 매번 달라 · 친구 것이랑 비교 가능 · 공유 가능
            </p>
          </motion.div>
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
            style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,22,18,0.72)" }}
          >
            <motion.div
              initial={{ scale: 0.82, rotate: -3, y: 12 }} animate={{ scale: 1, rotate: -1, y: 0 }}
              transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.38 }}
              style={{ background: "#F5EFE0", border: `2.5px solid ${INK}`, borderRadius: 3, padding: "22px 26px 22px", textAlign: "center", boxShadow: "7px 7px 0 rgba(42,37,32,0.9)", maxWidth: 300, width: "88%", position: "relative" }}
            >
              {/* 테이프 */}
              <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", width: 54, height: 12, background: "rgba(212,188,144,0.55)", borderRadius: 1 }} />
              <p style={{ fontSize: 9, fontFamily: "monospace", color: ROSE, letterSpacing: "0.14em", marginBottom: 8 }}>
                ■ BAGAK COMPLETE ■
              </p>
              <p style={{ fontSize: 36, fontFamily: "var(--font-serif)", color: INK, fontWeight: 900, lineHeight: 1, marginBottom: 6 }}>
                {t.home.completeTitle}
              </p>
              <p style={{ fontSize: 11, color: "#9A8E80", fontFamily: "monospace", marginBottom: 18 }}>
                {currentLabel} — 처리 완료
              </p>
              <button onClick={goToResult} style={{ width: "100%", height: 48, background: ROSE, border: "none", borderRadius: 3, fontSize: 14, fontFamily: "var(--font-serif)", color: "#F5EFE0", fontWeight: 700, cursor: "pointer", marginBottom: 8, boxShadow: `4px 4px 0 ${ROSE}66`, letterSpacing: "0.02em" }}>
                내 결과지 받기 →
              </button>
              <button onClick={resetMachine} style={{ width: "100%", height: 36, background: "transparent", border: `1px dashed ${INK}30`, borderRadius: 3, fontSize: 12, fontFamily: "var(--font-serif)", color: "#9A9080", cursor: "pointer" }}>
                또 있음 — 추가 투입
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FeedbackToast message={toast} />
    </div>
  );
}
