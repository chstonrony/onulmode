import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CONTENT_ARTICLES, CATEGORY_META, getContentBySlug, getContentByCategory } from "@/lib/contentSystem";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return CONTENT_ARTICLES.map(a => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getContentBySlug(slug);
  if (!article) return { title: "콘텐츠를 찾을 수 없습니다 | 우걱이 매거진" };
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.tags,
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `https://onulmood.com/magazine/${article.category}/${article.slug}`,
      title: article.seoTitle,
      description: article.seoDescription,
      siteName: "오늘무드",
    },
    alternates: { canonical: `https://onulmood.com/magazine/${article.category}/${article.slug}` },
  };
}

const BG    = "#EDE4D0";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const ROSE  = "#C8607A";
const INK   = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#6A6058";

const PROSE: React.CSSProperties = {
  fontFamily: "var(--font-prose)",
  fontWeight: 300,
  lineHeight: 2.1,
  letterSpacing: "-0.01em",
  color: DIM,
};

function renderContent(raw: string) {
  const lines = raw.split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;

  for (const line of lines) {
    if (!line.trim()) {
      key++;
      continue;
    }
    if (line.startsWith("### ")) {
      // h3 — 추가형 규칙(기존 글은 미사용)
      elements.push(
        <h3 key={key++} style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14.5, color: "#3A3228", letterSpacing: "-0.02em", marginTop: 20, marginBottom: 8 }}>
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <h2 key={key++} style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 17, color: INK, letterSpacing: "-0.02em", marginTop: 28, marginBottom: 12 }}>
          {line.slice(2, -2)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <div key={key++} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ color: ROSE, flexShrink: 0, marginTop: 4, fontSize: 12 }}>•</span>
          <p style={{ ...PROSE, fontSize: 14 }}>{line.slice(2)}</p>
        </div>
      );
    } else if (/^\d+단계:/.test(line) || /^\d+\./.test(line)) {
      elements.push(
        <p key={key++} style={{ ...PROSE, fontSize: 14, marginBottom: 8, paddingLeft: 4 }}>{line}</p>
      );
    } else if (line.startsWith("---")) {
      elements.push(<div key={key++} style={{ borderTop: `1px solid ${LINE}`, margin: "20px 0" }} />);
    } else {
      elements.push(
        <p key={key++} style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>{line}</p>
      );
    }
  }
  return elements;
}

export default async function MagazineArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = getContentBySlug(slug);
  if (!article || article.category !== category) notFound();

  const meta = CATEGORY_META[article.category];
  const related = getContentByCategory(article.category)
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 100px" }}>

        {/* 뒤로가기 */}
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          <Link href="/magazine" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none" }}>
            ← 우걱이 매거진
          </Link>
          <span style={{ color: LINE }}>|</span>
          <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none" }}>
            오늘무드
          </Link>
        </div>

        {/* 카테고리 + 헤더 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 14 }}>{meta.emoji}</span>
            <span style={{ fontSize: 11, color: meta.color, fontFamily: "monospace", letterSpacing: "0.1em" }}>
              {meta.label.toUpperCase()}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 28px)", color: INK, lineHeight: 1.4, letterSpacing: "-0.025em", marginBottom: 12 }}>
            {article.title}
          </h1>
          <p style={{ ...PROSE, fontSize: 14, color: MUTED, marginBottom: 16 }}>
            {article.subtitle}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: MUTED, fontFamily: "monospace" }}>{article.date}</span>
            <span style={{ fontSize: 10, color: MUTED, fontFamily: "monospace" }}>읽기 {article.readingTime}분</span>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 40 }} />

        {/* 본문 */}
        <article>
          {renderContent(article.content)}
        </article>

        {/* 태그 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 32, marginBottom: 40 }}>
          {article.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, color: MUTED, border: `1px solid ${LINE}`, padding: "4px 12px", borderRadius: 20, fontFamily: "monospace", letterSpacing: "0.04em" }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* 오늘의 퇴비 한 줄 */}
        <div style={{ background: "#1A2A1A", border: "1.5px solid #2A4A2A", borderRadius: 6, padding: "20px 20px", marginBottom: 40 }}>
          <p style={{ fontSize: 9, color: "#6A9B7A", fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 10 }}>
            🌱 오늘의 퇴비 한 줄
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "#A8CCA0", lineHeight: 1.85 }}>
            {article.compostLine}
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "28px 24px", textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.02em", marginBottom: 8 }}>
            오늘 이 감정 우걱이한테 던져볼까요?
          </p>
          <p style={{ ...PROSE, fontSize: 12, marginBottom: 18 }}>
            우걱이가 씹고, 퇴비로 만들고, 씨앗을 남겨드립니다.
          </p>
          <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ROSE, color: "#F5EFE0", padding: "10px 22px", borderRadius: 4, fontSize: 13, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
            감정 파쇄하러 가기 →
          </Link>
        </div>

        {/* 관련 글 */}
        {related.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 14, borderBottom: `1px solid ${LINE}`, paddingBottom: 10 }}>
              {meta.label}의 다른 글
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map(a => (
                <Link key={a.slug} href={`/magazine/${a.category}/${a.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, padding: "14px 16px" }}>
                    <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14, color: INK, letterSpacing: "-0.02em", marginBottom: 4 }}>
                      {a.title}
                    </p>
                    <p style={{ fontSize: 12, color: DIM, fontFamily: "var(--font-prose)", fontWeight: 300 }}>
                      {a.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 면책 */}
        <div style={{ padding: "12px 14px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
            이 글은 감정을 쉽게 이해하고 기록하기 위한 콘텐츠입니다. 의학적 진단이나 상담을 대신하지 않습니다.
          </p>
        </div>

      </div>
    </div>
  );
}
