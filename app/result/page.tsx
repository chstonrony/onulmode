"use client";

import { useRef, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { generateResult, parseResultUrl, buildResultUrl } from "@/lib/resultCard";
import ResultCard from "@/components/share/ResultCard";
import ShareButtons from "@/components/share/ShareButtons";
import Link from "next/link";

const ROSE = "#C8607A";
const INK  = "#2A2520";

function ResultContent() {
  const params = useSearchParams();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const parsed = parseResultUrl(params.toString() ? `?${params.toString()}` : "");
  const emotions = parsed?.emotions ?? ["감정"];
  const data = useMemo(
    () => generateResult(emotions, parsed?.seed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsed?.seed]
  );

  const shareUrl = buildResultUrl(emotions, data.seed);

  function handleRetry() {
    const newSeed = Date.now() % 999983;
    router.push(buildResultUrl(emotions, newSeed));
  }

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", padding: "0 0 80px" }}>

      {/* 헤더 */}
      <div style={{ padding: "24px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: 13, color: "#A89880", fontFamily: "var(--font-serif)", textDecoration: "none" }}>
          ← 오늘무드
        </Link>
        <p style={{ fontSize: 10, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          RESULT_CARD
        </p>
      </div>

      {/* 타이틀 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "20px 20px 0", textAlign: "center" }}
      >
        <p style={{ fontSize: 11, color: ROSE, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 8 }}>
          SHREDDING COMPLETE
        </p>
        <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.35 }}>
          오늘의 감정<br/>파쇄 결과서
        </h1>
        <p style={{ fontSize: 13, color: "#A89880", marginTop: 6, fontFamily: "var(--font-serif)", fontWeight: 300 }}>
          AI가 분석한 오늘의 감정 상태예요
        </p>
      </motion.div>

      {/* 카드 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ display: "flex", justifyContent: "center", padding: "20px 20px 0" }}
      >
        <ResultCard ref={cardRef} data={data} emotions={emotions} />
      </motion.div>

      {/* 공유 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        style={{ display: "flex", justifyContent: "center", padding: "20px 20px 0" }}
      >
        <ShareButtons
          cardRef={cardRef}
          shareUrl={shareUrl}
          emotions={emotions}
          onRetry={handleRetry}
        />
      </motion.div>

      {/* 안내 */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ textAlign: "center", padding: "20px 24px 0" }}
      >
        <p style={{ fontSize: 11, color: "#B4A890", fontFamily: "var(--font-serif)", lineHeight: 1.7 }}>
          이미지 저장 후 인스타 스토리에 올려봐<br/>
          친구한테도 파쇄 권유해도 됨
        </p>
      </motion.div>

      {/* 구분선 */}
      <div style={{ margin: "28px 20px 0", borderTop: "1px dashed #D8CEC0" }} />

      {/* 추가 액션 */}
      <div style={{ padding: "20px 20px 0", display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto" }}>
        <Link href="/release" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 48, background: "#F5EFE0", border: "1px solid #D8CEC0", borderRadius: 4,
          fontSize: 14, fontFamily: "var(--font-serif)", color: "#5A5248", fontWeight: 700,
          textDecoration: "none",
        }}>
          감정 더 버리러 가기
        </Link>
        <Link href="/blog" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 44, background: "transparent",
          fontSize: 13, fontFamily: "var(--font-serif)", color: "#A89880",
          textDecoration: "none",
        }}>
          감정 이야기 읽기 →
        </Link>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{ background: "#efe3cf", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[0,1,2].map(i => (
            <div key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8607A" }} />
          ))}
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
