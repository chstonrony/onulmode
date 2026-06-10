import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/articles";
import { getLocalizedArticle, getLocalizedArticles } from "@/lib/getLocalizedArticle";
import { getLocale } from "@/lib/getLocale";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getLocalizedArticle(slug, locale);
  if (!article) return {};
  return {
    title: `${article.localizedTitle} | OnulMood`,
    description: article.localizedDescription,
    authors: [{ name: "Sharon", url: "https://onulmood.com/about" }],
    alternates: { canonical: `https://onulmood.com/blog/${slug}` },
    ...(article.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** 인라인 마크다운 렌더: **굵게** 와 [라벨](경로) 내부 링크 지원 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${keyPrefix}-${j}`} style={{ color: "#2A2520", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        return (
          <Link key={`${keyPrefix}-${j}`} href={link[2]} style={{ color: "#C8607A", textDecoration: "underline", textUnderlineOffset: 2 }}>
            {link[1]}
          </Link>
        );
      }
      return <span key={`${keyPrefix}-${j}`}>{part}</span>;
    });
}

const CATEGORY_COLORS: Record<string, string> = {
  "감정 이야기": "#C8607A",
  "새벽 감정":   "#7070A8",
  "MZ 감성":    "#8B6FAB",
  "감정 처리":   "#5A8FA8",
  "관계와 감정": "#7A9E6A",
  "자기 돌봄":   "#C4874A",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getLocalizedArticle(slug, locale);
  if (!article) notFound();

  const catColor = CATEGORY_COLORS[article.category] ?? "#A89880";
  const localizedArticles = getLocalizedArticles(locale);
  const related = localizedArticles.filter(
    (a) => a.category === article.category && a.slug !== slug && !a.noindex
  ).slice(0, 3);

  const paragraphs = article.localizedContent.split("\n\n").filter(Boolean);

  const articleUrl = `https://onulmood.com/blog/${slug}`;
  const jsonLd = article.noindex ? null : {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.localizedTitle,
    description: article.localizedDescription,
    articleSection: article.category,
    inLanguage: locale === "ko" ? "ko-KR" : locale,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "오늘무드 편집팀", url: "https://onulmood.com/about" },
    publisher: {
      "@type": "Organization",
      name: "오늘무드",
      url: "https://onulmood.com",
      logo: { "@type": "ImageObject", url: "https://onulmood.com/opengraph-image" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
  };

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh" }}>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Link href="/blog" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 감정 이야기
        </Link>

        {/* 아티클 헤더 */}
        <div style={{ margin: "24px 0 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{
              fontSize: 11, padding: "3px 12px",
              background: `${catColor}18`, color: catColor,
              border: `1px solid ${catColor}44`,
              borderRadius: 20, fontFamily: "var(--font-serif)",
            }}>
              {article.category}
            </span>
            <span style={{ fontSize: 11, color: "#B4A890", fontFamily: "monospace" }}>
              {article.readingTime}분 읽기
            </span>
          </div>
          <h1 style={{
            fontSize: 28, fontWeight: 700, fontFamily: "var(--font-serif)",
            color: "#2A2520", lineHeight: 1.4, marginBottom: 12,
          }}>
            {article.localizedTitle}
          </h1>
          <p style={{ fontSize: 15, color: "#7A7260", lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>
            {article.localizedDescription}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <p style={{ fontSize: 11, color: "#B4A890", fontFamily: "monospace" }}>
              {article.date}
            </p>
            {/* 저자 byline */}
            <Link href="/about" style={{
              display: "flex", alignItems: "center", gap: 8,
              textDecoration: "none",
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "#C8607A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: "#F5EFE0", fontWeight: 700,
                fontFamily: "var(--font-serif)",
                flexShrink: 0,
              }}>S</div>
              <div>
                <p style={{ fontSize: 12, color: "#5A5248", fontFamily: "var(--font-serif)", fontWeight: 700 }}>Sharon</p>
                <p style={{ fontSize: 10, color: "#A89880", fontFamily: "monospace" }}>오늘무드 편집팀 · 운영 최샤론</p>
              </div>
            </Link>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: "1px solid #D8CEC0", marginBottom: 36 }} />

        {/* 본문 */}
        <article style={{ fontSize: 15, color: "#3A3228", lineHeight: 1.95, fontWeight: 300 }}>
          {paragraphs.map((block, i) => {
            if (block.startsWith("**") && block.endsWith("**") && !block.slice(2).includes("**")) {
              return (
                <h2 key={i} style={{
                  fontSize: 18, fontWeight: 700, fontFamily: "var(--font-serif)",
                  color: "#2A2520", margin: "32px 0 12px",
                }}>
                  {block.slice(2, -2)}
                </h2>
              );
            }

            // h3 (### ) / h2 (## ) — 추가형 규칙. 기존 글은 사용하지 않아 영향 없음
            if (block.startsWith("### ")) {
              return (
                <h3 key={i} style={{
                  fontSize: 15.5, fontWeight: 700, fontFamily: "var(--font-serif)",
                  color: "#3A3228", margin: "22px 0 8px",
                }}>
                  {block.slice(4)}
                </h3>
              );
            }
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} style={{
                  fontSize: 18, fontWeight: 700, fontFamily: "var(--font-serif)",
                  color: "#2A2520", margin: "32px 0 12px",
                }}>
                  {block.slice(3)}
                </h2>
              );
            }

            if (block.startsWith("- ")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} style={{ paddingLeft: 20, margin: "12px 0" }}>
                  {items.map((item, j) => (
                    <li key={j} style={{ marginBottom: 6 }}>{renderInline(item.slice(2), `li-${i}-${j}`)}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={i} style={{ marginBottom: 20 }}>{renderInline(block, `p-${i}`)}</p>
            );
          })}
        </article>

        {/* 저자 바이오 카드 */}
        <div style={{
          margin: "40px 0 0",
          padding: "20px 22px",
          background: "#F5EFE0",
          border: "1px solid #D8CEC0",
          borderRadius: 4,
          display: "flex", alignItems: "flex-start", gap: 16,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "#C8607A", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, color: "#F5EFE0", fontWeight: 700,
            fontFamily: "var(--font-serif)",
          }}>S</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#2A2520", fontFamily: "var(--font-serif)" }}>Sharon</p>
              <span style={{ fontSize: 10, color: "#C8607A", fontFamily: "monospace", letterSpacing: "0.08em" }}>오늘무드 편집팀 · 운영 최샤론</span>
            </div>
            <p style={{ fontSize: 13, color: "#6A6258", lineHeight: 1.8, fontWeight: 300, fontFamily: "var(--font-serif)", marginBottom: 10 }}>
              감정을 이상한 방식으로 처리하는 서비스를 만들었어요. 우걱이가 제일 열심히 일하고 있습니다. 감정 관련 글을 씁니다.
            </p>
            <Link href="/about" style={{
              fontSize: 11, color: "#C8607A", fontFamily: "monospace",
              letterSpacing: "0.04em", textDecoration: "none",
            }}>
              오늘무드 소개 보기 →
            </Link>
          </div>
        </div>

        {/* 저자 코멘트 */}
        {article.authorNote && (
          <div style={{
            margin: "36px 0 0",
            padding: "20px 22px",
            background: "#FAF8F0",
            border: "1.5px solid #D8CEC0",
            borderLeft: "3px solid #C8607A",
            borderRadius: 3,
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: -10, left: 16, background: "#FAF8F0", padding: "0 8px" }}>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#C8607A", letterSpacing: "0.1em" }}>
                SHARON&apos;S NOTE
              </span>
            </div>
            <p style={{ fontSize: 14, color: "#5A5248", lineHeight: 1.85, fontFamily: "var(--font-serif)", fontWeight: 300 }}>
              {article.authorNote}
            </p>
            <p style={{ fontSize: 11, color: "#B4A890", marginTop: 10, fontFamily: "monospace" }}>
              — 오늘무드 만든 사람
            </p>
          </div>
        )}

        {/* CTA */}
        <div style={{
          margin: "32px 0",
          background: "#1A1410",
          border: "2px solid #C8607A",
          padding: "24px 28px",
          textAlign: "center",
          position: "relative",
        }}>
          <p style={{ fontSize: 9, fontFamily: "monospace", color: "#5A5248", letterSpacing: "0.14em", marginBottom: 12 }}>
            ■ 우걱이 처리소 — 감정 투입 대기 중
          </p>
          <p style={{ fontSize: 16, color: "#FAF8F2", fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 6 }}>
            이 글 읽고 감정 올라왔어?
          </p>
          <p style={{ fontSize: 13, color: "#7A7260", fontFamily: "var(--font-serif)", marginBottom: 18 }}>
            우걱이가 지금 배고픔 MAX임. 던져.
          </p>
          <Link href="/release" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#C8607A", color: "#F5EFE0",
            border: "2px solid #C8607A",
            padding: "12px 28px",
            fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700,
            textDecoration: "none",
            boxShadow: "4px 4px 0 rgba(200,96,122,0.4)",
          }}>
            우걱이한테 던지기 →
          </Link>
        </div>

        {/* 관련 글 */}
        {related.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{
              fontSize: 16, fontWeight: 700, fontFamily: "var(--font-serif)",
              color: "#2A2520", marginBottom: 16,
              borderBottom: "1px solid #D8CEC0", paddingBottom: 10,
            }}>
              비슷한 이야기
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              {related.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "16px 20px", background: "#F5EFE0",
                    border: "1px solid #D8CEC0", borderRadius: 4,
                  }}>
                    <p style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 4 }}>
                      {a.localizedTitle}
                    </p>
                    <p style={{ fontSize: 12, color: "#7A7260", fontWeight: 300 }}>
                      {a.localizedDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 오늘의 감정퇴비 박스 */}
        <div style={{ marginTop: 32, background: "#1A2A1A", border: "1.5px solid #2A4A2A", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ background: "#0E1A0E", padding: "7px 16px" }}>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#6A9B7A", letterSpacing: "0.12em" }}>
              🌱 오늘의 감정퇴비
            </span>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#A8CCA0", lineHeight: 1.85, marginBottom: 12 }}>
              이 감정은 완전히 사라지지 않아도 괜찮습니다.<br />
              오늘은 이름을 붙인 것만으로도 충분합니다.
            </p>
            <div style={{ borderTop: "1px dashed #2A4A2A", paddingTop: 10 }}>
              <p style={{ fontSize: 10, color: "#5A7A5A", fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 6 }}>우걱이 메모</p>
              <p style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "#7A9A7A", lineHeight: 1.8 }}>
                덜 썩은 감정은 가끔 다시 올라옵니다.<br />
                놀라지 말고, 다시 던지면 됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 면책 문구 */}
        <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(42,37,32,0.04)", border: "1px dashed #D8CEC0", borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: "#A89880", fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
            이 글은 감정을 쉽게 이해하고 기록하기 위한 콘텐츠입니다. 의학적 진단이나 상담을 대신하지 않습니다.
          </p>
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: "1px solid #D8CEC0", paddingTop: 24, marginTop: 32 }}>
          <p style={{ fontSize: 12, color: "#A89880", textAlign: "center" }}>
            © 2026 오늘무드. All rights reserved.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>홈</Link>
            <Link href="/blog" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>감정 이야기</Link>
            <Link href="/about" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>소개</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
