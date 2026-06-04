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
import UgogiTrace from "@/components/ugogi/UgogiTrace";
import { useLocale } from "@/context/LocaleContext";
import { Pencil, CalendarDays } from "lucide-react";
import Link from "next/link";

const BG = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";
const ROSE = "#C8607A";
const TODAY = format(new Date(), "yyyy-MM-dd");

type Step = "select" | "write" | "done";

export default function TodayPage() {
  const { t, locale } = useLocale();
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[0,1,2].map(i => <div key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: ROSE }} />)}
      </div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar
        title={locale === "ko" ? format(new Date(), "M월 d일 EEEE", { locale: ko }) : format(new Date(), "MMM d, EEEE")}
        rightAction={step === "done" ? (
          <button onClick={reset} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, background: "#D8CEC0", color: "#7A7260",
            borderRadius: 4, border: "none", cursor: "pointer",
          }}>
            <Pencil size={13} strokeWidth={1.5} />
          </button>
        ) : undefined}
      />

      <div style={{ padding: "20px 20px 80px" }}>
        <AnimatePresence mode="wait">

          {/* SELECT */}
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 10 }}>
                  TODAY&apos;S MOOD
                </p>
                <h2 style={{ fontSize: 24, color: "#2A2520", lineHeight: 1.3, fontFamily: "var(--font-serif)", fontWeight: 700 }}>
                  {t.today.selectPrompt.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </h2>
              </div>

              <EmotionWheel selected={emotion} onSelect={setEmotion} />

              <AnimatePresence>
                {emotion && cfg && (
                  <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    onClick={() => setStep("write")}
                    style={{
                      width: "100%", marginTop: 24,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      height: 50, background: cfg.color, color: "#FFFFFF",
                      fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700,
                      borderRadius: 4, border: "none", cursor: "pointer",
                    }}>
                    {t.today.next}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* WRITE */}
          {step === "write" && cfg && (
            <motion.div key="write" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              {/* 감정 뱃지 */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
                padding: "14px 16px", background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 4,
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 38, height: 38, background: PAPER, border: `1px solid ${cfg.border}`, borderRadius: 4,
                }}>
                  {(() => { const Icon = cfg.icon; return <Icon size={18} strokeWidth={1.5} style={{ color: cfg.color }} />; })()}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: cfg.color, fontFamily: "var(--font-serif)" }}>{cfg.label}</p>
                  <p style={{ fontSize: 12, color: cfg.color, opacity: 0.6 }}>{cfg.labelEn}</p>
                </div>
                <button onClick={() => setStep("select")} style={{ fontSize: 12, color: "#A89880", fontFamily: "var(--font-serif)", background: "none", border: "none", cursor: "pointer" }}>
                  {t.common.change}
                </button>
              </div>

              {/* 강도 */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", display: "block", marginBottom: 10 }}>
                  INTENSITY
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1,2,3,4,5].map((v) => (
                    <button key={v} onClick={() => setIntensity(v)} style={{
                      flex: 1, height: 40, fontWeight: 700, fontFamily: "var(--font-serif)",
                      background: v <= intensity ? cfg.bg : PAPER,
                      border: `1px solid ${v <= intensity ? cfg.border : LINE}`,
                      color: v <= intensity ? cfg.color : "#A89880",
                      fontSize: 14, borderRadius: 4, cursor: "pointer",
                    }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 한 줄 요약 */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", display: "block", marginBottom: 10 }}>
                  ONE LINE
                </label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                  placeholder={t.today.inputPlaceholder} maxLength={80}
                  style={{
                    width: "100%", height: 48, padding: "0 14px",
                    background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4,
                    color: "#2A2520", fontSize: 15, outline: "none",
                    fontFamily: "var(--font-serif)",
                  }} />
              </div>

              {/* 일기 */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", display: "block", marginBottom: 10 }}>
                  {t.today.diary} <span style={{ fontSize: 10, fontWeight: 400 }}>{t.today.diaryOpt}</span>
                </label>
                <textarea value={body} onChange={e => setBody(e.target.value)}
                  placeholder={t.today.bodyPlaceholder} maxLength={2000} rows={6}
                  style={{
                    width: "100%", padding: "14px", resize: "none",
                    background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4,
                    color: "#2A2520", fontSize: 15, lineHeight: 1.75, outline: "none",
                    fontFamily: "var(--font-serif)",
                  }} />
                <p style={{ textAlign: "right", marginTop: 4, fontSize: 11, color: "#C4BAB0", fontFamily: "monospace" }}>
                  {body.length}/2000
                </p>
              </div>

              <button onClick={handleSave} disabled={saving} style={{
                width: "100%", height: 50,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: saving ? cfg.bg : cfg.color,
                color: saving ? cfg.color : "#FFFFFF",
                border: saving ? `1px solid ${cfg.border}` : "none",
                fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700,
                borderRadius: 4, cursor: saving ? "not-allowed" : "pointer",
              }}>
                {saving ? t.today.saving : t.today.save}
              </button>
            </motion.div>
          )}

          {/* DONE */}
          {step === "done" && saved && (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

              {/* 접수 확인 헤더 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em" }}>
                  {t.today.record}
                </p>
                <p style={{ fontSize: 9, color: "#B4A890", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                  {format(new Date(), "HH:mm")} · UGOGI-LAB
                </p>
              </div>

              <EmotionSignatureCard entry={saved} />

              {saved.body && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  style={{ marginTop: 12, padding: "16px 18px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 3 }}>
                  <p style={{
                    fontSize: 14, color: "#5A5248", lineHeight: 1.95,
                    whiteSpace: "pre-wrap", fontFamily: "var(--font-prose)", fontWeight: 300, letterSpacing: "-0.01em",
                  }}>
                    {saved.body}
                  </p>
                </motion.div>
              )}

              {/* 우걱이 처리 메시지 */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                style={{ marginTop: 12 }}>
                <UgogiTrace variant="rose" />
              </motion.div>

              {/* 우걱이 감정별 코멘트 */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                style={{
                  marginTop: 10, padding: "11px 16px",
                  background: `${ROSE}08`, border: `1px dashed #D8CEC0`, borderRadius: 3,
                }}>
                <p style={{
                  fontSize: 13, color: "#7A7260", lineHeight: 1.8,
                  fontFamily: "var(--font-prose)", fontWeight: 300, letterSpacing: "-0.01em",
                }}>
                  {getMsg(saved.emotion)}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <Link href="/archive" style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  height: 44, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 3,
                  color: "#5A5248", fontSize: 13, fontFamily: "var(--font-prose)", fontWeight: 300,
                  textDecoration: "none", letterSpacing: "-0.01em",
                }}>
                  <CalendarDays size={14} strokeWidth={1.5} /> {t.today.toArchive}
                </Link>
                <button onClick={reset} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  height: 44, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 3,
                  color: "#A89880", fontSize: 13, fontFamily: "var(--font-prose)", fontWeight: 300,
                  cursor: "pointer", letterSpacing: "-0.01em",
                }}>
                  {t.today.edit}
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
    joy:      "기쁨 접수 완료. 우걱이가 이상하게 부끄러워함. 자주 와도 됨.",
    calm:     "평온 상태 확인됨. 특이사항 없음. 이 상태 유지 권장.",
    excited:  "설렘 감정 접수됨. 에너지 과부하 주의. 잘 쓸 것.",
    grateful: "감사 감정 처리됨. 우걱이가 조용히 좋아함. 상태 양호.",
    sad:      "슬픔 접수됨. 삭히지 말고 이쪽에 두고 가세요. 처리 중.",
    anxious:  "불안 감정 접수됨. 혼자 들고 있지 말 것. 우걱이 처리 대기열 추가 완료.",
    angry:    "분노 감정 접수 완료. 처리 온도 높음. 잘 던졌음.",
    tired:    "피로 감정 확인됨. 많이 지쳤음 인정. 오늘은 쉬는 게 처방임.",
  };
  return m[emotion];
}
