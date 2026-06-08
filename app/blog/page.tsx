import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";
import { UgegiStatusBar, NightOverlay } from "@/components/blog/BlogAtmosphere";
import { getLocale } from "@/lib/getLocale";
import { getLocalizedArticles } from "@/lib/getLocalizedArticle";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "감정 이야기 | 오늘무드",
  description: "번아웃, 외로움, 억울함, 서운함. 감정에 대해 솔직하게 쓴 글 모음. 지쳤을 때, 새벽에 혼자 있을 때 읽어보세요.",
  keywords: ["감정 이야기", "번아웃", "외로움", "감정 표현", "마음 건강", "감정 처리", "자기 돌봄", "심리", "위로"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/blog",
    title: "감정 이야기 | 오늘무드",
    description: "번아웃, 외로움, 억울함. 감정에 대해 솔직하게 쓴 글들.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/blog" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "감정 이야기":  "#C8607A",
  "새벽 감정":   "#7070A8",
  "MZ 감성":    "#8B6FAB",
  "감정 처리":   "#5A8FA8",
  "관계와 감정": "#7A9E6A",
  "자기 돌봄":  "#C4874A",
};

export default async function BlogPage() {
  const locale = await getLocale();
  const t = translations[locale] ?? translations.ko;
  const allArticles = getLocalizedArticles(locale).filter(a => !a.noindex);
  const newArticles    = allArticles.filter(a => a.category === "새벽 감정");
  const otherArticles  = allArticles.filter(a => a.category !== "새벽 감정");

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh", position: "relative" }}>
      <NightOverlay />

      {/* ── 우걱이 상태 바 ── */}
      <UgegiStatusBar />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 100px" }}>

        {/* 뒤로 */}
        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← OnulMood
        </Link>

        {/* ── 헤더 ── */}
        <div style={{ margin: "20px 0 28px" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
            <div style={{ position: "absolute", top: -8, left: -4, right: -4, bottom: -4, background: "rgba(212,188,144,0.4)", transform: "rotate(-0.8deg)", zIndex: 0 }}/>
            <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", position: "relative", zIndex: 1, padding: "2px 8px" }}>
              {t.blog.title}
            </h1>
          </div>

          <div style={{
            padding: "14px 18px", background: "#F5EFE0",
            border: "1.5px solid #D8CEC0", borderLeft: "3px solid #C8607A",
            marginBottom: 4,
          }}>
            <p style={{ fontSize: 13, color: "#7A7260", lineHeight: 1.8, fontFamily: "var(--font-serif)" }}>
              {t.blog.subtitle}
            </p>
            <p style={{ fontSize: 9, color: "#B4A890", fontFamily: "monospace", marginTop: 6, letterSpacing: "0.08em" }}>
              — Ugogi Disposal / Emotion Archive
            </p>
          </div>
        </div>

        {/* ── 카테고리 필터 ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {CATEGORIES.map((cat) => (
            <span key={cat} style={{
              fontSize: 11, padding: "3px 12px",
              background: `${CATEGORY_COLORS[cat] ?? "#A89880"}16`,
              color: CATEGORY_COLORS[cat] ?? "#A89880",
              border: `1px solid ${CATEGORY_COLORS[cat] ?? "#A89880"}40`,
              fontFamily: "var(--font-serif)",
            }}>
              {cat}
            </span>
          ))}
        </div>

        {/* ── 새벽 감정 에세이 (신규) ── */}
        {newArticles.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 8, fontFamily: "monospace", color: "#7070A8", letterSpacing: "0.14em" }}>
                ▼ 새벽 감정 — 우걱이가 씹다 남긴 글
              </span>
              <div style={{ flex: 1, height: 1, background: "#D8CEC0" }} />
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {newArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                  <article style={{
                    padding: "22px 24px",
                    background: "#F5EFE0",
                    border: "1.5px solid #D8CEC0",
                    borderLeft: "3px solid #7070A8",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* 줄 노트 배경 */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(transparent,transparent 27px,rgba(180,170,150,0.1) 27px,rgba(180,170,150,0.1) 28px)", backgroundPosition: "0 36px", pointerEvents: "none" }}/>

                    <div style={{ position: "relative" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 10, padding: "2px 8px", background: "#7070A820", color: "#7070A8", border: "1px solid #7070A840", fontFamily: "var(--font-serif)" }}>
                          새벽 감정
                        </span>
                        <span style={{ fontSize: 10, color: "#B4A890", fontFamily: "monospace" }}>
                          {article.readingTime}분
                        </span>
                      </div>

                      <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", lineHeight: 1.4, marginBottom: 8 }}>
                        {article.localizedTitle}
                      </h2>

                      <p style={{ fontSize: 13, color: "#7A7260", lineHeight: 1.75, fontWeight: 300, marginBottom: 10 }}>
                        {article.localizedDescription}
                      </p>

                      {article.authorNote && (
                        <p style={{ fontSize: 11, color: "#9A8878", fontFamily: "var(--font-serif)", fontStyle: "italic", lineHeight: 1.6, borderLeft: "2px solid #D8CEC0", paddingLeft: 10, marginBottom: 10 }}>
                          &ldquo;{article.authorNote.slice(0, 60)}…&rdquo;
                        </p>
                      )}

                      <p style={{ fontSize: 10, color: "#B4A890", fontFamily: "monospace" }}>
                        {article.date}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 구분선 ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ fontSize: 8, fontFamily: "monospace", color: "#A89880", letterSpacing: "0.12em" }}>
            ▼ 감정 이야기 — 보관된 기록들
          </span>
          <div style={{ flex: 1, height: 1, background: "#D8CEC0" }} />
        </div>

        {/* ── 기존 글 목록 ── */}
        <div style={{ display: "grid", gap: 10 }}>
          {otherArticles.map((article) => {
            const catColor = CATEGORY_COLORS[article.category] ?? "#A89880";
            return (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                <article style={{
                  padding: "18px 22px",
                  background: "#F5EFE0",
                  border: "1px solid #D8CEC0",
                  cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, padding: "2px 8px", background: `${catColor}16`, color: catColor, border: `1px solid ${catColor}40`, fontFamily: "var(--font-serif)" }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: 10, color: "#B4A890", fontFamily: "monospace" }}>
                      {article.readingTime}분
                    </span>
                  </div>

                  <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", lineHeight: 1.4, marginBottom: 6 }}>
                    {article.localizedTitle}
                  </h2>

                  <p style={{ fontSize: 12, color: "#7A7260", lineHeight: 1.7, fontWeight: 300, marginBottom: 8 }}>
                    {article.localizedDescription}
                  </p>

                  {article.authorNote && (
                    <p style={{ fontSize: 10, color: "#9A8878", fontFamily: "var(--font-serif)", fontStyle: "italic", lineHeight: 1.6, borderLeft: "2px solid #D8CEC0", paddingLeft: 8, marginBottom: 8 }}>
                      &ldquo;{article.authorNote.slice(0, 55)}…&rdquo;
                    </p>
                  )}

                  <p style={{ fontSize: 10, color: "#B4A890", fontFamily: "monospace" }}>
                    {article.date}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div style={{
          marginTop: 48, padding: "24px 28px", textAlign: "center",
          background: "#1A1410", border: "2px solid #C8607A",
          position: "relative",
        }}>
          <p style={{ fontSize: 9, fontFamily: "monospace", color: "#5A5248", letterSpacing: "0.14em", marginBottom: 10 }}>
            ■ 우걱이 처리소 — 감정 투입 대기 중
          </p>
          <p style={{ fontSize: 16, color: "#F5EFE0", marginBottom: 6, fontFamily: "var(--font-serif)", fontWeight: 700 }}>
            글 읽고 감정 올라왔어?
          </p>
          <p style={{ fontSize: 13, color: "#7A7260", marginBottom: 18, fontFamily: "var(--font-serif)" }}>
            우걱이가 지금 배고픔 MAX임. 던져.
          </p>
          <Link href="/release" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#C8607A", color: "#F5EFE0",
            border: "2px solid #C8607A",
            padding: "14px 32px",
            fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700,
            textDecoration: "none",
            boxShadow: "4px 4px 0 rgba(200,96,122,0.4)",
          }}>
            우걱이한테 던지기 →
          </Link>
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: "1px solid #D8CEC0", paddingTop: 24, marginTop: 48 }}>
          <p style={{ fontSize: 11, color: "#B4A890", textAlign: "center", fontFamily: "monospace", letterSpacing: "0.06em" }}>
            © 2026 오늘무드. All rights reserved.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 10 }}>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>우걱이</Link>
            <Link href="/about" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>사용설명서</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
