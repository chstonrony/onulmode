"use client";

import { useMoodStore } from "@/hooks/useMoodStore";
import TopBar from "@/components/layout/TopBar";
import { getEmotion } from "@/lib/emotions";
import { EmotionType } from "@/types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

const BG = "#EDE4D0";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";
const ROSE = "#C8607A";

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
      <div style={{ padding: "20px 20px 80px" }}>

        {/* 프로필 카드 */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "36px 24px", textAlign: "center",
            background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, marginBottom: 14,
          }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 72, height: 72, marginBottom: 16, borderRadius: 4,
            background: top ? top.bg : "#D8CEC0", border: top ? `1px solid ${top.border}` : `1px solid ${LINE}`,
          }}>
            {top
              ? (() => { const Icon = top.icon; return <Icon size={30} strokeWidth={1.2} style={{ color: top.color }} />; })()
              : <span style={{ fontSize: 28 }}>🌱</span>
            }
          </div>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#2A2520", fontFamily: "var(--font-serif)" }}>
            나의 감정 기록
          </p>
          {first && (
            <p style={{ fontSize: 12, color: "#A89880", marginTop: 6, fontFamily: "monospace" }}>
              {format(new Date(first.date), "yyyy.MM.dd", { locale: ko })}부터
            </p>
          )}
          {top && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6, marginTop: 14,
              padding: "6px 16px", background: top.bg, border: `1px solid ${top.border}`, borderRadius: 4,
            }}>
              <span style={{ fontSize: 13, color: top.color, fontWeight: 700, fontFamily: "var(--font-serif)" }}>
                대표 감정 — {top.label}
              </span>
            </div>
          )}
          {entries.length === 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 13, color: "#A89880", marginBottom: 14, fontWeight: 300 }}>
                아직 기록이 없어요.<br/>오늘의 감정을 처음으로 남겨보세요.
              </p>
              <Link href="/today" style={{
                display: "inline-flex", alignItems: "center",
                background: ROSE, color: "#F5EFE0",
                padding: "10px 24px", borderRadius: 4,
                fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700,
                textDecoration: "none",
              }}>
                첫 기록 시작하기
              </Link>
            </div>
          )}
        </motion.div>

        {/* 통계 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          {[
            { label: "총 기록 일수", value: entries.length, unit: "일", color: ROSE },
            { label: "이번 달 기록", value: thisMonth, unit: "일", color: "#B8860B" },
          ].map(s => (
            <div key={s.label} style={{ padding: "18px 16px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1, fontFamily: "var(--font-serif)" }}>{s.value}</span>
                <span style={{ fontSize: 12, color: "#A89880" }}>{s.unit}</span>
              </div>
              <span style={{ fontSize: 12, color: "#A89880" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 소개 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}
          style={{ padding: "18px 20px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, marginBottom: 14 }}>
          <p style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 10 }}>ABOUT</p>
          <p style={{ fontSize: 14, color: "#5A5248", lineHeight: 1.85, fontWeight: 300 }}>
            오늘무드는 오늘의 감정을 기록하고, 쌓인 마음을 버리는 감성 웹 서비스예요.
            감정을 쓰고 버리는 행위 자체가 작은 돌봄이 돼요.
          </p>
        </motion.div>

        {/* 링크 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { href: "/about", label: "서비스 소개" },
            { href: "/blog", label: "감정 이야기" },
            { href: "/privacy", label: "개인정보처리방침" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 18px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4,
              color: "#5A5248", fontSize: 14, fontFamily: "var(--font-serif)", textDecoration: "none",
            }}>
              <span>{label}</span>
              <span style={{ color: "#C8BDB0", fontSize: 16 }}>→</span>
            </Link>
          ))}
        </motion.div>

        <p style={{ fontSize: 11, color: "#C4BAB0", textAlign: "center", marginTop: 28, fontFamily: "monospace" }}>
          ONULMODE v0.1.0
        </p>
      </div>
    </div>
  );
}
