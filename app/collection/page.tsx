"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useByproductStore } from "@/hooks/useByproductStore";
import { RARITY_COLORS, ALL_BYPRODUCTS, type Rarity } from "@/lib/byproducts";

const BG    = "#EDE4D0";
const PAPER = "#F8F1E6";
const LINE  = "#D8CEC0";
const ROSE  = "#C8607A";
const INK   = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#8A8070";

const RARITY_ORDER: Rarity[] = [
  "COMMON", "STRANGE", "SAD", "VERY WET", "FORGOTTEN", "LEGENDARY SADNESS",
];

const TOTAL_BYPRODUCTS = ALL_BYPRODUCTS.length;

export default function CollectionPage() {
  const { collection, loaded, totalCount, uniqueCount } = useByproductStore();
  const [filter, setFilter] = useState<Rarity | "ALL">("ALL");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === "ALL"
    ? collection
    : collection.filter((c) => c.byproduct.rarity === filter);

  const collectedIds = new Set(collection.map((c) => c.byproduct.id));

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: ROSE }} />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 96px" }}>

        <Link href="/" style={{
          fontSize: 12, color: MUTED, textDecoration: "none",
          fontFamily: "var(--font-prose)", fontWeight: 300,
          display: "inline-block", marginBottom: 40,
        }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 9, color: ROSE, fontFamily: "monospace", letterSpacing: "0.18em", marginBottom: 8 }}>
            UGOGI LAB — BYPRODUCT ARCHIVE
          </p>
          <h1 style={{
            fontFamily: "var(--font-maru)", fontWeight: 600,
            fontSize: "clamp(22px, 6vw, 28px)",
            color: INK, lineHeight: 1.4, letterSpacing: "-0.025em",
            marginBottom: 10,
          }}>
            감정 부산물 도감
          </h1>
          <p style={{
            fontFamily: "var(--font-prose)", fontWeight: 300,
            fontSize: 14, color: DIM,
            lineHeight: 1.8, letterSpacing: "-0.01em",
          }}>
            파쇄된 감정은 이상한 사물로 변환됩니다.<br />
            수집하고, 관찰하고, 잊어버리세요.
          </p>
        </div>

        {/* 수집 통계 */}
        <div style={{
          background: PAPER,
          backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(178,162,140,0.06) 23px, rgba(178,162,140,0.06) 24px)",
          border: `1px solid ${LINE}`,
          borderRadius: 3, padding: "16px 20px",
          marginBottom: 24,
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        }}>
          {[
            { value: uniqueCount, label: "수집 종류", unit: `/ ${TOTAL_BYPRODUCTS}종` },
            { value: totalCount,  label: "총 파쇄 횟수", unit: "회" },
            { value: collection.filter(c => c.byproduct.partialCrush).length, label: "부분 파쇄", unit: "건" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0",
              borderRight: i < 2 ? `1px solid ${LINE}` : "none",
            }}>
              <span style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 22, color: ROSE, lineHeight: 1 }}>
                {s.value}
              </span>
              <span style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", marginTop: 3, letterSpacing: "0.04em" }}>
                {s.unit}
              </span>
              <span style={{ fontSize: 9, color: DIM, fontFamily: "monospace", marginTop: 2 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* 희귀도 필터 */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {(["ALL", ...RARITY_ORDER] as (Rarity | "ALL")[]).map((r) => {
            const active = filter === r;
            const rc = r === "ALL" ? null : RARITY_COLORS[r];
            const count = r === "ALL"
              ? collection.length
              : collection.filter((c) => c.byproduct.rarity === r).length;
            return (
              <button key={r} onClick={() => setFilter(r)} style={{
                fontSize: 10, padding: "4px 10px",
                background: active ? (rc?.bg ?? "#2A2520") : "transparent",
                color: active ? (rc?.text ?? "#F5EFE0") : MUTED,
                border: `1px solid ${active ? (rc?.border ?? "#2A2520") : LINE}`,
                borderRadius: 2, fontFamily: "monospace", letterSpacing: "0.06em",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {r === "ALL" ? `ALL (${count})` : `${r} ${count > 0 ? `(${count})` : ""}`}
              </button>
            );
          })}
        </div>

        {/* 빈 상태 */}
        {collection.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              padding: "56px 24px", textAlign: "center",
              background: PAPER, border: `1px dashed ${LINE}`, borderRadius: 3,
            }}
          >
            <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, marginBottom: 10 }}>
              아직 수집된 부산물이 없습니다
            </p>
            <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 13, color: DIM, lineHeight: 1.8, marginBottom: 24 }}>
              감정을 파쇄하면 부산물이 생성됩니다.<br />
              우걱이가 처리하는 동안 무언가 남습니다.
            </p>
            <Link href="/release" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: INK, color: "#F5EFE0",
              padding: "11px 24px", borderRadius: 3,
              fontSize: 13, fontFamily: "var(--font-maru)", fontWeight: 600,
              textDecoration: "none", letterSpacing: "-0.01em",
            }}>
              첫 감정 파쇄하러 가기
            </Link>
          </motion.div>
        )}

        {/* 수집함 그리드 */}
        {filtered.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <AnimatePresence>
              {filtered.map((item, idx) => {
                const bp = item.byproduct;
                const rc = RARITY_COLORS[bp.rarity];
                const isOpen = selected === bp.id;
                return (
                  <motion.div
                    key={bp.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <button
                      onClick={() => setSelected(isOpen ? null : bp.id)}
                      style={{
                        width: "100%", textAlign: "left", cursor: "pointer",
                        background: PAPER,
                        backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(178,162,140,0.05) 23px, rgba(178,162,140,0.05) 24px)",
                        border: `1px solid ${isOpen ? rc.border : LINE}`,
                        borderRadius: 3, padding: "14px 18px",
                        boxShadow: isOpen ? `0 2px 12px ${rc.border}44` : "none",
                        transition: "all 0.2s",
                      }}
                    >
                      {/* 카드 헤더 */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isOpen ? 10 : 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{
                            fontSize: 9, padding: "2px 8px",
                            background: rc.bg, color: rc.text, border: `1px solid ${rc.border}`,
                            borderRadius: 2, fontFamily: "monospace", letterSpacing: "0.08em", fontWeight: 700,
                            flexShrink: 0,
                          }}>
                            {bp.rarity}
                          </span>
                          <span style={{
                            fontFamily: "var(--font-maru)", fontWeight: 600,
                            fontSize: 14, color: INK, letterSpacing: "-0.02em",
                          }}>
                            {bp.name}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          {item.count > 1 && (
                            <span style={{ fontSize: 9, color: MUTED, fontFamily: "monospace" }}>×{item.count}</span>
                          )}
                          {bp.partialCrush && (
                            <span style={{ fontSize: 9, color: ROSE, fontFamily: "monospace" }}>⚠️ 부분</span>
                          )}
                          <span style={{ fontSize: 10, color: DIM }}>{isOpen ? "▲" : "▼"}</span>
                        </div>
                      </div>

                      {/* 펼친 상세 */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p style={{
                              fontFamily: "var(--font-prose)", fontWeight: 300,
                              fontSize: 12, color: "#6A6058",
                              lineHeight: 1.8, letterSpacing: "-0.01em",
                              marginBottom: 10,
                            }}>
                              {bp.desc}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              {[
                                { label: "냄새",     value: bp.smell },
                                { label: "잔여 감정", value: `${bp.remainPercent}%` },
                                { label: "수집일",   value: new Date(item.collectedAt).toLocaleDateString("ko-KR") },
                              ].map((row) => (
                                <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span style={{ fontSize: 9, color: "#9A8E7A", fontFamily: "monospace" }}>{row.label}</span>
                                  <span style={{ fontSize: 10, color: "#3A3228", fontFamily: "monospace", letterSpacing: "0.03em" }}>{row.value}</span>
                                </div>
                              ))}
                            </div>
                            {bp.partialCrush && (
                              <div style={{ marginTop: 8, padding: "6px 10px", background: "rgba(200,96,122,0.07)", border: "1px dashed #C8607A", borderRadius: 2 }}>
                                <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace" }}>
                                  ⚠️ 완전히 파쇄되지 않은 감정입니다
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* 미수집 목록 힌트 */}
        {uniqueCount < TOTAL_BYPRODUCTS && (
          <div style={{ marginTop: 28, padding: "14px 18px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 3 }}>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 6 }}>
              미수집 부산물 {TOTAL_BYPRODUCTS - uniqueCount}종 남음
            </p>
            <p style={{ fontSize: 12, color: DIM, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.7 }}>
              감정을 더 파쇄하면 새로운 부산물이 생성됩니다.<br />
              희귀도가 높을수록 잘 나오지 않습니다.
            </p>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link href="/release" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: INK, color: "#F5EFE0",
            padding: "12px 28px", borderRadius: 3,
            fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600,
            textDecoration: "none", letterSpacing: "-0.01em",
          }}>
            감정 더 파쇄하기
          </Link>
        </div>

      </div>
    </div>
  );
}
