"use client";

import { useMoodStore } from "@/hooks/useMoodStore";
import MoodCalendar from "@/components/mood/MoodCalendar";
import TopBar from "@/components/layout/TopBar";
import { getEmotion } from "@/lib/emotions";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const BG = "#FAF8F4";

export default function ArchivePage() {
  const { entries, loaded } = useMoodStore();
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  if (!loaded) return (
    <div className="flex items-center justify-center h-screen" style={{ background: BG }}>
      <div className="flex gap-2">{[0,1,2].map(i => <div key={i} className="pulse-dot w-2 h-2 rounded-full" style={{ background: "#4A7C59" }} />)}</div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title="아카이브" />
      <div className="px-5 pt-4 pb-12">

        {/* Calendar card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="p-5 rounded-2xl mb-5" style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
          <MoodCalendar entries={entries} />
        </motion.div>

        {/* Stats */}
        {entries.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-3 rounded-2xl mb-5 overflow-hidden"
            style={{ border: "1.5px solid #E4DDD3", background: "#FFFFFF" }}>
            {[
              { value: entries.length, unit: "일", label: "총 기록", color: "#4A7C59" },
              { value: getStreak(entries), unit: "일", label: "연속 기록", color: "#B8860B" },
              { value: getTopLabel(entries), unit: "", label: "주요 감정", color: "#A04040", isText: true },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center py-4"
                style={{ borderRight: i < 2 ? "1px solid #E4DDD3" : "none" }}>
                {s.isText
                  ? <span style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</span>
                  : <div className="flex items-baseline gap-0.5">
                      <span style={{ fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</span>
                      <span style={{ fontSize: 12, color: "#A09588" }}>{s.unit}</span>
                    </div>
                }
                <span style={{ fontSize: 11, color: "#A09588", marginTop: 4 }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* List header */}
        <div className="flex items-center justify-between mb-3">
          <p style={{ fontSize: 12, fontWeight: 500, color: "#A09588" }}>기록 목록</p>
          <Link href="/today" style={{ fontSize: 12, color: "#4A7C59", fontWeight: 500 }}>+ 오늘 기록</Link>
        </div>

        {entries.length === 0 ? <EmptyState /> : (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #E4DDD3" }}>
            {sorted.map((entry, i) => {
              const em = getEmotion(entry.emotion);
              const Icon = em.icon;
              return (
                <motion.div key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <Link href={`/archive/${entry.date}`}>
                    <div className="flex items-center gap-4 px-4 py-4 bg-white"
                      style={{ borderBottom: i < sorted.length - 1 ? "1px solid #F4F0EA" : "none" }}>
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
                        style={{ background: em.bg, border: `1.5px solid ${em.border}` }}>
                        <Icon size={18} strokeWidth={1.5} style={{ color: em.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span style={{ fontSize: 12, fontWeight: 600, color: em.color }}>{em.label}</span>
                          <span style={{ fontSize: 11, color: "#A09588" }}>{format(new Date(entry.date), "M.d EEE", { locale: ko })}</span>
                        </div>
                        <p className="truncate" style={{ fontSize: 14, color: entry.title ? "#2A2420" : "#A09588", fontWeight: entry.title ? 500 : 400 }}>
                          {entry.title || entry.body || "—"}
                        </p>
                      </div>
                      <ChevronRight size={14} strokeWidth={1.5} style={{ color: "#D4CBC0", flexShrink: 0 }} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-16 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
        style={{ background: "#EEF5F0", border: "1.5px solid #AECFBA" }}>
        <span style={{ fontSize: 28 }}>🌱</span>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 600, color: "#2A2420", marginBottom: 8 }}>아직 기록이 없어요</h3>
      <p style={{ fontSize: 14, color: "#A09588", lineHeight: 1.65, marginBottom: 24 }}>첫 번째 감정 기록을 남겨보세요.</p>
      <Link href="/today" className="flex items-center gap-2 px-6 h-11 rounded-xl font-semibold"
        style={{ background: "#2A2420", color: "#FAF8F4", fontSize: 14 }}>
        첫 기록 시작하기
      </Link>
    </motion.div>
  );
}

function getStreak(entries: { date: string }[]): number {
  if (!entries.length) return 0;
  const dates = new Set(entries.map(e => e.date));
  let streak = 0;
  const cur = new Date();
  while (true) {
    const d = format(cur, "yyyy-MM-dd");
    if (dates.has(d)) { streak++; cur.setDate(cur.getDate() - 1); } else break;
  }
  return streak;
}

function getTopLabel(entries: { emotion: string }[]): string {
  const c: Record<string, number> = {};
  entries.forEach(e => { c[e.emotion] = (c[e.emotion] || 0) + 1; });
  const top = Object.entries(c).sort(([,a],[,b]) => b - a)[0];
  return top ? getEmotion(top[0] as any).label : "—";
}
