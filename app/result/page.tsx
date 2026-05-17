"use client";

import { useRef, useMemo, Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { generateResult, parseResultUrl, buildResultUrl } from "@/lib/resultCard";
import ResultCard from "@/components/share/ResultCard";
import ShareButtons from "@/components/share/ShareButtons";
import Link from "next/link";

const ROSE = "#C8607A";
const INK  = "#2A2520";
const MUTED = "#A89880";
const LINE = "#D8CEC0";
const BG = "#efe3cf";
const PAPER = "#F5EFE0";

/* ── 처리 메시지 풀 ── */
const PROCESSING_MSGS = [
  "감정 파쇄 시스템 가동 중",
  "우걱이가 감정 데이터를 씹는 중",
  "멘탈 잔여물 분석 중",
  "예상치 못한 감정 구조 감지됨",
  "감정 점도 측정 중",
  "눈물 농도 확인 중",
  "묵은 감정 레이어 분리 중",
  "시스템이 잠시 멈칩니다",
  "우걱이가 처리하다 잠깐 조용해짐",
  "사회생활 흔적 스캔 중",
  "버티기 내구도 측정 중",
  "말 못 한 것들 추출 중",
  "빠각 처리 완료 — 결과 생성 중",
] as const;

/* ── 처리 화면 ── */
function ProcessingScreen({ onDone }: { onDone: () => void }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx(i => {
        if (i >= PROCESSING_MSGS.length - 1) {
          clearInterval(msgTimer);
          setTimeout(onDone, 500);
          return i;
        }
        return i + 1;
      });
    }, 660);

    const progTimer = setInterval(() => {
      setProgress(p => p >= 97 ? 97 : p + 1.6);
    }, 55);

    return () => { clearInterval(msgTimer); clearInterval(progTimer); };
  }, [onDone]);

  return (
    <div style={{
      minHeight: "100vh", background: BG,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      {/* Scanline */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px)", pointerEvents: "none" }}/>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ width: "100%", maxWidth: 360 }}
      >
        {/* 미니멀 시스템 박스 */}
        <div style={{ background: PAPER, border: `1.5px solid ${LINE}`, padding: "28px 24px 24px", position: "relative" }}>
          {/* 라벨 */}
          <p style={{ fontSize: 8, fontFamily: "monospace", color: MUTED, letterSpacing: "0.18em", marginBottom: 28 }}>
            UGEGI EMOTIONAL PROCESSING UNIT
          </p>

          {/* 현재 작업 */}
          <div style={{ marginBottom: 24, minHeight: 40 }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.6 }}
              >
                {PROCESSING_MSGS[msgIdx]}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: ROSE }}
                >
                  ...
                </motion.span>
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 진행 바 */}
          <div>
            <div style={{ height: 2, background: LINE, marginBottom: 10 }}>
              <motion.div
                style={{ height: "100%", background: ROSE }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "linear" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: 9, fontFamily: "monospace", color: MUTED }}>
                우걱이가 처리 중 — 잠시만요
              </p>
              <p style={{ fontSize: 9, fontFamily: "monospace", color: ROSE }}>
                {Math.floor(progress)}%
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── 결과 콘텐츠 ── */
function ResultContent() {
  const params = useSearchParams();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"processing" | "result">("processing");
  const handleDone = useCallback(() => setPhase("result"), []);

  const parsed = parseResultUrl(params.toString() ? `?${params.toString()}` : "");
  const emotions = parsed?.emotions ?? ["감정"];
  const data = useMemo(
    () => generateResult(emotions, parsed?.seed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsed?.seed]
  );
  const shareUrl = buildResultUrl(emotions, data.seed);

  function handleRetry() { router.push("/release"); }

  function handleTwitter() {
    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${shareUrl}` : shareUrl;
    const text = `우걱이가 내 감정을 "${data.productName}"으로 만들어버림ㅋㅋ\n${data.killerLine}\n#오늘무드 #감정파쇄기`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`, "_blank", "width=600,height=400");
  }

  if (phase === "processing") return <ProcessingScreen onDone={handleDone} />;

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingBottom: 80, position: "relative" }}>

      {/* Scanline 오버레이 */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)", pointerEvents: "none", zIndex: 50 }}/>

      {/* ─── 1. 상단 헤더 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ padding: "20px 22px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${LINE}` }}
      >
        <Link href="/" style={{ fontSize: 12, color: MUTED, fontFamily: "var(--font-serif)", textDecoration: "none" }}>
          ← 우걱이 처리소
        </Link>
        <motion.p
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: 9, color: ROSE, fontFamily: "monospace", letterSpacing: "0.12em" }}
        >
          {data.errorCode}
        </motion.p>
      </motion.div>

      {/* ─── 2. 상태 경고 — 담백하게 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
        style={{ padding: "12px 22px 14px", borderBottom: `1px solid ${LINE}` }}
      >
        <p style={{ fontSize: 10, fontFamily: "monospace", color: "#8A8070", letterSpacing: "0.06em", lineHeight: 1.6 }}>
          ⚠ {data.resultTitle}
        </p>
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#B4A890", letterSpacing: "0.04em", marginTop: 2 }}>
          {data.warningMessage}
        </p>
      </motion.div>

      {/* ─── 3. 결과 이름 — 히어로 ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ padding: "44px 24px 36px", textAlign: "center", borderBottom: `1px solid ${LINE}` }}
      >
        <p style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, letterSpacing: "0.18em", marginBottom: 18 }}>
          오늘의 결과물
        </p>

        {/* 이모지 */}
        <motion.p
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: 48, marginBottom: 16, display: "block" }}
        >
          {data.productEmoji}
        </motion.p>

        {/* 결과 이름 — 가장 크게 */}
        <h1 style={{
          fontSize: 26, fontWeight: 700,
          fontFamily: "var(--font-serif)",
          color: INK, lineHeight: 1.3,
          marginBottom: 10,
        }}>
          {data.productName}
        </h1>

        {/* 설명 */}
        <p style={{
          fontSize: 12, color: MUTED,
          fontFamily: "var(--font-serif)",
          fontStyle: "italic", lineHeight: 1.7,
          maxWidth: 260, margin: "0 auto",
        }}>
          {data.productDescription}
        </p>

        {/* 희귀 배지 */}
        {data.isRare && (
          <div style={{ marginTop: 14 }}>
            <span style={{ fontSize: 9, color: "#B89030", border: "1px solid #B89030", padding: "3px 10px", fontFamily: "monospace", letterSpacing: "0.1em" }}>
              SSR · 우걱이도 처음 봄
            </span>
          </div>
        )}

        {/* 감정 태그 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 18, flexWrap: "wrap" }}>
          {emotions.slice(0, 3).map(e => (
            <span key={e} style={{
              fontSize: 11, color: ROSE, background: `${ROSE}12`,
              padding: "2px 10px", border: `1px solid ${ROSE}30`,
              fontFamily: "var(--font-serif)",
            }}>
              {e}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── 4. 감정 결과 카드 ─── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{ padding: "32px 14px" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ResultCard ref={cardRef} data={data} emotions={emotions} />
        </div>
      </motion.div>

      {/* ─── 5. 최종 분석 한 줄 — 킬포 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          padding: "28px 28px 32px",
          borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 9, fontFamily: "monospace", color: LINE, letterSpacing: "0.14em", marginBottom: 16 }}>
          우걱이 최종 판정
        </p>
        <p style={{
          fontSize: 20, fontWeight: 700,
          fontFamily: "var(--font-serif)",
          color: INK, lineHeight: 1.45,
        }}>
          {data.killerLine}
        </p>
        <p style={{ fontSize: 9, fontFamily: "monospace", color: LINE, letterSpacing: "0.1em", marginTop: 16 }}>
          — UGEGI DISPOSAL CO. —
        </p>
      </motion.div>

      {/* ─── 6. 공유 버튼 영역 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ padding: "28px 20px 0", display: "flex", justifyContent: "center" }}
      >
        <ShareButtons
          cardRef={cardRef}
          shareUrl={shareUrl}
          emotions={emotions}
          productName={data.productName}
          onRetry={handleRetry}
        />
      </motion.div>

      {/* ─── 7. 공유 카피 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{ padding: "20px 24px 0", textAlign: "center" }}
      >
        <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, marginBottom: 6 }}>
          나만 당할 수 없음
        </p>
        <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: MUTED, lineHeight: 1.7 }}>
          &ldquo;나 오늘 {data.productName} 나옴ㅋㅋ 너는?&rdquo;
        </p>

        {/* X 공유 + 감정 더 버리기 */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          <button onClick={handleTwitter} style={{
            display: "flex", alignItems: "center", gap: 5,
            height: 38, padding: "0 16px",
            background: INK, border: "none",
            fontSize: 11, fontFamily: "monospace",
            color: "#F5EFE0", cursor: "pointer", letterSpacing: "0.06em",
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
            X에 올리기
          </button>
          <Link href="/release" style={{
            display: "flex", alignItems: "center",
            height: 38, padding: "0 16px",
            background: "transparent", border: `1px solid ${LINE}`,
            fontSize: 11, fontFamily: "monospace",
            color: MUTED, textDecoration: "none", letterSpacing: "0.06em",
          }}>
            감정 더 버리기
          </Link>
        </div>
      </motion.div>

      {/* ─── 시스템 서명 ─── */}
      <div style={{ padding: "28px 24px 0", textAlign: "center" }}>
        <p style={{ fontSize: 8, fontFamily: "monospace", color: LINE, letterSpacing: "0.08em" }}>
          UGEGI DISPOSAL CO. · {data.errorCode} · onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 0.9, delay: i * 0.2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: ROSE }}
            />
          ))}
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
