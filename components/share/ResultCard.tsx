"use client";

import { forwardRef } from "react";
import { ResultData } from "@/lib/resultCard";

// 카드는 이미지 저장용이라 웹폰트 변수 대신 직접 폰트 스택 사용
const SERIF = "Gowun Batang, Georgia, serif";
const MONO  = "'Courier New', Courier, monospace";
const ROSE  = "#C8607A";
const INK   = "#1A1410";

interface Props { data: ResultData; emotions: string[] }

const ResultCard = forwardRef<HTMLDivElement, Props>(({ data, emotions }, ref) => {
  const { date, serial, wasteCode, ingredients, intensity, residual, verdict, prescription } = data;
  const ledFilled = Math.floor(intensity / 5);

  return (
    <div ref={ref} style={{
      width: 360,
      background: "#FDFAF5",
      fontFamily: SERIF,
      overflow: "hidden",
      position: "relative",
      border: "1px solid #D0C8BC",
      boxShadow: "0 8px 40px rgba(0,0,0,0.22), 4px 4px 0 #D0C4B0",
    }}>

      {/* ── 헤더 — 관공서 스타일 ── */}
      <div style={{ background: INK, padding: "14px 18px 12px", position: "relative" }}>
        {/* 도장 자리 */}
        <div style={{
          position: "absolute", top: 8, right: 14,
          width: 52, height: 52, borderRadius: "50%",
          border: `2.5px solid ${ROSE}`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          transform: "rotate(14deg)", opacity: 0.9,
        }}>
          <p style={{ fontSize: 8, color: ROSE, fontFamily: MONO, fontWeight: 700, letterSpacing: "0.04em", textAlign: "center", lineHeight: 1.4 }}>
            폐기<br/>완료<br/>✓
          </p>
        </div>

        <p style={{ fontSize: 9, fontFamily: MONO, color: "#6A6258", letterSpacing: "0.14em", marginBottom: 5 }}>
          EMOTIONAL WASTE DISPOSAL CO.
        </p>
        <p style={{ fontSize: 19, fontWeight: 700, color: "#F5EFE0", lineHeight: 1.25, marginBottom: 4 }}>
          감정 폐기 처리 확인서
        </p>
        <div style={{ display: "flex", gap: 14 }}>
          <p style={{ fontSize: 9, fontFamily: MONO, color: "#8A8270" }}>NO. {serial}</p>
          <p style={{ fontSize: 9, fontFamily: MONO, color: "#8A8270" }}>{date}</p>
          <p style={{ fontSize: 9, fontFamily: MONO, color: "#8A8270" }}>{wasteCode}</p>
        </div>
      </div>

      {/* ── 투입 감정 태그 ── */}
      <div style={{ padding: "10px 16px", borderBottom: "1px dashed #D0C4B0", background: "#F8F4EC" }}>
        <p style={{ fontSize: 8, fontFamily: MONO, color: "#A89880", letterSpacing: "0.12em", marginBottom: 6 }}>
          투입된 감정 / WASTE INPUT
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {emotions.map(e => (
            <span key={e} style={{
              fontSize: 12, padding: "3px 10px",
              background: `${ROSE}18`, color: ROSE,
              border: `1px solid ${ROSE}44`, borderRadius: 2,
              fontFamily: SERIF, fontWeight: 700,
            }}>
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* ── 원재료 분석 ── */}
      <div style={{ padding: "10px 16px", borderBottom: "1px dashed #D0C4B0" }}>
        <p style={{ fontSize: 8, fontFamily: MONO, color: "#A89880", letterSpacing: "0.12em", marginBottom: 8 }}>
          성분 분석 / WASTE COMPOSITION
        </p>
        {ingredients.map(({ label, pct }) => (
          <div key={label} style={{ marginBottom: 7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 13, color: INK, fontWeight: 700 }}>{label}</span>
              <span style={{ fontSize: 11, color: "#A89880", fontFamily: MONO }}>{pct}%</span>
            </div>
            <div style={{ height: 5, background: "#E8E0D4", borderRadius: 0 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: ROSE }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── 파쇄 강도 ── */}
      <div style={{ padding: "9px 16px", borderBottom: "1px dashed #D0C4B0", display: "flex", alignItems: "center", gap: 10 }}>
        <p style={{ fontSize: 8, fontFamily: MONO, color: "#A89880", letterSpacing: "0.1em", flexShrink: 0 }}>
          파쇄 완료율
        </p>
        <div style={{ display: "flex", gap: 2, flex: 1 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 6,
              background: i < ledFilled ? ROSE : "#E0D8CC",
            }} />
          ))}
        </div>
        <span style={{ fontSize: 12, fontFamily: MONO, fontWeight: 700, color: ROSE, flexShrink: 0 }}>
          {intensity}%
        </span>
      </div>

      {/* ── 잔류 감정 ── */}
      <div style={{ padding: "8px 16px", borderBottom: "1px dashed #D0C4B0", display: "flex", alignItems: "center", gap: 10, background: "#FCF8F0" }}>
        <span style={{ fontSize: 8, fontFamily: MONO, color: "#A89880", letterSpacing: "0.1em", flexShrink: 0 }}>잔류 감정</span>
        <span style={{ fontSize: 12, color: "#7A6858", fontWeight: 700 }}>{residual}</span>
      </div>

      {/* ── AI 판정 ── */}
      <div style={{ margin: "10px 16px 8px", padding: "10px 12px", background: "#F0EAE0", border: `1px solid ${INK}15` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: ROSE }} />
          <p style={{ fontSize: 8, fontFamily: MONO, color: "#A89880", letterSpacing: "0.12em" }}>
            AI 판정 / SYSTEM VERDICT
          </p>
        </div>
        <p style={{ fontSize: 14, color: INK, fontWeight: 700, lineHeight: 1.55 }}>
          &ldquo;{verdict}&rdquo;
        </p>
      </div>

      {/* ── 처방 ── */}
      <div style={{ margin: "0 16px 12px", padding: "10px 12px", background: `${ROSE}0A`, border: `1px solid ${ROSE}25` }}>
        <p style={{ fontSize: 8, fontFamily: MONO, color: ROSE, letterSpacing: "0.12em", marginBottom: 6 }}>
          오늘의 처방 / PRESCRIPTION
        </p>
        <p style={{ fontSize: 13, color: "#5A3848", lineHeight: 1.65 }}>
          {prescription}
        </p>
      </div>

      {/* ── 영수증 바코드 구분 ── */}
      <div style={{ margin: "0 16px", borderTop: "1px dashed #C8BEB0" }} />

      {/* ── 하단 공유 문구 ── */}
      <div style={{ padding: "10px 16px 14px", background: "#F8F4EC" }}>
        <p style={{ fontSize: 10, color: "#9A8E80", fontFamily: MONO, letterSpacing: "0.06em", marginBottom: 4, textAlign: "center" }}>
          AI가 내 기분 이렇게 찌그러뜨림ㅋㅋ
        </p>
        <p style={{ fontSize: 9, color: "#B4A890", fontFamily: MONO, textAlign: "center", letterSpacing: "0.04em" }}>
          너도 감정 갈아봐 — onulmode.vercel.app
        </p>
        {/* 바코드 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 1.2, marginTop: 10 }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} style={{
              width: i % 3 === 0 ? 2.5 : 1.2,
              height: i % 4 === 0 ? 22 : 15,
              background: "#3A3228",
              opacity: 0.45 + (i % 5) * 0.1,
            }} />
          ))}
        </div>
        <p style={{ fontSize: 8, fontFamily: MONO, color: "#C4BAB0", textAlign: "center", marginTop: 4, letterSpacing: "0.06em" }}>
          {data.serial}-{data.wasteCode}
        </p>
      </div>
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
