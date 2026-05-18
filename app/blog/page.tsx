import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, CATEGORIES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "감정 이야기 | 오늘무드 — 지쳤을 때, 억울할 때, 외로울 때 읽는 글",
  description: "번아웃, 억울함, 외로움, 현타, 서운함… MZ세대의 감정을 솔직하게 이야기해요. 오늘무드 감정 블로그.",
  keywords: ["감정 이야기", "번아웃", "스트레스 해소", "MZ감성", "감정 관리", "자기 돌봄", "현타", "외로움"],
};

const CATEGORY_COLORS: Record<string, string> = {
  "감정 이야기": "#C8607A",
  "MZ 감성": "#8B6FAB",
  "감정 처리": "#5A8FA8",
  "관계와 감정": "#7A9E6A",
  "자기 돌봄": "#C4874A",
};

export default function BlogPage() {
  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ margin: "24px 0 32px" }}>
          <p style={{ fontSize: 10, color: "#C8607A", fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 10 }}>
            UGEGI READING ROOM / 우걱이 씹다 남긴 글
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", lineHeight: 1.3, marginBottom: 16 }}>
            감정 이야기
          </h1>
          {/* 우걱이 코멘트 박스 */}
          <div style={{
            padding: "14px 18px",
            background: "#F5EFE0",
            border: "1.5px solid #D8CEC0",
            borderLeft: "3px solid #C8607A",
            borderRadius: 3,
            marginBottom: 4,
          }}>
            <p style={{ fontSize: 12, color: "#7A7260", lineHeight: 1.8, fontFamily: "var(--font-serif)" }}>
              우걱이가 씹다가 남긴 글들임.<br/>
              읽고 감정 올라오면 파쇄하러 와.
            </p>
            <p style={{ fontSize: 10, color: "#B4A890", fontFamily: "monospace", marginTop: 6 }}>
              — 우걱이 (감정 소화 전문 유기체)
            </p>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {CATEGORIES.map((cat) => (
            <span key={cat} style={{
              fontSize: 12, padding: "4px 12px",
              background: `${CATEGORY_COLORS[cat] ?? "#A89880"}18`,
              color: CATEGORY_COLORS[cat] ?? "#A89880",
              border: `1px solid ${CATEGORY_COLORS[cat] ?? "#A89880"}44`,
              borderRadius: 20, fontFamily: "var(--font-serif)",
            }}>
              {cat}
            </span>
          ))}
        </div>

        {/* 글 목록 */}
        <div style={{ display: "grid", gap: 16 }}>
          {ARTICLES.map((article) => {
            const catColor = CATEGORY_COLORS[article.category] ?? "#A89880";
            return (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                <article style={{
                  padding: "24px 28px",
                  background: "#F5EFE0",
                  border: "1px solid #D8CEC0",
                  borderRadius: 4,
                  transition: "box-shadow 0.15s",
                  cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{
                      fontSize: 11, padding: "2px 10px",
                      background: `${catColor}18`,
                      color: catColor,
                      border: `1px solid ${catColor}44`,
                      borderRadius: 20, fontFamily: "var(--font-serif)",
                    }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: 11, color: "#B4A890", fontFamily: "monospace" }}>
                      {article.readingTime}분
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: 17, fontWeight: 700, fontFamily: "var(--font-serif)",
                    color: "#2A2520", lineHeight: 1.4, marginBottom: 8,
                  }}>
                    {article.title}
                  </h2>
                  <p style={{ fontSize: 13, color: "#7A7260", lineHeight: 1.7, fontWeight: 300, marginBottom: 10 }}>
                    {article.description}
                  </p>
                  {article.authorNote && (
                    <p style={{
                      fontSize: 11, color: "#9A8878", fontFamily: "var(--font-serif)",
                      fontStyle: "italic", lineHeight: 1.6,
                      borderLeft: "2px solid #D8CEC0", paddingLeft: 10,
                      marginBottom: 10,
                    }}>
                      &ldquo;{article.authorNote.slice(0, 60)}…&rdquo;
                    </p>
                  )}
                  <p style={{ fontSize: 11, color: "#B4A890", fontFamily: "monospace" }}>
                    {article.date} · {article.readingTime}분
                  </p>
                </article>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 48, padding: "24px 28px", textAlign: "center",
          background: "#1A1410", borderRadius: 3,
          position: "relative", overflow: "hidden",
        }}>
          <p style={{ fontSize: 10, fontFamily: "monospace", color: "#5A5248", letterSpacing: "0.14em", marginBottom: 10 }}>
            ■ 우걱이 처리소 광고 (무료)
          </p>
          <p style={{ fontSize: 16, color: "#F5EFE0", marginBottom: 6, fontFamily: "var(--font-serif)", fontWeight: 700 }}>
            감정 올라왔음?
          </p>
          <p style={{ fontSize: 13, color: "#7A7260", marginBottom: 18, fontFamily: "var(--font-serif)" }}>
            우걱이가 지금 배고픔 MAX임.
          </p>
          <Link href="/release" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#C8607A", color: "#F5EFE0",
            padding: "14px 32px", borderRadius: 3,
            fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700,
            textDecoration: "none",
            boxShadow: "4px 4px 0 rgba(200,96,122,0.4)",
          }}>
            감정 지금 파쇄하기 →
          </Link>
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: "1px solid #D8CEC0", paddingTop: 24, marginTop: 48 }}>
          <p style={{ fontSize: 12, color: "#A89880", textAlign: "center" }}>
            © 2026 오늘무드. All rights reserved.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>홈</Link>
            <Link href="/about" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>소개</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
