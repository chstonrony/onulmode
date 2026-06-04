import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT_ARTICLES, CATEGORY_META, type ContentCategory } from "@/lib/contentSystem";

export const metadata: Metadata = {
  title: "우걱이 매거진 | 오늘무드",
  description: "감정을 다루는 콘텐츠 플랫폼. 감정도감, 우걱이 연구소, 감정퇴비실 기록, 우걱이 사용설명서. 오늘의 감정을 조금 더 잘 이해하고 기록하기 위한 콘텐츠.",
  keywords: ["감정도감", "우걱이 연구소", "감정퇴비실", "서운함", "외로움", "불안", "감정 기록", "마음 관리"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/magazine",
    title: "우걱이 매거진 | 오늘무드",
    description: "감정을 다루는 콘텐츠 플랫폼. 오늘의 감정을 조금 더 잘 이해하기 위한 콘텐츠.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/magazine" },
};

const BG    = "#EDE4D0";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const ROSE  = "#C8607A";
const INK   = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#6A6058";

const CATEGORIES: ContentCategory[] = ["emotion-guide", "ugogi-lab", "compost-record", "ugogi-manual"];

export default function MagazinePage() {
  const byCategory = Object.fromEntries(
    CATEGORIES.map(cat => [cat, CONTENT_ARTICLES.filter(a => a.category === cat)])
  ) as Record<ContentCategory, typeof CONTENT_ARTICLES>;

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 100px" }}>

        <Link href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300, display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.18em", marginBottom: 12 }}>
            UGOGI MAGAZINE
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(24px, 6vw, 32px)", color: INK, lineHeight: 1.35, letterSpacing: "-0.025em", marginBottom: 14 }}>
            우걱이 매거진
          </h1>
          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 15, color: DIM, lineHeight: 2.0, letterSpacing: "-0.01em" }}>
            감정을 다루는 콘텐츠 플랫폼.<br />
            오늘의 감정을 조금 더 잘 이해하고 기록하기 위한 글들.
          </p>
        </div>

        {/* 카테고리별 섹션 */}
        {CATEGORIES.map(cat => {
          const meta = CATEGORY_META[cat];
          const articles = byCategory[cat];
          return (
            <section key={cat} style={{ marginBottom: 56 }}>
              {/* 카테고리 헤더 */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: `1.5px solid ${LINE}` }}>
                <span style={{ fontSize: 22 }}>{meta.emoji}</span>
                <div>
                  <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 2 }}>
                    {meta.label}
                  </h2>
                  <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300 }}>
                    {meta.desc}
                  </p>
                </div>
              </div>

              {/* 아티클 목록 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {articles.map(article => (
                  <Link key={article.slug} href={`/magazine/${article.category}/${article.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6,
                      padding: "16px 18px", transition: "border-color 0.15s",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 15, color: INK, letterSpacing: "-0.02em", marginBottom: 5, lineHeight: 1.4 }}>
                            {article.title}
                          </h3>
                          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 12, color: DIM, lineHeight: 1.6, marginBottom: 8 }}>
                            {article.subtitle}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {article.tags.slice(0, 3).map(tag => (
                              <span key={tag} style={{ fontSize: 10, color: MUTED, border: `1px solid ${LINE}`, padding: "2px 8px", borderRadius: 20, fontFamily: "monospace", letterSpacing: "0.02em" }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                          <span style={{ fontSize: 10, color: meta.color, fontFamily: "monospace", letterSpacing: "0.06em", display: "block", marginBottom: 4 }}>
                            {meta.emoji} {meta.label}
                          </span>
                          <span style={{ fontSize: 10, color: MUTED, fontFamily: "monospace" }}>
                            {article.readingTime}분
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* 법적 고지 */}
        <div style={{ padding: "14px 16px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
            이 콘텐츠는 감정을 쉽게 이해하고 기록하기 위한 것입니다. 의학적 진단이나 상담을 대신하지 않습니다.
          </p>
        </div>

      </div>
    </div>
  );
}
