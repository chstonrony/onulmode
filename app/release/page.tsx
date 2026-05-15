"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { buildResultUrl } from "@/lib/resultCard";

type Mode = "chew" | "grind" | "burn" | "press";
type Phase = "write" | "animating" | "done";

const ROSE = "#C8607A";
const INK  = "#1E1814";

const MODES: { id: Mode; label: string; sub: string; bg: string; rot: number }[] = [
  { id: "chew",  label: "그냥 씹어먹기",   sub: "우걱이 기본 처리",   bg: "#F0E0DC", rot: -4 },
  { id: "grind", label: "살살 갈아버리기", sub: "천천히 씹는 처리",   bg: "#D8E8DC", rot:  3 },
  { id: "burn",  label: "불태워버리기",     sub: "긴급 고온 처리",     bg: "#F0DDD0", rot: -2 },
  { id: "press", label: "꾹 눌러버리기",   sub: "속으로 삭히는 처리", bg: "#E4DCED", rot:  4 },
];

const RESULTS = [
  { big: "빠각 완료.",    sub: "우걱이가 다 씹어먹었음." },
  { big: "갈렸음.",       sub: "생각보다 빨리 처리됨." },
  { big: "처리 완료.",    sub: "오래 묵혔던 거 맞지?" },
  { big: "삭혀버렸음.",   sub: "찌꺼기 좀 남았는데 아무튼 완료." },
  { big: "우걱우걱 완료.", sub: "이빨에 좀 꼈는데 억지로 처리함." },
];

function ChewParticles({ mode }: { mode: Mode }) {
  const colors: Record<Mode, string> = {
    chew: "#E8C8B8", grind: "#B8D4C0", burn: "#E8C090", press: "#C0B8D4",
  };
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
      {Array.from({ length: 14 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 200;
        const y = mode === "press" ? 60 + Math.random() * 60 : -(50 + Math.random() * 90);
        return (
          <motion.div key={i}
            initial={{ x: 0, y: 0, opacity: 0.7, scale: 1, rotate: 0 }}
            animate={{ x, y, opacity: 0, scale: 0, rotate: Math.random() * 200 }}
            transition={{ duration: 1.4, delay: i * 0.06, ease: "easeOut" }}
            style={{
              position: "absolute", left: "50%", top: "55%",
              width: 3 + Math.random() * 4, height: 4 + Math.random() * 6,
              borderRadius: 1, background: colors[mode],
            }}
          />
        );
      })}
    </div>
  );
}

function ReleaseContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [text, setText]           = useState(params.get("text") ?? "");
  const [mode, setMode]           = useState<Mode | null>(null);
  const [phase, setPhase]         = useState<Phase>("write");
  const [showParticles, setParticles] = useState(false);
  const [result] = useState(() => RESULTS[Math.floor(Math.random() * RESULTS.length)]);
  const [scope, animate]          = useAnimate();

  const canFeed = text.trim().length > 0 && mode !== null;

  function goToResult() {
    const emotion = text.trim().slice(0, 10) || (mode ?? "감정");
    router.push(buildResultUrl([emotion], Date.now() % 999983));
  }

  const handleFeed = async () => {
    if (!canFeed || phase !== "write") return;
    setPhase("animating");

    if (mode === "chew") {
      await animate(scope.current,
        { x: [0, -4, 4, -3, 3, 0], y: [0, 0, -80], opacity: [1, 1, 0], scale: [1, 1.02, 0.6] },
        { duration: 1.2, ease: "easeIn" });
    } else if (mode === "grind") {
      await animate(scope.current,
        { opacity: [1, 0.6, 0], filter: ["blur(0px)", "blur(3px)", "blur(16px)"], scale: [1, 0.98, 0.9] },
        { duration: 1.5, ease: "easeInOut" });
    } else if (mode === "burn") {
      await animate(scope.current, {
        filter: ["brightness(1) sepia(0)", "brightness(1.3) sepia(0.7) hue-rotate(-15deg)", "brightness(2) sepia(1) blur(10px)"],
        scaleY: [1, 0.96, 0.4], opacity: [1, 0.9, 0], y: [0, -10, -26],
      }, { duration: 1.4, ease: "easeIn" });
    } else if (mode === "press") {
      await animate(scope.current,
        { scaleY: [1, 1.02, 0.08], scaleX: [1, 1, 1.15], opacity: [1, 0.9, 0], y: [0, 4, 8] },
        { duration: 1.3, ease: "easeIn" });
    }

    setParticles(true);
    setTimeout(() => setParticles(false), 1600);
    setPhase("done");
  };

  const reset = () => { setPhase("write"); setText(""); setMode(null); };

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", paddingBottom: 90, position: "relative", overflow: "hidden" }}>

      {/* 배경 — 처리소 분위기 */}
      {["우걱우걱", "처리중", "빠각", "오래됨", "묵혔음"].map((w, i) => (
        <div key={i} style={{
          position: "fixed", fontFamily: "monospace", fontSize: [28, 18, 34, 20, 24][i],
          color: INK, opacity: 0.03, filter: "blur(12px)",
          transform: `rotate(${[-10, 7, -5, 12, -8][i]}deg)`,
          top: ["8%", "72%", "38%", "58%", "20%"][i],
          left: ["68%", "4%", "78%", "12%", "50%"][i],
          pointerEvents: "none", zIndex: 0, userSelect: "none",
        }}>{w}</div>
      ))}

      {/* 헤더 */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "36px 24px 16px", borderBottom: `1px dashed #C8BEB0`,
        position: "relative", zIndex: 10,
      }}>
        <Link href="/" style={{ fontSize: 12, color: "#A89880", fontFamily: "var(--font-serif)", letterSpacing: "0.04em", textDecoration: "none" }}>
          ← 우걱이 처리소
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#8A9E78" }}
          />
          <span style={{ fontSize: 10, fontFamily: "monospace", color: "#8A9E78", letterSpacing: "0.08em" }}>
            우걱이 대기 중
          </span>
        </div>
      </div>

      <div style={{ padding: "24px 24px 0", position: "relative", zIndex: 10 }}>
        <AnimatePresence mode="wait">

          {/* ── 입력 화면 ── */}
          {phase !== "done" && (
            <motion.div key="write" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}>

              {/* 타이틀 */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
                <h2 style={{
                  fontSize: 24, fontFamily: "var(--font-serif)",
                  color: INK, lineHeight: 1.45, marginBottom: 6,
                }}>
                  우걱이한테<br />먹일 감정 적어줘
                </h2>
                <p style={{ fontSize: 11, fontFamily: "monospace", color: "#A89880", letterSpacing: "0.05em" }}>
                  뭘 적든 우걱이가 다 씹어먹음. 걱정 말고 투입해.
                </p>
              </motion.div>

              {/* 감정 투입구 */}
              <div style={{ position: "relative", marginBottom: 14 }} ref={scope}>
                {showParticles && mode && <ChewParticles mode={mode} />}

                {/* 투입구 레이블 */}
                <div style={{
                  position: "absolute", top: -10, left: 12, zIndex: 3,
                  background: ROSE, color: "#F5EFE0",
                  fontSize: 9, fontFamily: "monospace", letterSpacing: "0.12em",
                  padding: "2px 8px", borderRadius: 2,
                }}>
                  ▼ 감정 투입구
                </div>

                <div style={{
                  background: "#FAF6EF",
                  border: `2px solid ${INK}`,
                  borderRadius: 0,
                  boxShadow: `4px 4px 0 ${INK}`,
                  overflow: "hidden",
                  position: "relative",
                  marginTop: 6,
                }}>
                  {/* 줄 배경 */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 28px, rgba(180,170,150,0.15) 28px, rgba(180,170,150,0.15) 29px)",
                    backgroundPosition: "0 42px",
                  }} />
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={"우걱이 입에 넣을 감정 써줘\n\n뭘 적어도 됨.\n어차피 우걱이가 다 씹어먹을 거니까."}
                    rows={8}
                    style={{
                      background: "transparent", border: "none", outline: "none", resize: "none",
                      padding: "20px 18px 18px",
                      fontSize: 15, lineHeight: "29px",
                      color: INK, fontFamily: "var(--font-serif)",
                      width: "100%", position: "relative", zIndex: 1,
                      letterSpacing: "0.01em",
                    }}
                  />
                  {/* 우걱이 대기 표시 */}
                  {!text && (
                    <div style={{
                      position: "absolute", bottom: 10, right: 12,
                      fontSize: 9, fontFamily: "monospace", color: "#C8BEB0",
                      letterSpacing: "0.06em",
                    }}>
                      우걱이 입 열어놓고 기다리는 중...
                    </div>
                  )}
                </div>
              </div>

              {text.length > 0 && (
                <p style={{ fontSize: 9, fontFamily: "monospace", color: "#B4A890", textAlign: "right", marginBottom: 14, letterSpacing: "0.06em" }}>
                  {text.length}자 — 우걱이가 먹을 수 있음
                </p>
              )}

              {/* 처리 방식 선택 */}
              <p style={{ fontSize: 10, fontFamily: "monospace", color: "#A89880", marginBottom: 10, letterSpacing: "0.1em" }}>
                ▶ 처리 방식 선택
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {MODES.map((m) => {
                  const active = mode === m.id;
                  return (
                    <motion.button
                      key={m.id}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setMode(m.id)}
                      style={{
                        background: active ? m.bg : "#FAF6EF",
                        border: active ? `2px solid ${INK}` : "1.5px solid #C8BEB0",
                        borderRadius: 2,
                        padding: "12px 10px",
                        cursor: "pointer", textAlign: "left",
                        boxShadow: active ? `3px 3px 0 ${INK}` : "1px 2px 6px rgba(44,40,37,0.07)",
                        transform: `rotate(${active ? 0 : m.rot}deg)`,
                        transition: "all 0.18s ease",
                      }}
                    >
                      <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, marginBottom: 3, fontWeight: active ? 700 : 400 }}>
                        {m.label}
                      </p>
                      <p style={{ fontSize: 9, fontFamily: "monospace", color: "#A89880", letterSpacing: "0.06em" }}>
                        {m.sub}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* 투입 버튼 */}
              <motion.button
                whileTap={canFeed ? { scale: 0.97 } : {}}
                onClick={handleFeed}
                disabled={!canFeed}
                style={{
                  width: "100%", height: 54,
                  background: canFeed ? INK : "#E0D8CC",
                  border: canFeed ? `2px solid ${INK}` : "none",
                  borderRadius: 2,
                  fontSize: 15, fontFamily: "var(--font-serif)",
                  color: canFeed ? "#FAF6EF" : "#B4A890",
                  cursor: canFeed ? "pointer" : "not-allowed",
                  fontWeight: 700, letterSpacing: "0.04em",
                  boxShadow: canFeed ? `4px 4px 0 ${ROSE}` : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {phase === "animating" ? "우걱이 씹는 중..." : canFeed ? "우걱이한테 던져줘" : "감정 먼저 써줘 + 방식 골라줘"}
              </motion.button>

              {!canFeed && (
                <p style={{ fontSize: 9, fontFamily: "monospace", color: "#C0B098", textAlign: "center", marginTop: 10, letterSpacing: "0.06em" }}>
                  {!text.trim() ? "우걱이 입 열려있음. 감정 투입 대기 중." : "처리 방식도 골라줘야 우걱이가 씹기 시작함."}
                </p>
              )}
            </motion.div>
          )}

          {/* ── 완료 화면 ── */}
          {phase === "done" && (
            <motion.div key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 32 }}
            >
              {/* 우걱이 완료 카드 */}
              <motion.div
                animate={{ rotate: [-0.6, 0.4, -0.6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative", width: "100%", marginBottom: 24 }}
              >
                <div style={{
                  background: "#FAF6EF",
                  border: `2px solid ${INK}`,
                  borderRadius: 2,
                  boxShadow: `5px 5px 0 ${INK}`,
                  padding: "32px 24px 28px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* 줄 배경 */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 28px, rgba(180,170,150,0.12) 28px, rgba(180,170,150,0.12) 29px)",
                    backgroundPosition: "0 40px",
                  }} />
                  {/* 처리소 도장 */}
                  <div style={{
                    position: "absolute", top: 10, right: 12,
                    fontSize: 8, fontFamily: "monospace", color: ROSE,
                    border: `1.5px solid ${ROSE}`, padding: "2px 6px",
                    transform: "rotate(8deg)", opacity: 0.85, borderRadius: 2,
                    letterSpacing: "0.1em",
                  }}>
                    PROCESSED
                  </div>

                  <motion.p
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    style={{ fontSize: 36, fontFamily: "var(--font-serif)", color: INK, marginBottom: 12, position: "relative", fontWeight: 700 }}>
                    {result.big}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
                    style={{ fontSize: 13, color: "#6A6258", fontFamily: "var(--font-serif)", lineHeight: 1.7, position: "relative" }}>
                    {result.sub}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                    style={{ fontSize: 9, fontFamily: "monospace", color: "#B4A890", marginTop: 16, letterSpacing: "0.1em", position: "relative" }}>
                    — 우걱이 처리소 —
                  </motion.p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>

                <button onClick={goToResult} style={{
                  height: 52, background: ROSE, border: `2px solid ${ROSE}`, borderRadius: 2,
                  fontSize: 15, fontFamily: "var(--font-serif)", color: "#F5EFE0", fontWeight: 700,
                  cursor: "pointer", boxShadow: `4px 4px 0 #8A3050`,
                  letterSpacing: "0.02em",
                }}>
                  빠각 결과지 받기 →
                </button>

                <button onClick={reset} style={{
                  height: 46, background: INK, border: `2px solid ${INK}`, borderRadius: 2,
                  fontSize: 13, fontFamily: "var(--font-serif)", color: "#FAF6EF",
                  cursor: "pointer", fontWeight: 700,
                  boxShadow: `3px 3px 0 #6A6258`,
                }}>
                  하나 더 먹여줄게
                </button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[{ href: "/archive", label: "파쇄함 보기" }, { href: "/", label: "홈으로" }].map((b) => (
                    <Link key={b.href} href={b.href} style={{
                      height: 42, background: "#FAF6EF",
                      border: "1.5px solid #C8BEB0", borderRadius: 2,
                      fontSize: 12, fontFamily: "var(--font-serif)", color: "#5A5248",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      textDecoration: "none", letterSpacing: "0.03em",
                    }}>
                      {b.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ReleasePage() {
  return (
    <Suspense fallback={<div style={{ background: "#efe3cf", minHeight: "100vh" }} />}>
      <ReleaseContent />
    </Suspense>
  );
}
