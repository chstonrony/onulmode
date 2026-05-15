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
        <div style={{ margin: "24px 0 40px" }}>
          <p style={{ fontSize: 11, color: "#C8607A", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 10 }}>
            EMOTIONAL JOURNAL
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", lineHeight: 1.3, marginBottom: 12 }}>
            감정 이야기
          </h1>
          <p style={{ fontSize: 15, color: "#7A7260", lineHeight: 1.7, fontWeight: 300 }}>
            지쳤을 때, 억울할 때, 외로울 때, 현타 올 때.<br/>
            그 감정에 대해 솔직하게 이야기해요.
          </p>
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
                  <p style={{ fontSize: 13, color: "#7A7260", lineHeight: 1.7, fontWeight: 300 }}>
                    {article.description}
                  </p>
                  <p style={{ fontSize: 11, color: "#B4A890", fontFamily: "monospace", marginTop: 12 }}>
                    {article.date}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 48, padding: "28px 32px", textAlign: "center",
          background: "#F5EFE0", border: "1px solid #D8CEC0", borderRadius: 4,
        }}>
          <p style={{ fontSize: 15, color: "#5A5248", marginBottom: 16, fontFamily: "var(--font-serif)" }}>
            글 읽고 감정이 올라왔다면?
          </p>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#C8607A", color: "#F5EFE0",
            padding: "12px 28px", borderRadius: 4,
            fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700,
            textDecoration: "none",
          }}>
            감정 버리러 가기 →
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
