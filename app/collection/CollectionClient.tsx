"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useByproductStore } from "@/hooks/useByproductStore";
import {
  RARITY_COLORS, ALL_BYPRODUCTS, rarityStars,
  byproductProbability, formatProbability, type Rarity,
} from "@/lib/byproducts";

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
const RANK: Record<Rarity, number> = Object.fromEntries(
  RARITY_ORDER.map((r, i) => [r, i])
) as Record<Rarity, number>;

const TOTAL = ALL_BYPRODUCTS.length;

export default function CollectionClient() {
  const { collection, loaded, uniqueCount } = useByproductStore();
  const [filter, setFilter] = useState<Rarity | "ALL">("ALL");
  const [selected, setSelected] = useState<string | null>(null);

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: BG }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: ROSE }} />
        ))}
      </div>
    </div>
  );

  const collectedMap = new Map(collection.map((c) => [c.byproduct.id, c]));
  const remaining = TOTAL - uniqueCount;
  const pct = Math.round((uniqueCount / TOTAL) * 100);

  // 전체 29종을 희귀도순 정렬, 필터 적용
  const entries = ALL_BYPRODUCTS
    .filter((bp) => filter === "ALL" || bp.rarity === filter)
    .sort((a, b) => RANK[a.rarity] - RANK[b.rarity]);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 96px" }}>

        <Link href="/" style={{
          fontSize: 12, color: MUTED, textDecoration: "none",
          fontFamily: "var(--font-prose)", fontWeight: 300,
          display: "inline-block", marginBottom: 36,
        }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 9, color: ROSE, fontFamily: "monospace", letterSpacing: "0.18em", marginBottom: 8 }}>
            UGOGI LAB — BYPRODUCT ARCHIVE
          </p>
          <h1 style={{
            fontFamily: "var(--font-maru)", fontWeight: 600,
            fontSize: "clamp(22px, 6vw, 28px)",
            color: INK, lineHeight: 1.4, letterSpacing: "-0.025em", marginBottom: 10,
          }}>
            감정 부산물 도감
          </h1>
          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 14, color: DIM, lineHeight: 1.8 }}>
            우걱이가 감정을 씹다가 떨어뜨린 부산물들. 파쇄할 때마다 무언가 하나씩 떨어집니다.
          </p>
        </div>

        {/* ── 수집률 대시보드 ── */}
        <div style={{
          background: INK, borderRadius: 4, padding: "20px 22px", marginBottom: 10,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 9, fontFamily: "monospace", color: "#8A8070", letterSpacing: "0.14em", marginBottom: 8 }}>
                수집률 — COLLECTION RATE
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 40, fontFamily: "var(--font-maru)", fontWeight: 600, color: "#F5EFE0", lineHeight: 1 }}>
                  {uniqueCount}
                </span>
                <span style={{ fontSize: 18, fontFamily: "var(--font-maru)", color: MUTED }}>/ {TOTAL}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 28, fontFamily: "var(--font-maru)", fontWeight: 600, color: ROSE, lineHeight: 1 }}>{pct}%</span>
            </div>
          </div>
          {/* 진행 바 */}
          <div style={{ height: 6, background: "#3A332B", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ height: "100%", background: ROSE, borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 11, fontFamily: "monospace", color: "#A8A090" }}>
              아직 발견하지 못한 부산물 <span style={{ color: "#F5EFE0", fontWeight: 700 }}>{remaining}개</span>
            </p>
            {remaining > 0 && (
              <motion.p
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.04em" }}
              >
                🦷 우걱이가 열심히 씹는 중...
              </motion.p>
            )}
          </div>
        </div>

        {remaining === 0 && (
          <div style={{ background: "#F0D8DC", border: "1.5px solid #D8A8B0", borderRadius: 4, padding: "12px 16px", marginBottom: 10, textAlign: "center" }}>
            <p style={{ fontSize: 13, fontFamily: "var(--font-maru)", fontWeight: 700, color: "#803848" }}>
              🏆 도감 완성! 우걱이가 떨어뜨린 모든 부산물을 모았습니다.
            </p>
          </div>
        )}

        {/* 희귀도 필터 */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "16px 0 20px" }}>
          {(["ALL", ...RARITY_ORDER] as (Rarity | "ALL")[]).map((r) => {
            const active = filter === r;
            const rc = r === "ALL" ? null : RARITY_COLORS[r];
            const total = r === "ALL" ? TOTAL : ALL_BYPRODUCTS.filter((b) => b.rarity === r).length;
            const got = r === "ALL"
              ? uniqueCount
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
                {r === "ALL" ? `ALL ${got}/${total}` : `${r} ${got}/${total}`}
              </button>
            );
          })}
        </div>

        {/* ── 전체 29종 그리드 (수집/미수집 모두) ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {entries.map((bp, idx) => {
            const got = collectedMap.get(bp.id);
            const rc = RARITY_COLORS[bp.rarity];
            const isOpen = selected === bp.id;
            const prob = formatProbability(byproductProbability(bp));

            if (!got) {
              // 미발견 — 잠금 슬롯
              return (
                <div key={bp.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(42,37,32,0.03)", border: `1px dashed ${LINE}`,
                  borderRadius: 3, padding: "13px 18px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.75 }}>
                    <span style={{ fontSize: 14, filter: "grayscale(1)", opacity: 0.5 }}>{rarityStars(bp.rarity)}</span>
                    <span style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14, color: "#B4A890", letterSpacing: "0.04em" }}>
                      ??? 미발견 표본
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: "#B4A890", fontFamily: "monospace" }}>발견 확률 {prob}</span>
                    <span style={{ fontSize: 11, color: "#C4BAB0" }}>🔒</span>
                  </div>
                </div>
              );
            }

            // 발견됨 — 수집 카드
            return (
              <motion.div key={bp.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.02, 0.3) }}>
                <button
                  onClick={() => setSelected(isOpen ? null : bp.id)}
                  style={{
                    width: "100%", textAlign: "left", cursor: "pointer",
                    background: PAPER,
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(178,162,140,0.05) 23px, rgba(178,162,140,0.05) 24px)",
                    border: `1px solid ${isOpen ? rc.border : LINE}`,
                    borderRadius: 3, padding: "13px 18px",
                    boxShadow: isOpen ? `0 2px 12px ${rc.border}44` : "none", transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <span style={{ fontSize: 13, flexShrink: 0 }}>{rarityStars(bp.rarity)}</span>
                      <span style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14, color: INK, letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {bp.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      {got.count > 1 && <span style={{ fontSize: 9, color: MUTED, fontFamily: "monospace" }}>×{got.count}</span>}
                      <span style={{ fontSize: 8, padding: "2px 7px", background: rc.bg, color: rc.text, border: `1px solid ${rc.border}`, borderRadius: 2, fontFamily: "monospace", letterSpacing: "0.06em", fontWeight: 700 }}>
                        {bp.rarity}
                      </span>
                      <span style={{ fontSize: 10, color: DIM }}>{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
                        <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 12, color: "#6A6058", lineHeight: 1.8, margin: "10px 0" }}>
                          {bp.desc}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {[
                            { label: "희귀도",    value: `${rarityStars(bp.rarity)} ${bp.rarity}` },
                            { label: "발견 확률",  value: prob },
                            { label: "냄새",      value: bp.smell },
                            { label: "잔여 감정",  value: `${bp.remainPercent}%` },
                            { label: "최초 발견일", value: new Date(got.collectedAt).toLocaleDateString("ko-KR") },
                          ].map((row) => (
                            <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ fontSize: 9, color: "#9A8E7A", fontFamily: "monospace" }}>{row.label}</span>
                              <span style={{ fontSize: 10, color: "#3A3228", fontFamily: "monospace", letterSpacing: "0.03em" }}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: DIM, fontFamily: "var(--font-serif)", lineHeight: 1.7, marginBottom: 14 }}>
            {remaining > 0
              ? `${remaining}종이 더 어딘가에 숨어 있습니다. 이번엔 다른 부산물도 얻어볼까요?`
              : "모든 부산물을 모았어요. 그래도 감정은 계속 쌓이니까요."}
          </p>
          <Link href="/release" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: INK, color: "#F5EFE0",
            padding: "12px 28px", borderRadius: 3,
            fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600,
            textDecoration: "none", letterSpacing: "-0.01em",
          }}>
            감정 더 파쇄하기 →
          </Link>
        </div>

      </div>
    </div>
  );
}
