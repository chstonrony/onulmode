"use client";

import { forwardRef } from "react";
import { ResultData } from "@/lib/resultCard";

// 이미지 저장용 — 폰트 변수 대신 직접 스택
const MONO  = "'Courier New', Courier, monospace";
const SERIF = "Gowun Batang, Georgia, serif";
const ROSE  = "#C8607A";
const INK   = "#1E1814";
const PAPER = "#FAF7EF";

// 구분선
const Dash = () => (
  <div style={{ borderTop: "1px dashed #C8BEB0", margin: "10px 0" }} />
);

interface Props { data: ResultData; emotions: string[] }

const ResultCard = forwardRef<HTMLDivElement, Props>(({ data, emotions }, ref) => {
  const {
    date, serial, wasteCode,
    ingredients, intensity, shredStatus,
    verdict, machineComment, grade, prescription,
  } = data;

  return (
    <div ref={ref} style={{
      width: 340,
      background: PAPER,
      fontFamily: MONO,
      color: INK,
      position: "relative",
      /* 영수증 가장자리 들쭉날쭉 효과 */
      clipPath: `polygon(
        0% 0%, 100% 0%,
        100% 2%, 98% 2%, 98% 0%, 96% 0%, 96% 2%, 94% 2%, 94% 0%,
        92% 0%, 92% 2%, 90% 2%, 90% 0%, 88% 0%, 88% 2%, 86% 2%,
        86% 0%, 84% 0%, 84% 2%, 82% 2%, 82% 0%, 80% 0%, 80% 2%,
        78% 2%, 78% 0%, 76% 0%, 76% 2%, 74% 2%, 74% 0%, 72% 0%,
        72% 2%, 70% 2%, 70% 0%, 68% 0%, 68% 2%, 66% 2%, 66% 0%,
        64% 0%, 64% 2%, 62% 2%, 62% 0%, 60% 0%, 60% 2%, 58% 2%,
        58% 0%, 56% 0%, 56% 2%, 54% 2%, 54% 0%, 52% 0%, 52% 2%,
        50% 2%, 50% 0%, 48% 0%, 48% 2%, 46% 2%, 46% 0%, 44% 0%,
        44% 2%, 42% 2%, 42% 0%, 40% 0%, 40% 2%, 38% 2%, 38% 0%,
        36% 0%, 36% 2%, 34% 2%, 34% 0%, 32% 0%, 32% 2%, 30% 2%,
        30% 0%, 28% 0%, 28% 2%, 26% 2%, 26% 0%, 24% 0%, 24% 2%,
        22% 2%, 22% 0%, 20% 0%, 20% 2%, 18% 2%, 18% 0%, 16% 0%,
        16% 2%, 14% 2%, 14% 0%, 12% 0%, 12% 2%, 10% 2%, 10% 0%,
        8% 0%, 8% 2%, 6% 2%, 6% 0%, 4% 0%, 4% 2%, 2% 2%, 2% 0%,
        0% 0%, 0% 100%,
        2% 100%, 2% 98%, 4% 98%, 4% 100%, 6% 100%, 6% 98%, 8% 98%,
        8% 100%, 10% 100%, 10% 98%, 12% 98%, 12% 100%, 14% 100%,
        14% 98%, 16% 98%, 16% 100%, 18% 100%, 18% 98%, 20% 98%,
        20% 100%, 22% 100%, 22% 98%, 24% 98%, 24% 100%, 26% 100%,
        26% 98%, 28% 98%, 28% 100%, 30% 100%, 30% 98%, 32% 98%,
        32% 100%, 34% 100%, 34% 98%, 36% 98%, 36% 100%, 38% 100%,
        38% 98%, 40% 98%, 40% 100%, 42% 100%, 42% 98%, 44% 98%,
        44% 100%, 46% 100%, 46% 98%, 48% 98%, 48% 100%, 50% 100%,
        50% 98%, 52% 98%, 52% 100%, 54% 100%, 54% 98%, 56% 98%,
        56% 100%, 58% 100%, 58% 98%, 60% 98%, 60% 100%, 62% 100%,
        62% 98%, 64% 98%, 64% 100%, 66% 100%, 66% 98%, 68% 98%,
        68% 100%, 70% 100%, 70% 98%, 72% 98%, 72% 100%, 74% 100%,
        74% 98%, 76% 98%, 76% 100%, 78% 100%, 78% 98%, 80% 98%,
        80% 100%, 82% 100%, 82% 98%, 84% 98%, 84% 100%, 86% 100%,
        86% 98%, 88% 98%, 88% 100%, 90% 100%, 90% 98%, 92% 98%,
        92% 100%, 94% 100%, 94% 98%, 96% 98%, 96% 100%, 98% 100%,
        98% 98%, 100% 98%, 100% 100%, 0% 100%
      )`,
      boxShadow: "0 6px 32px rgba(0,0,0,0.18)",
    }}>
      <div style={{ padding: "24px 20px 28px" }}>

        {/* ── 헤더 ── */}
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "#A89880", marginBottom: 8 }}>
            ★ EMOTIONAL SHREDDER REPORT ★
          </p>
          <p style={{ fontSize: 22, fontFamily: SERIF, fontWeight: 700, lineHeight: 1.25, marginBottom: 6 }}>
            감정 파쇄 결과지
          </p>
          <p style={{ fontSize: 9, color: "#A89880", letterSpacing: "0.1em" }}>
            {date} &nbsp;|&nbsp; #{serial}
          </p>
        </div>

        <Dash />

        {/* ── 오늘 버린 감정 ── */}
        <div style={{ marginBottom: 4 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: "#A89880", marginBottom: 8 }}>
            [ 오늘 버린 감정 ]
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {emotions.map(e => (
              <span key={e} style={{
                fontSize: 13, padding: "3px 10px",
                background: `${ROSE}15`, color: ROSE,
                border: `1px solid ${ROSE}50`,
                fontFamily: SERIF, fontWeight: 700,
              }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* ── 성분 분석 ── */}
        <div style={{ marginBottom: 4 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: "#A89880", marginBottom: 8, marginTop: 12 }}>
            [ 감정 성분 분석 ]
          </p>
          {ingredients.map(({ label, pct }) => (
            <div key={label} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{label}</span>
                <span style={{ fontSize: 11, color: "#8A8070" }}>{pct}%</span>
              </div>
              <div style={{ fontSize: 10, color: "#B0A898", letterSpacing: 0 }}>
                {"█".repeat(Math.floor(pct / 5))}{"░".repeat(20 - Math.floor(pct / 5))}
              </div>
            </div>
          ))}
        </div>

        <Dash />

        {/* ── 파쇄 강도 ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
          <p style={{ fontSize: 9, color: "#A89880", letterSpacing: "0.1em" }}>파쇄 완료율</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: ROSE }}>{intensity}%</p>
        </div>

        {/* ── 파쇄 상태 ── */}
        <div style={{ textAlign: "center", padding: "6px 10px", background: `${INK}08`, marginBottom: 4 }}>
          <p style={{ fontSize: 9, color: "#A89880", letterSpacing: "0.12em", marginBottom: 4 }}>파쇄 상태</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: INK }}>{shredStatus}</p>
        </div>

        <Dash />

        {/* ── AI 판정 ── */}
        <div style={{ marginBottom: 10 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: "#A89880", marginBottom: 7 }}>
            [ AI 판정 ]
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.65, fontFamily: SERIF, fontStyle: "italic" }}>
            &ldquo;{verdict}&rdquo;
          </p>
        </div>

        {/* ── 파쇄기 코멘트 ── */}
        <div style={{
          padding: "8px 12px",
          background: `${INK}06`,
          border: `1px dashed ${INK}25`,
          marginBottom: 4,
        }}>
          <p style={{ fontSize: 9, color: "#A89880", letterSpacing: "0.1em", marginBottom: 5 }}>
            파쇄기 코멘트
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.65, fontFamily: SERIF }}>
            {machineComment}
          </p>
        </div>

        <Dash />

        {/* ── 결과 등급 — 중앙 강조 ── */}
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "#A89880", marginBottom: 6 }}>
            ─── 최종 등급 ───
          </p>
          <p style={{ fontSize: 22, fontWeight: 700, fontFamily: SERIF, color: ROSE, lineHeight: 1.2 }}>
            {grade.text}
          </p>
          <p style={{ fontSize: 10, color: "#A89880", marginTop: 4 }}>{grade.sub}</p>
        </div>

        <Dash />

        {/* ── 처방 ── */}
        <div style={{ marginBottom: 4 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: "#A89880", marginBottom: 6 }}>
            [ 오늘의 처방 ]
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.65, fontFamily: SERIF }}>
            {prescription}
          </p>
        </div>

        <Dash />

        {/* ── 공유용 문구 + 바코드 ── */}
        <div style={{ textAlign: "center", paddingTop: 4 }}>
          <p style={{ fontSize: 11, fontFamily: SERIF, color: "#6A6258", marginBottom: 3 }}>
            AI가 내 감정을 이렇게 갈아버림 ㅋㅋ
          </p>
          <p style={{ fontSize: 9, color: "#B0A898", marginBottom: 12 }}>
            너도 감정 하나 버리고 와 → onulmode.vercel.app
          </p>
          {/* 바코드 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 1.5, marginBottom: 5 }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} style={{
                width: i % 4 === 0 ? 3 : 1.5,
                height: i % 5 === 0 ? 26 : 18,
                background: INK,
                opacity: 0.35 + (i % 6) * 0.1,
              }} />
            ))}
          </div>
          <p style={{ fontSize: 8, color: "#C4BAB0", letterSpacing: "0.08em" }}>
            {serial} — {wasteCode}
          </p>
        </div>

      </div>
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
