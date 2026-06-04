"use client";

import { useRef, useMemo, Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { generateResult, parseResultUrl, buildResultUrl } from "@/lib/resultCard";
import { saveShredRecord, updateUserNote } from "@/lib/shredRecords";
import { findSeedByEmotions, getCompostStage } from "@/lib/emotionSeeds";
import ResultCard from "@/components/share/ResultCard";
import ShareCard from "@/components/share/ShareCard";
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
    const MAX_MSGS = 5; // 5개만 보여주고 끝
    const msgTimer = setInterval(() => {
      setMsgIdx(i => {
        if (i >= MAX_MSGS - 1) {
          clearInterval(msgTimer);
          setTimeout(onDone, 300);
          return i;
        }
        return i + 1;
      });
    }, 420);

    const progTimer = setInterval(() => {
      setProgress(p => p >= 97 ? 97 : p + 4);
    }, 50);

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
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null);
  const [userNote, setUserNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const handleDone = useCallback(() => setPhase("result"), []);

  const parsed = parseResultUrl(params.toString() ? `?${params.toString()}` : "");
  const emotions = parsed?.emotions ?? ["감정"];
  const data = useMemo(
    () => generateResult(emotions, parsed?.seed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsed?.seed]
  );
  const shareUrl = buildResultUrl(emotions, data.seed);
  const seed = useMemo(() => findSeedByEmotions(emotions), [emotions]);
  const stage = getCompostStage(seed.growthPct);

  useEffect(() => {
    if (phase === "result") {
      const rec = saveShredRecord({
        emotions,
        productName: data.productName,
        productEmoji: data.productEmoji,
        killerLine: data.killerLine,
        errorCode: data.errorCode,
        warningMessage: data.warningMessage ?? "",
        ugogitranslation: seed.ugogitranslation,
        compostNoun: seed.compostNoun,
        compostEmoji: seed.compostEmoji,
        compostName: seed.compostName,
        compostDesc: seed.compostDesc,
        seedQuestion: seed.seedQuestion,
        growthPct: seed.growthPct,
      });
      setSavedRecordId(rec.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

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

      {/* ─── 2. 투입된 감정 확인 — 히어로 ─── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ padding: "24px 22px 20px", background: INK, borderBottom: `3px solid ${ROSE}` }}
      >
        <p style={{ fontSize: 8, fontFamily: "monospace", color: "#5A5248", letterSpacing: "0.14em", marginBottom: 12 }}>
          ▼ 투입된 감정 — 처리 완료
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {emotions.slice(0, 4).map((e, i) => (
            <motion.span
              key={e}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              style={{
                fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700,
                color: "#FAF8F2", background: `${ROSE}22`,
                padding: "6px 14px", border: `1.5px solid ${ROSE}60`,
                borderRadius: 2, letterSpacing: "0.02em",
              }}
            >
              {e}
            </motion.span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ height: 1, flex: 1, background: "#2A2520" }} />
          <p style={{ fontSize: 9, fontFamily: "monospace", color: ROSE, letterSpacing: "0.1em" }}>
            ↓ 우걱이 처리 결과물
          </p>
          <div style={{ height: 1, flex: 1, background: "#2A2520" }} />
        </div>
      </motion.div>

      {/* ─── 2-B. 상태 경고 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
        style={{ padding: "10px 22px 10px", borderBottom: `1px solid ${LINE}`, background: "#FAF5EC" }}
      >
        <p style={{ fontSize: 10, fontFamily: "monospace", color: "#8A8070", letterSpacing: "0.06em", lineHeight: 1.6 }}>
          ⚠ {data.adminWarning}
        </p>
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#B4A890", letterSpacing: "0.04em", marginTop: 2 }}>
          감정 위험 코드 {data.errorCode} — 즉시 처리됨
        </p>
      </motion.div>

      {/* ─── 3. 결과 이름 — 제품 ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{ padding: "36px 24px 32px", textAlign: "center", borderBottom: `1px solid ${LINE}` }}
      >
        <p style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, letterSpacing: "0.18em", marginBottom: 18 }}>
          {emotions[0] ? `${emotions[0]} 외 ${emotions.length - 1}종 → 처리 결과물` : "처리 결과물"}
        </p>

        {/* 이모지 */}
        <motion.p
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: 52, marginBottom: 16, display: "block" }}
        >
          {data.productEmoji}
        </motion.p>

        {/* 결과 이름 */}
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
      </motion.div>

      {/* ─── 4. 공유용 ShareCard (캡처 대상) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{ padding: "28px 14px 0" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ShareCard ref={cardRef} data={data} emotions={emotions} />
        </div>
      </motion.div>

      {/* ─── 4-B. 결과 카드 상세 (스타일 카드) ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ padding: "16px 14px 0" }}
      >
        <p style={{ fontSize: 8, fontFamily: "monospace", color: MUTED, letterSpacing: "0.14em", textAlign: "center", marginBottom: 10 }}>
          상세 결과지
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ResultCard data={data} emotions={emotions} />
        </div>
      </motion.div>

      {/* ─── 5-A. 체크박스 감정 보고서 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        style={{ padding: "0 22px 0", marginBottom: 0 }}
      >
        <div style={{
          background: "#FAF5EC", border: `1px solid ${LINE}`,
          padding: "14px 16px",
        }}>
          <p style={{ fontSize: 8, fontFamily: "monospace", color: MUTED, letterSpacing: "0.14em", marginBottom: 10 }}>
            감정 상태 점검 결과 — 자동 감지됨
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.checkboxItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 13, height: 13, border: `1.5px solid ${INK}`,
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 9, color: ROSE, fontWeight: 900, lineHeight: 1 }}>✓</span>
                </div>
                <p style={{ fontSize: 11, fontFamily: "monospace", color: INK, letterSpacing: "0.02em" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 8, fontFamily: "monospace", color: "#C4BAB0", marginTop: 10, letterSpacing: "0.08em" }}>
            ※ 우걱이는 전문 훈련을 받은 괴생명체입니다
          </p>
        </div>
      </motion.div>

      {/* ─── 5-B. 최종 분석 한 줄 — 킬포 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        style={{
          padding: "32px 28px 32px",
          borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`,
          textAlign: "center", marginTop: 16,
        }}
      >
        <p style={{ fontSize: 8, fontFamily: "monospace", color: "#C4BAB0", letterSpacing: "0.14em", marginBottom: 18 }}>
          우걱이 처리소 / 최종 판정 결과
        </p>
        <p style={{
          fontSize: 21, fontWeight: 700,
          fontFamily: "var(--font-serif)",
          color: INK, lineHeight: 1.5,
        }}>
          {data.killerLine}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 18 }}>
          <div style={{ height: 1, width: 32, background: LINE }} />
          <p style={{ fontSize: 8, fontFamily: "monospace", color: "#C4BAB0", letterSpacing: "0.1em" }}>
            UGEGI DISPOSAL CO.
          </p>
          <div style={{ height: 1, width: 32, background: LINE }} />
        </div>
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
          productEmoji={data.productEmoji}
          killerLine={data.killerLine}
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
          &ldquo;{emotions[0] ? `내 ${emotions[0]}` : "내 감정"} 넣었더니 {data.productName} 나옴ㅋㅋ 너는?&rdquo;
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

      {/* ─── 8. 오늘의 한 줄 위로 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{ padding: "24px 22px 0" }}
      >
        <div style={{
          background: PAPER, border: `1px solid ${LINE}`,
          padding: "20px 22px", borderLeft: `3px solid ${ROSE}`,
        }}>
          <p style={{ fontSize: 8, fontFamily: "monospace", color: ROSE, letterSpacing: "0.14em", marginBottom: 10 }}>
            오늘의 한 줄 위로
          </p>
          <p style={{ fontSize: 14, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.75 }}>
            {data.prescription}
          </p>
        </div>
      </motion.div>

      {/* ─── 9. 자기돌봄 질문 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{ padding: "12px 22px 0" }}
      >
        <div style={{
          background: "#FAF5EC", border: `1px dashed ${LINE}`,
          padding: "18px 20px",
        }}>
          <p style={{ fontSize: 8, fontFamily: "monospace", color: MUTED, letterSpacing: "0.14em", marginBottom: 10 }}>
            오늘의 자기돌봄 질문
          </p>
          <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.8 }}>
            {data.diagnosisLabel === "생존 가능성" || data.diagnosisLabel === "버티기 내구도"
              ? "오늘 나를 위해 한 가지만 해준다면 무엇을 하고 싶나요?"
              : data.diagnosisLabel === "감정 유통기한" || data.diagnosisLabel === "현실 체감온도"
              ? "오늘 가장 무거웠던 감정, 그 감정의 이름은 무엇인가요?"
              : "지금 이 순간, 내가 정말 필요한 것은 무엇일까요?"}
          </p>
        </div>
      </motion.div>

      {/* ─── 10. 감정 기록하기 버튼 ─── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        style={{ padding: "20px 22px 0" }}
      >
        <Link href="/today" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          height: 48, background: PAPER, border: `1.5px solid ${LINE}`,
          fontSize: 13, fontFamily: "var(--font-serif)", color: INK,
          textDecoration: "none", letterSpacing: "0.02em",
        }}>
          오늘 감정 기록하기 →
        </Link>
      </motion.div>

      {/* ─── 11. 감정퇴비실 보고서 ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        style={{ padding: "24px 20px 0" }}
      >
        {/* 구분선 헤더 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ height: 1, flex: 1, background: "#C4D8BC" }} />
          <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.14em", flexShrink: 0 }}>
            🌱 감정퇴비실 — 발효 보고서
          </p>
          <div style={{ height: 1, flex: 1, background: "#C4D8BC" }} />
        </div>

        <div style={{ background: "#F5F9F2", border: "1.5px solid #C4D8BC", borderRadius: 6, overflow: "hidden" }}>
          {/* 타이틀 바 */}
          <div style={{ background: "#2A3A2A", padding: "8px 14px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "#8ABE7A", letterSpacing: "0.12em" }}>UGOGI COMPOST STATION</span>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "#5A7A5A" }}>{data.errorCode}</span>
          </div>

          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 0 }}>

            {/* STEP 1 — 감정 */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 12, marginBottom: 12, borderBottom: "1px dashed #C4D8BC" }}>
              <div style={{ width: 20, height: 20, background: "#C4D8BC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#2A3A2A", fontWeight: 700 }}>1</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 9, color: "#7A8A7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 4 }}>감정</p>
                <p style={{ fontSize: 14, fontFamily: "var(--font-serif)", color: "#2A3A2A", fontWeight: 700 }}>
                  {emotions[0] || "감정"} {emotions.length > 1 ? `외 ${emotions.length - 1}종` : ""}
                </p>
              </div>
            </div>

            {/* STEP 2 — 파쇄 결과 */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 12, marginBottom: 12, borderBottom: "1px dashed #C4D8BC" }}>
              <div style={{ width: 20, height: 20, background: "#C4D8BC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#2A3A2A", fontWeight: 700 }}>2</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 9, color: "#7A8A7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 4 }}>파쇄 결과</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{data.productEmoji}</span>
                  <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#2A3A2A", fontWeight: 700 }}>{data.productName}</p>
                </div>
              </div>
            </div>

            {/* STEP 3 — 퇴비화 결과 (핵심 발견 순간) */}
            <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px dashed #C4D8BC" }}>
              {/* 감정 → 퇴비 변환 시각화 */}
              <div style={{ background: "#0E1A0E", borderRadius: 6, padding: "14px 16px" }}>
                <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 12 }}>
                  🌱 퇴비화 결과 — 감정의 뿌리
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* 원래 감정 */}
                  <div style={{ background: "rgba(200,96,122,0.15)", border: "1px solid rgba(200,96,122,0.3)", borderRadius: 4, padding: "6px 12px" }}>
                    <p style={{ fontSize: 13, fontFamily: "var(--font-maru)", color: "#F0A0B0", fontWeight: 600, letterSpacing: "-0.01em" }}>
                      {emotions[0] || "감정"}
                    </p>
                  </div>
                  <span style={{ color: "#3A5A3A", fontSize: 14 }}>→</span>
                  {/* 퇴비화 결과 */}
                  <div style={{ background: "#EFF6EC", border: "1.5px solid #6A9B7A", borderRadius: 4, padding: "8px 14px", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 18 }}>{seed.compostEmoji}</span>
                      <span style={{ fontSize: 17, fontFamily: "var(--font-maru)", fontWeight: 700, color: "#2A3A2A", letterSpacing: "-0.02em" }}>
                        {seed.compostNoun}
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: "#5A7A5A", fontFamily: "var(--font-serif)", lineHeight: 1.7, marginTop: 10, fontStyle: "italic" }}>
                  {seed.ugogitranslation}
                </p>
              </div>
            </div>

            {/* STEP 4 — 감정씨앗 */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 12, marginBottom: 12, borderBottom: "1px dashed #C4D8BC" }}>
              <div style={{ width: 20, height: 20, background: "#A8CCA0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 10 }}>🌿</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 6 }}>오늘의 감정씨앗</p>
                <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#2A3A2A", lineHeight: 1.8, fontWeight: 500 }}>
                  {seed.seedQuestion}
                </p>
              </div>
            </div>

            {/* STEP 5 — 한줄기록 */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, background: "#C4D8BC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#2A3A2A", fontWeight: 700 }}>6</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 9, color: "#7A8A7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>
                  한 줄 기록 <span style={{ color: "#A4B8A0", fontWeight: 300 }}>(선택)</span>
                </p>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="text"
                    value={userNote}
                    onChange={e => { setUserNote(e.target.value); setNoteSaved(false); }}
                    placeholder="오늘 이 감정에 대해 한 마디 남기기…"
                    maxLength={100}
                    style={{
                      flex: 1, height: 38, padding: "0 12px",
                      background: "#FAFFF8", border: "1px solid #C4D8BC", borderRadius: 4,
                      fontSize: 12, color: "#2A3A2A", outline: "none",
                      fontFamily: "var(--font-serif)",
                    }}
                  />
                  <button
                    onClick={() => {
                      if (savedRecordId && userNote.trim()) {
                        updateUserNote(savedRecordId, userNote.trim());
                        setNoteSaved(true);
                      }
                    }}
                    disabled={!userNote.trim() || noteSaved}
                    style={{
                      height: 38, padding: "0 12px", flexShrink: 0,
                      background: noteSaved ? "#EFF6EC" : "#2A3A2A",
                      border: noteSaved ? "1px solid #C4D8BC" : "none",
                      borderRadius: 4, cursor: noteSaved ? "default" : "pointer",
                      fontSize: 11, fontFamily: "monospace", color: noteSaved ? "#6A9B7A" : "#E8F4E4",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {noteSaved ? "✓ 저장됨" : "저장"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오늘 남은 퇴비 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          style={{ marginTop: 12 }}
        >
          <div style={{ background: "#1A2A1A", border: "1.5px solid #2A4A2A", borderRadius: 6, overflow: "hidden" }}>
            {/* 타이틀 바 */}
            <div style={{ background: "#0E1A0E", padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 8, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.12em" }}>
                🌱 오늘 남은 퇴비
              </span>
              <span style={{ fontSize: 8, color: "#4A6A4A", fontFamily: "monospace" }}>
                발효 {data.fermentationDay}일째
              </span>
            </div>

            <div style={{ padding: "16px 16px" }}>
              {/* 퇴비 이름 */}
              <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: "#A8CCA0", letterSpacing: "-0.02em", lineHeight: 1.4, marginBottom: 14 }}>
                &ldquo;{data.compostResidue}&rdquo;
              </p>

              {/* 감정비료 */}
              <div style={{ borderLeft: "2px solid #3A5A3A", paddingLeft: 12, marginBottom: 14 }}>
                <p style={{ fontSize: 9, color: "#4A6A4A", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 5 }}>오늘의 감정비료</p>
                <p style={{ fontSize: 12, color: "#7A9A7A", fontFamily: "var(--font-serif)", lineHeight: 1.75, fontStyle: "italic" }}>
                  {data.compostFertilizer}
                </p>
              </div>

              {/* 우걱이 메모 */}
              <div style={{ borderTop: "1px dashed #2A4A2A", paddingTop: 12 }}>
                <p style={{ fontSize: 9, color: "#4A6A4A", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 8 }}>우걱이 메모</p>
                <p style={{ fontSize: 13, color: "#C8DCC0", fontFamily: "var(--font-serif)", lineHeight: 1.9 }}>
                  {data.ugComment.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 감정퇴비실 저장 + 공유 */}
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {/* 저장 버튼 */}
          <Link href="/archive" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            height: 50, background: "#2A3A2A", border: "1.5px solid #2A4A2A",
            borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600,
            color: "#E8F4E4", textDecoration: "none", letterSpacing: "-0.01em",
          }}>
            🌱 감정퇴비실에 저장하기
          </Link>
          {/* 안내 */}
          <p style={{ fontSize: 10, color: "#7A9A7A", fontFamily: "monospace", textAlign: "center", letterSpacing: "0.04em" }}>
            버린 감정도, 지나고 보면 내 하루의 기록이 됩니다.
          </p>
        </div>
      </motion.div>

      {/* ─── 애드센스 안전 문구 ─── */}
      <div style={{ padding: "20px 22px 0" }}>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.7, textAlign: "center", padding: "10px 12px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4 }}>
          오늘무드는 감정을 쉽게 이해하고 기록하기 위한 콘텐츠 서비스입니다. 의학적 진단이나 상담을 대신하지 않습니다.
        </p>
      </div>

      {/* ─── 시스템 서명 ─── */}
      <div style={{ padding: "20px 24px 0", textAlign: "center" }}>
        <p style={{ fontSize: 8, fontFamily: "monospace", color: LINE, letterSpacing: "0.08em" }}>
          UGEGI DISPOSAL CO. · {data.errorCode} · onulmood.com
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
