"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FeedbackToast from "@/components/trash/FeedbackToast";
import { useLocale } from "@/context/LocaleContext";
import { buildResultUrl } from "@/lib/resultCard";

const ROSE = "#C8607A";
const INK  = "#1A1410";

/* ── 우걱이 이빨 SVG ── */
function UgegiTeeth() {
  return (
    <svg viewBox="0 0 400 72" preserveAspectRatio="none"
      style={{ width: "100%", display: "block", marginBottom: -2 }}>
      {/* 베이지 위 배경 */}
      <rect width="400" height="72" fill="#efe3cf" />
      {/* 검정 잇몸 */}
      <rect y="0" width="400" height="22" fill={INK} />
      {/* 이빨 — 들쭉날쭉하게 */}
      {[
        [0, 22, 18, 72, 10, 52, 36, 22],
        [36, 22, 56, 72, 48, 48, 72, 22],
        [72, 22, 88, 68, 82, 44, 100, 22],
        [100, 22, 122, 72, 112, 50, 134, 22],
        [134, 22, 150, 65, 144, 42, 164, 22],
        [164, 22, 186, 72, 177, 52, 200, 22],
        [200, 22, 218, 68, 210, 46, 230, 22],
        [230, 22, 252, 72, 242, 50, 264, 22],
        [264, 22, 280, 65, 274, 43, 295, 22],
        [295, 22, 318, 72, 308, 52, 330, 22],
        [330, 22, 348, 68, 341, 45, 362, 22],
        [362, 22, 382, 72, 374, 50, 400, 22],
      ].map(([x1, y1, x2, y2, x3, y3, x4, y4], i) => (
        <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`} fill="#FAF8F2" />
      ))}
      {/* 이빨 그림자 */}
      {[18, 56, 88, 122, 150, 186, 218, 252, 280, 318, 348, 382].map((x, i) => (
        <line key={i} x1={x} y1={22} x2={x - 8} y2={60} stroke="#D8D0C0" strokeWidth="1" opacity="0.5" />
      ))}
    </svg>
  );
}

/* ── 우걱이 눈 ── */
function UgegiEyes({ active }: { active: boolean }) {
  const [eyeX, setEyeX] = useState(0);
  const [eyeY, setEyeY] = useState(0);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const moveTimer = setInterval(() => {
      setEyeX((Math.random() - 0.5) * 5);
      setEyeY((Math.random() - 0.5) * 3);
    }, 1800 + Math.random() * 1200);

    const blinkTimer = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 120);
    }, 2400 + Math.random() * 1600);

    return () => { clearInterval(moveTimer); clearInterval(blinkTimer); };
  }, []);

  return (
    <div style={{
      display: "flex", gap: 28, justifyContent: "center",
      marginTop: -8, marginBottom: 4,
      position: "relative", zIndex: 5,
    }}>
      {[0, 1].map(i => (
        <motion.div key={i}
          animate={{ x: eyeX + (i === 0 ? -2 : 2), y: eyeY }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            width: 28, height: blinking ? 3 : 28,
            borderRadius: blinking ? 2 : "50%",
            background: INK,
            position: "relative",
            overflow: "hidden",
            transition: "height 0.06s",
            boxShadow: active ? `0 0 12px ${ROSE}88` : "none",
          }}
        >
          {/* 눈 하이라이트 */}
          {!blinking && (
            <div style={{
              position: "absolute", top: 5, left: 6,
              width: 8, height: 8, borderRadius: "50%", background: "white", opacity: 0.8,
            }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── 처리 방식 카드 ── */
const MODES = [
  { id: "chew",  label: "우걱 먹이기",     sub: "바람에 날리기",    bg: "#F0E0DC", rot: -6,  tx: -8,  ty: 6  },
  { id: "grind", label: "빠각 돌리기",     sub: "조용히 사라지기",  bg: "#D8E8DC", rot:  4,  tx:  6,  ty: -4 },
  { id: "burn",  label: "질겅 처리하기",   sub: "물에 녹여버리기",  bg: "#F0DDD0", rot: -3,  tx: -4,  ty: 8  },
  { id: "press", label: "감정 갈갈 모드",  sub: "깊이 내려쳐두기",  bg: "#E4DCED", rot:  5,  tx:  10, ty: 2  },
] as const;

type Mode = typeof MODES[number]["id"];

/* ── 우걱이 반응 문구 ── */
const UGEGI_LINES = [
  "우걱우걱…",
  "오늘 감정은 좀 질겼음.",
  "서운함 아직 이빨 사이에 있음.",
  "빠각 완료.",
  "혼자 참기엔 너무 오래 묵혔음.",
  "감정 찌꺼기 남아있음.",
  "이번엔 생각보다 탱탱했음.",
  "배가 불러옴.",
];

/* ── Web Audio 파쇄음 ── */
function playShredSound() {
  try {
    const ctx = new AudioContext();
    const dur = 0.3;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * dur * 0.45));
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 1000; bp.Q.value = 0.7;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    src.connect(bp); bp.connect(gain); gain.connect(ctx.destination);
    src.start();
  } catch {}
}

export default function MainPage() {
  const router    = useRouter();
  const { t }     = useLocale();
  const mouthRef  = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLDivElement>(null);

  const [text, setText]           = useState("");
  const [mode, setMode]           = useState<Mode | null>(null);
  const [phase, setPhase]         = useState<"idle" | "feeding" | "done">("idle");
  const [shaking, setShaking]     = useState(false);
  const [toast, setToast]         = useState<string | null>(null);
  const [count, setCount]         = useState(0);
  const [ugLine, setUgLine]       = useState(UGEGI_LINES[0]);
  const [dumpedLabels, setDumped] = useState<string[]>([]);

  const canFeed = text.trim().length > 0 && mode !== null;

  /* 우걱이 대사 순환 */
  useEffect(() => {
    const t = setInterval(() => {
      setUgLine(UGEGI_LINES[Math.floor(Math.random() * UGEGI_LINES.length)]);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  /* 던지기 */
  const handleFeed = useCallback(async () => {
    if (!canFeed || phase !== "idle") return;
    setPhase("feeding");

    const emotion = text.trim().slice(0, 10) || (mode ?? "감정");
    setDumped(prev => [...new Set([...prev, emotion])].slice(-3));

    setTimeout(() => {
      playShredSound();
      setShaking(true);
      setTimeout(() => setShaking(false), 420);
    }, 700);

    setTimeout(() => {
      setPhase("done");
      setCount(n => n + 1);
      const msg = UGEGI_LINES[Math.floor(Math.random() * UGEGI_LINES.length)];
      setToast(msg);
      setTimeout(() => setToast(null), 3500);
    }, 1200);
  }, [canFeed, phase, text, mode]);

  function goToResult() {
    const emotion = text.trim().slice(0, 10) || (mode ?? "감정");
    router.push(buildResultUrl(dumpedLabels.length ? dumpedLabels : [emotion], Date.now() % 999983));
  }

  function reset() {
    setPhase("idle");
    setText("");
    setMode(null);
  }

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── 우걱이 입 영역 ── */}
      <div style={{ position: "relative" }}>
        {/* 잇몸 + 이빨 */}
        <div style={{ position: "relative" }}>
          {/* 잇몸 (검정 배경) */}
          <div style={{ background: INK, paddingTop: 16, paddingBottom: 0 }}>
            {/* 타이틀 + 상태 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px 12px" }}>
              <div>
                <p style={{ fontSize: 9, fontFamily: "monospace", color: "#6A6258", letterSpacing: "0.14em", marginBottom: 3 }}>
                  UGEGI EMOTIONAL DISPOSAL
                </p>
                <p style={{ fontSize: 17, fontFamily: "var(--font-serif)", color: "#FAF8F2", fontWeight: 700, lineHeight: 1.2 }}>
                  우걱이 감정처리소
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 8, fontFamily: "monospace", color: "#6A6258", letterSpacing: "0.1em", marginBottom: 3 }}>
                  우걱이 오늘 상태
                </p>
                <motion.p
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ fontSize: 11, fontFamily: "monospace", color: ROSE, letterSpacing: "0.06em", fontWeight: 700 }}>
                  배고픔 MAX ⚡
                </motion.p>
              </div>
            </div>

            {/* 눈 */}
            <UgegiEyes active={phase === "feeding"} />
          </div>

          {/* 이빨 */}
          <motion.div
            ref={mouthRef}
            animate={shaking ? { x: [-4, 4, -3, 3, -2, 2, 0] } : {}}
            transition={{ duration: 0.4 }}
            style={{ position: "relative", zIndex: 2 }}
          >
            <UgegiTeeth />
          </motion.div>
        </div>

        {/* 파쇄기 입 타겟 (보이지 않음) */}
        <div id="shredder-mouth-target" style={{
          position: "absolute", bottom: 20, left: "50%",
          width: 2, height: 2, transform: "translateX(-50%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── 본문 ── */}
      <div style={{ padding: "20px 18px 88px" }}>

        {/* 우걱이 반응 문구 */}
        <motion.div
          key={ugLine}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 18 }}
        >
          <span style={{
            fontSize: 13, fontFamily: "var(--font-serif)", color: "#7A6858",
            fontStyle: "italic",
            background: "#F5EFE0",
            border: `1px dashed #C8BEB0`,
            padding: "4px 12px",
            display: "inline-block",
          }}>
            우걱이: &ldquo;{ugLine}&rdquo;
          </span>
        </motion.div>

        {/* ── 감정 투입구 ── */}
        <div ref={textareaRef} style={{ position: "relative", marginBottom: 6 }}>
          {/* 낙서 텍스트 */}
          <p style={{
            fontSize: 11, fontFamily: "var(--font-serif)", color: "#A89880",
            marginBottom: 6, transform: "rotate(-1.5deg)", display: "inline-block",
          }}>
            오늘 뭐 때문에 꾸역꾸역 버텼음?
          </p>

          {/* 투입구 레이블 */}
          <div style={{
            position: "absolute", top: 28, right: -6, zIndex: 3,
            background: ROSE, color: "#F5EFE0",
            fontSize: 8, fontFamily: "monospace", letterSpacing: "0.1em",
            padding: "3px 8px", transform: "rotate(90deg)",
            transformOrigin: "right center",
            whiteSpace: "nowrap",
          }}>
            ▼ 감정 투입구
          </div>

          {/* textarea 박스 */}
          <motion.div
            animate={phase === "feeding" ? {
              y: [0, 0, -120],
              scaleY: [1, 1.02, 0.1],
              opacity: [1, 1, 0],
            } : {}}
            transition={{ duration: 1.1, ease: "easeIn" }}
            style={{
              background: "#FAF8F2",
              border: `2px solid ${INK}`,
              borderRadius: 2,
              boxShadow: `4px 4px 0 ${INK}`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* 줄 */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(180,170,150,0.18) 27px, rgba(180,170,150,0.18) 28px)",
              backgroundPosition: "0 40px",
            }} />
            {/* 왼쪽 여백선 */}
            <div style={{ position: "absolute", left: 40, top: 0, bottom: 0, width: 1, background: "rgba(220,160,140,0.25)", pointerEvents: "none" }} />

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={"여기에 감정 투입…\n안 적어도 됨. 근데 적으면 더 잘 씹힘."}
              rows={7}
              style={{
                background: "transparent", border: "none", outline: "none", resize: "none",
                padding: "16px 16px 14px 52px",
                fontSize: 15, lineHeight: "28px",
                color: INK, fontFamily: "var(--font-serif)",
                width: "100%", position: "relative", zIndex: 1,
                letterSpacing: "0.01em",
              }}
            />

            {/* 글자 수에 따른 우걱이 반응 */}
            {text.length > 80 && (
              <div style={{
                position: "absolute", bottom: 6, right: 8,
                fontSize: 9, fontFamily: "monospace", color: ROSE,
                letterSpacing: "0.06em",
              }}>
                우걱이: 많다… 힘들어짐
              </div>
            )}
            {!text && (
              <div style={{
                position: "absolute", bottom: 8, left: 52,
                fontSize: 9, fontFamily: "monospace", color: "#C8BEB0",
                letterSpacing: "0.05em",
              }}>
                우걱이 입 벌리고 기다리는 중…
              </div>
            )}
          </motion.div>

          {text.length > 0 && (
            <p style={{ fontSize: 9, fontFamily: "monospace", color: "#B4A890", textAlign: "right", marginTop: 4, letterSpacing: "0.06em" }}>
              {text.length}자 — {text.length > 50 ? "우걱이 힘들 수도" : "씹을 수 있음"}
            </p>
          )}
        </div>

        {/* ── 처리 방식 카드 (삐뚤배뚤) ── */}
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#A89880", letterSpacing: "0.12em", marginBottom: 12, marginTop: 8 }}>
          ▶ 처리 방식 선택 (하나만)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 22, position: "relative" }}>
          {MODES.map((m) => {
            const active = mode === m.id;
            return (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => setMode(m.id)}
                style={{
                  background: active ? m.bg : "#FAF8F2",
                  border: active ? `2px solid ${INK}` : "1.5px solid #C8BEB0",
                  borderRadius: 2, padding: "11px 14px",
                  cursor: "pointer", textAlign: "left",
                  boxShadow: active ? `3px 3px 0 ${INK}` : "1px 2px 8px rgba(44,40,37,0.08)",
                  transform: `translate(${m.tx}px, ${m.ty}px) rotate(${active ? 0 : m.rot}deg)`,
                  transition: "all 0.18s ease",
                  minWidth: 130,
                  position: "relative",
                }}
              >
                {active && (
                  <div style={{
                    position: "absolute", top: -8, right: 6,
                    background: ROSE, color: "#F5EFE0",
                    fontSize: 8, fontFamily: "monospace", padding: "1px 5px",
                    borderRadius: 2, letterSpacing: "0.08em",
                  }}>
                    선택됨
                  </div>
                )}
                <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, fontWeight: active ? 700 : 400, marginBottom: 3 }}>
                  {m.label}
                </p>
                <p style={{ fontSize: 10, fontFamily: "monospace", color: "#A89880", letterSpacing: "0.04em" }}>
                  {m.sub}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* ── 던지기 버튼 ── */}
        <motion.button
          whileHover={canFeed ? { rotate: [-0.5, 0.5, -0.5, 0], x: [0, 2, -2, 0] } : {}}
          transition={{ duration: 0.4 }}
          whileTap={canFeed ? { scale: 0.96 } : {}}
          onClick={handleFeed}
          disabled={!canFeed || phase === "feeding"}
          style={{
            width: "100%", height: 54,
            background: canFeed ? ROSE : "#E0D8CC",
            border: canFeed ? `2px solid ${INK}` : "none",
            borderRadius: 2,
            fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700,
            color: canFeed ? "#F5EFE0" : "#B4A890",
            cursor: canFeed ? "pointer" : "not-allowed",
            letterSpacing: "0.03em",
            boxShadow: canFeed ? `5px 5px 0 ${INK}` : "none",
            marginBottom: 10,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {/* 이빨 아이콘 */}
          {canFeed && (
            <svg width="16" height="12" viewBox="0 0 16 12" fill="#F5EFE0">
              <rect x="0" y="0" width="3" height="8" rx="1"/>
              <rect x="4" y="0" width="3" height="10" rx="1"/>
              <rect x="8" y="0" width="3" height="7" rx="1"/>
              <rect x="12" y="0" width="3" height="9" rx="1"/>
            </svg>
          )}
          {phase === "feeding" ? "우걱이 씹는 중…" : canFeed ? "우걱이한테 던지기 →" : "감정 써줘 + 방식 골라줘"}
        </motion.button>

        {/* 보조 버튼들 */}
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/release" style={{
            flex: 1, height: 44, background: INK,
            border: `2px solid ${INK}`, borderRadius: 2,
            fontSize: 13, fontFamily: "var(--font-serif)", fontWeight: 700,
            color: "#FAF8F2", display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", letterSpacing: "0.02em",
            boxShadow: `3px 3px 0 #6A6258`,
          }}>
            하나 더 먹여줄게 ♥
          </Link>
          <Link href="/archive" style={{
            flex: 1, height: 44, background: "#FAF8F2",
            border: "1.5px solid #C8BEB0", borderRadius: 2,
            fontSize: 12, fontFamily: "var(--font-serif)",
            color: "#7A7260", display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none",
          }}>
            {t.nav.archive}
          </Link>
        </div>

        {/* 파쇄 횟수 */}
        {count > 0 && (
          <p style={{ textAlign: "center", fontSize: 9, fontFamily: "monospace", color: "#B4A890", marginTop: 14, letterSpacing: "0.08em" }}>
            우걱이 오늘 처리 건수: {count}건
          </p>
        )}
      </div>

      {/* ── 빠각 완료 오버레이 ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div key="done"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,20,16,0.72)" }}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -3 }} animate={{ scale: 1, rotate: -1 }}
              transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.4 }}
              style={{
                background: "#FAF8F2", border: `2.5px solid ${INK}`,
                borderRadius: 2, padding: "22px 26px 24px", textAlign: "center",
                boxShadow: `6px 6px 0 ${INK}`, maxWidth: 300, width: "86%",
              }}
            >
              <p style={{ fontSize: 9, fontFamily: "monospace", color: ROSE, letterSpacing: "0.14em", marginBottom: 8 }}>
                ■ PROCESSING COMPLETE
              </p>
              <p style={{ fontSize: 28, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, marginBottom: 6 }}>
                빠각 완료.
              </p>
              <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#6A6258", marginBottom: 18, lineHeight: 1.6 }}>
                우걱이가 다 씹어먹었음.
              </p>
              <button onClick={goToResult} style={{
                width: "100%", height: 44, background: ROSE,
                border: `2px solid ${INK}`, borderRadius: 2,
                fontSize: 13, fontFamily: "var(--font-serif)", color: "#F5EFE0", fontWeight: 700,
                cursor: "pointer", marginBottom: 8,
                boxShadow: `3px 3px 0 #8A3050`,
              }}>
                빠각 결과지 받기 →
              </button>
              <button onClick={reset} style={{
                width: "100%", height: 36, background: "transparent",
                border: `1px dashed #C8BEB0`, borderRadius: 2,
                fontSize: 12, fontFamily: "var(--font-serif)", color: "#8A8270", cursor: "pointer",
              }}>
                다시 던지기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FeedbackToast message={toast} />
    </div>
  );
}
