import type { Metadata } from "next";
import Link from "next/link";
import { FEELINGS } from "@/lib/feelings";

export const metadata: Metadata = {
  title: "우걱이 감정도감 | 오늘무드",
  description: "세상에는 이름 붙이기 어려운 감정들이 있습니다. 우걱이는 그 감정들을 하나씩 관찰하고 기록합니다. 서운함, 외로움, 짜증, 공허함, 무기력 등 20가지 감정 탐구.",
  keywords: ["감정도감", "감정 이름", "서운함", "외로움", "무기력", "공허함", "불안", "설렘", "감정 기록", "우걱이"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/feelings",
    title: "우걱이 감정도감 | 오늘무드",
    description: "이름 붙이기 어려운 감정들을 우걱이가 관찰하고 기록한 감정도감.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/feelings" },
};

const BG    = "#EDE4D0";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const ROSE  = "#C8607A";
const INK   = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#6A6058";

export default function FeelingsPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300, display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            UGOGI FIELD NOTES — 감정도감
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 30px)", color: INK, lineHeight: 1.45, letterSpacing: "-0.025em", marginBottom: 18 }}>
            우걱이 감정도감
          </h1>
          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 15, color: DIM, lineHeight: 2.0, letterSpacing: "-0.01em", marginBottom: 14 }}>
            세상에는 이름 붙이기 어려운 감정들이 있습니다.
          </p>
          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 14, color: MUTED, lineHeight: 1.8, letterSpacing: "-0.01em" }}>
            우걱이는 그 감정들을 하나씩 관찰하고 기록합니다.<br />
            감정에 이름을 붙이면, 조금 가벼워질 때가 있으니까요.
          </p>
        </div>

        {/* 우걱이 메모 */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderLeft: `3px solid ${ROSE}`, borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: 48 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>우걱이 연구 노트</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 14, color: INK, lineHeight: 1.85, letterSpacing: "-0.02em" }}>
            감정을 먹기 전에, 나는 관찰을 합니다.<br />
            어떤 감정이든 이름을 알면 더 잘 씹을 수 있거든요.<br />
            여기 내가 관찰하고 기록한 감정들이 있습니다.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 36 }} />
        <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 24 }}>
          총 {FEELINGS.length}종 감정 수록 · 계속 업데이트 중
        </p>

        {/* 감정 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 52 }}>
          {FEELINGS.map((feeling) => (
            <Link
              key={feeling.slug}
              href={`/feelings/${feeling.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: PAPER,
                border: `1px solid ${LINE}`,
                borderRadius: 6,
                padding: "18px 16px",
                transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{feeling.emoji}</span>
                  <span style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.06em" }}>
                    {feeling.code}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 15, color: INK, letterSpacing: "-0.02em", marginBottom: 6 }}>
                  {feeling.name}
                </p>
                <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 12, color: DIM, lineHeight: 1.6, letterSpacing: "-0.01em" }}>
                  {feeling.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 하단 CTA */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "32px 26px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
            오늘의 감정,<br />이름을 찾았나요?
          </p>
          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 13, color: DIM, marginBottom: 24, lineHeight: 1.8 }}>
            이름 붙인 감정을 우걱이한테 던져봐요.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ROSE, color: "#F5EFE0", padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
              감정 파쇄하러 가기
            </Link>
            <Link href="/emotion-dictionary" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: PAPER, border: `1px solid ${LINE}`, color: INK, padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 500, textDecoration: "none" }}>
              감정사전 보기
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { href: "/guide", label: "감정 기록 가이드" },
            { href: "/blog", label: "감정 이야기" },
            { href: "/faq", label: "자주 묻는 질문" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300, border: `1px solid ${LINE}`, padding: "6px 14px", borderRadius: 20 }}>
              {l.label} →
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
