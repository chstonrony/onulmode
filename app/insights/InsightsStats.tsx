"use client";

// 개인 감정 기록 통계 (localStorage 기반) — 클라이언트 전용.
// 서버 렌더 시점에는 아무것도 출력하지 않으므로, 페이지의 정적 콘텐츠(SSR) 노출을 막지 않는다.

import { useMoodStore } from "@/hooks/useMoodStore";
import { getEmotion } from "@/lib/emotions";
import { useLocale } from "@/context/LocaleContext";
import { EmotionType } from "@/types";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";

const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";
const ROSE = "#C8607A";
const INK = "#2A2520";
const MUTED = "#A89880";

export default function InsightsStats() {
  const { t, locale } = useLocale();
  const { entries, loaded } = useMoodStore();

  // 서버 렌더 및 로딩 중에는 출력 없음 (정적 콘텐츠가 그대로 노출되도록)
  if (!loaded) return null;

  // 기록 부족 — 빈 페이지처럼 보이지 않도록 부드러운 안내 배너
  if (entries.length < 3) {
    return (
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "16px 18px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6,
      }}>
        <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.2 }}>🌱</span>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#5A5246", fontFamily: "var(--font-prose)", fontWeight: 300 }}>
          {locale === "ko"
            ? "아직 개인 감정 기록이 충분하지 않아요. 며칠간 기록이 쌓이면 이 자리에 나만의 감정 흐름과 통계가 나타납니다. 그동안 아래 감정 이야기를 먼저 둘러보세요."
            : "You don't have enough personal records yet. Once a few days accumulate, your own emotional flow and stats will appear here. In the meantime, explore the emotion notes below."}
        </p>
      </div>
    );
  }

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
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.12em" }}>
        {locale === "ko" ? "나의 기록 요약" : "YOUR RECORD SUMMARY"}
      </p>

      {/* 대표 감정 */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ padding: 20, background: top.bg, border: `1px solid ${top.border}`, borderRadius: 4 }}>
        <p style={{ fontSize: 11, color: top.color, opacity: 0.7, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 16 }}>
          {t.insights.topEmotion}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {(() => { const Icon = top.icon; return (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 52, height: 52, background: "rgba(255,255,255,0.7)", border: `1px solid ${top.border}`, borderRadius: 4,
            }}>
              <Icon size={24} strokeWidth={1.5} style={{ color: top.color }} />
            </div>
          ); })()}
          <div>
            <p style={{ fontSize: 26, fontWeight: 700, color: top.color, lineHeight: 1, fontFamily: "var(--font-serif)" }}>{top.label}</p>
            <p style={{ fontSize: 12, color: top.color, opacity: 0.6, marginTop: 4 }}>
              {Math.round((counts[top.type] / total) * 100)}% · {counts[top.type]}회
            </p>
          </div>
        </div>
      </motion.div>

      {/* 통계 3칸 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden" }}>
        {[
          { value: total, unit: locale === "ko" ? "일" : "d", label: t.insights.totalRecords, color: ROSE },
          { value: avg, unit: "/5", label: t.insights.avgIntensity, color: "#B8860B" },
          { value: sorted.length, unit: locale === "ko" ? "종류" : "", label: t.insights.emotionTypes, color: "#7A5A9A" },
        ].map((s, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0",
            borderRight: i < 2 ? `1px solid ${LINE}` : "none",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1, fontFamily: "var(--font-serif)" }}>{s.value}</span>
              <span style={{ fontSize: 11, color: MUTED }}>{s.unit}</span>
            </div>
            <span style={{ fontSize: 11, color: MUTED, marginTop: 5 }}>{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* 최근 7일 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
        style={{ padding: 20, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
        <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 16 }}>{t.insights.last7days}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {last7.map(({ date, entry, day }) => {
            const em = entry ? getEmotion(entry.emotion) : null;
            const Icon = em?.icon;
            return (
              <div key={date} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: 4,
                  background: em ? em.bg : "#D8CEC0", border: em ? `1px solid ${em.border}` : `1px solid ${LINE}`,
                }}>
                  {Icon && <Icon size={14} strokeWidth={1.5} style={{ color: em!.color }} />}
                </div>
                <span style={{ fontSize: 10, color: MUTED }}>{day}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 감정 분포 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
        style={{ padding: 20, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
        <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 16 }}>{t.insights.distribution}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {sorted.map(([type, count], i) => {
            const em = getEmotion(type as EmotionType);
            const Icon = em.icon;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon size={14} strokeWidth={1.5} style={{ color: em.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: "var(--font-serif)" }}>{em.label}</span>
                    <span style={{ fontSize: 11, color: MUTED }}>{pct}%</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: LINE }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 2, background: em.color, opacity: 0.7 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
