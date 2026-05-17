"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { generateResult, parseResultUrl, buildResultUrl } from "@/lib/resultCard";
import ResultCard from "@/components/share/ResultCard";
import ShareButtons from "@/components/share/ShareButtons";
import Link from "next/link";

const ROSE = "#C8607A";
const INK  = "#2A2520";
const GRAY = "#C0C0C0";
const WIN_BG = "#D4D0C8";
const WIN_BLUE = "#000080";

/* ── 처리 메시지 풀 ── */
const PROCESSING_MSGS = [
  "감정 파쇄 시스템 초기화 중...",
  "우걱이가 감정 데이터를 씹는 중...",
  "멘탈 잔여물 분석 중...",
  "울컥 데이터 발견됨...",
  "예상치 못한 감정 구조 감지...",
  "감정 점도 측정 중...",
  "눈물 농도 확인 중...",
  "묵은 감정 레이어 분리 중...",
  "시스템이 잠시 멈칫합니다...",
  "우걱이가 처리하다 잠깐 조용해짐...",
  "사회생활 흔적 스캔 중...",
  "버티기 내구도 측정 중...",
  "말 못 한 것들 추출 중...",
  "AI도 처음 보는 감정 구조...",
  "감정 곰팡이 제거 중...",
  "우걱이 소화 시스템 과부하...",
  "빠각 처리 완료. 결과 생성 중...",
] as const;

/* ── Windows XP 스타일 타이틀 바 ── */
function WinTitleBar({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <div style={{
      background: `linear-gradient(90deg, ${WIN_BLUE} 0%, #1084D0 40%, #000880 100%)`,
      padding: "3px 6px", display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 14, height: 14, background: ROSE, border: "1px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 9, color: "white", fontWeight: 900, fontFamily: "monospace" }}>!</span>
        </div>
        <span style={{ color: "white", fontSize: 11, fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{title}</span>
      </div>
      <div style={{ display: "flex", gap: 2 }}>
        {["_", "□", "×"].map(b => (
          <div key={b} style={{ width: 16, height: 14, background: GRAY, border: "1px solid #808080", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontFamily: "monospace", cursor: "pointer" }}>{b}</div>
        ))}
      </div>
    </div>
  );
}

/* ── 처리 화면 ── */
function ProcessingScreen({ onDone }: { onDone: () => void }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx(i => {
        if (i >= PROCESSING_MSGS.length - 2) {
          clearInterval(msgTimer);
          setTimeout(() => {
            setDone(true);
            setTimeout(onDone, 600);
          }, 700);
          return PROCESSING_MSGS.length - 1;
        }
        return i + 1;
      });
    }, 680);

    const progTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 96) { clearInterval(progTimer); return 96; }
        return p + 1.8;
      });
    }, 55);

    return () => { clearInterval(msgTimer); clearInterval(progTimer); };
  }, [onDone]);

  return (
    <div style={{ minHeight: "100vh", background: "#1A1410", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      {/* CRT 스캔라인 */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)", pointerEvents: "none", zIndex: 10 }}/>

      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 380, border: "2px solid #4A4038", boxShadow: "0 0 60px rgba(200,96,122,0.2)", zIndex: 20, position: "relative" }}
      >
        <WinTitleBar title="UGEGI SYSTEM — 감정 처리 진행 중" />

        <div style={{ background: "#1A1410", padding: "20px 20px 24px" }}>
          {/* 경고 아이콘 + 상태 */}
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ flexShrink: 0, width: 44, height: 44, background: "#CC0000", border: "2px solid #FF4444", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <span style={{ fontSize: 22, color: "white", fontWeight: 900, fontFamily: "monospace" }}>!</span>
            </motion.div>
            <div>
              <p style={{ fontSize: 10, color: "#5A5248", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 4 }}>
                UGEGI EMOTIONAL PROCESSING UNIT v0.0.3
              </p>
              <p style={{ fontSize: 12, color: ROSE, fontFamily: "monospace", fontWeight: 700 }}>
                감정 데이터 처리 중
              </p>
            </div>
          </div>

          {/* 메시지 */}
          <div style={{ background: "#0A0A0A", border: "1px solid #3A3028", padding: "12px 14px", marginBottom: 14, minHeight: 60, display: "flex", alignItems: "center" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: 12, color: "#00FF41", fontFamily: "monospace", lineHeight: 1.6 }}
              >
                {done ? "▶ 처리 완료. 결과 생성됨." : `▶ ${PROCESSING_MSGS[msgIdx]}`}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 진행 바 */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 9, color: "#6A6258", fontFamily: "monospace" }}>감정 처리 진행률</span>
              <span style={{ fontSize: 9, color: done ? "#00FF41" : ROSE, fontFamily: "monospace", fontWeight: 700 }}>
                {done ? "완료" : `${Math.floor(progress)}%`}
              </span>
            </div>
            <div style={{ height: 12, background: "#0A0A0A", border: "1px solid #3A3028" }}>
              <motion.div
                style={{ height: "100%", background: `linear-gradient(90deg, #440020, ${ROSE})` }}
                animate={{ width: `${done ? 100 : progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* 하단 세부 */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: ROSE }}
                />
              ))}
            </div>
            <p style={{ fontSize: 8, color: "#4A4038", fontFamily: "monospace" }}>우걱이가 처리 중... 잠시만요</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ResultContent() {
  const params = useSearchParams();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"processing" | "result">("processing");

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
    const emotionStr = emotions.slice(0, 2).join("+");
    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${shareUrl}` : shareUrl;
    const text = `우걱이가 내 감정을 "${data.productName}"으로 만들어버림ㅋㅋ\n${data.killerLine}\n#오늘무드 #감정파쇄기`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`, "_blank", "width=600,height=400");
  }

  if (phase === "processing") {
    return <ProcessingScreen onDone={() => setPhase("result")} />;
  }

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", padding: "0 0 100px", position: "relative" }}>
      {/* CRT 스캔라인 */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)", pointerEvents: "none", zIndex: 100 }}/>

      {/* ── 시스템 헤더 ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: INK, padding: "0 0 0" }}
      >
        <WinTitleBar title="UGEGI DISPOSAL — 감정 폐기 처리 확인서" />
        <div style={{ padding: "8px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, color: "#5A5248", fontFamily: "monospace", textDecoration: "none", letterSpacing: "0.06em" }}>
            ← 우걱이 처리소
          </Link>
          <motion.p
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 9, color: ROSE, fontFamily: "monospace", letterSpacing: "0.12em" }}
          >
            ERROR: {data.errorCode}
          </motion.p>
        </div>
      </motion.div>

      {/* ── 오류 상태 배너 ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ background: "#CC0000", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}
      >
        <span style={{ fontSize: 16, color: "white", fontWeight: 900 }}>⚠</span>
        <div>
          <p style={{ fontSize: 11, color: "white", fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em" }}>
            {data.resultTitle}
          </p>
          <p style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>
            {data.warningMessage}
          </p>
        </div>
      </motion.div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* ── 오늘의 결과물 ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
          style={{ background: INK, border: "2.5px solid #4A4038", marginBottom: 12, position: "relative" }}
        >
          <div style={{ background: "#2A2018", padding: "4px 10px", borderBottom: "1px solid #4A4038" }}>
            <p style={{ fontSize: 8, color: "#5A5248", fontFamily: "monospace", letterSpacing: "0.12em" }}>
              UGEGI OUTPUT — 감정 파쇄 결과물
            </p>
          </div>
          <div style={{ padding: "14px 16px" }}>
            <p style={{ fontSize: 24, fontWeight: 900, color: "#FAF8F0", lineHeight: 1.2, marginBottom: 6 }}>
              {data.productEmoji} {data.productName}
            </p>
            <p style={{ fontSize: 11, color: "#7A7060", fontFamily: "monospace", fontStyle: "italic" }}>
              {data.productDescription}
            </p>
          </div>
          {data.isRare && (
            <div style={{ position: "absolute", top: 8, right: 8, background: "#B89030", padding: "2px 8px", fontSize: 8, color: "white", fontFamily: "monospace" }}>
              ★ SSR
            </div>
          )}
        </motion.div>

        {/* ── 감정 진단 데이터 ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          style={{ background: "#F5EFE0", border: "2px solid #C8B898", marginBottom: 12 }}
        >
          <div style={{ background: "#D8CEC0", padding: "4px 10px", borderBottom: "1px solid #C8B898" }}>
            <p style={{ fontSize: 8, color: "#6A6258", fontFamily: "monospace", letterSpacing: "0.1em" }}>
              감정 분석 데이터
            </p>
          </div>
          <div style={{ padding: "10px 12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 8px" }}>
            {/* 시스템 진단 */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, borderBottom: "1px dashed #D8CEC0", paddingBottom: 3, gridColumn: "1/-1" }}>
              <span style={{ color: "#8A8070", fontFamily: "monospace" }}>{data.diagnosisLabel}</span>
              <span style={{ fontWeight: 700, color: INK, fontFamily: "monospace" }}>{data.diagnosisValue}</span>
            </div>
            {data.bizarreStats.slice(0, 4).map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 10, borderBottom: "1px dashed #D8CEC0", paddingBottom: 3 }}>
                <span style={{ color: "#8A8070", fontFamily: "monospace", fontSize: 9 }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: s.value.includes("%") && parseInt(s.value) > 70 ? ROSE : INK, fontFamily: "monospace", fontSize: 9 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 결과 카드 ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}
        >
          <ResultCard ref={cardRef} data={data} emotions={emotions} />
        </motion.div>

        {/* ── 킬포 문장 ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{
            background: INK, border: "2.5px solid #4A4038",
            padding: "14px 16px", marginBottom: 14, textAlign: "center",
            position: "relative",
          }}
        >
          <p style={{ fontSize: 8, color: "#4A4038", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 6 }}>
            UGEGI FINAL ANALYSIS
          </p>
          <p style={{ fontSize: 18, fontWeight: 900, color: "#FAF8F0", fontFamily: "'Gowun Batang', serif", lineHeight: 1.4 }}>
            {data.killerLine}
          </p>
          <p style={{ fontSize: 8, color: "#4A4038", fontFamily: "monospace", marginTop: 8 }}>
            — 우걱이 처리소 공식 판정 —
          </p>
        </motion.div>

        {/* ── 공유 버튼 ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ShareButtons
            cardRef={cardRef}
            shareUrl={shareUrl}
            emotions={emotions}
            productName={data.productName}
            onRetry={handleRetry}
          />
        </motion.div>

        {/* ── 공유 유도 박스 ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ marginTop: 14, padding: "12px 14px", background: "#F5EFE0", border: "2px solid #C8B898" }}
        >
          <p style={{ fontSize: 11, color: INK, fontWeight: 700, fontFamily: "monospace", marginBottom: 4 }}>
            나만 당할 수 없음
          </p>
          <p style={{ fontSize: 11, color: "#7A7260", fontFamily: "monospace", lineHeight: 1.6 }}>
            &ldquo;나 오늘 {data.productName} 나옴ㅋㅋ 너는?&rdquo;
          </p>
        </motion.div>

        {/* ── 하단 액션 ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <Link href="/release" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 46, background: `${ROSE}18`, border: `2px solid ${ROSE}60`,
            fontSize: 12, fontFamily: "monospace", color: ROSE, fontWeight: 700,
            textDecoration: "none", letterSpacing: "0.04em",
          }}>
            감정 더 버리기
          </Link>
          <button onClick={handleTwitter} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            height: 46, background: INK, border: "none",
            fontSize: 12, fontFamily: "monospace", color: "#F5EFE0", fontWeight: 700,
            cursor: "pointer",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
            X에 올리기
          </button>
        </motion.div>

        {/* ── 시스템 서명 ── */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p style={{ fontSize: 8, color: "#B4A890", fontFamily: "monospace", letterSpacing: "0.08em" }}>
            UGEGI DISPOSAL CO. — {data.errorCode} — onulmode.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{ background: "#1A1410", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[0,1,2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8607A" }}
            />
          ))}
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
