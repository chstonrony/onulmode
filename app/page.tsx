"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FeedbackToast from "@/components/trash/FeedbackToast";
import { useLocale } from "@/context/LocaleContext";
import { buildResultUrl } from "@/lib/resultCard";

const ROSE = "#C8607A";
const INK  = "#2A2520";

const EMOTION_CHIPS = [
  { k: "지쳤어",   bg: "#F0E0DC", r: -3, tc: "#B87878" },
  { k: "짜증나",   bg: "#F0D8D4", r:  2, tc: "#C06858" },
  { k: "서운해",   bg: "#D8E4EE", r: -2, tc: "#6888A8" },
  { k: "답답해",   bg: "#D8DCE8", r:  3, tc: "#607098" },
  { k: "억울해",   bg: "#E4DCED", r: -4, tc: "#8878B0" },
  { k: "불안해",   bg: "#E8D8EE", r:  1, tc: "#9068A8" },
  { k: "허무해",   bg: "#D8E8DC", r: -3, tc: "#6898A0" },
  { k: "무기력해", bg: "#E0DDD8", r:  2, tc: "#887870" },
  { k: "외로워",   bg: "#F5EBCC", r: -2, tc: "#A09848" },
  { k: "슬퍼",     bg: "#D8E0EE", r:  4, tc: "#5878A8" },
  { k: "화났어",   bg: "#F0D8D8", r: -5, tc: "#B85858" },
  { k: "귀찮아",   bg: "#E0E4D8", r:  3, tc: "#788860" },
  { k: "막막해",   bg: "#D8DDE4", r: -2, tc: "#586878" },
  { k: "질렸어",   bg: "#E8E0C8", r:  5, tc: "#907840" },
  { k: "후회돼",   bg: "#E4D8E4", r: -3, tc: "#906890" },
  { k: "모르겠어", bg: "#EDE4D4", r:  2, tc: "#8A8070" },
] as const;

export default function MainPage() {
  const router = useRouter();
  const { t } = useLocale();

  const [toast, setToast]          = useState<string | null>(null);
  const [count, setCount]          = useState(0);
  const [phase, setPhase]          = useState<null | "processing" | "done">(null);
  const [currentLabel, setLabel]   = useState("");
  const [dumpedLabels, setDumped]  = useState<string[]>([]);

  const DONE_MSGS = [t.home.done1, t.home.done2, t.home.done3, t.home.done4, t.home.done5];

  const runSequence = useCallback((label: string) => {
    setLabel(label);
    setDumped(prev => [...new Set([...prev, label])].slice(-3));
    setPhase("processing");
    setTimeout(() => setPhase("done"), 1900);
    setCount(n => n + 1);
    setTimeout(() => {
      setToast(DONE_MSGS[Math.floor(Math.random() * DONE_MSGS.length)]);
      setTimeout(() => setToast(null), 3000);
    }, 2100);
  }, []); // eslint-disable-line

  function goToResult() {
    const seed = Date.now() % 999983;
    router.push(buildResultUrl(dumpedLabels.length ? dumpedLabels : [currentLabel], seed));
  }

  function resetMachine() { setPhase(null); }

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      {/* ── 배경 영상 ── */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: "fixed", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ── 오버레이 ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(237,228,208,0.55) 0%, rgba(237,228,208,0.72) 60%, rgba(237,228,208,0.92) 100%)",
      }} />

      {/* ── 콘텐츠 ── */}
      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "38px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 22, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700 }}>오늘무드</span>
            <svg width="13" height="13" viewBox="0 0 14 14">
              <path d="M7 1L8.3 5H12.5L9.2 7.8L10.5 12L7 9.5L3.5 12L4.8 7.8L1.5 5H5.7Z" fill={ROSE} opacity="0.85" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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

        {/* 메인 카피 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px 0", textAlign: "center" }}
        >
          <p style={{ fontSize: 11, fontFamily: "monospace", color: ROSE, letterSpacing: "0.14em", marginBottom: 14 }}>
            EMOTIONAL DISPOSAL MACHINE
          </p>
          <h1 style={{ fontSize: 34, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.4, fontWeight: 700, marginBottom: 10 }}>
            {t.home.headline1}<br />
            <span style={{ borderBottom: `3.5px solid ${ROSE}`, paddingBottom: 2 }}>
              {t.home.headline2}
            </span>
          </h1>
          <p style={{ fontSize: 13, color: "#8A8070", fontFamily: "var(--font-serif)", fontWeight: 300, marginBottom: 28 }}>
            {t.home.caption}
          </p>

          {/* CTA */}
          <Link href="/release" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", maxWidth: 340, height: 56,
            background: ROSE, borderRadius: 6, padding: "0 24px",
            fontSize: 17, fontFamily: "var(--font-serif)", color: "#FDFAF5", fontWeight: 700,
            textDecoration: "none",
            boxShadow: `0 6px 24px ${ROSE}55`,
          }}>
            <span>{t.home.cta}</span>
            <span style={{ fontSize: 20 }}>→</span>
          </Link>
        </motion.div>

        {/* 감정 칩 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ padding: "28px 20px 96px" }}
        >
          <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#8A8070", textAlign: "center", marginBottom: 14 }}>
            {t.home.emotionLabel}{t.home.emotionWord && ` ${t.home.emotionWord}`}{t.home.emotionSuffix && ` ${t.home.emotionSuffix}`}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {EMOTION_CHIPS.map(em => {
              const label = t.emotions[em.k as keyof typeof t.emotions] ?? em.k;
              return (
                <motion.button
                  key={em.k}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => runSequence(label)}
                  style={{
                    background: em.bg, border: "none",
                    padding: "9px 16px 11px",
                    fontSize: 13, fontFamily: "var(--font-serif)", color: em.tc, fontWeight: 700,
                    cursor: "pointer", borderRadius: 2,
                    boxShadow: "2px 3px 12px rgba(42,37,32,0.14)",
                    transform: `rotate(${em.r}deg)`,
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute", bottom: 0, right: 0, width: 0, height: 0,
                    borderStyle: "solid", borderWidth: "0 0 10px 10px",
                    borderColor: `transparent transparent rgba(42,37,32,0.07) transparent`,
                  }} />
                  {label}
                </motion.button>
              );
            })}
          </div>

          {/* 상태 바 */}
          <p style={{
            textAlign: "center", fontSize: 10, fontFamily: "monospace",
            color: "#9A9280", marginTop: 18, letterSpacing: "0.07em",
          }}>
            {t.home.statusIdle.replace("{n}", String(count))}
          </p>
        </motion.div>
      </div>

      {/* ── 파쇄 오버레이 ── */}
      <AnimatePresence>
        {phase === "processing" && (
          <motion.div key="processing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,22,18,0.75)" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 8 }} animate={{ scale: 1, y: 0 }}
              style={{ background: "rgba(26,22,18,0.95)", border: `1.5px solid ${ROSE}`, borderRadius: 4, padding: "20px 32px", textAlign: "center", boxShadow: `0 0 32px ${ROSE}44` }}
            >
              <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }}
                style={{ fontSize: 11, fontFamily: "monospace", color: ROSE, letterSpacing: "0.14em", marginBottom: 8 }}>
                ■ PROCESSING
              </motion.p>
              <p style={{ fontSize: 15, fontFamily: "var(--font-serif)", color: "#F5EFE0" }}>
                {currentLabel}{t.home.processing}
              </p>
              <p style={{ fontSize: 10, color: "#666050", fontFamily: "monospace", marginTop: 6 }}>overthinking overloaded</p>
            </motion.div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div key="done"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,22,18,0.65)" }}
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -2 }} animate={{ scale: 1, rotate: -1 }}
              transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.35 }}
              style={{ background: "#F5EFE0", border: `2px solid ${INK}`, borderRadius: 3, padding: "18px 24px 20px", textAlign: "center", boxShadow: "5px 5px 0 rgba(42,37,32,0.85)", maxWidth: 300, width: "85%" }}
            >
              <p style={{ fontSize: 10, fontFamily: "monospace", color: ROSE, letterSpacing: "0.1em", marginBottom: 8 }}>✓ COMPLETE</p>
              <p style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, lineHeight: 1.4, marginBottom: 16, whiteSpace: "pre-line" }}>
                {t.home.completeTitle}
              </p>
              <button onClick={goToResult} style={{
                width: "100%", height: 42, background: ROSE, border: "none", borderRadius: 3,
                fontSize: 13, fontFamily: "var(--font-serif)", color: "#F5EFE0", fontWeight: 700,
                cursor: "pointer", marginBottom: 8, boxShadow: `0 3px 12px ${ROSE}55`,
              }}>
                결과 카드 만들기 →
              </button>
              <button onClick={resetMachine} style={{
                width: "100%", height: 34, background: "transparent", border: `1px solid ${INK}25`,
                borderRadius: 3, fontSize: 12, fontFamily: "var(--font-serif)", color: "#8A8270", cursor: "pointer",
              }}>
                다시 파쇄하기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FeedbackToast message={toast} />
    </div>
  );
}
