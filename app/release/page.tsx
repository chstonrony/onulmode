"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { buildResultUrl } from "@/lib/resultCard";

type Mode = "drift" | "dissolve" | "burn" | "sink";
type Phase = "write" | "animating" | "done";

const MODES: { id: Mode; label: string; sub: string; bg: string; rot: number }[] = [
  { id: "drift",    label: "흘려보내기", sub: "바람에 날리듯",   bg: "#D8E4EE", rot: -3 },
  { id: "dissolve", label: "녹여보내기", sub: "물에 녹아내리듯", bg: "#D8E8DC", rot:  2 },
  { id: "burn",     label: "태워보내기", sub: "조용히 사라지듯", bg: "#F0E0DC", rot: -2 },
  { id: "sink",     label: "가라앉히기", sub: "깊이 내려놓듯",   bg: "#E4DCED", rot:  3 },
];

const RESULTS = [
  { big: "버렸다.",     sub: "다 해결된 건 아니지만, 그래도 버렸잖아." },
  { big: "흘려보냈어.", sub: "조금 가벼워졌을지도." },
  { big: "비웠어.",     sub: "마음 한쪽, 조금 비워뒀어." },
  { big: "괜찮아.",     sub: "너 오늘도 꽤 버텼다." },
  { big: "사라졌어.",   sub: "천천히, 그렇게 흘려보내는 거야." },
];

function SoftParticles({ mode }: { mode: Mode }) {
  const colors: Record<Mode, string> = {
    drift: "#C8D8E8", dissolve: "#B8D4C0", burn: "#E0C0A8", sink: "#C0B8D4"
  };
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 180;
        const y = mode === "sink" ? 60 + Math.random() * 50 : -(50 + Math.random() * 80);
        return (
          <motion.div key={i}
            initial={{ x: 0, y: 0, opacity: 0.55, scale: 1, rotate: 0 }}
            animate={{ x, y, opacity: 0, scale: 0, rotate: Math.random() * 160 }}
            transition={{ duration: 1.6, delay: i * 0.08, ease: "easeOut" }}
            style={{
              position: "absolute", left: "50%", top: "55%",
              width: 4, height: 5, borderRadius: 1,
              background: colors[mode],
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
  const [text, setText] = useState(params.get("text") ?? "");
  const [mode, setMode] = useState<Mode | null>(null);
  const [phase, setPhase] = useState<Phase>("write");
  const [saveIt, setSaveIt] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [result] = useState(() => RESULTS[Math.floor(Math.random() * RESULTS.length)]);
  const [scope, animate] = useAnimate();

  function goToResult() {
    const emotion = text.trim().slice(0, 10) || (mode ?? "감정");
    const seed = Date.now() % 999983;
    router.push(buildResultUrl([emotion], seed));
  }

  const canRelease = text.trim().length > 0 && mode !== null;

  const handleRelease = async () => {
    if (!canRelease || phase !== "write") return;
    setPhase("animating");

    if (mode === "drift") {
      await animate(scope.current, { y: [0, -6, -90], opacity: [1, 0.8, 0], filter: ["blur(0px)", "blur(2px)", "blur(8px)"] }, { duration: 1.3, ease: "easeIn" });
    } else if (mode === "dissolve") {
      await animate(scope.current, { opacity: [1, 0.5, 0], filter: ["blur(0px)", "blur(5px)", "blur(14px)"], scale: [1, 0.99, 0.96] }, { duration: 1.5, ease: "easeInOut" });
    } else if (mode === "burn") {
      await animate(scope.current, {
        filter: ["brightness(1) sepia(0)", "brightness(1.2) sepia(0.6) hue-rotate(-12deg)", "brightness(1.8) sepia(1) blur(8px)"],
        scaleY: [1, 0.97, 0.5], opacity: [1, 0.9, 0], y: [0, -8, -22],
      }, { duration: 1.4, ease: "easeIn" });
    } else if (mode === "sink") {
      await animate(scope.current, { y: [0, 8, 65], opacity: [1, 0.7, 0], filter: ["blur(0px)", "blur(2px)", "blur(9px)"], scaleX: [1, 0.99, 0.94] }, { duration: 1.4, ease: "easeIn" });
    }

    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 1700);
    setPhase("done");
  };

  const reset = () => { setPhase("write"); setText(""); setMode(null); setSaveIt(false); };

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", paddingBottom: 90 }}>

      {/* 배경 워드 */}
      {["조금 무거운", "말 못한", "오늘도"].map((w, i) => (
        <div key={i} style={{
          position: "fixed", fontFamily: "var(--font-serif)", fontSize: 22,
          color: "#38332E", opacity: 0.035, filter: "blur(10px)",
          transform: `rotate(${[-8, 5, -12][i]}deg)`,
          top: ["10%", "70%", "45%"][i], left: ["70%", "5%", "80%"][i],
          pointerEvents: "none", zIndex: 0,
        }}>{w}</div>
      ))}

      {/* 헤더 */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "48px 24px 20px",
        borderBottom: "1px solid #E0D8CC",
        position: "relative", zIndex: 10,
      }}>
        <Link href="/" style={{ fontSize: 12, color: "#A89880", fontFamily: "var(--font-serif)", letterSpacing: "0.04em" }}>
          ← 오늘무드
        </Link>
        {phase === "write" && text.length > 0 && (
          <span style={{ fontSize: 10, color: "#C0B098", fontFamily: "var(--font-en)", fontStyle: "italic" }}>
            {text.length}자
          </span>
        )}
      </div>

      <div style={{ padding: "28px 24px 0", position: "relative", zIndex: 10 }}>
        <AnimatePresence mode="wait">

          {/* ── 입력 화면 ── */}
          {phase !== "done" && (
            <motion.div key="write" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
                  <div className="tape" style={{ position: "absolute", top: -8, left: -6, width: 80, height: 10, transform: "rotate(-1.5deg)" }} />
                  <h2 style={{
                    fontSize: 22, fontFamily: "var(--font-serif)",
                    color: "#38332E", lineHeight: 1.55, letterSpacing: "0.01em",
                  }}>
                    오늘 뭘<br />갈아버릴래?
                  </h2>
                </div>
                <p style={{ fontSize: 11, color: "#A89880", fontFamily: "var(--font-en)", fontStyle: "italic", letterSpacing: "0.04em" }}>
                  쓰고 나면 조용히 갈아버릴게.
                </p>
              </motion.div>

              {/* 아날로그 종이 textarea */}
              <div style={{ position: "relative", marginBottom: 16 }} ref={scope}>
                {showParticles && mode && <SoftParticles mode={mode} />}

                {/* 테이프 */}
                <div className="tape" style={{ position: "absolute", top: -7, left: "50%", transform: "translateX(-50%) rotate(-0.5deg)", width: 56, height: 11, zIndex: 2 }} />

                <div style={{
                  background: "#FAF6EF",
                  border: "1px solid #DDD4C0",
                  borderRadius: 3,
                  boxShadow: "3px 4px 16px rgba(44,40,37,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  {/* 종이 줄 */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 30px, rgba(180,170,150,0.14) 30px, rgba(180,170,150,0.14) 31px)",
                    backgroundPosition: "0 46px",
                  }} />
                  {/* 왼쪽 여백선 (아주 연하게) */}
                  <div style={{ position: "absolute", left: 44, top: 0, bottom: 0, width: 1, background: "rgba(200,185,160,0.2)", pointerEvents: "none" }} />

                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={"오늘 뭐가 제일 힘들었어?\n\n다 쏟아내도 돼.\n어차피 곧 갈아버릴 거니까."}
                    rows={9}
                    className="w-full outline-none resize-none"
                    style={{
                      background: "transparent",
                      padding: "20px 20px 20px 54px",
                      fontSize: 16,
                      lineHeight: "31px",
                      color: "#38332E",
                      fontFamily: "var(--font-serif)",
                      position: "relative", zIndex: 1,
                      letterSpacing: "0.01em",
                    }}
                  />
                </div>
              </div>

              {/* 저장 토글 */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, paddingLeft: 2 }}>
                <button
                  onClick={() => setSaveIt(!saveIt)}
                  style={{
                    width: 34, height: 18, borderRadius: 9,
                    background: saveIt ? "#98B8A4" : "#D8CEC0",
                    border: "none", position: "relative", flexShrink: 0, transition: "background 0.25s",
                  }}
                >
                  <motion.div
                    animate={{ x: saveIt ? 16 : 2 }}
                    style={{ position: "absolute", top: 2, width: 12, height: 12, borderRadius: "50%", background: "#FAF6EF", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </button>
                <p style={{ fontSize: 11, color: "#A89880", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.6 }}>
                  {saveIt ? "기록장에 남길게." : "기록 안 해도 됨. 그냥 비워도 돼."}
                </p>
              </div>

              {/* 방법 선택 — 스티키노트 스타일 */}
              <p style={{ fontSize: 10, color: "#B4A890", marginBottom: 12, fontFamily: "var(--font-en)", fontStyle: "italic", letterSpacing: "0.08em" }}>
                어떻게 비울래
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {MODES.map((m) => {
                  const active = mode === m.id;
                  return (
                    <motion.button
                      key={m.id}
                      whileTap={{ scale: 0.95 }}
                      initial={{ rotate: m.rot }}
                      animate={{ rotate: active ? 0 : m.rot }}
                      onClick={() => setMode(m.id)}
                      className="sticky-note"
                      style={{
                        background: active ? m.bg : "#FAF6EF",
                        border: active ? "1px solid rgba(44,40,37,0.18)" : "1px solid #DDD4C0",
                        borderRadius: 2, padding: "14px 12px",
                        cursor: "pointer", textAlign: "left",
                        boxShadow: active ? "2px 3px 12px rgba(44,40,37,0.12)" : "1px 2px 6px rgba(44,40,37,0.07)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <p style={{ fontSize: 14, fontFamily: "var(--font-serif)", color: "#38332E", marginBottom: 4, letterSpacing: "0.01em" }}>
                        {m.label}
                      </p>
                      <p style={{ fontSize: 10, color: "#A89880", fontFamily: "var(--font-en)", fontStyle: "italic" }}>
                        {m.sub}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* 버리기 버튼 */}
              <motion.button
                whileTap={canRelease ? { scale: 0.98 } : {}}
                onClick={handleRelease}
                disabled={!canRelease}
                style={{
                  width: "100%", height: 54,
                  background: canRelease ? "#38332E" : "#E0D8CC",
                  border: "none", borderRadius: 3,
                  fontSize: 14, fontFamily: "var(--font-serif)",
                  color: canRelease ? "#F4EFE4" : "#B4A890",
                  cursor: canRelease ? "pointer" : "not-allowed",
                  letterSpacing: "0.05em", transition: "all 0.25s ease",
                  position: "relative", overflow: "hidden",
                }}
              >
                {canRelease && (
                  <div className="tape" style={{
                    position: "absolute", top: -1, left: "50%",
                    transform: "translateX(-50%)", width: 50, height: 8, opacity: 0.4,
                  }} />
                )}
                {phase === "animating" ? "흘려보내는 중..." : canRelease ? MODES.find(m => m.id === mode)?.label : "뭔가 쓰고 방법 고르면 돼"}
              </motion.button>

              {!canRelease && (
                <p style={{ fontSize: 10, color: "#C0B098", textAlign: "center", marginTop: 10, fontFamily: "var(--font-en)", fontStyle: "italic" }}>
                  {!text.trim() ? "마음을 먼저 꺼내봐." : "어떻게 보낼지 골라봐."}
                </p>
              )}
            </motion.div>
          )}

          {/* ── 완료 화면 ── */}
          {phase === "done" && (
            <motion.div key="done"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}
            >
              {/* 결과 종이 카드 */}
              <motion.div
                animate={{ rotate: [-0.8, 0.4, -0.8] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative", width: "100%", marginBottom: 28 }}
              >
                {/* 테이프 */}
                <div className="tape" style={{
                  position: "absolute", top: -8, left: "50%",
                  transform: "translateX(-50%) rotate(0.5deg)",
                  width: 64, height: 12, zIndex: 2,
                }} />
                <div className="sticky-note" style={{
                  background: "#FAF6EF",
                  border: "1px solid #DDD4C0",
                  borderRadius: 3,
                  boxShadow: "4px 6px 24px rgba(44,40,37,0.09)",
                  padding: "44px 28px 36px",
                  textAlign: "center",
                }}>
                  {/* 줄 배경 */}
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 3, pointerEvents: "none",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 30px, rgba(180,170,150,0.1) 30px, rgba(180,170,150,0.1) 31px)",
                    backgroundPosition: "0 44px",
                  }} />
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                    style={{ fontSize: 34, fontFamily: "var(--font-serif)", color: "#38332E", marginBottom: 16, position: "relative" }}>
                    {result.big}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                    style={{ fontSize: 13, color: "#8A8278", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.85, position: "relative" }}>
                    {result.sub}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}
                    style={{ fontSize: 10, color: "#C0B098", fontFamily: "var(--font-en)", fontStyle: "italic", marginTop: 20, letterSpacing: "0.08em", position: "relative" }}>
                    quietly let go
                  </motion.p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>

                {/* 결과 카드 만들기 — 메인 CTA */}
                <button onClick={goToResult} style={{
                  height: 52, background: "#C8607A", border: "none", borderRadius: 3,
                  fontSize: 15, fontFamily: "var(--font-serif)", color: "#F5EFE0", fontWeight: 700,
                  cursor: "pointer", boxShadow: "0 4px 16px rgba(200,96,122,0.4)",
                }}>
                  결과 카드 만들기 →
                </button>

                <button onClick={reset} style={{
                  height: 48, background: "#38332E", border: "none", borderRadius: 3,
                  fontSize: 13, fontFamily: "var(--font-serif)", color: "#F4EFE4",
                  cursor: "pointer", letterSpacing: "0.05em",
                }}>
                  하나 더 비울게
                </button>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[{ href: "/archive", label: "그래도 남길게" }, { href: "/", label: "홈으로" }].map((b) => (
                    <Link key={b.href} href={b.href} style={{
                      height: 44, background: "#FAF6EF",
                      border: "1px solid #DDD4C0", borderRadius: 3,
                      fontSize: 13, fontFamily: "var(--font-serif)", color: "#5A5248",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      letterSpacing: "0.03em",
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
