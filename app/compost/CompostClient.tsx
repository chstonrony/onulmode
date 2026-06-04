"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getShredRecords, type ShredRecord } from "@/lib/shredRecords";

const BG    = "#EDE4D0";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const ROSE  = "#C8607A";
const INK   = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#6A6058";
const GREEN = "#6A9B7A";
const GLIGHT = "#EFF6EC";
const GBORDER = "#C4D8BC";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric", weekday: "short",
  });
}

function CompostCard({ record, index }: { record: ShredRecord; index: number }) {
  const [open, setOpen] = useState(false);
  const growthPct = record.growthPct ?? 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{ marginBottom: 12 }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", textAlign: "left", cursor: "pointer",
          background: PAPER, border: `1px solid ${open ? GBORDER : LINE}`,
          borderRadius: 6, padding: "14px 16px",
          boxShadow: open ? `0 2px 8px ${GBORDER}` : "none",
          transition: "all 0.2s",
        }}
      >
        {/* 카드 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: open ? 12 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{record.productEmoji}</span>
            <div>
              <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14, color: INK, letterSpacing: "-0.02em", marginBottom: 3 }}>
                {record.productName}
              </p>
              <p style={{ fontSize: 10, color: MUTED, fontFamily: "monospace", letterSpacing: "0.04em" }}>
                {formatDate(record.savedAt)}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {record.compostName && (
              <span style={{ fontSize: 9, color: GREEN, fontFamily: "monospace", letterSpacing: "0.04em" }}>🌱 퇴비화됨</span>
            )}
            <span style={{ fontSize: 10, color: MUTED }}>{open ? "▲" : "▼"}</span>
          </div>
        </div>

        {/* 펼친 상세 */}
        {open && (
          <div>
            {/* 감정 태그 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
              {record.emotions.map((e, i) => (
                <span key={i} style={{ fontSize: 11, color: DIM, background: `${ROSE}12`, border: `1px solid ${ROSE}30`, padding: "2px 8px", borderRadius: 20, fontFamily: "var(--font-prose)", fontWeight: 300 }}>
                  {e}
                </span>
              ))}
            </div>

            {/* 킬러라인 */}
            <div style={{ background: "#FAF5EC", border: `1px dashed ${LINE}`, borderRadius: 4, padding: "10px 14px", marginBottom: 10 }}>
              <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 6 }}>우걱이 최종 판정</p>
              <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.7, fontStyle: "italic" }}>
                "{record.killerLine}"
              </p>
            </div>

            {/* 퇴비화 결과 */}
            {record.compostName && (
              <div style={{ background: GLIGHT, border: `1px solid ${GBORDER}`, borderRadius: 4, padding: "12px 14px", marginBottom: 10 }}>
                <p style={{ fontSize: 9, color: GREEN, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>🌱 퇴비화 결과</p>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 13, color: INK, marginBottom: 4 }}>
                  {record.compostName}
                </p>
                {record.compostDesc && (
                  <p style={{ fontSize: 11, color: "#4A6A4A", fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.7, marginBottom: 8 }}>
                    {record.compostDesc}
                  </p>
                )}
                {/* 성장 가능성 바 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: GREEN, fontFamily: "monospace" }}>성장 가능성</span>
                    <span style={{ fontSize: 9, color: GREEN, fontFamily: "monospace" }}>{growthPct}%</span>
                  </div>
                  <div style={{ height: 4, background: "#D4E8CC", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${growthPct}%`, height: "100%", background: GREEN, borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            )}

            {/* 감정씨앗 */}
            {record.seedQuestion && (
              <div style={{ background: `${GREEN}10`, border: `1px dashed ${GBORDER}`, borderRadius: 4, padding: "10px 12px", marginBottom: 10 }}>
                <p style={{ fontSize: 9, color: GREEN, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 6 }}>🌿 감정씨앗</p>
                <p style={{ fontSize: 12, fontFamily: "var(--font-maru)", fontWeight: 400, color: INK, lineHeight: 1.75 }}>
                  {record.seedQuestion}
                </p>
              </div>
            )}

            {/* 한줄 기록 */}
            {record.userNote && (
              <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, padding: "10px 12px" }}>
                <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 5 }}>📝 나의 기록</p>
                <p style={{ fontSize: 12, color: DIM, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.7 }}>
                  {record.userNote}
                </p>
              </div>
            )}
          </div>
        )}
      </button>
    </motion.div>
  );
}

export default function CompostClient() {
  const [records, setRecords] = useState<ShredRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRecords(getShredRecords());
    setLoaded(true);
  }, []);

  const composted = records.filter(r => r.compostName);
  const totalGrowthPct = composted.length > 0
    ? Math.round(composted.reduce((s, r) => s + (r.growthPct ?? 70), 0) / composted.length)
    : 0;

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <motion.p animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
        style={{ fontSize: 11, fontFamily: "monospace", color: GREEN, letterSpacing: "0.1em" }}>
        퇴비 창고 열는 중...
      </motion.p>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingBottom: 90 }}>

      {/* 상단 헤더 */}
      <div style={{ background: "#2A3A2A", padding: "14px 18px 18px" }}>
        <p style={{ fontSize: 8, fontFamily: "monospace", color: "#5A7A5A", letterSpacing: "0.12em", marginBottom: 4 }}>
          UGOGI COMPOST WAREHOUSE
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "#E8F4E4", fontWeight: 700 }}>
            감정퇴비 창고
          </h1>
          <Link href="/release" style={{ fontSize: 11, fontFamily: "monospace", color: GREEN, border: `1px solid ${GREEN}`, padding: "4px 10px", textDecoration: "none", letterSpacing: "0.06em", borderRadius: 1 }}>
            + 새 파쇄
          </Link>
        </div>
        <p style={{ fontSize: 9, fontFamily: "monospace", color: "#5A7A5A", marginTop: 6, letterSpacing: "0.04em", lineHeight: 1.6 }}>
          버린 감정도 지나고 보면 내 하루의 기록이 됩니다.
        </p>
      </div>

      <div style={{ padding: "14px 16px 0" }}>

        {/* 퇴비화 통계 */}
        {records.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: PAPER, border: `2px solid #2A3A2A`, borderRadius: 2, boxShadow: "3px 3px 0 #2A3A2A", overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: "#2A3A2A", padding: "6px 14px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 8, fontFamily: "monospace", color: "#8ABE7A", letterSpacing: "0.12em" }}>COMPOST STATS</span>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
                style={{ fontSize: 8, fontFamily: "monospace", color: GREEN }}>● LIVE</motion.span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {[
                { value: records.length, unit: "건", label: "총 처리" },
                { value: composted.length, unit: "건", label: "퇴비화 완료" },
                { value: `${totalGrowthPct}%`, unit: "", label: "평균 성장률", text: true },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", borderRight: i < 2 ? `1px solid ${LINE}` : "none" }}>
                  {s.text
                    ? <span style={{ fontSize: 17, fontWeight: 700, color: GREEN, fontFamily: "var(--font-serif)" }}>{s.value}</span>
                    : <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                        <span style={{ fontSize: 22, fontWeight: 700, color: INK, fontFamily: "var(--font-serif)" }}>{s.value}</span>
                        <span style={{ fontSize: 10, color: MUTED }}>{s.unit}</span>
                      </div>
                  }
                  <span style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, marginTop: 3, letterSpacing: "0.06em" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 목록 레이블 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, letterSpacing: "0.1em" }}>
            🌱 퇴비화 기록 — 최신순
          </p>
          {records.length > 0 && (
            <Link href="/archive" style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, textDecoration: "none", letterSpacing: "0.06em" }}>
              파쇄함 전체 →
            </Link>
          )}
        </div>

        {/* 빈 상태 */}
        {records.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ padding: "52px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 36, marginBottom: 16 }}>🌱</p>
            <div style={{ background: PAPER, border: `2px solid ${INK}`, borderRadius: 2, padding: "18px 22px", boxShadow: `4px 4px 0 ${INK}`, maxWidth: 280, margin: "0 auto 22px" }}>
              <p style={{ fontSize: 15, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, lineHeight: 1.5, marginBottom: 6 }}>
                아직 퇴비가 없어요
              </p>
              <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: DIM, lineHeight: 1.7 }}>
                감정을 파쇄하면<br />퇴비가 만들어져요.
              </p>
            </div>
            <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ROSE, color: "#F5EFE0", border: `2px solid ${INK}`, borderRadius: 2, padding: "12px 28px", fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700, textDecoration: "none", boxShadow: `4px 4px 0 ${INK}` }}>
              감정 파쇄 시작 →
            </Link>
          </motion.div>
        )}

        {/* 기록 목록 */}
        {records.map((r, i) => <CompostCard key={r.id} record={r} index={i} />)}

        {/* 하단 브랜딩 */}
        {records.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ textAlign: "center", padding: "24px 0 8px" }}>
            <p style={{ fontSize: 11, fontFamily: "var(--font-serif)", color: MUTED, lineHeight: 1.8 }}>
              버린 감정도, 지나고 보면 내 하루의 기록이 됩니다.
            </p>
            <p style={{ fontSize: 8, fontFamily: "monospace", color: DIM, marginTop: 6, letterSpacing: "0.08em" }}>
              — UGOGI COMPOST WAREHOUSE · onulmood.com —
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
