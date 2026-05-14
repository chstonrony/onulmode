"use client";

import { forwardRef } from "react";
import { ResultData } from "@/lib/resultCard";

const ROSE  = "#C8607A";
const INK   = "#2A2520";
const BG    = "#F5EFE0";
const LINE  = "#D8CEC0";
const MUTED = "#A89880";
const SERIF = "Gowun Batang, Georgia, serif";
const MONO  = "'Courier New', Courier, monospace";

interface Props { data: ResultData; emotions: string[] }

const ResultCard = forwardRef<HTMLDivElement, Props>(({ data, emotions }, ref) => {
  const { date, serial, ingredients, intensity, residual, verdict, prescription } = data;
  const ledFilled = Math.floor(intensity / 5);

  return (
    <div ref={ref} style={{
      width: 360, background: BG,
      border: `2px solid ${LINE}`, borderRadius: 6,
      fontFamily: SERIF, overflow: "hidden", position: "relative",
    }}>
      {/* ── 헤더 ── */}
      <div style={{ padding: "18px 20px 14px", borderBottom: `1px dashed ${LINE}`, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 9, fontFamily: MONO, color: ROSE, letterSpacing: "0.14em", marginBottom: 5 }}>
              EMOTIONAL SHREDDER™ v2.7
            </p>
            <p style={{ fontSize: 20, fontWeight: 700, color: INK, lineHeight: 1.2 }}>
              감정 파쇄 결과서
            </p>
            <p style={{ fontSize: 10, color: MUTED, marginTop: 4, fontFamily: MONO }}>
              {date} &nbsp;|&nbsp; #{serial}
            </p>
          </div>
          {/* 스탬프 */}
          <div style={{
            width: 54, height: 54, borderRadius: "50%",
            border: `2.5px solid ${ROSE}`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            transform: "rotate(14deg)", opacity: 0.82, flexShrink: 0,
          }}>
            <p style={{ fontSize: 7, color: ROSE, fontFamily: MONO, letterSpacing: "0.06em", fontWeight: 700, lineHeight: 1.4, textAlign: "center" }}>
              SHREDDED<br/>✓
            </p>
          </div>
        </div>
        {/* 입력 감정 태그 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
          {emotions.map(e => (
            <span key={e} style={{
              fontSize: 11, padding: "2px 9px",
              background: `${ROSE}18`, color: ROSE,
              border: `1px solid ${ROSE}44`, borderRadius: 20,
              fontFamily: SERIF,
            }}>
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* ── 감정 원재료 ── */}
      <div style={{ padding: "13px 20px", borderBottom: `1px dashed ${LINE}` }}>
        <p style={{ fontSize: 8, fontFamily: MONO, color: MUTED, letterSpacing: "0.13em", marginBottom: 10 }}>
          EMOTIONAL_CONTENT_ANALYSIS
        </p>
        {ingredients.map(({ label, pct }) => (
          <div key={label} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 12, color: INK, fontWeight: 700, fontFamily: SERIF }}>{label}</span>
              <span style={{ fontSize: 11, color: MUTED, fontFamily: MONO }}>{pct}%</span>
            </div>
            <div style={{ height: 5, background: LINE, borderRadius: 2 }}>
              <div style={{
                height: "100%", borderRadius: 2, width: `${pct}%`,
                background: `linear-gradient(90deg, ${ROSE}CC, ${ROSE}88)`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── 파쇄 강도 ── */}
      <div style={{ padding: "12px 20px", borderBottom: `1px dashed ${LINE}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
          <p style={{ fontSize: 8, fontFamily: MONO, color: MUTED, letterSpacing: "0.13em" }}>SHRED_INTENSITY</p>
          <span style={{ fontSize: 14, fontFamily: MONO, fontWeight: 700, color: intensity >= 70 ? ROSE : "#B8860B" }}>
            {intensity}%
          </span>
        </div>
        <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 7, borderRadius: 1,
              background: i < ledFilled
                ? (i > 14 ? ROSE : i > 10 ? "#C4874A" : "#8A9E78")
                : `${LINE}88`,
            }} />
          ))}
        </div>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: MONO }}>
          {intensity >= 80 ? "⚡ 고강도 파쇄" : intensity >= 60 ? "● 표준 파쇄" : "▪ 저강도 파쇄"}&nbsp;완료
        </p>
      </div>

      {/* ── 잔여 감정 ── */}
      <div style={{ padding: "9px 20px", borderBottom: `1px dashed ${LINE}`, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 8, fontFamily: MONO, color: MUTED, letterSpacing: "0.1em", flexShrink: 0 }}>RESIDUAL:</span>
        <span style={{ fontSize: 12, color: "#7A6858", fontWeight: 700, fontFamily: SERIF }}>{residual}</span>
      </div>

      {/* ── AI 판정 ── */}
      <div style={{ margin: "12px 20px 10px", padding: "11px 14px", background: `${INK}08`, border: `1px solid ${INK}15`, borderRadius: 3 }}>
        <p style={{ fontSize: 8, fontFamily: MONO, color: MUTED, letterSpacing: "0.1em", marginBottom: 7 }}>AI_VERDICT</p>
        <p style={{ fontSize: 13, color: INK, fontWeight: 700, lineHeight: 1.55, fontFamily: SERIF }}>
          &ldquo;{verdict}&rdquo;
        </p>
      </div>

      {/* ── 오늘의 처방 ── */}
      <div style={{ margin: "0 20px 14px", padding: "11px 14px", background: `${ROSE}0C`, border: `1px solid ${ROSE}28`, borderRadius: 3 }}>
        <p style={{ fontSize: 8, fontFamily: MONO, color: ROSE, letterSpacing: "0.1em", marginBottom: 7 }}>TODAY&apos;S_PRESCRIPTION</p>
        <p style={{ fontSize: 13, color: "#5A3848", lineHeight: 1.65, fontFamily: SERIF }}>{prescription}</p>
      </div>

      {/* ── CTA 푸터 ── */}
      <div style={{ borderTop: `2px solid ${LINE}`, padding: "12px 20px", background: INK, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 9, color: "#A89880", fontFamily: MONO, marginBottom: 3, letterSpacing: "0.06em" }}>
            너도 오늘 감정 갈아봐
          </p>
          <p style={{ fontSize: 13, color: "#F5EFE0", fontFamily: SERIF, fontWeight: 700 }}>
            오늘무드 — onulmode.vercel.app
          </p>
        </div>
        <p style={{ fontSize: 22, color: ROSE, lineHeight: 1 }}>✦</p>
      </div>
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
