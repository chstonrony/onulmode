"use client";

import { motion } from "framer-motion";
import { MoodEntry } from "@/types";
import { getEmotion } from "@/lib/emotions";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { X } from "lucide-react";

export default function EmotionSignatureCard({ entry, onClose }: { entry: MoodEntry; onClose?: () => void }) {
  const em = getEmotion(entry.emotion);
  const Icon = em.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden p-7"
      style={{ borderRadius: 4, background: em.bg, border: `1.5px solid ${em.border}` }}>

      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ background: "rgba(0,0,0,0.06)", color: em.color }}>
          <X size={14} strokeWidth={2} />
        </button>
      )}

      <p style={{ fontSize: 11, color: em.color, fontWeight: 500, letterSpacing: "0.08em", opacity: 0.7, marginBottom: 20 }}>
        {format(new Date(entry.date), "yyyy년 M월 d일 EEEE", { locale: ko })}
      </p>

      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${em.border}` }}>
          <Icon size={26} strokeWidth={1.5} style={{ color: em.color }} />
        </div>
        <div>
          <p style={{ fontSize: 28, fontWeight: 700, color: em.color, lineHeight: 1.1 }}>{em.label}</p>
          <p style={{ fontSize: 13, color: em.color, opacity: 0.6, marginTop: 2 }}>{em.labelEn}</p>
        </div>
      </div>

      {entry.title && (
        <p style={{ fontSize: 16, color: "#2A2420", lineHeight: 1.6, fontWeight: 500, borderLeft: `3px solid ${em.border}`, paddingLeft: 14, marginBottom: 18 }}>
          {entry.title}
        </p>
      )}

      <div className="flex items-center gap-3">
        <span style={{ fontSize: 11, color: em.color, opacity: 0.6 }}>강도</span>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ width: i < entry.intensity ? 18 : 6, height: 4, borderRadius: 2, background: i < entry.intensity ? em.color : `${em.border}`, opacity: i < entry.intensity ? 0.7 : 0.3, transition: "all 0.3s" }} />
          ))}
        </div>
        <span style={{ fontSize: 11, color: em.color, opacity: 0.6 }}>{entry.intensity}/5</span>
      </div>
    </motion.div>
  );
}
