"use client";

import { useState, useEffect } from "react";

const ROSE = "#C8607A";
const INK  = "#2A2520";

const UGEGI_MSGS = [
  "우걱이가 조용히 감정을 씹는 중입니다.",
  "오늘은 유난히 서운함이 많습니다.",
  "기계가 살짝 지쳐보입니다.",
  "새벽 감정 처리량이 급증하고 있습니다.",
  "괜찮은 척한 감정이 들어오고 있습니다.",
  "우걱이가 배고파합니다.",
  "감정 파쇄 중 — 잠시 기다려주세요.",
  "오늘 하루치 감정 수거 중입니다.",
];

function getRandomCount() {
  return Math.floor(Math.random() * 200) + 40;
}

function isLateNight() {
  const h = new Date().getHours();
  return h >= 22 || h < 5;
}

export function UgegiStatusBar() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [count]  = useState(() => getRandomCount());
  const [night]  = useState(() => isLateNight());

  useEffect(() => {
    const iv = setInterval(() => {
      setMsgIdx(i => (i + 1) % UGEGI_MSGS.length);
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      padding: "10px 16px",
      background: night ? "#0E0C0A" : INK,
      borderBottom: `2px solid ${ROSE}`,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      transition: "background 1s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
        <span
          key={msgIdx}
          style={{
            fontSize: 10, fontFamily: "monospace", color: "#FAF8F2",
            letterSpacing: "0.06em", lineHeight: 1.4,
            animation: "fadeInMsg 0.4s ease",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}
        >
          {UGEGI_MSGS[msgIdx]}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 8, fontFamily: "monospace", color: "#5A5248", letterSpacing: "0.08em" }}>
          오늘 파쇄
        </span>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: ROSE, fontWeight: 700 }}>
          {count}건
        </span>
      </div>
      <style>{`
        @keyframes fadeInMsg {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function NightOverlay() {
  const [night] = useState(() => isLateNight());
  if (!night) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
      background: "rgba(10,8,6,0.12)",
    }}/>
  );
}
