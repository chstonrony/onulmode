"use client";

import { forwardRef } from "react";
import { ResultData } from "@/lib/resultCard";

/* ══════════════════════════════════════════════════════════
   StoryCard — 9:16 인스타 스토리 최적화 공유 카드
   - 정체성 강조("내 감정 = OO") + 킬포 한 줄 + 강한 CTA(onulmood.com)
   - 360 x 640 으로 렌더 → toPng pixelRatio 3 = 1080 x 1920 (스토리 풀스펙)
══════════════════════════════════════════════════════════ */

const ROSE  = "#C8607A";
const INK   = "#2A2520";
const BG     = "#efe3cf";
const PAPER  = "#F5EFE0";
const MUTED  = "#A89880";
const W = 360;
const H = 640;

interface Props { data: ResultData; emotions: string[] }

const StoryCard = forwardRef<HTMLDivElement, Props>(({ data, emotions }, ref) => {
  const { productName, productEmoji, productDescription, killerLine, isRare } = data;
  const inputEmotions = emotions.slice(0, 3);

  return (
    <div ref={ref} style={{
      width: W, height: H,
      background: BG,
      backgroundImage: "repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px)",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      fontFamily: "'Gowun Batang', Georgia, serif",
    }}>
      {/* 상단 로즈 바 */}
      <div style={{ height: 6, background: ROSE, flexShrink: 0 }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "22px 26px 0" }}>

        {/* 헤더 — 브랜드 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}>
            🦷 오늘무드 · 우걱이 감정 처리소
          </span>
          {isRare && (
            <span style={{ fontSize: 8, color: "#B89030", border: "1px solid #B89030", padding: "2px 7px", letterSpacing: "0.1em", fontFamily: "monospace" }}>
              SSR
            </span>
          )}
        </div>

        {/* 내가 넣은 감정 */}
        <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 8 }}>
          ▼ 내가 넣은 감정
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {inputEmotions.map((e, i) => (
            <span key={i} style={{
              fontSize: 14, fontWeight: 700, color: "#FAF8F2", background: ROSE,
              padding: "5px 13px", borderRadius: 3, letterSpacing: "-0.01em",
            }}>
              {e}
            </span>
          ))}
        </div>

        {/* 변환 화살표 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ height: 1, flex: 1, background: "#D8CEC0" }} />
          <span style={{ fontSize: 9, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em" }}>
            ↓ 우걱이가 씹은 결과
          </span>
          <div style={{ height: 1, flex: 1, background: "#D8CEC0" }} />
        </div>

        {/* 히어로 — 결과물 (정체성) */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "4px 0",
        }}>
          <span style={{ fontSize: 78, lineHeight: 1, marginBottom: 14 }}>{productEmoji}</span>
          <h2 style={{
            fontSize: 30, fontWeight: 900, color: INK, lineHeight: 1.25,
            letterSpacing: "-0.02em", marginBottom: 12, padding: "0 6px",
          }}>
            {productName}
          </h2>
          <p style={{
            fontSize: 12, color: MUTED, fontStyle: "italic", lineHeight: 1.7,
            maxWidth: 260, marginBottom: 18,
          }}>
            {productDescription}
          </p>

          {/* 킬포 — 가장 공유되는 한 줄 */}
          <div style={{
            background: PAPER, border: `1px solid #D8CEC0`, borderLeft: `3px solid ${ROSE}`,
            padding: "14px 18px", maxWidth: 290,
          }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: INK, lineHeight: 1.55 }}>
              &ldquo;{killerLine}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* 하단 CTA — 바이럴 핵심 */}
      <div style={{ background: INK, padding: "18px 26px 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 900, color: "#FAF8F2", letterSpacing: "-0.01em", marginBottom: 3, fontFamily: "'Gowun Batang', serif" }}>
              너도 감정 던져봐 👀
            </p>
            <p style={{ fontSize: 11, color: "#B4A890", letterSpacing: "0.02em" }}>
              결과 매번 다름 · 나만 당할 수 없음
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 9, color: "#7A7260", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 2 }}>
              지금 해보기
            </p>
            <p style={{ fontSize: 14, fontWeight: 700, color: ROSE, fontFamily: "monospace", letterSpacing: "0.02em" }}>
              onulmood.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

StoryCard.displayName = "StoryCard";
export default StoryCard;
