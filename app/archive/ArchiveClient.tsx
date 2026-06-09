"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getShredRecords, type ShredRecord } from "@/lib/shredRecords";
import { findSeedByEmotions } from "@/lib/emotionSeeds";
import { useLocale } from "@/context/LocaleContext";
import { useByproductStore } from "@/hooks/useByproductStore";
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

function formatDate(iso: string, locale: string): string {
  const l = locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : locale === "es" ? "es-ES" : "en-US";
  return new Date(iso).toLocaleDateString(l, { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\.$/, "");
}

/* ── 빈 상태 ── */
function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", textAlign: "center" }}>
      <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} style={{ fontSize: 52, marginBottom: 24 }}>
        🗃️
      </motion.div>
      <div style={{ background: "#EFF6EC", border: "2px solid #2A3A2A", borderRadius: 8, padding: "24px 26px", maxWidth: 300, marginBottom: 24, boxShadow: "4px 4px 0 #1A2A1A" }}>
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.14em", marginBottom: 12 }}>
          🗃️ 우걱이 감정처리소
        </p>
        <p style={{ fontSize: 18, fontFamily: "var(--font-maru)", color: "#2A3A2A", fontWeight: 700, lineHeight: 1.4, marginBottom: 14 }}>
          아직 처리한 감정이<br />없습니다.
        </p>
        <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#3A5A3A", lineHeight: 1.9 }}>
          우걱이에게 감정 하나를 던져보세요.<br />
          처리된 감정은 이곳 아카이브에 남고,<br />
          가끔 이상한 부산물이 되어 발견됩니다.
        </p>
      </div>
      <Link href="/release" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#2A3A2A", color: "#E8F4E4", border: "2px solid #2A3A2A", borderRadius: 4,
        padding: "13px 30px", fontSize: 15, fontFamily: "var(--font-maru)", fontWeight: 600,
        textDecoration: "none", boxShadow: "4px 4px 0 #1A2A1A",
      }}>
        우걱이한테 던지기 🗃️
      </Link>
    </motion.div>
  );
}

/* ── 의미 있는 통계 바 ── */
function StatsBar({ records, byproductCount }: { records: ShredRecord[]; byproductCount: number }) {
  // 가장 많이 파쇄한 감정
  const topEmotion = (() => {
    const counts: Record<string, number> = {};
    records.forEach((r) => r.emotions.forEach((e) => { counts[e] = (counts[e] || 0) + 1; }));
    const top = Object.entries(counts).sort(([, a], [, b]) => b - a)[0];
    return top ? top[0] : "—";
  })();
  const lastDate = records[0] ? formatDate(records[0].savedAt, "ko") : "—";

  const cells = [
    { value: String(records.length), unit: "개", label: "총 감정 처리", accent: INK },
    { value: topEmotion, unit: "", label: "가장 많이 파쇄한 감정", accent: ROSE, text: true },
    { value: lastDate, unit: "", label: "최근 파쇄일", accent: "#5A7A5A", text: true, small: true },
    { value: String(byproductCount), unit: "개", label: "획득 부산물", accent: "#6A9B7A" },
  ];

  return (
    <div style={{ background: PAPER, border: `2px solid ${INK}`, borderRadius: 2, boxShadow: `3px 3px 0 ${INK}`, overflow: "hidden", marginBottom: 14 }}>
      <div style={{ background: INK, padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, fontFamily: "monospace", color: "#FAF8F2", letterSpacing: "0.14em" }}>🗃️ 감정처리소 STATS</span>
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }} style={{ fontSize: 8, fontFamily: "monospace", color: "#8A9E78" }}>● LIVE</motion.span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {cells.map((s, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 8px",
            borderRight: i % 2 === 0 ? `1px solid ${LINE}` : "none",
            borderTop: i >= 2 ? `1px solid ${LINE}` : "none",
          }}>
            {s.text
              ? <span style={{ fontSize: s.small ? 14 : 16, fontWeight: 700, color: s.accent, fontFamily: "var(--font-maru)", maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.2 }}>{s.value}</span>
              : <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: s.accent, fontFamily: "var(--font-maru)" }}>{s.value}</span>
                  <span style={{ fontSize: 10, color: "#A89880" }}>{s.unit}</span>
                </div>
            }
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#A89880", marginTop: 5, letterSpacing: "0.02em" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 기록 카드 — 요약 + 자세히 보기 아코디언 ── */
function RecordCard({ record, index, locale }: { record: ShredRecord; index: number; locale: string }) {
  const [open, setOpen] = useState(false);
  const compost = getCompostForRecord(record);
  const summary = record.userNote || record.killerLine || record.productName || compost.noun;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35 }}
      style={{ marginBottom: 10 }}
    >
      <div style={{ background: PAPER, border: `1.5px solid ${open ? "#A8CCA0" : "#D8CEC0"}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.2s" }}>

        {/* ── 요약 (항상 노출, 1~2줄) ── */}
        <button onClick={() => setOpen((v) => !v)} style={{
          width: "100%", textAlign: "left", cursor: "pointer", background: "transparent", border: "none",
          padding: "13px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{record.productEmoji || "🗃️"}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 3, flexWrap: "nowrap", overflow: "hidden" }}>
                  {record.emotions.slice(0, 3).map((e, i) => (
                    <span key={i} style={{ fontSize: 12, fontFamily: "var(--font-maru)", fontWeight: 700, color: "#2A3A2A", whiteSpace: "nowrap" }}>
                      {e}{i < Math.min(record.emotions.length, 3) - 1 ? " ·" : ""}
                    </span>
                  ))}
                  {record.emotions.length > 3 && <span style={{ fontSize: 11, color: "#A89880" }}>외 {record.emotions.length - 3}</span>}
                </div>
                <p style={{ fontSize: 12.5, fontFamily: "var(--font-serif)", color: "#6A6058", fontStyle: "italic", lineHeight: 1.45, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
                  &ldquo;{summary}&rdquo;
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#A89880" }}>{formatDate(record.savedAt, locale)}</span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: open ? "#6A9B7A" : "#C8607A", letterSpacing: "0.02em" }}>
                {open ? "닫기 ▲" : "자세히 ▼"}
              </span>
            </div>
          </div>
        </button>

        {/* ── 상세 (펼침) ── */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
              <div style={{ padding: "0 16px 16px", borderTop: "1px dashed #D4E8CC" }}>

                {/* 원래 감정 */}
                <div style={{ margin: "14px 0 12px" }}>
                  <p style={{ fontSize: 9, color: "#7A9A7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 6 }}>😔 원래 감정</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {record.emotions.map((e, i) => (
                      <span key={i} style={{ fontSize: 14, color: "#2A3A2A", background: "#EFF6EC", border: "2px solid #C4D8BC", padding: "3px 11px", borderRadius: 20, fontFamily: "var(--font-maru)", fontWeight: 700 }}>{e}</span>
                    ))}
                  </div>
                </div>

                {/* 파쇄 결과 */}
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 9, color: "#7A9A7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 5 }}>{record.productEmoji} 파쇄 결과</p>
                  <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#3A3028", fontStyle: "italic", lineHeight: 1.5 }}>{record.productName}</p>
                </div>

                {/* 퇴비화 결과 */}
                <div style={{ background: "#1A2A1A", borderRadius: 6, padding: "12px 14px", marginBottom: 10 }}>
                  <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>🌱 퇴비화 결과</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: compost.translation ? 8 : 0 }}>
                    <span style={{ fontSize: 20 }}>{compost.emoji}</span>
                    <span style={{ fontSize: 18, fontFamily: "var(--font-maru)", fontWeight: 700, color: "#A8CCA0", letterSpacing: "-0.02em" }}>{compost.noun}</span>
                  </div>
                  {compost.translation && (
                    <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#7A9A7A", lineHeight: 1.75, fontStyle: "italic" }}>{compost.translation}</p>
                  )}
                </div>

                {/* 감정씨앗 */}
                {compost.seed && (
                  <div style={{ background: "#EFF6EC", border: "1px dashed #A8CCA0", borderRadius: 4, padding: "10px 12px", marginBottom: 10 }}>
                    <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 6 }}>🌿 감정씨앗</p>
                    <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#2A3A2A", lineHeight: 1.75 }}>{compost.seed}</p>
                  </div>
                )}

                {/* 내가 남긴 한 줄 */}
                {record.userNote && (
                  <div style={{ background: "rgba(42,37,32,0.04)", border: "1px solid #D8CEC0", borderRadius: 4, padding: "10px 12px" }}>
                    <p style={{ fontSize: 9, color: "#A89880", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 5 }}>✏ 내가 남긴 한 줄</p>
                    <p style={{ fontSize: 13, color: INK, fontFamily: "var(--font-serif)", lineHeight: 1.75 }}>{record.userNote}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── 메인 ── */
export default function ArchiveClient() {
  const { locale } = useLocale();
  const [records, setRecords] = useState<ShredRecord[]>([]);
  const [mounted, setMounted] = useState(false);
  const { uniqueCount: byproductCount } = useByproductStore();

  useEffect(() => {
    setRecords(getShredRecords());
    setMounted(true);
  }, []);

  /* 헤더 — 세계관 강화 */
  const Header = (
    <div style={{ background: "#1A2A1A", padding: "16px 18px 18px" }}>
      <p style={{ fontSize: 8, fontFamily: "monospace", color: "#4A6A4A", letterSpacing: "0.12em", marginBottom: 4 }}>
        🗃️ UGOGI EMOTION PROCESSING ARCHIVE
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h1 style={{ fontSize: 21, fontFamily: "var(--font-serif)", color: "#E8F4E4", fontWeight: 700 }}>
          {locale === "ko" ? "우걱이 감정처리소" : "Ugogi Emotion Archive"}
        </h1>
        <Link href="/release" style={{ fontSize: 11, fontFamily: "monospace", color: "#6A9B7A", border: "1px solid #6A9B7A", padding: "4px 10px", textDecoration: "none", letterSpacing: "0.06em", borderRadius: 1 }}>
          + {locale === "ko" ? "새 파쇄" : "New"}
        </Link>
      </div>
      <div style={{ borderTop: "1px solid #2A4A2A", paddingTop: 12 }}>
        <p style={{ fontSize: 12.5, fontFamily: "var(--font-serif)", color: "#A8CCA0", lineHeight: 1.85 }}>
          {locale === "ko"
            ? "우걱이가 처리한 감정들은 완전히 사라지지 않습니다."
            : "The emotions Ugogi processes never fully disappear."}
        </p>
        <p style={{ fontSize: 12.5, fontFamily: "var(--font-serif)", color: "#7A9A7A", lineHeight: 1.85 }}>
          {locale === "ko"
            ? "어딘가에 흔적을 남기고, 때로는 이상한 부산물이 되어 발견되기도 합니다."
            : "They leave a trace — and sometimes turn into strange byproducts."}
        </p>
        <Link href="/collection" style={{ display: "inline-block", marginTop: 8, fontSize: 10, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.04em", textDecoration: "none" }}>
          🎁 감정 부산물 도감 보러가기 →
        </Link>
      </div>
    </div>
  );

  if (!mounted) return (
    <div style={{ background: "#1A2A1A", minHeight: "100vh", paddingBottom: 90 }}>
      {Header}
      <div style={{ padding: "20px 16px" }}><EmptyState /></div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingBottom: 90 }}>
      {Header}

      <div style={{ padding: "14px 16px 0" }}>

        {/* 감정파쇄함 설명 */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "16px 18px", marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.1em", marginBottom: 8 }}>🗃️ 감정파쇄함이란?</p>
          <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#5A5248", lineHeight: 1.9 }}>
            감정파쇄함은 오늘무드 사용자들이 남긴 감정을 모아두는 공간입니다. 감정을 평가하거나 분석하기보다, 오늘의 마음을 잠시 내려놓고 가만히 바라볼 수 있도록 돕습니다.
            우걱이에게 던진 감정은 이곳에 기록으로 남고, 시간이 지나면 그날의 내가 무엇을 느꼈는지 다시 돌아볼 수 있어요.
            사라지는 감정도 있지만, 기록된 감정은 때때로 나를 이해하는 작은 단서가 되기도 합니다. 잘 정리하려 애쓰지 않아도 괜찮아요. 그냥 오늘 하나만 두고 가도 충분합니다.
          </p>
        </div>

        {records.length > 0 && <StatsBar records={records} byproductCount={byproductCount} />}

        <UgogiGarden style={{ marginBottom: 14 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.1em" }}>
            🗃️ 처리된 감정 — 최신순
          </p>
          {records.length > 0 && (
            <p style={{ fontSize: 9, fontFamily: "monospace", color: "#C8BEB0" }}>{records.length}건 · 탭하면 펼침</p>
          )}
        </div>

        {records.length === 0
          ? <EmptyState />
          : records.map((r, i) => <RecordCard key={r.id} record={r} index={i} locale={locale} />)
        }

        {records.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ margin: "20px 0", padding: "16px 18px", background: "#FAF5EC", border: "1px dashed #D8CEC0", borderRadius: 4 }}>
            <p style={{ fontSize: 11, fontFamily: "var(--font-serif)", color: "#6A6058", lineHeight: 1.8, textAlign: "center" }}>
              {locale === "ko"
                ? "버린 감정도, 지나고 보면 내 하루의 기록이 됩니다."
                : "What you let go of becomes a record of your day."}
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
