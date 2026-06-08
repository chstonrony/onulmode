import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import InsightsStats from "./InsightsStats";
import { getInsightsContent } from "@/lib/insightsContent";
import { getLocale } from "@/lib/getLocale";
import { FEELINGS } from "@/lib/feelings";

const BG = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";
const ROSE = "#C8607A";
const INK = "#2A2520";
const MUTED = "#A89880";

// 정적 메타데이터 (한국어 기준 — SEO/AdSense 크롤러 대응)
export const metadata: Metadata = {
  title: "오늘무드 감정 인사이트 | 자주 느끼는 감정과 감정 기록의 의미",
  description:
    "서운함, 외로움, 무기력, 불안, 짜증 — 사람들이 자주 기록하는 감정 30가지와 감정 기록이 도움이 되는 이유, 오늘무드가 제안하는 감정 관찰법을 소개합니다.",
  keywords: [
    "감정 인사이트", "자주 느끼는 감정", "서운함", "외로움", "무기력", "불안", "짜증",
    "감정 기록", "감정 일기", "감정에 이름 붙이기", "자기 돌봄", "감정도감", "오늘무드",
  ],
  openGraph: {
    type: "article",
    locale: "ko_KR",
    url: "https://onulmood.com/insights",
    title: "오늘무드 감정 인사이트 | 자주 느끼는 감정과 감정 기록의 의미",
    description:
      "사람들이 자주 경험하는 감정 패턴과 감정 기록의 의미, 감정 30가지의 인사이트를 정리했습니다.",
    siteName: "오늘무드",
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘무드 감정 인사이트",
    description: "사람들이 자주 기록하는 감정과 감정 기록이 도움이 되는 이유.",
  },
  alternates: { canonical: "https://onulmood.com/insights" },
};

const bodyStyle: React.CSSProperties = {
  fontSize: 14.5, lineHeight: 1.85, color: "#4A4238",
  fontFamily: "var(--font-prose)", fontWeight: 300,
};
const cardStyle: React.CSSProperties = {
  padding: "22px 20px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6,
};

function SectionLabel({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 8, opacity: 0.85 }}>
        {kicker}
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.4 }}>
        {title}
      </h2>
    </div>
  );
}

export default async function InsightsPage() {
  const locale = await getLocale();
  const c = getInsightsContent(locale);

  // 본문에서 다룬 핵심 감정은 허브 그리드에서 제외해 중복 노출을 줄인다
  const featuredSlugs = new Set(c.emotions.map((e) => e.slug));
  const moreFeelings = FEELINGS.filter((f) => !featuredSlugs.has(f.slug));

  const readMoreLinks = locale === "ko"
    ? [
        { href: "/guide", label: "감정 기록 가이드", desc: "감정에 이름 붙이기와 오늘무드 5단계 사용법" },
        { href: "/feelings", label: "우걱이 감정도감", desc: "감정 30가지의 관찰 기록과 정리법" },
        { href: "/magazine", label: "우걱이 매거진", desc: "감정을 다루는 더 긴 글 모음" },
        { href: "/emotion-dictionary", label: "우걱이 감정사전", desc: "감정 단어를 쉽게 풀어쓴 사전" },
      ]
    : [
        { href: "/guide", label: "Emotion Journaling Guide", desc: "Naming feelings and the 5-step ONULMOOD method" },
        { href: "/feelings", label: "Ugogi Emotion Almanac", desc: "Observation notes for 30 emotions" },
        { href: "/magazine", label: "Ugogi Magazine", desc: "Longer reads on handling emotions" },
        { href: "/emotion-dictionary", label: "Ugogi Emotion Dictionary", desc: "Emotion words explained simply" },
      ];

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <TopBar title={c.pageTitle} />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* 페이지 헤더 (서버 렌더 → Ctrl+U 노출) */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.35, marginBottom: 14 }}>
            {c.pageTitle}
          </h1>
          <p style={{ ...bodyStyle, color: "#5A5246", whiteSpace: "pre-line" }}>
            {c.intro}
          </p>
        </header>

        {/* 개인 기록 통계 (클라이언트 전용, localStorage) */}
        <InsightsStats />

        {/* ── 정보성 콘텐츠 (서버 렌더, 항상 HTML에 포함) ───────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 36 }}>

          {/* 섹션 1 — 자주 기록하는 감정 (상세링크 + 관련감정) */}
          <section style={cardStyle}>
            <SectionLabel kicker="SECTION 01" title={c.emotionsTitle} />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {c.emotions.map((e) => (
                <div key={e.slug} style={{ borderLeft: `2px solid ${LINE}`, paddingLeft: 14 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-serif)", color: ROSE, marginBottom: 8 }}>
                    {e.name}
                  </h3>
                  <p style={{ ...bodyStyle, marginBottom: 12 }}>{e.desc}</p>

                  {/* 관련 감정 (감정 간 내부 링크) */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.06em" }}>
                      {c.relatedLabel}
                    </span>
                    {e.related.map((r) => (
                      <Link key={r.slug} href={`/feelings/${r.slug}`} style={{
                        fontSize: 12.5, color: "#7A6A58", textDecoration: "none",
                        background: "rgba(255,255,255,0.6)", border: `1px solid ${LINE}`,
                        borderRadius: 999, padding: "3px 11px", fontFamily: "var(--font-prose)", fontWeight: 300,
                      }}>
                        {r.name}
                      </Link>
                    ))}
                  </div>

                  {/* 상세 페이지 링크 */}
                  <Link href={`/feelings/${e.slug}`} style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 13, color: ROSE, textDecoration: "none",
                    fontFamily: "var(--font-serif)", fontWeight: 700,
                  }}>
                    {e.name} {c.detailLinkLabel} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 섹션 2 — 감정 기록이 도움이 되는 이유 */}
          <section style={cardStyle}>
            <SectionLabel kicker="SECTION 02" title={c.reasonsTitle} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {c.reasons.map((r, i) => (
                <div key={r.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{
                    flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                    background: ROSE, color: PAPER, fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-serif)", marginTop: 2,
                  }}>{i + 1}</span>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, marginBottom: 6, lineHeight: 1.4 }}>
                      {r.title}
                    </h3>
                    <p style={bodyStyle}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 섹션 3 — 감정 관찰법 */}
          <section style={cardStyle}>
            <SectionLabel kicker="SECTION 03" title={c.methodTitle} />
            <p style={{ ...bodyStyle, marginBottom: 18, color: MUTED }}>{c.methodIntro}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {c.steps.map((s, i) => (
                <div key={s.step} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  padding: "14px 16px", background: "rgba(255,255,255,0.5)", border: `1px solid ${LINE}`, borderRadius: 5,
                }}>
                  <span style={{
                    flexShrink: 0, fontSize: 18, fontWeight: 700, color: ROSE,
                    fontFamily: "var(--font-serif)", opacity: 0.6, lineHeight: 1.2, minWidth: 22,
                  }}>{`0${i + 1}`}</span>
                  <div>
                    <h3 style={{ fontSize: 14.5, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, marginBottom: 4 }}>
                      {s.step}
                    </h3>
                    <p style={{ ...bodyStyle, fontSize: 13.5 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 섹션 4 — 더 많은 감정 인사이트 (감정도감 30개 허브 — 내부 링크) */}
          <section style={cardStyle}>
            <SectionLabel kicker="SECTION 04" title={c.moreTitle} />
            <p style={{ ...bodyStyle, marginBottom: 18, color: MUTED }}>{c.moreIntro}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
              {moreFeelings.map((f) => (
                <Link key={f.slug} href={`/feelings/${f.slug}`} style={{
                  display: "flex", flexDirection: "column", gap: 4,
                  padding: "12px 13px", background: "rgba(255,255,255,0.55)",
                  border: `1px solid ${LINE}`, borderRadius: 6, textDecoration: "none",
                }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK }}>
                    <span style={{ marginRight: 5 }}>{f.emoji}</span>{f.name}
                  </span>
                  <span style={{ fontSize: 11.5, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.45 }}>
                    {f.tagline}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/feelings" style={{
              display: "inline-flex", alignItems: "center", gap: 4, marginTop: 16,
              fontSize: 13, color: ROSE, textDecoration: "none",
              fontFamily: "var(--font-serif)", fontWeight: 700,
            }}>
              {locale === "ko" ? "감정도감 전체 보기" : "Browse the full almanac"} →
            </Link>
          </section>

          {/* 섹션 5 — 우걱이 코멘트 */}
          <section style={{ ...cardStyle, background: "#2A2520", border: "1px solid #3A332B", textAlign: "center", padding: "30px 24px" }}>
            <p style={{ fontSize: 10, color: "#C8607A", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 14 }}>
              {c.ugogiTitle.toUpperCase()}
            </p>
            <p style={{
              fontSize: 17, lineHeight: 1.8, color: "#F5EFE0",
              fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
            }}>
              “{c.ugogiComment}”
            </p>
            <p style={{ fontSize: 13, color: "#A89880", marginTop: 14, fontFamily: "var(--font-serif)" }}>— 우걱이</p>
          </section>

          {/* 이어보기 — 관련 콘텐츠 내부 링크 */}
          <section style={cardStyle}>
            <SectionLabel kicker="READ NEXT" title={c.readMoreTitle} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {readMoreLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{
                  display: "flex", flexDirection: "column", gap: 3,
                  padding: "13px 15px", background: "rgba(255,255,255,0.5)",
                  border: `1px solid ${LINE}`, borderRadius: 6, textDecoration: "none",
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK }}>{l.label} →</span>
                  <span style={{ fontSize: 12.5, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300 }}>{l.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: 4 }}>
            <Link href="/today" style={{
              display: "inline-flex", alignItems: "center",
              background: ROSE, color: PAPER,
              padding: "12px 28px", borderRadius: 4,
              fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700,
              textDecoration: "none",
            }}>
              {locale === "ko" ? "오늘 감정 기록하기" : "Log today's emotion"}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
