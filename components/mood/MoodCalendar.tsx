"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodEntry } from "@/types";
import { getEmotion } from "@/lib/emotions";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function MoodCalendar({ entries }: { entries: MoodEntry[] }) {
  const [current, setCurrent] = useState(new Date());
  const [dir, setDir] = useState(0);
  const map = Object.fromEntries(entries.map((e) => [e.date, e]));
  const days = eachDayOfInterval({ start: startOfWeek(startOfMonth(current), { weekStartsOn: 0 }), end: endOfWeek(endOfMonth(current), { weekStartsOn: 0 }) });
  const go = (d: number) => { setDir(d); setCurrent((m) => d > 0 ? addMonths(m, 1) : subMonths(m, 1)); };
  const monthEntries = entries.filter((e) => e.date.startsWith(format(current, "yyyy-MM")));

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => go(-1)} className="flex items-center justify-center w-8 h-8" style={{ background: "#D8CEC0", color: "#7A7260", borderRadius: 4 }}><ChevronLeft size={16} strokeWidth={1.5} /></button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#2A2520", fontFamily: "var(--font-serif)" }}>{format(current, "yyyy년 M월", { locale: ko })}</span>
        <button onClick={() => go(1)} className="flex items-center justify-center w-8 h-8" style={{ background: "#D8CEC0", color: "#7A7260", borderRadius: 4 }}><ChevronRight size={16} strokeWidth={1.5} /></button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => <div key={d} className="text-center" style={{ fontSize: 11, color: "#A89880", fontWeight: 500, paddingBottom: 6 }}>{d}</div>)}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={format(current, "yyyy-MM")} initial={{ opacity: 0, x: dir * 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -14 }} transition={{ duration: 0.2 }} className="grid grid-cols-7 gap-y-1.5">
          {days.map((day) => {
            const ds = format(day, "yyyy-MM-dd");
            const entry = map[ds];
            const em = entry ? getEmotion(entry.emotion) : null;
            const inMonth = isSameMonth(day, current);
            const today = isToday(day);
            return (
              <div key={ds} className="flex items-center justify-center">
                {entry ? (
                  <Link href={`/archive/${ds}`}>
                    <div className="flex items-center justify-center rounded-xl transition-transform active:scale-90" style={{ width: 36, height: 36, background: em!.bg, border: `1.5px solid ${em!.border}` }}>
                      <span style={{ fontSize: 12, color: em!.color, fontWeight: 600 }}>{format(day, "d")}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center" style={{ width: 36, height: 36, background: today ? "#C8607A" : "transparent", borderRadius: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: today ? 700 : 400, color: today ? "#F5EFE0" : inMonth ? "#5A5248" : "#C8BDB0" }}>{format(day, "d")}</span>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {monthEntries.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 pt-4" style={{ borderTop: "1px solid #D8CEC0" }}>
          <p style={{ fontSize: 11, color: "#A89880", fontWeight: 500, marginBottom: 10 }}>이번 달 감정 분포</p>
          <Distribution entries={monthEntries} />
        </motion.div>
      )}
    </div>
  );
}

function Distribution({ entries }: { entries: MoodEntry[] }) {
  const c: Record<string, number> = {};
  entries.forEach((e) => { c[e.emotion] = (c[e.emotion] || 0) + 1; });
  const sorted = Object.entries(c).sort(([, a], [, b]) => b - a).slice(0, 4);
  const total = entries.length;
  return (
    <div className="space-y-2">
      {sorted.map(([type, count]) => {
        const em = getEmotion(type as any);
        const pct = Math.round((count / total) * 100);
        return (
          <div key={type} className="flex items-center gap-3">
            <span style={{ fontSize: 12, color: em.color, fontWeight: 600, width: 28 }}>{em.label}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: "#D8CEC0" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="h-full rounded-full" style={{ background: em.color, opacity: 0.6 }} />
            </div>
            <span style={{ fontSize: 11, color: "#A09588", width: 28, textAlign: "right" }}>{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
