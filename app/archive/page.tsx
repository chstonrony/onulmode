"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getShredRecords, type ShredRecord } from "@/lib/shredRecords";
import { findSeedByEmotions } from "@/lib/emotionSeeds";
import { useLocale } from "@/context/LocaleContext";
import UgogiGarden from "@/components/ugogi/UgogiGarden";

/* 구형 기록에 퇴비화 결과 실시간 생성 */
function getCompostForRecord(record: ShredRecord) {
  if (record.compostNoun) {
    return {
      noun: record.compostNoun,
      emoji: record.compostEmoji || "🌱",
      translation: record.ugogitranslation || "",
      seed: record.seedQuestion || "",
    };
  }
  /* 구형 기록 — emotions 기반으로 추론 */
  const seed = findSeedByEmotions(record.emotions);
  return {
    noun: seed.compostNoun,
    emoji: seed.compostEmoji,
    translation: seed.ugogitranslation,
    seed: seed.seedQuestion,
  };
}

const INK  = "#1A1410";
const ROSE = "#C8607A";
const BG   = "#efe3cf";
const PAPER = "#FAF8F2";
const LINE = "#D8CEC0";

function timeAgo(iso: string, locale: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (locale === "ko") {
    if (m < 1) return "방금 전";
    if (m < 60) return `${m}분 전`;
    if (h < 24) return `${h}시간 전`;
    if (d < 7) return `${d}일 전`;
    return new Date(iso).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  }
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDate(iso: string, locale: string): string {
  const l = locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : locale === "es" ? "es-ES" : "en-US";
  return new Date(iso).toLocaleDateString(l, { month: "long", day: "numeric", weekday: "short" });
}

/* ── 빈 상태 ── */
function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", textAlign: "center" }}>
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: 52, marginBottom: 24 }}
      >
        🌱
      </motion.div>

      <div style={{ background: "#EFF6EC", border: "2px solid #2A3A2A", borderRadius: 8, padding: "24px 26px", maxWidth: 300, marginBottom: 24, boxShadow: "4px 4px 0 #1A2A1A" }}>
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.14em", marginBottom: 12 }}>
          🌱 감정퇴비실
        </p>
        <p style={{ fontSize: 18, fontFamily: "var(--font-maru)", color: "#2A3A2A", fontWeight: 700, lineHeight: 1.4, marginBottom: 14 }}>
          아직 쌓인 감정퇴비가<br />없습니다.
        </p>
        <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#3A5A3A", lineHeight: 1.9, marginBottom: 14 }}>
          감정은 버려지지 않고,<br />
          가끔 이상한 모양으로 남습니다.
        </p>
        <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#4A6A4A", lineHeight: 1.85 }}>
          오늘 감정 하나를 우걱이에게 던져보세요.<br />
          우걱이가 씹고, 파쇄하고,<br />
          아주 작은 감정퇴비 한 줄을 남겨드립니다.
        </p>
        <div style={{ borderTop: "1px dashed #C4D8BC", paddingTop: 10, marginTop: 14, fontSize: 9, fontFamily: "monospace", color: "#7A9A7A", letterSpacing: "0.06em", lineHeight: 1.6 }}>
          감정은 사라지지 않습니다.<br />모양만 바뀔 뿐입니다.
        </div>
      </div>

      <Link href="/release" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#2A3A2A", color: "#E8F4E4",
        border: "2px solid #2A3A2A", borderRadius: 4,
        padding: "13px 30px", fontSize: 15,
        fontFamily: "var(--font-maru)", fontWeight: 600,
        textDecoration: "none", boxShadow: "4px 4px 0 #1A2A1A",
      }}>
        우걱이한테 던지기 🌱
      </Link>
    </motion.div>
  );
}

/* ── 통계 바 ── */
function StatsBar({ records }: { records: ShredRecord[] }) {
  const today = new Date().toDateString();
  const todayCount = records.filter(r => new Date(r.savedAt).toDateString() === today).length;
  const compostedCount = records.filter(r => r.compostNoun).length;
  const topSeed = (() => {
    const counts: Record<string, number> = {};
    records.forEach(r => { if (r.compostNoun) counts[r.compostNoun] = (counts[r.compostNoun] || 0) + 1; });
    const top = Object.entries(counts).sort(([,a],[,b]) => b - a)[0];
    return top ? `${top[0]}` : "—";
  })();

  return (
    <div style={{ background: PAPER, border: `2px solid ${INK}`, borderRadius: 2, boxShadow: `3px 3px 0 ${INK}`, overflow: "hidden", marginBottom: 14 }}>
      <div style={{ background: INK, padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, fontFamily: "monospace", color: "#FAF8F2", letterSpacing: "0.14em" }}>
          🌱 감정퇴비실 STATS
        </span>
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
          style={{ fontSize: 8, fontFamily: "monospace", color: "#8A9E78" }}>● LIVE</motion.span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {[
          { value: records.length, unit: "건", label: "총 처리" },
          { value: compostedCount, unit: "건", label: "퇴비화 완료" },
          { value: topSeed, unit: "", label: "대표 씨앗", text: true },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", borderRight: i < 2 ? `1px solid ${LINE}` : "none" }}>
            {s.text
              ? <span style={{ fontSize: 13, fontWeight: 700, color: "#6A9B7A", fontFamily: "var(--font-serif)", maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.value}</span>
              : <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: INK, fontFamily: "var(--font-serif)" }}>{s.value}</span>
                  <span style={{ fontSize: 10, color: "#A89880" }}>{s.unit}</span>
                </div>
            }
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#A89880", marginTop: 3, letterSpacing: "0.06em" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 기록 카드 — 감정 여정 전체 표시 (구형 기록도 퇴비화 결과 표시) ── */
function RecordCard({ record, index, locale }: { record: ShredRecord; index: number; locale: string }) {
  const compost = getCompostForRecord(record);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      style={{ marginBottom: 14 }}
    >
      <div style={{ background: PAPER, border: "1.5px solid #C4D8BC", borderRadius: 8, overflow: "hidden" }}>

        {/* 카드 상단 — 날짜 */}
        <div style={{ background: "#0E1A0E", padding: "7px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em" }}>🌱 감정퇴비실</span>
          <span style={{ fontSize: 9, color: "#5A7A5A", fontFamily: "monospace", letterSpacing: "0.06em" }}>
            {formatDate(record.savedAt, locale)}
          </span>
        </div>

        <div style={{ padding: "16px 16px" }}>

          {/* ① 원래 감정 */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 9, color: "#7A9A7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 6 }}>😔 원래 감정</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {record.emotions.map((e, i) => (
                <span key={i} style={{
                  fontSize: 15, color: "#2A3A2A", background: "#EFF6EC",
                  border: "2px solid #C4D8BC", padding: "3px 11px",
                  borderRadius: 20, fontFamily: "var(--font-maru)", fontWeight: 700,
                }}>
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* 화살표 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: "#D4E8CC" }} />
            <span style={{ fontSize: 11, color: "#7A9A7A" }}>↓</span>
            <div style={{ flex: 1, height: 1, background: "#D4E8CC" }} />
          </div>

          {/* ② 파쇄 결과 */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 9, color: "#7A9A7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 5 }}>
              {record.productEmoji} 파쇄 결과
            </p>
            <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#3A3028", fontStyle: "italic", lineHeight: 1.5 }}>
              {record.productName}
            </p>
          </div>

          {/* 화살표 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: "#A8CCA0" }} />
            <span style={{ fontSize: 11, color: "#6A9B7A" }}>↓</span>
            <div style={{ flex: 1, height: 1, background: "#A8CCA0" }} />
          </div>

          {/* ③ 퇴비화 결과 — 항상 표시 */}
          <div style={{ background: "#1A2A1A", borderRadius: 6, padding: "12px 14px", marginBottom: 10 }}>
            <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>🌱 퇴비화 결과</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: compost.translation ? 8 : 0 }}>
              <span style={{ fontSize: 20 }}>{compost.emoji}</span>
              <span style={{ fontSize: 18, fontFamily: "var(--font-maru)", fontWeight: 700, color: "#A8CCA0", letterSpacing: "-0.02em" }}>
                {compost.noun}
              </span>
            </div>
            {compost.translation && (
              <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#7A9A7A", lineHeight: 1.75, fontStyle: "italic" }}>
                {compost.translation}
              </p>
            )}
          </div>

          {/* ④ 감정씨앗 — 항상 표시 */}
          {compost.seed && (
            <div style={{ background: "#EFF6EC", border: "1px dashed #A8CCA0", borderRadius: 4, padding: "10px 12px", marginBottom: 10 }}>
              <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 6 }}>🌿 감정씨앗</p>
              <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#2A3A2A", lineHeight: 1.75 }}>
                {compost.seed}
              </p>
            </div>
          )}

          {/* ⑤ 내가 남긴 한 줄 */}
          {record.userNote && (
            <div style={{ background: "rgba(42,37,32,0.04)", border: "1px solid #D8CEC0", borderRadius: 4, padding: "10px 12px" }}>
              <p style={{ fontSize: 9, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 5 }}>✏ 내가 남긴 한 줄</p>
              <p style={{ fontSize: 13, color: INK, fontFamily: "var(--font-serif)", lineHeight: 1.75 }}>
                {record.userNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── 메인 ── */
export default function ArchivePage() {
  const { t, locale } = useLocale();
  const [records, setRecords] = useState<ShredRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRecords(getShredRecords());
    setMounted(true);
  }, []);

  /* 마운트 전: 빈 화면이 아닌 스켈레톤 */
  if (!mounted) return (
    <div style={{ background: "#1A2A1A", minHeight: "100vh", paddingBottom: 90 }}>
      <div style={{ padding: "14px 18px 18px" }}>
        <p style={{ fontSize: 8, fontFamily: "monospace", color: "#4A6A4A", letterSpacing: "0.12em", marginBottom: 6 }}>
          🌱 UGOGI COMPOST STATION
        </p>
        <p style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "#E8F4E4", fontWeight: 700, marginBottom: 8 }}>
          {locale === "ko" ? "감정퇴비실" : "Emotion Compost Room"}
        </p>
        <p style={{ fontSize: 11, fontFamily: "var(--font-serif)", color: "#A8CCA0", lineHeight: 1.7 }}>
          감정은 사라지지 않습니다. 모양만 바뀔 뿐입니다.
        </p>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <EmptyState />
      </div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingBottom: 90 }}>

      {/* ── 상단 헤더 ── */}
      <div style={{ background: "#1A2A1A", padding: "14px 18px 18px" }}>
        <p style={{ fontSize: 8, fontFamily: "monospace", color: "#4A6A4A", letterSpacing: "0.12em", marginBottom: 4 }}>
          🌱 UGOGI COMPOST STATION
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "#E8F4E4", fontWeight: 700 }}>
            {locale === "ko" ? "감정퇴비실" : locale === "ja" ? "感情堆肥室" : locale === "zh" ? "情绪堆肥室" : locale === "es" ? "Sala de Compost" : "Emotion Compost Room"}
          </h1>
          <Link href="/release" style={{
            fontSize: 11, fontFamily: "monospace", color: "#6A9B7A",
            border: "1px solid #6A9B7A", padding: "4px 10px",
            textDecoration: "none", letterSpacing: "0.06em", borderRadius: 1,
          }}>
            + {locale === "ko" ? "새 파쇄" : "New"}
          </Link>
        </div>
        {locale === "ko" && (
          <div style={{ borderTop: "1px solid #2A4A2A", paddingTop: 10 }}>
            <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#A8CCA0", lineHeight: 1.8, marginBottom: 6 }}>
              감정은 사라지지 않습니다. 모양만 바뀔 뿐입니다.
            </p>
            <p style={{ fontSize: 11, fontFamily: "var(--font-serif)", color: "#7A9A7A", lineHeight: 1.8, marginBottom: 6 }}>
              우걱이는 감정을 씹고,<br />감정은 퇴비가 되고,<br />퇴비는 작은 씨앗으로 남습니다.
            </p>
            <p style={{ fontSize: 10, fontFamily: "var(--font-serif)", color: "#5A7A5A", lineHeight: 1.7 }}>
              버린 감정도, 지나고 보면 내 하루의 기록이 됩니다.
            </p>
          </div>
        )}
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#4A6A4A", marginTop: 8, letterSpacing: "0.06em" }}>
          {locale === "ko"
            ? `총 ${records.length}개의 감정이 씨앗이 되었습니다.`
            : `${records.length} emotions became seeds.`}
        </p>
      </div>

      <div style={{ padding: "14px 16px 0" }}>

        {/* 통계 */}
        {records.length > 0 && <StatsBar records={records} />}

        {/* 감정정원 */}
        <UgogiGarden style={{ marginBottom: 14 }} />

        {/* 목록 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.1em" }}>
            🌱 감정 기록 — 최신순
          </p>
          {records.length > 0 && (
            <p style={{ fontSize: 9, fontFamily: "monospace", color: "#C8BEB0" }}>
              {records.length}건
            </p>
          )}
        </div>

        {/* 목록 or 빈 상태 */}
        {records.length === 0
          ? <EmptyState />
          : records.map((r, i) => <RecordCard key={r.id} record={r} index={i} locale={locale} />)
        }

        {/* 감정처리소 안내 문구 */}
        {records.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ margin: "20px 0", padding: "16px 18px", background: "#FAF5EC", border: "1px dashed #D8CEC0", borderRadius: 4 }}>
            <p style={{ fontSize: 11, fontFamily: "var(--font-serif)", color: "#6A6058", lineHeight: 1.8, textAlign: "center" }}>
              {locale === "ko"
                ? "버린 감정도, 지나고 보면 내 하루의 기록이 됩니다."
                : "What you let go of becomes a record of your day."}
            </p>
          </motion.div>
        )}

        {/* 하단 브랜딩 */}
        {records.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <p style={{ fontSize: 8, fontFamily: "monospace", color: "#A8CCA0", letterSpacing: "0.1em" }}>
              — 🌱 UGOGI COMPOST STATION · onulmood.com —
            </p>
            <p style={{ fontSize: 9, fontFamily: "var(--font-serif)", color: "#7A9A7A", marginTop: 4 }}>
              감정은 사라지지 않습니다. 모양만 바뀔 뿐입니다.
            </p>
          </motion.div>
        )}

        {/* 애드센스 안전 문구 */}
        <div style={{ margin: "16px 0 8px", padding: "10px 14px", background: "rgba(42,37,32,0.04)", border: "1px dashed #D8CEC0", borderRadius: 4 }}>
          <p style={{ fontSize: 10, color: "#A89880", fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.7, textAlign: "center" }}>
            오늘무드는 감정을 쉽게 이해하고 기록하기 위한 콘텐츠 서비스입니다. 의학적 진단이나 상담을 대신하지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
