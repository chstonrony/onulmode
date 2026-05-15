"use client";

import { forwardRef } from "react";
import { ResultData } from "@/lib/resultCard";

const MONO  = "'Courier New', Courier, monospace";
const SERIF = "Gowun Batang, Georgia, serif";
const INK   = "#1E1814";
const ROSE  = "#C8607A";
const BG    = "#FAF7EF";

// 섹션 구분선
const Divider = () => (
  <div style={{ borderTop: `2px solid ${INK}`, margin: 0 }} />
);

interface Props { data: ResultData; emotions: string[] }

const ResultCard = forwardRef<HTMLDivElement, Props>(({ data, emotions }, ref) => {
  const { serial, ingredients, intensity, shredStatus, verdict, machineComment, prescription } = data;
  const leftover = 100 - intensity; // 감정 찌꺼기

  return (
    <div ref={ref} style={{
      width: 340,
      background: BG,
      border: `2px solid ${INK}`,
      fontFamily: MONO,
      color: INK,
      boxShadow: "4px 4px 0 #C8BEB0",
    }}>

      {/* ── 헤더 ── */}
      <div style={{ padding: "16px 18px 14px", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", marginBottom: 5, fontWeight: 700 }}>
          우걱이의 감정 파쇄 결과지
        </p>
        <p style={{ fontSize: 16, fontFamily: SERIF, fontWeight: 700, lineHeight: 1.3 }}>
          빠각 완료 보고서
        </p>
        <p style={{ fontSize: 9, color: "#A89880", marginTop: 5, letterSpacing: "0.1em" }}>
          #{serial}
        </p>
      </div>

      <Divider />

      {/* ── 기본 정보 ── */}
      <div style={{ padding: "12px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, color: "#A89880", flexShrink: 0 }}>투입 감정</span>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: SERIF }}>
            {emotions.join(" / ")}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#A89880", flexShrink: 0 }}>파쇄 상태</span>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{shredStatus}</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#A89880", flexShrink: 0 }}>감정 찌꺼기</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: ROSE }}>{leftover}%</span>
          <span style={{ fontSize: 9, color: "#C8BEB0", letterSpacing: 0 }}>
            {"█".repeat(Math.ceil(leftover / 10))}{"░".repeat(10 - Math.ceil(leftover / 10))}
          </span>
        </div>
        {/* 성분 요약 */}
        <div style={{ marginTop: 4 }}>
          {ingredients.map(({ label, pct }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: "#8A8070", width: 52, flexShrink: 0 }}>{label}</span>
              <span style={{ fontSize: 9, color: "#C0B8AC", letterSpacing: 0, flex: 1 }}>
                {"█".repeat(Math.floor(pct / 5))}{"░".repeat(20 - Math.floor(pct / 5))}
              </span>
              <span style={{ fontSize: 9, color: "#A89880", flexShrink: 0, fontFamily: MONO }}>{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── AI 판정 ── */}
      <div style={{ padding: "12px 18px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.16em", color: "#A89880", marginBottom: 7 }}>
          AI 판정
        </p>
        <p style={{ fontSize: 13, fontFamily: SERIF, fontStyle: "italic", lineHeight: 1.6 }}>
          &ldquo;{verdict}&rdquo;
        </p>
      </div>

      <Divider />

      {/* ── 파쇄기 코멘트 ── */}
      <div style={{ padding: "12px 18px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.16em", color: "#A89880", marginBottom: 7 }}>
          파쇄기 코멘트
        </p>
        <p style={{ fontSize: 13, fontFamily: SERIF, lineHeight: 1.6 }}>
          &ldquo;{machineComment}&rdquo;
        </p>
      </div>

      <Divider />

      {/* ── 오늘의 처방 ── */}
      <div style={{ padding: "12px 18px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.16em", color: "#A89880", marginBottom: 7 }}>
          오늘의 처방
        </p>
        <p style={{ fontSize: 13, fontFamily: SERIF, fontWeight: 700, lineHeight: 1.5 }}>
          {prescription}
        </p>
      </div>

      <Divider />

      {/* ── 해시태그 + 공유 ── */}
      <div style={{ padding: "10px 18px 14px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "#8A8070", letterSpacing: "0.04em", marginBottom: 6, fontFamily: SERIF }}>
          AI가 내 감정을 이렇게 갈아버림 ㅋㅋ
        </p>
        <p style={{ fontSize: 11, fontWeight: 700, color: ROSE, letterSpacing: "0.06em" }}>
          #오늘무드&nbsp;&nbsp;#감정파쇄기
        </p>
        <p style={{ fontSize: 8, color: "#C4BAB0", marginTop: 8, letterSpacing: "0.06em" }}>
          onulmode.vercel.app
        </p>
      </div>

    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
