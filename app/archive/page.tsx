"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getShredRecords, type ShredRecord } from "@/lib/shredRecords";

const INK  = "#1A1410";
const ROSE = "#C8607A";
const BG   = "#efe3cf";
const PAPER = "#FAF8F2";
const LINE = "#D8CEC0";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return "방금 전";
  if (m < 60) return `${m}분 전`;
  if (h < 24) return `${h}시간 전`;
  if (d < 7) return `${d}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });
}

/* ── 빈 상태 ── */
function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "52px 24px", textAlign: "center" }}>
      <motion.div
        animate={{ rotate: [-4, 4, -4], y: [-2, 2, -2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: 52, marginBottom: 20 }}
      >
        🦷
      </motion.div>
      <div style={{ background: PAPER, border: `2px solid ${INK}`, borderRadius: 2, padding: "18px 22px", boxShadow: `4px 4px 0 ${INK}`, maxWidth: 280, marginBottom: 22 }}>
        <p style={{ fontSize: 8, fontFamily: "monospace", color: ROSE, letterSpacing: "0.14em", marginBottom: 8 }}>
          UGEGI DISPOSAL CO. — 처리 기록
        </p>
        <p style={{ fontSize: 16, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, lineHeight: 1.5, marginBottom: 6 }}>
          우걱이 아직 배고픔
        </p>
        <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#7A7260", lineHeight: 1.7 }}>
          파쇄한 감정이 없어.<br/>
          처리 요청을 넣어봐.
        </p>
        <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 8, marginTop: 10, fontSize: 8, fontFamily: "monospace", color: "#B4A890", letterSpacing: "0.08em" }}>
          처리 이력: 0건 / 처리 가능: 무제한
        </div>
      </div>
      <Link href="/release" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: ROSE, color: "#F5EFE0",
        border: `2px solid ${INK}`, borderRadius: 2,
        padding: "12px 28px", fontSize: 15,
        fontFamily: "var(--font-serif)", fontWeight: 700,
        textDecoration: "none", boxShadow: `4px 4px 0 ${INK}`,
      }}>
        감정 파쇄 시작 →
      </Link>
    </motion.div>
  );
}

/* ── 통계 바 ── */
function StatsBar({ records }: { records: ShredRecord[] }) {
  const today = new Date().toDateString();
  const todayCount = records.filter(r => new Date(r.savedAt).toDateString() === today).length;
  const allEmotions = records.flatMap(r => r.emotions);
  const topEmotion = allEmotions.length > 0
    ? Object.entries(allEmotions.reduce((acc: Record<string, number>, e) => { acc[e] = (acc[e] || 0) + 1; return acc; }, {}))
        .sort(([,a],[,b]) => b - a)[0][0]
    : "—";

  return (
    <div style={{ background: PAPER, border: `2px solid ${INK}`, borderRadius: 2, boxShadow: `3px 3px 0 ${INK}`, overflow: "hidden", marginBottom: 14 }}>
      {/* 헤더 */}
      <div style={{ background: INK, padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, fontFamily: "monospace", color: "#FAF8F2", letterSpacing: "0.14em" }}>
          UGEGI DISPOSAL STATS
        </span>
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
          style={{ fontSize: 8, fontFamily: "monospace", color: "#8A9E78" }}>● LIVE</motion.span>
      </div>
      {/* 수치들 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {[
          { value: records.length, unit: "건", label: "총 파쇄" },
          { value: todayCount, unit: "건", label: "오늘 파쇄" },
          { value: topEmotion, unit: "", label: "주력 투입", text: true },
        ].map((s, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "12px 0", borderRight: i < 2 ? `1px solid ${LINE}` : "none",
          }}>
            {s.text
              ? <span style={{ fontSize: 13, fontWeight: 700, color: ROSE, fontFamily: "var(--font-serif)", maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.value}</span>
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

/* ── 기록 카드 ── */
function RecordCard({ record, index }: { record: ShredRecord; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => setExpanded(v => !v)}
      style={{
        background: PAPER, border: `2px solid ${INK}`,
        borderRadius: 2, marginBottom: 8, cursor: "pointer",
        boxShadow: expanded ? `4px 4px 0 ${INK}` : `2px 2px 0 ${INK}80`,
        transition: "box-shadow 0.15s",
        overflow: "hidden",
      }}
    >
      {/* 상단 — 항상 보임 */}
      <div style={{ padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: 12 }}>
        {/* 이모지 */}
        <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{record.productEmoji}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 메타 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: ROSE, letterSpacing: "0.1em" }}>
              {record.errorCode}
            </span>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#A89880" }}>
              {timeAgo(record.savedAt)}
            </span>
          </div>
          {/* 제품명 */}
          <p style={{ fontSize: 14, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, marginBottom: 2 }}>
            {record.productName}
          </p>
          {/* 감정 태그들 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {record.emotions.map((e, i) => (
              <span key={i} style={{
                fontSize: 10, fontFamily: "var(--font-serif)", color: "#7A7260",
                background: "#EDE8DC", padding: "1px 6px", borderRadius: 2,
              }}>{e}</span>
            ))}
          </div>
        </div>

        {/* 화살표 */}
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} style={{ fontSize: 10, color: "#C8BEB0", flexShrink: 0, marginTop: 2 }}>▼</motion.span>
      </div>

      {/* 펼침 — 킬러라인 + 날짜 */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ borderTop: `1px dashed ${LINE}`, padding: "10px 14px", background: "#F5F0E8" }}>
              {record.warningMessage && (
                <p style={{ fontSize: 10, fontFamily: "monospace", color: "#B06060", marginBottom: 6, letterSpacing: "0.04em" }}>
                  ⚠ {record.warningMessage}
                </p>
              )}
              <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#5A5248", fontStyle: "italic", lineHeight: 1.6, marginBottom: 6 }}>
                "{record.killerLine}"
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 8, fontFamily: "monospace", color: "#B4A890" }}>
                  {formatDate(record.savedAt)}
                </span>
                <span style={{ fontSize: 8, fontFamily: "monospace", color: "#B4A890", letterSpacing: "0.06em" }}>
                  빠각 완료 OK
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── 메인 ── */
export default function ArchivePage() {
  const [records, setRecords] = useState<ShredRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRecords(getShredRecords());
    setLoaded(true);
  }, []);

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <motion.p animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
        style={{ fontSize: 11, fontFamily: "monospace", color: ROSE, letterSpacing: "0.1em" }}>
        기록 불러오는 중...
      </motion.p>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingBottom: 90 }}>

      {/* ── 상단 헤더 ── */}
      <div style={{ background: INK, padding: "10px 18px 14px" }}>
        <p style={{ fontSize: 8, fontFamily: "monospace", color: "#5A5248", letterSpacing: "0.12em", marginBottom: 4 }}>
          UGEGI EMOTIONAL DISPOSAL CO.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "#FAF8F2", fontWeight: 700 }}>
            감정 처리 기록부
          </h1>
          <Link href="/release" style={{
            fontSize: 11, fontFamily: "monospace", color: ROSE,
            border: `1px solid ${ROSE}`, padding: "4px 10px",
            textDecoration: "none", letterSpacing: "0.06em", borderRadius: 1,
          }}>
            + 새 파쇄
          </Link>
        </div>
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#5A5248", marginTop: 4, letterSpacing: "0.06em" }}>
          총 {records.length}건 처리 완료 — 우걱이 포만감 {Math.min(records.length * 8, 99)}%
        </p>
      </div>

      <div style={{ padding: "14px 16px 0" }}>

        {/* 통계 */}
        {records.length > 0 && <StatsBar records={records} />}

        {/* 목록 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontSize: 9, fontFamily: "monospace", color: "#A89880", letterSpacing: "0.1em" }}>
            ▼ 처리 기록 — 최신순
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
          : records.map((r, i) => <RecordCard key={r.id} record={r} index={i} />)
        }

        {/* 하단 브랜딩 */}
        {records.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ textAlign: "center", padding: "24px 0 8px" }}>
            <p style={{ fontSize: 8, fontFamily: "monospace", color: "#C8BEB0", letterSpacing: "0.1em" }}>
              — UGEGI DISPOSAL CO. · onulmood.com —
            </p>
            <p style={{ fontSize: 9, fontFamily: "var(--font-serif)", color: "#A89880", marginTop: 4 }}>
              파쇄된 감정들은 우걱이 위장 어딘가에 있음
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
