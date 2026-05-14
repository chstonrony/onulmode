"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { EmotionType, MoodEntry } from "@/types";
import { getEmotion } from "@/lib/emotions";
import { useMoodStore } from "@/hooks/useMoodStore";
import EmotionWheel from "@/components/mood/EmotionWheel";
import EmotionSignatureCard from "@/components/mood/EmotionSignatureCard";
import TopBar from "@/components/layout/TopBar";
import { Pencil, CalendarDays } from "lucide-react";
import Link from "next/link";

const BG = "#FAF8F4";
const TODAY = format(new Date(), "yyyy-MM-dd");

type Step = "select" | "write" | "done";

export default function TodayPage() {
  const { addEntry, getEntryByDate, loaded } = useMoodStore();
  const existing = loaded ? getEntryByDate(TODAY) : undefined;

  const [step, setStep]           = useState<Step>(existing ? "done" : "select");
  const [emotion, setEmotion]     = useState<EmotionType | null>(existing?.emotion ?? null);
  const [intensity, setIntensity] = useState(existing?.intensity ?? 3);
  const [title, setTitle]         = useState(existing?.title ?? "");
  const [body, setBody]           = useState(existing?.body ?? "");
  const [saved, setSaved]         = useState<MoodEntry | null>(existing ?? null);
  const [saving, setSaving]       = useState(false);

  const cfg = emotion ? getEmotion(emotion) : null;

  const handleSave = async () => {
    if (!emotion || saving) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    const entry = addEntry({ date: TODAY, emotion, intensity, title, body });
    setSaved(entry);
    setStep("done");
    setSaving(false);
  };

  const reset = () => { setStep("select"); setSaved(null); setEmotion(null); setTitle(""); setBody(""); setIntensity(3); };

  if (!loaded) return (
    <div className="flex items-center justify-center h-screen" style={{ background: BG }}>
      <div className="flex gap-2">{[0,1,2].map(i => <div key={i} className="pulse-dot w-2 h-2 rounded-full" style={{ background: "#4A7C59" }} />)}</div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title={format(new Date(), "M월 d일 EEEE", { locale: ko })}
        rightAction={step === "done" ? (
          <button onClick={reset} className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: "#F4F0EA", color: "#6B6258" }}>
            <Pencil size={14} strokeWidth={1.5} />
          </button>
        ) : undefined} />

      <div className="px-5 pt-5 pb-12">
        <AnimatePresence mode="wait">

          {/* SELECT */}
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="mb-8">
                <p style={{ fontSize: 11, fontWeight: 600, color: "#4A7C59", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>오늘의 감정</p>
                <h2 style={{ fontSize: 26, color: "#2A2420", lineHeight: 1.25, fontFamily: "var(--font-display)" }}>
                  지금 가장 가까운<br />감정을 선택하세요
                </h2>
              </div>

              <EmotionWheel selected={emotion} onSelect={setEmotion} />

              <AnimatePresence>
                {emotion && cfg && (
                  <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    onClick={() => setStep("write")}
                    className="w-full mt-7 flex items-center justify-center font-semibold rounded-xl"
                    style={{ height: 52, background: cfg.color, color: "#FFFFFF", fontSize: 17, fontFamily: "var(--font-display)", border: "none" }}>
                    다음 — 기록하기
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* WRITE */}
          {step === "write" && cfg && (
            <motion.div key="write" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              {/* Emotion badge */}
              <div className="flex items-center gap-3 mb-7 p-4 rounded-2xl" style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}` }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: "#FFFFFF", border: `1px solid ${cfg.border}` }}>
                  {(() => { const Icon = cfg.icon; return <Icon size={20} strokeWidth={1.5} style={{ color: cfg.color }} />; })()}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 16, fontWeight: 600, color: cfg.color }}>{cfg.label}</p>
                  <p style={{ fontSize: 12, color: "#A09588" }}>{cfg.labelEn}</p>
                </div>
                <button onClick={() => setStep("select")} style={{ fontSize: 12, color: "#A09588", fontWeight: 500 }}>변경</button>
              </div>

              {/* Intensity */}
              <div className="mb-6">
                <label style={{ fontSize: 11, fontWeight: 600, color: "#A09588", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>감정 강도</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((v) => (
                    <button key={v} onClick={() => setIntensity(v)} className="flex-1 font-semibold rounded-lg transition-all"
                      style={{ height: 44, background: v <= intensity ? cfg.bg : "#FFFFFF", border: v <= intensity ? `1.5px solid ${cfg.border}` : "1.5px solid #E4DDD3", color: v <= intensity ? cfg.color : "#A09588", fontSize: 14 }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="mb-5">
                <label style={{ fontSize: 11, fontWeight: 600, color: "#A09588", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>한 줄 요약</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="오늘을 한 줄로 표현한다면..." maxLength={80}
                  className="w-full px-4 rounded-xl outline-none"
                  style={{ height: 50, background: "#FFFFFF", border: "1.5px solid #E4DDD3", color: "#2A2420", fontSize: 15 }} />
              </div>

              {/* Body */}
              <div className="mb-8">
                <label style={{ fontSize: 11, fontWeight: 600, color: "#A09588", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                  일기 <span style={{ textTransform: "none", fontWeight: 400 }}>(선택)</span>
                </label>
                <textarea value={body} onChange={e => setBody(e.target.value)}
                  placeholder="오늘 있었던 일, 느낀 것을 자유롭게..." maxLength={2000} rows={6}
                  className="w-full px-4 py-4 rounded-xl outline-none resize-none"
                  style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3", color: "#2A2420", fontSize: 15, lineHeight: 1.75 }} />
                <p className="text-right mt-1" style={{ fontSize: 11, color: "#C4BAB0" }}>{body.length}/2000</p>
              </div>

              <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center rounded-xl font-semibold"
                style={{ height: 52, background: saving ? cfg.bg : cfg.color, color: saving ? cfg.color : "#FFFFFF", border: saving ? `1.5px solid ${cfg.border}` : "none", fontSize: 15, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "저장 중..." : "오늘의 무드 저장"}
              </button>
            </motion.div>
          )}

          {/* DONE */}
          {step === "done" && saved && (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#4A7C59", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>오늘의 기록</p>

              <EmotionSignatureCard entry={saved} />

              {saved.body && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="mt-4 p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3" }}>
                  <p style={{ fontSize: 15, color: "#6B6258", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{saved.body}</p>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="mt-4 p-4 rounded-xl" style={{ borderLeft: "3px solid #4A7C59", paddingLeft: 16 }}>
                <p style={{ fontSize: 13, color: "#6B6258", lineHeight: 1.65 }}>{getMsg(saved.emotion)}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-3 mt-6">
                <Link href="/archive" className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-medium"
                  style={{ background: "#FFFFFF", border: "1.5px solid #E4DDD3", color: "#2A2420", fontSize: 13 }}>
                  <CalendarDays size={15} strokeWidth={1.5} /> 캘린더
                </Link>
                <button onClick={reset} className="flex-1 flex items-center justify-center h-11 rounded-xl font-medium"
                  style={{ background: "#F4F0EA", color: "#6B6258", fontSize: 13 }}>
                  수정하기
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getMsg(emotion: EmotionType): string {
  const m: Record<EmotionType, string> = {
    joy:      "기쁨을 기록해둔 오늘. 이 순간은 시간이 지나도 남아 있을 거예요.",
    calm:     "고요한 하루를 보냈군요. 평온함도 충분히 소중한 감정이에요.",
    excited:  "설레는 에너지가 느껴지는 하루. 그 두근거림을 잊지 마세요.",
    grateful: "감사한 마음을 느꼈다는 것만으로도 오늘은 충분히 좋은 날이에요.",
    sad:      "슬픔도 감정의 일부예요. 충분히 느끼고, 충분히 쉬어가도 괜찮아요.",
    anxious:  "불안한 마음, 알아요. 지금 이 순간 기록한 것만으로도 용감한 일이에요.",
    angry:    "화가 난 감정을 외면하지 않고 기록한 것, 잘 하셨어요.",
    tired:    "많이 지쳤군요. 오늘은 충분히 쉬어도 괜찮아요.",
  };
  return m[emotion];
}
