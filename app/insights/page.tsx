"use client";

import { useMoodStore } from "@/hooks/useMoodStore";
import TopBar from "@/components/layout/TopBar";
import { getEmotion } from "@/lib/emotions";
import { EmotionType } from "@/types";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

const BG = "#FAF8F4";

export default function InsightsPage() {
  const { entries, loaded } = useMoodStore();

  if (!loaded) return (
    <div className="flex items-center justify-center h-screen" style={{ background: BG }}>
      <div className="flex gap-2">{[0,1,2].map(i => <div key={i} className="pulse-dot w-2 h-2 rounded-full" style={{ background: "#4A7C59" }} />)}</div>
    </div>
  );

  if (entries.length < 3) return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title="인사이트" />
      <div className="flex flex-col items-center py-24 text-center px-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ background: "#EEF5F0", border: "1.5px solid #AECFBA" }}>
          <span style={{ fontSize: 28 }}>📊</span>
        </div>
        <p style={{ fontSize: 17, fontWeight: 600, color: "#2A2420", marginBottom: 8 }}>데이터가 부족해요</p>
        <p style={{ fontSize: 14, color: "#A09588", lineHeight: 1.65, marginBottom: 24 }}>최소 3일의 기록이 있어야<br />인사이트를 볼 수 있어요.</p>
        <Link href="/today" className="flex items-center px-6 h-11 rounded-xl font-semibold" style={{ background: "#2A2420", color: "#FAF8F4", fontSize: 14 }}>
          오늘 기록하기
        </Link>
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
      <div className="px-5 pt-4 pb-12 space-y-4">

        {/* Top emotion */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl" style={{ background: top.bg, border: `1.5px solid ${top.border}` }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: top.color, opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            가장 많이 느낀 감정
          </p>
          <div className="flex items-center gap-4">
            {(() => { const Icon = top.icon; return (
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl" style={{ background: "rgba(255,255,255,0.7)", border: `1.5px solid ${top.border}` }}>
                <Icon size={26} strokeWidth={1.5} style={{ color: top.color }} />
              </div>
            ); })()}
            <div>
              <p style={{ fontSize: 28, fontWeight: 700, color: top.color, lineHeight: 1 }}>{top.label}</p>
              <p style={{ fontSize: 13, color: top.color, opacity: 0.6, marginTop: 4 }}>
                {Math.round((counts[top.type] / total) * 100)}% · {counts[top.type]}회
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
          className="grid grid-cols-3 rounded-2xl overflow-hidden" style={{ border: "1.5px solid #E4DDD3", background: "#FFFFFF" }}>
          {[
            { value: total, unit: "일", label: "총 기록", color: "#4A7C59" },
            { value: avg,   unit: "/5", label: "평균 강도", color: "#B8860B" },
            { value: sorted.length, unit: "종류", label: "감정 유형", color: "#7A5A9A" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center py-5" style={{ borderRight: i < 2 ? "1px solid #E4DDD3" : "none" }}>
              <div className="flex items-baseline gap-0.5">
                <span style={{ fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontSize: 11, color: "#A09588" }}>{s.unit}</span>
              </div>
              <span style={{ fontSize: 11, color: "#A09588", marginTop: 5 }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 7-day */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
          className="p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#A09588", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>최근 7일</p>
          <div className="flex justify-between">
            {last7.map(({ date, entry, day }) => {
              const em = entry ? getEmotion(entry.emotion) : null;
              const Icon = em?.icon;
              return (
                <div key={date} className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl"
                    style={{ background: em ? em.bg : "#F4F0EA", border: em ? `1.5px solid ${em.border}` : "1.5px solid #E4DDD3" }}>
                    {Icon && <Icon size={15} strokeWidth={1.5} style={{ color: em!.color }} />}
                  </div>
                  <span style={{ fontSize: 10, color: "#A09588" }}>{day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Distribution */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
          className="p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#A09588", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>감정 분포</p>
          <div className="space-y-4">
            {sorted.map(([type, count], i) => {
              const em = getEmotion(type as EmotionType);
              const Icon = em.icon;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={type} className="flex items-center gap-3">
                  <Icon size={15} strokeWidth={1.5} style={{ color: em.color, flexShrink: 0 }} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#2A2420" }}>{em.label}</span>
                      <span style={{ fontSize: 12, color: "#A09588" }}>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "#EDE8E0" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                        className="h-full rounded-full" style={{ background: em.color, opacity: 0.6 }} />
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
