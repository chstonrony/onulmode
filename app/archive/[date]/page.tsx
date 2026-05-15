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

const BG = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";
const ROSE = "#C8607A";

export default function ArchiveDatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = use(params);
  const { getEntryByDate, deleteEntry, loaded } = useMoodStore();

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[0,1,2].map(i => <div key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: ROSE }} />)}
      </div>
    </div>
  );

  const entry = getEntryByDate(date);
  const label = format(new Date(date), "M월 d일 EEEE", { locale: ko });

  if (!entry) return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar showBack backHref="/archive" title={label} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#A89880", marginBottom: 8 }}>{label}</p>
        <p style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 24 }}>
          이 날의 기록이 없어요
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

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar showBack backHref="/archive" title={label} />
      <div style={{ padding: "16px 20px 80px" }}>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <EmotionSignatureCard entry={entry} />
        </motion.div>

        {entry.body && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
            style={{ marginTop: 14, padding: "20px 20px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
            <p style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              일기
            </p>
            <p style={{ fontSize: 15, color: "#5A5248", lineHeight: 1.85, whiteSpace: "pre-wrap", fontWeight: 300 }}>
              {entry.body}
            </p>
          </motion.div>
        )}

        {entry.createdAt && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 11, color: "#B4A890", marginTop: 12, textAlign: "right", fontFamily: "monospace" }}>
            {format(new Date(entry.createdAt), "HH:mm에 기록")}
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <Link href="/archive" style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            height: 44, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4,
            color: "#5A5248", fontSize: 13, fontFamily: "var(--font-serif)", fontWeight: 700,
            textDecoration: "none",
          }}>목록으로</Link>
          <button onClick={() => {
            if (confirm("이 기록을 삭제할까요?")) { deleteEntry(entry.id); window.location.href = "/archive"; }
          }} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "0 18px", height: 44, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4,
            color: "#A89880", fontSize: 13, cursor: "pointer",
          }}>
            <Trash2 size={13} strokeWidth={1.8} /> 삭제
          </button>
        </motion.div>
      </div>
    </div>
  );
}
