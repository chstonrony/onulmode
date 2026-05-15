"use client";

import { useMoodStore } from "@/hooks/useMoodStore";
import TopBar from "@/components/layout/TopBar";
import { getEmotion } from "@/lib/emotions";
import { EmotionType } from "@/types";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

const BG = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";
const ROSE = "#C8607A";

export default function InsightsPage() {
  const { entries, loaded } = useMoodStore();

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[0,1,2].map(i => <div key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: ROSE }} />)}
      </div>
    </div>
  );

  if (entries.length < 3) return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title="인사이트" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 32, marginBottom: 16 }}>📊</p>
        <p style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 8 }}>
          데이터가 부족해요
        </p>
        <p style={{ fontSize: 13, color: "#A89880", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
          최소 3일의 기록이 있어야<br />인사이트를 볼 수 있어요.
        </p>
        <Link href="/today" style={{
          display: "inline-flex", alignItems: "center",
          background: ROSE, color: "#F5EFE0",
          padding: "10px 24px", borderRadius: 4,
          fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700,
          textDecoration: "none",
        }}>오늘 기록하기</Link>
      </div>
    </div>
  );

  const total = entries.length;
  const counts: Record<string, number> = {};
  entries.forEach(e => { counts[e.emotion] = (counts[e.emotion] || 0) + 1; });
  const sorted = Object.entries(counts).sort(([,a],[,b]) => b - a);
  const top = getEmotion(sorted[0][0] as EmotionType);
  const avg = (entries.reduce((s, e) => s + e.intensity, 0) / total).toFixed(1);
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = format(subDays(new Date(), 6 - i), "yyyy-MM-dd");
    return { date: d, entry: entries.find(e => e.date === d), day: format(subDays(new Date(), 6 - i), "EEE", { locale: ko }) };
  });

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title="인사이트" />
      <div style={{ padding: "16px 20px 80px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* 대표 감정 */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: 20, background: top.bg, border: `1px solid ${top.border}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: top.color, opacity: 0.7, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 16 }}>
            가장 많이 느낀 감정
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {(() => { const Icon = top.icon; return (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 52, height: 52, background: "rgba(255,255,255,0.7)", border: `1px solid ${top.border}`, borderRadius: 4,
              }}>
                <Icon size={24} strokeWidth={1.5} style={{ color: top.color }} />
              </div>
            ); })()}
            <div>
              <p style={{ fontSize: 26, fontWeight: 700, color: top.color, lineHeight: 1, fontFamily: "var(--font-serif)" }}>{top.label}</p>
              <p style={{ fontSize: 12, color: top.color, opacity: 0.6, marginTop: 4 }}>
                {Math.round((counts[top.type] / total) * 100)}% · {counts[top.type]}회
              </p>
            </div>
          </div>
        </motion.div>

        {/* 통계 3칸 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden" }}>
          {[
            { value: total, unit: "일", label: "총 기록", color: ROSE },
            { value: avg, unit: "/5", label: "평균 강도", color: "#B8860B" },
            { value: sorted.length, unit: "종류", label: "감정 유형", color: "#7A5A9A" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0",
              borderRight: i < 2 ? `1px solid ${LINE}` : "none",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1, fontFamily: "var(--font-serif)" }}>{s.value}</span>
                <span style={{ fontSize: 11, color: "#A89880" }}>{s.unit}</span>
              </div>
              <span style={{ fontSize: 11, color: "#A89880", marginTop: 5 }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 최근 7일 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
          style={{ padding: 20, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 16 }}>최근 7일</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {last7.map(({ date, entry, day }) => {
              const em = entry ? getEmotion(entry.emotion) : null;
              const Icon = em?.icon;
              return (
                <div key={date} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 4,
                    background: em ? em.bg : "#D8CEC0", border: em ? `1px solid ${em.border}` : `1px solid ${LINE}`,
                  }}>
                    {Icon && <Icon size={14} strokeWidth={1.5} style={{ color: em!.color }} />}
                  </div>
                  <span style={{ fontSize: 10, color: "#A89880" }}>{day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 감정 분포 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
          style={{ padding: 20, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 16 }}>감정 분포</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {sorted.map(([type, count], i) => {
              const em = getEmotion(type as EmotionType);
              const Icon = em.icon;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon size={14} strokeWidth={1.5} style={{ color: em.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#2A2520", fontFamily: "var(--font-serif)" }}>{em.label}</span>
                      <span style={{ fontSize: 11, color: "#A89880" }}>{pct}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: LINE }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                        style={{ height: "100%", borderRadius: 2, background: em.color, opacity: 0.7 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
