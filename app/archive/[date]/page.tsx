"use client";

import { use } from "react";
import { useMoodStore } from "@/hooks/useMoodStore";
import TopBar from "@/components/layout/TopBar";
import EmotionSignatureCard from "@/components/mood/EmotionSignatureCard";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { Trash2 } from "lucide-react";

const BG = "#FAF8F4";

export default function ArchiveDatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = use(params);
  const { getEntryByDate, deleteEntry, loaded } = useMoodStore();

  if (!loaded) return (
    <div className="flex items-center justify-center h-screen" style={{ background: BG }}>
      <div className="flex gap-2">{[0,1,2].map(i => <div key={i} className="pulse-dot w-2 h-2 rounded-full" style={{ background: "#4A7C59" }} />)}</div>
    </div>
  );

  const entry = getEntryByDate(date);
  const label = format(new Date(date), "M월 d일 EEEE", { locale: ko });

  if (!entry) return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar showBack backHref="/archive" title={label} />
      <div className="flex flex-col items-center py-24 text-center px-6">
        <p style={{ fontSize: 14, color: "#A09588", marginBottom: 8 }}>{label}</p>
        <p style={{ fontSize: 17, fontWeight: 600, color: "#2A2420", marginBottom: 24 }}>이 날의 기록이 없어요</p>
        <Link href="/today" className="flex items-center px-5 h-11 rounded-xl font-semibold"
          style={{ background: "#2A2420", color: "#FAF8F4", fontSize: 14 }}>오늘 기록하기</Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar showBack backHref="/archive" title={label} />
      <div className="px-5 pt-4 pb-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <EmotionSignatureCard entry={entry} />
        </motion.div>

        {entry.body && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
            className="mt-4 p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#A09588", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>일기</p>
            <p style={{ fontSize: 15, color: "#6B6258", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{entry.body}</p>
          </motion.div>
        )}

        {entry.createdAt && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 11, color: "#C4BAB0", marginTop: 14, textAlign: "right" }}>
            {format(new Date(entry.createdAt), "HH:mm에 기록")}
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-3 mt-6">
          <Link href="/archive" className="flex-1 flex items-center justify-center h-11 rounded-xl font-medium"
            style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3", color: "#2A2420", fontSize: 13 }}>목록으로</Link>
          <button onClick={() => { if (confirm("이 기록을 삭제할까요?")) { deleteEntry(entry.id); window.location.href = "/archive"; } }}
            className="flex items-center justify-center gap-1.5 px-4 h-11 rounded-xl"
            style={{ background: "#F4F0EA", color: "#A09588", fontSize: 13 }}>
            <Trash2 size={13} strokeWidth={1.8} /> 삭제
          </button>
        </motion.div>
      </div>
    </div>
  );
}
