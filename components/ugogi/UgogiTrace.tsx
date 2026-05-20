"use client";

import { useState } from "react";

const COMMENTS = [
  "참은 감정 오래 두면 눅눅해짐",
  "우걱이가 오늘 감정 상태를 확인중",
  "감정 오래 방치하면 냄새 남",
  "혼자 삭히기 전에 한 번 던질 것",
  "오늘 감정은 생각보다 질겼음",
  "감정에서 약간 탄내 남",
  "사회생활 맛이 조금 섞여있음",
  "삭혔다가 새벽에 다시 나온 것 감지됨",
];

const STATUSES = [
  "처리 중",
  "대기 중",
  "포화 임박",
  "감정 소화 중",
  "잠깐 쉬는 중",
  "풀가동 중",
];

interface UgogiTraceProps {
  /** 배경 및 테두리 색상 변형. 기본: rose */
  variant?: "rose" | "amber" | "dim";
  style?: React.CSSProperties;
}

export default function UgogiTrace({ variant = "rose", style }: UgogiTraceProps) {
  const [comment] = useState(() => COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
  const [status]  = useState(() => STATUSES[Math.floor(Math.random() * STATUSES.length)]);

  const colors = {
    rose:  { border: "#C8607A", bg: "rgba(200,96,122,0.06)", text: "#C8607A" },
    amber: { border: "#C4874A", bg: "rgba(196,135,74,0.06)",  text: "#C4874A" },
    dim:   { border: "#8A8070", bg: "rgba(138,128,112,0.06)", text: "#8A8070" },
  }[variant];

  return (
    <div style={{
      padding: "10px 14px",
      background: colors.bg,
      border: `1px solid ${colors.border}30`,
      borderLeft: `2px solid ${colors.border}`,
      borderRadius: "0 3px 3px 0",
      ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 9, color: colors.text, fontFamily: "monospace", letterSpacing: "0.14em", fontWeight: 700 }}>
          우걱이
        </span>
        <span style={{ fontSize: 9, color: colors.text, fontFamily: "monospace", letterSpacing: "0.06em", opacity: 0.7 }}>
          {status}
        </span>
      </div>
      <p style={{
        fontSize: 12,
        color: "#5A5248",
        fontFamily: "var(--font-prose)",
        fontWeight: 300,
        lineHeight: 1.6,
        letterSpacing: "-0.01em",
      }}>
        "{comment}"
      </p>
    </div>
  );
}
