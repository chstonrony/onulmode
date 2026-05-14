"use client";

import { useMoodStore } from "@/hooks/useMoodStore";
import TopBar from "@/components/layout/TopBar";
import { getEmotion } from "@/lib/emotions";
import { EmotionType } from "@/types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const BG = "#FAF8F4";

export default function ProfilePage() {
  const { entries, loaded } = useMoodStore();
  const top = (() => {
    if (!entries.length) return null;
    const c: Record<string, number> = {};
    entries.forEach(e => { c[e.emotion] = (c[e.emotion] || 0) + 1; });
    return getEmotion(Object.entries(c).sort(([,a],[,b]) => b - a)[0][0] as EmotionType);
  })();
  const first = entries.length ? [...entries].sort((a,b) => a.date.localeCompare(b.date))[0] : null;
  const thisMonth = entries.filter(e => e.date.startsWith(format(new Date(), "yyyy-MM"))).length;

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title="나" />
      <div className="px-5 pt-6 pb-12">

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-10 text-center rounded-2xl mb-5"
          style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3" }}>
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl mb-5"
            style={{ background: top ? top.bg : "#F4F0EA", border: top ? `1.5px solid ${top.border}` : "1.5px solid #E4DDD3" }}>
            {top
              ? (() => { const Icon = top.icon; return <Icon size={34} strokeWidth={1.2} style={{ color: top.color }} />; })()
              : <span style={{ fontSize: 32 }}>🌱</span>
            }
          </div>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#2A2420" }}>나의 감정 기록</p>
          {first && <p style={{ fontSize: 12, color: "#A09588", marginTop: 5 }}>{format(new Date(first.date), "yyyy.MM.dd", { locale: ko })}부터</p>}
          {top && (
            <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-lg" style={{ background: top.bg, border: `1px solid ${top.border}` }}>
              <span style={{ fontSize: 12, color: top.color, fontWeight: 600 }}>대표 감정 — {top.label}</span>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "총 기록 일수", value: entries.length, unit: "일", color: "#4A7C59" },
            { label: "이번 달 기록", value: thisMonth, unit: "일", color: "#B8860B" },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3" }}>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span style={{ fontSize: 30, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontSize: 13, color: "#A09588" }}>{s.unit}</span>
              </div>
              <span style={{ fontSize: 12, color: "#A09588" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}
          className="p-5 rounded-2xl mb-5" style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#A09588", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>About</p>
          <p style={{ fontSize: 14, color: "#6B6258", lineHeight: 1.8 }}>
            오늘무드는 매일 나의 감정을 기록하고 색으로 표현하는 감성 기록 서비스입니다.
            감정을 쓰는 행위 자체가 심리적 돌봄이 됩니다.
          </p>
        </motion.div>

        <p style={{ fontSize: 11, color: "#C4BAB0", textAlign: "center" }}>ONULMODE v0.1.0</p>
      </div>
    </div>
  );
}
