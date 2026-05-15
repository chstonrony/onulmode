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

const BG = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";
const ROSE = "#C8607A";

export default function ArchivePage() {
  const { entries, loaded } = useMoodStore();
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[0,1,2].map(i => <div key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: ROSE }} />)}
      </div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title="파쇄함" />
      <div style={{ padding: "16px 20px 80px" }}>

        {/* 캘린더 */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          style={{ padding: 20, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, marginBottom: 16 }}>
          <MoodCalendar entries={entries} />
        </motion.div>

        {/* 통계 */}
        {entries.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
            {[
              { value: entries.length, unit: "일", label: "총 기록", color: ROSE },
              { value: getStreak(entries), unit: "일", label: "연속 기록", color: "#B8860B" },
              { value: getTopLabel(entries), unit: "", label: "주요 감정", color: "#7A5A9A", isText: true },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0",
                borderRight: i < 2 ? `1px solid ${LINE}` : "none",
              }}>
                {s.isText
                  ? <span style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: "var(--font-serif)" }}>{s.value}</span>
                  : <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1, fontFamily: "var(--font-serif)" }}>{s.value}</span>
                      <span style={{ fontSize: 11, color: "#A89880" }}>{s.unit}</span>
                    </div>
                }
                <span style={{ fontSize: 11, color: "#A89880", marginTop: 4 }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* 목록 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em" }}>RECORDS</p>
          <Link href="/today" style={{ fontSize: 12, color: ROSE, fontFamily: "var(--font-serif)", textDecoration: "none", fontWeight: 700 }}>
            + 오늘 기록
          </Link>
        </div>

        {entries.length === 0 ? <EmptyState /> : (
          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden" }}>
            {sorted.map((entry, i) => {
              const em = getEmotion(entry.emotion);
              const Icon = em.icon;
              return (
                <motion.div key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <Link href={`/archive/${entry.date}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 18px",
                      borderBottom: i < sorted.length - 1 ? `1px solid ${LINE}` : "none",
                      borderLeft: `3px solid ${em.color}`,
                    }}>
                      <div style={{
                        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        width: 36, height: 36, borderRadius: 4,
                        background: em.bg, border: `1px solid ${em.border}`,
                      }}>
                        <Icon size={16} strokeWidth={1.5} style={{ color: em.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: em.color, fontFamily: "var(--font-serif)" }}>{em.label}</span>
                          <span style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace" }}>{format(new Date(entry.date), "M.d EEE", { locale: ko })}</span>
                        </div>
                        <p style={{ fontSize: 13, color: entry.title ? "#3A3228" : "#A89880", fontWeight: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {entry.title || entry.body || "—"}
                        </p>
                      </div>
                      <ChevronRight size={13} strokeWidth={1.5} style={{ color: "#C8BDB0", flexShrink: 0 }} />
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", textAlign: "center",
        background: "#F5EFE0", border: "1px dashed #D8CEC0", borderRadius: 4 }}>
      <p style={{ fontSize: 32, marginBottom: 16 }}>📓</p>
      <p style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 8 }}>
        아직 기록이 없어요
      </p>
      <p style={{ fontSize: 13, color: "#A89880", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
        오늘의 감정을 처음으로 기록해보세요.
      </p>
      <Link href="/today" style={{
        display: "inline-flex", alignItems: "center",
        background: "#C8607A", color: "#F5EFE0",
        padding: "10px 24px", borderRadius: 4,
        fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700,
        textDecoration: "none",
      }}>
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
