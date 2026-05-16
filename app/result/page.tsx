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
    router.push("/release");
  }

  function handleTwitter() {
    const emotionStr = emotions.slice(0, 2).join("+");
    const fullUrl = typeof window !== "undefined"
      ? `${window.location.origin}${shareUrl}`
      : shareUrl;
    const text = `AI가 내 ${emotionStr} 이렇게 갈아버림ㅋㅋ\n우걱이 처리 완료. 너도 해봐\n#오늘무드 #감정파쇄기`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`, "_blank", "width=600,height=400");
  }

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", padding: "0 0 80px" }}>

      {/* 헤더 */}
      <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: 13, color: "#A89880", fontFamily: "var(--font-serif)", textDecoration: "none" }}>
          ← 우걱이 처리소
        </Link>
        <p style={{ fontSize: 9, color: "#B4A890", fontFamily: "monospace", letterSpacing: "0.12em" }}>
          RESULT_CARD / EMO-DISPOSAL
        </p>
      </div>

      {/* 타이틀 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "18px 20px 0", textAlign: "center" }}
      >
        <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 6 }}>
          ■ EMOTIONAL WASTE DISPOSAL COMPLETE
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.3 }}>
          감정 폐기<br/>처리 확인서
        </h1>
        <p style={{ fontSize: 12, color: "#A89880", marginTop: 6, fontFamily: "monospace" }}>
          우걱이가 {emotions.slice(0,2).join(", ")} 처리 완료
        </p>
      </motion.div>

      {/* 카드 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ display: "flex", justifyContent: "center", padding: "16px 20px 0" }}
      >
        <ResultCard ref={cardRef} data={data} emotions={emotions} />
      </motion.div>

      {/* 공유 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        style={{ display: "flex", justifyContent: "center", padding: "18px 20px 0" }}
      >
        <ShareButtons
          cardRef={cardRef}
          shareUrl={shareUrl}
          emotions={emotions}
          onRetry={handleRetry}
        />
      </motion.div>

      {/* 구분선 */}
      <div style={{ margin: "24px 20px 0", borderTop: "1px dashed #D8CEC0" }} />

      {/* 하단 CTA — 친구도 해보게 */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ padding: "20px 20px 0", maxWidth: 360, margin: "0 auto" }}
      >
        {/* 친구 공유 유도 박스 */}
        <div style={{
          padding: "18px 18px 16px",
          background: "#F5EFE0",
          border: "1.5px solid #D8CEC0",
          borderRadius: 3,
          marginBottom: 10,
          position: "relative",
        }}>
          <p style={{ fontSize: 10, fontFamily: "monospace", color: ROSE, letterSpacing: "0.1em", marginBottom: 8 }}>
            ✦ 친구한테 공유하면?
          </p>
          <p style={{ fontSize: 13, color: INK, lineHeight: 1.7, fontFamily: "var(--font-serif)" }}>
            결과지가 <strong>6종 랜덤</strong>이라 친구 결과가 달라요.<br/>
            &ldquo;이거 나온 거 봐 ㅋㅋ 너는 뭐 나와?&rdquo;
          </p>
          {/* 말풍선 꼬리 */}
          <div style={{ position: "absolute", bottom: -8, left: 28, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid #D8CEC0" }} />
          <div style={{ position: "absolute", bottom: -6, left: 29, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid #F5EFE0" }} />
        </div>

        {/* 다시 파쇄 + 트위터 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20 }}>
          <Link href="/release" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 48, background: `${ROSE}18`,
            border: `1.5px solid ${ROSE}44`,
            borderRadius: 3,
            fontSize: 13, fontFamily: "var(--font-serif)", color: ROSE, fontWeight: 700,
            textDecoration: "none",
          }}>
            감정 더 버리기
          </Link>
          <button onClick={handleTwitter} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            height: 48, background: INK, border: "none", borderRadius: 3,
            fontSize: 13, fontFamily: "var(--font-serif)", color: "#F5EFE0", fontWeight: 700,
            cursor: "pointer",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
            X에 올리기
          </button>
        </div>

        {/* 처음 방문자 유도 */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link href="/" style={{
            fontSize: 12, color: "#A89880", fontFamily: "var(--font-serif)",
            textDecoration: "none",
          }}>
            처음 오셨나요? 오늘무드 알아보기 →
          </Link>
        </div>
      </motion.div>

      {/* 우걱이 서명 */}
      <div style={{ textAlign: "center", padding: "28px 24px 0" }}>
        <p style={{ fontSize: 10, color: "#C4BAB0", fontFamily: "monospace", letterSpacing: "0.06em" }}>
          — 우걱이 처리소 / UGEGI DISPOSAL CO. —
        </p>
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
