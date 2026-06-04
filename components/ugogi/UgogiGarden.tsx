"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSeedStats } from "@/lib/shredRecords";

/* 글로벌 씨앗 — 시드 기반 일별 변화 */
function getDailySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

const GLOBAL_SEEDS = [
  { noun: "기대",       emoji: "🌱", base: 2312 },
  { noun: "걱정",       emoji: "🌿", base: 2104 },
  { noun: "원함",       emoji: "🌸", base: 1842 },
  { noun: "상처",       emoji: "🌾", base: 1331 },
  { noun: "피곤함",     emoji: "🍂", base: 1218 },
  { noun: "아쉬움",     emoji: "🌱", base: 1089 },
  { noun: "소중함",     emoji: "🌸", base: 980 },
  { noun: "연결",       emoji: "🌿", base: 892 },
  { noun: "지침",       emoji: "🍂", base: 841 },
  { noun: "중요함",     emoji: "🌾", base: 763 },
];

interface UgogiGardenProps {
  compact?: boolean;
  style?: React.CSSProperties;
}

export default function UgogiGarden({ compact = false, style }: UgogiGardenProps) {
  const [localStats, setLocalStats] = useState<Record<string, number>>({});
  const seed = getDailySeed();

  useEffect(() => {
    setLocalStats(getSeedStats());
  }, []);

  /* 글로벌 + 로컬 합산 */
  const combined = GLOBAL_SEEDS.map(g => ({
    ...g,
    count: g.base + (seed % (g.base / 10 | 0)) + (localStats[g.noun] || 0),
  })).sort((a, b) => b.count - a.count);

  if (compact) {
    return (
      <div style={{ ...style }}>
        <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>
          감정은 사라지지 않습니다. 모양만 바뀔 뿐입니다.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {combined.slice(0, 5).map((s) => (
            <span key={s.noun} style={{ fontSize: 11, color: "#4A6A4A", fontFamily: "var(--font-prose)", fontWeight: 300, background: "#EFF6EC", border: "1px solid #C4D8BC", padding: "3px 10px", borderRadius: 20 }}>
              {s.emoji} {s.noun} {s.count.toLocaleString()}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F5F9F2", border: "1.5px solid #C4D8BC", borderRadius: 6, overflow: "hidden", ...style }}>
      {/* 헤더 */}
      <div style={{ background: "#2A3A2A", padding: "10px 16px" }}>
        <p style={{ fontSize: 9, color: "#8ABE7A", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 4 }}>
          🌱 우걱이 감정정원
        </p>
        <p style={{ fontSize: 11, color: "#A8CCA0", fontFamily: "var(--font-serif)", lineHeight: 1.6 }}>
          감정은 사라지지 않습니다.<br />모양만 바뀔 뿐입니다.
        </p>
      </div>

      {/* 씨앗 목록 */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {combined.map((s, i) => {
          const maxCount = combined[0].count;
          const pct = Math.round((s.count / maxCount) * 100);
          return (
            <motion.div
              key={s.noun}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{s.emoji}</span>
                <span style={{ fontSize: 12, fontFamily: "var(--font-maru)", fontWeight: 600, color: "#2A3A2A", letterSpacing: "-0.02em", flex: 1 }}>
                  {s.noun}
                </span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6A9B7A", flexShrink: 0 }}>
                  {s.count.toLocaleString()}개
                </span>
              </div>
              <div style={{ height: 3, background: "#D4E8CC", borderRadius: 2, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 + 0.2, ease: "easeOut" }}
                  style={{ height: "100%", background: "#6A9B7A", borderRadius: 2, opacity: 0.7 + i * 0.01 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 하단 카피 */}
      <div style={{ borderTop: "1px solid #D4E8CC", padding: "10px 16px" }}>
        <p style={{ fontSize: 10, color: "#7A9A7A", fontFamily: "monospace", letterSpacing: "0.06em", textAlign: "center" }}>
          총 {combined.reduce((s, g) => s + g.count, 0).toLocaleString()}개의 씨앗이 자라고 있습니다.
        </p>
      </div>
    </div>
  );
}
