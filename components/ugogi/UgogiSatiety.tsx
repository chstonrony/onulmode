"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getShredRecords } from "@/lib/shredRecords";

const ROSE = "#C8607A";
const INK  = "#2A2520";
const LINE = "#D8CEC0";

/* 가짜 글로벌 통계 — 시드 기반으로 매일 다른 값 */
function getDailySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function getGlobalStats() {
  const seed = getDailySeed();
  const base = 18420;
  const daily = ((seed % 500) + 200);
  const total = base + (seed % 2000) + 1200;
  return {
    todayCount: daily,
    totalCount: total,
    satiety: Math.min(99, 60 + (seed % 35)),
  };
}

interface UgogiSatietyProps {
  compact?: boolean;
  style?: React.CSSProperties;
}

export default function UgogiSatiety({ compact = false, style }: UgogiSatietyProps) {
  const [localCount, setLocalCount] = useState(0);
  const stats = getGlobalStats();

  useEffect(() => {
    setLocalCount(getShredRecords().length);
  }, []);

  if (compact) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, ...style }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#6A9B7A", flexShrink: 0 }}
        />
        <p style={{ fontSize: 10, fontFamily: "monospace", color: "#7A9070", letterSpacing: "0.08em" }}>
          오늘 처리된 감정 {stats.todayCount.toLocaleString()}개 · 우걱이 포만감 {stats.satiety}%
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: "#1A2A1A", border: `1px solid #2A4A2A`, borderRadius: 4, overflow: "hidden", ...style }}>
      {/* 헤더 */}
      <div style={{ background: "#0E1A0E", padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.12em" }}>
          UGOGI SATIETY MONITOR
        </span>
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          style={{ fontSize: 8, fontFamily: "monospace", color: "#8ABE7A" }}
        >
          ● LIVE
        </motion.span>
      </div>

      {/* 통계 */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 9, color: "#5A7A5A", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 4 }}>오늘 처리된 감정</p>
            <p style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "#A8D8A8", fontWeight: 700, lineHeight: 1 }}>
              {stats.todayCount.toLocaleString()}
              <span style={{ fontSize: 10, color: "#6A9B7A", marginLeft: 3 }}>개</span>
            </p>
          </div>
          <div>
            <p style={{ fontSize: 9, color: "#5A7A5A", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 4 }}>내 처리 기록</p>
            <p style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "#A8D8A8", fontWeight: 700, lineHeight: 1 }}>
              {localCount.toLocaleString()}
              <span style={{ fontSize: 10, color: "#6A9B7A", marginLeft: 3 }}>건</span>
            </p>
          </div>
        </div>

        {/* 포만감 바 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 9, color: "#5A7A5A", fontFamily: "monospace", letterSpacing: "0.08em" }}>우걱이 포만감</span>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#8ABE7A", fontWeight: 700 }}>{stats.satiety}%</span>
          </div>
          <div style={{ height: 6, background: "#1A3A1A", borderRadius: 3, overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.satiety}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ height: "100%", background: "#6A9B7A", borderRadius: 3 }}
            />
          </div>
        </div>

        <p style={{ fontSize: 9, color: "#4A6A4A", fontFamily: "monospace", lineHeight: 1.7, letterSpacing: "0.04em" }}>
          오늘도 누군가의 감정이 안전하게 처리되었습니다.
        </p>
      </div>
    </div>
  );
}
