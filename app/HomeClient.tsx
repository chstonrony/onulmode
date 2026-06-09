"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FeedbackToast from "@/components/trash/FeedbackToast";
import { useLocale } from "@/context/LocaleContext";
import { buildResultUrl } from "@/lib/resultCard";
import { CONTENT_ARTICLES } from "@/lib/contentSystem";

const ROSE = "#C8607A";
const INK  = "#2A2520";

// 홈 하단 노출용 — 최근 매거진 글 (날짜 내림차순)
const RECENT_MAGAZINE = [...CONTENT_ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
// 사람들이 자주 찾는 감정 (감정도감 링크)
const POPULAR_FEELINGS = [
  { slug: "seounaham", name: "서운함" },
  { slug: "oerounm", name: "외로움" },
  { slug: "mugiryeok", name: "무기력" },
  { slug: "buran", name: "불안" },
  { slug: "jjajeung", name: "짜증" },
  { slug: "gongheeoham", name: "공허함" },
];

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

export default function HomeClient() {
  const router       = useRouter();
  const { t, locale } = useLocale();
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
    <div style={{ background: "#efe3cf", overflowX: "hidden" }}>

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
            <source src="/videos/shredder-mobile-new.mp4" type="video/mp4" />
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

          {/* 짧은 서비스 설명 — CTA 위에 한 줄만 */}
          <div style={{ margin: "12px auto 16px", maxWidth: 300 }}>
            <div style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,192,178,0.6)", borderRadius: 6, padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#3A3028", fontFamily: "var(--font-prose)", fontWeight: 400, lineHeight: 1.75, marginBottom: 0 }}>
                {locale === "ko"
                  ? "오늘무드는 하루 동안 생긴 감정을 가볍게 꺼내어, 우걱이와 함께 조금 웃기게 정리해보는 감정 콘텐츠 서비스입니다."
                  : "OnulMood — lighten today's feelings with Ugogi."}
              </p>
            </div>
          </div>

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
        style={{ padding: "12px 16px 96px", background: "#efe3cf" }}
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
              공유 가능 · 기록 가능 · 가볍게 돌아보기
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* ── 감정카드 아래 — 세계관 + 면책 안내 ── */}
      <div style={{ background: "#E2D8C8", borderTop: "1px solid #D0C8BC", padding: "22px 20px 24px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>

          {/* 우걱이 세계관 */}
          <div style={{ background: "rgba(26,36,26,0.82)", border: "1px solid rgba(106,155,122,0.4)", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 10 }}>
              🌱 우걱이 감정처리소
            </p>
            {locale === "ko" ? (
              <>
                <p style={{ fontSize: 13, color: "#E8F4E4", fontFamily: "var(--font-maru)", fontWeight: 600, lineHeight: 1.7, marginBottom: 8, letterSpacing: "-0.01em" }}>
                  오늘의 감정은 사라지지 않습니다.
                </p>
                <p style={{ fontSize: 12, color: "#A8CCA0", fontFamily: "var(--font-serif)", lineHeight: 1.9, marginBottom: 8 }}>
                  우걱이가 씹고,<br />퇴비로 만들고,<br />씨앗으로 남겨둡니다.
                </p>
                <p style={{ fontSize: 11, color: "#7A9A7A", fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
                  오늘무드는 감정을 기록하고<br />가볍게 돌아보는 감정 콘텐츠 서비스입니다.
                </p>
              </>
            ) : (
              <>
                <p style={{ fontSize: 12, color: "#E8F4E4", fontFamily: "var(--font-maru)", fontWeight: 600, lineHeight: 1.7, marginBottom: 6 }}>
                  Today&apos;s feelings don&apos;t disappear.
                </p>
                <p style={{ fontSize: 12, color: "#C8DCC0", fontFamily: "var(--font-serif)", lineHeight: 1.9 }}>
                  Ugogi chews them,<br />turns them into compost,<br />and leaves a tiny seed.
                </p>
              </>
            )}
          </div>

          {/* 면책 안내 */}
          <div style={{ background: "rgba(255,255,255,0.45)", border: "1px solid rgba(200,192,178,0.5)", borderRadius: 6, padding: "9px 13px" }}>
            <p style={{ fontSize: 10, color: "#9A9080", fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.65 }}>
              {locale === "ko"
                ? "오늘무드는 의학적 진단이나 심리상담 서비스가 아닙니다. 감정을 가볍게 기록하고 돌아보기 위한 콘텐츠 서비스입니다."
                : "OnulMood is not a medical or counseling service."}
            </p>
          </div>
        </div>
      </div>

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

      {/* 서비스 소개 텍스트 — SEO용 */}
      <div style={{ background: "#E8DDD0", borderTop: "1px solid #D0C8BC", padding: "40px 24px 60px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* 서비스 정의 — AdSense 심사관을 위한 명확한 서비스 설명 */}
          <div style={{ background: "rgba(255,255,255,0.4)", border: "1px solid #D0C8BC", borderRadius: 6, padding: "18px 20px", marginBottom: 24 }}>
            <p style={{ fontFamily: "var(--font-prose)", fontWeight: 400, fontSize: 13, color: "#5A5248", lineHeight: 1.85, letterSpacing: "-0.01em" }}>
              오늘무드는 하루 동안 생긴 감정을 가볍게 고르고, 우걱이와 함께 조금 웃기게 정리해보는 캐릭터 기반 감정 콘텐츠 서비스입니다.
            </p>
          </div>

          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(18px, 4vw, 22px)", color: "#2A2520", letterSpacing: "-0.025em", marginBottom: 16, lineHeight: 1.5 }}>
            감정을 씹고, 퇴비로 만들고, 씨앗으로 남기는 공간
          </h2>
          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 14, color: "#5A5248", lineHeight: 2.0, letterSpacing: "-0.01em", marginBottom: 20 }}>
            오늘 힘들었던 감정을 우걱이한테 던지면, 우걱이가 씹고 파쇄합니다. 없애는 게 아니에요. 감정은 찌꺼기가 되고, 찌꺼기는 퇴비가 되고, 퇴비에서 아주 작은 씨앗이 남아요.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
            {[
              { title: "감정 파쇄", desc: "힘든 것을 글로 써서 우걱이한테 던지면 파쇄 완료됩니다." },
              { title: "오늘 기록", desc: "오늘의 감정을 간단히 기록하고 패턴을 확인해요." },
              { title: "파쇄 기록", desc: "버린 감정들의 기록. 이렇게 많이 버텼구나, 싶어요." },
              { title: "감정 이야기", desc: "번아웃, 외로움, 억울함에 대한 짧은 글들." },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.5)", border: "1px solid #D0C8B8", borderRadius: 4, padding: "14px 16px" }}>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14, color: "#2A2520", marginBottom: 6, letterSpacing: "-0.02em" }}>{item.title}</p>
                <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 12, color: "#7A7060", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 13, color: "#8A8070", lineHeight: 1.8, letterSpacing: "-0.01em" }}>
            오늘무드는 모든 기록이 기기에만 저장돼요. 서버에 전송되지 않습니다. 로그인 없이, 개인정보 없이 사용할 수 있어요.
          </p>
        </div>

        {/* ── 하단 정보 섹션 (SEO 콘텐츠) ── */}
        <section style={{ maxWidth: 680, margin: "0 auto", padding: "8px 22px 36px" }}>
          {[
            {
              h: "오늘무드는 무엇인가요?",
              p: "오늘무드는 하루 동안 생긴 감정을 가볍게 기록하고 돌아보는 감정 콘텐츠 서비스입니다. 감정을 진단하거나 분석하는 도구가 아니라, 오늘의 마음을 잠시 꺼내 우걱이와 함께 정리해보는 공간이에요. 서운함도, 짜증도, 무기력도 틀린 감정은 없습니다. 그저 오늘 그런 마음이 있었다는 걸 알아주는 것에서 시작합니다.",
            },
            {
              h: "감정을 기록하면 좋은 이유",
              p: "막연한 기분도 '서운함'이나 '불안'처럼 이름을 붙이는 순간 한결 또렷해집니다. 며칠치 기록이 쌓이면 내가 어떤 상황에서 자주 흔들리는지 패턴도 보이죠. 감정을 머릿속에만 두지 않고 밖으로 꺼내두면, 한 걸음 떨어져 바라볼 수 있어 마음이 가벼워집니다. 오늘무드는 그 과정을 하루 한 줄로 가볍게 돕습니다.",
            },
            {
              h: "사람들이 자주 선택하는 감정",
              p: "오늘무드에서 사람들이 자주 꺼내는 감정은 서운함, 외로움, 무기력, 불안, 짜증입니다. 대부분 크게 터지지 않지만 조용히 오래 남는 감정들이에요. 누구나 한 번쯤 느끼는 마음이고, 나만 그런 게 아니라는 걸 알게 되는 것만으로도 조금 위로가 됩니다.",
            },
            {
              h: "오늘무드 이용 방법",
              p: "① 오늘의 감정을 하나 고르거나 적습니다. ② 우걱이에게 던지면 감정을 씹어 파쇄 결과를 보여줘요. ③ 결과와 함께 가끔 이상한 '감정 부산물'이 도감에 모입니다. ④ 기록은 감정파쇄함(아카이브)에 남아 나중에 다시 돌아볼 수 있어요. 로그인도, 설치도 필요 없습니다.",
            },
          ].map((s) => (
            <div key={s.h} style={{ marginBottom: 22 }}>
              <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: "#2A2520", marginBottom: 8, letterSpacing: "-0.02em" }}>{s.h}</h2>
              <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 13.5, color: "#5A5248", lineHeight: 1.9, letterSpacing: "-0.01em" }}>{s.p}</p>
            </div>
          ))}

          {/* 사람들이 자주 찾는 감정 — 감정도감 링크 */}
          <div style={{ marginBottom: 22 }}>
            <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: "#2A2520", marginBottom: 8, letterSpacing: "-0.02em" }}>사람들이 자주 찾는 감정</h2>
            <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 13.5, color: "#5A5248", lineHeight: 1.9, letterSpacing: "-0.01em", marginBottom: 10 }}>
              오늘무드에서 가장 자주 꺼내지는 감정들이에요. 마음에 닿는 감정을 눌러 우걱이 감정도감에서 자세한 이야기를 만나보세요.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {POPULAR_FEELINGS.map((f) => (
                <Link key={f.slug} href={`/feelings/${f.slug}`} style={{ fontSize: 13, color: "#7A6A58", textDecoration: "none", background: "rgba(255,255,255,0.6)", border: "1px solid #D0C8B8", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--font-prose)", fontWeight: 300 }}>
                  {f.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 최근 매거진 — 실제 글 노출 */}
          <div style={{ marginBottom: 22 }}>
            <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: "#2A2520", marginBottom: 8, letterSpacing: "-0.02em" }}>최근 매거진</h2>
            <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 13.5, color: "#5A5248", lineHeight: 1.9, letterSpacing: "-0.01em", marginBottom: 10 }}>
              우걱이 매거진에서는 감정과 관계에 대한 이야기를 꾸준히 다루고 있어요. 최근에 올라온 글입니다.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {RECENT_MAGAZINE.map((a) => (
                <Link key={a.slug} href={`/magazine/${a.category}/${a.slug}`} style={{ textDecoration: "none", display: "block", padding: "11px 14px", background: "rgba(255,255,255,0.55)", border: "1px solid #D0C8B8", borderRadius: 6 }}>
                  <span style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 13.5, color: "#2A2520", letterSpacing: "-0.01em" }}>{a.title}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: "#8A8070", fontFamily: "var(--font-prose)", fontWeight: 300, marginTop: 3 }}>{a.subtitle}</span>
                </Link>
              ))}
            </div>
            <Link href="/magazine" style={{ display: "inline-block", marginTop: 10, fontSize: 12.5, color: "#C8607A", textDecoration: "underline", fontFamily: "var(--font-prose)" }}>
              우걱이 매거진 전체 보기 →
            </Link>
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: "#2A2520", marginBottom: 8, letterSpacing: "-0.02em" }}>감정 아카이브 바로가기</h2>
            <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 13.5, color: "#5A5248", lineHeight: 1.9, letterSpacing: "-0.01em", marginBottom: 10 }}>
              더 깊이 들여다보고 싶다면, <Link href="/insights" style={{ color: "#C8607A", textDecoration: "underline" }}>감정 인사이트</Link>에서 나의 감정 흐름을, <Link href="/blog" style={{ color: "#C8607A", textDecoration: "underline" }}>감정 이야기</Link>에서 마음에 대한 글들을, <Link href="/feelings" style={{ color: "#C8607A", textDecoration: "underline" }}>우걱이 감정도감</Link>에서 다양한 감정의 정체를 만나볼 수 있어요. 처음이라면 <Link href="/guide" style={{ color: "#C8607A", textDecoration: "underline" }}>감정 기록 가이드</Link>부터 시작해보세요.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
