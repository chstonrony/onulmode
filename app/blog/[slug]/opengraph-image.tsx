import { ImageResponse } from "next/og";
import { getArticle, ARTICLES } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

const CATEGORY_COLORS: Record<string, string> = {
  "감정 이야기": "#C8607A",
  "MZ 감성":    "#8B6FAB",
  "감정 처리":   "#5A8FA8",
  "관계와 감정": "#7A9E6A",
  "자기 돌봄":   "#C4874A",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  const title    = article?.title       ?? "감정 이야기";
  const category = article?.category    ?? "감정 이야기";
  const desc     = article?.description ?? "오늘의 감정을 솔직하게 이야기해요.";
  const catColor = CATEGORY_COLORS[category] ?? "#C8607A";

  return new ImageResponse(
    <div
      style={{
        width: "100%", height: "100%",
        background: "#EDE4D0",
        display: "flex", flexDirection: "column",
        fontFamily: "serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 배경 노이즈 라인 */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, rgba(42,37,32,0.06) 39px, rgba(42,37,32,0.06) 40px)",
        display: "flex",
      }} />

      {/* 상단 라벨 바 */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "32px 64px 0",
        position: "relative",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#2A2520", display: "flex" }}>
            오늘무드
          </div>
          <div style={{ fontSize: 11, color: "#A89880", fontFamily: "monospace", letterSpacing: 3, display: "flex" }}>
            EMOTIONAL JOURNAL
          </div>
        </div>
        <div style={{
          fontSize: 11, color: catColor, fontFamily: "monospace",
          letterSpacing: 3, display: "flex",
          border: `1px solid ${catColor}`,
          padding: "4px 12px",
        }}>
          {category}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 64px",
        position: "relative",
      }}>

        {/* 제목 */}
        <div style={{
          fontSize: title.length > 20 ? 52 : 62,
          fontWeight: 700,
          color: "#2A2520",
          lineHeight: 1.3,
          marginBottom: 24,
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "85%",
        }}>
          {title}
        </div>

        {/* 설명 */}
        <div style={{
          fontSize: 22,
          color: "#7A7260",
          lineHeight: 1.6,
          maxWidth: "75%",
          display: "flex",
          flexWrap: "wrap",
        }}>
          {desc.length > 60 ? desc.slice(0, 60) + "…" : desc}
        </div>
      </div>

      {/* 하단 바 */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 64px 40px",
        borderTop: "1px solid #D8CEC0",
        paddingTop: 24,
        position: "relative",
      }}>
        {/* 우걱이 코멘트 */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "#F5EFE0",
          border: `1px solid ${catColor}40`,
          borderLeft: `3px solid ${catColor}`,
          padding: "8px 18px",
        }}>
          <div style={{ fontSize: 9, color: catColor, fontFamily: "monospace", letterSpacing: 3, display: "flex" }}>
            우걱이
          </div>
          <div style={{ fontSize: 15, color: "#5A5248", display: "flex" }}>
            읽고 감정 올라오면 던져버려도 됨.
          </div>
        </div>

        {/* URL */}
        <div style={{ fontSize: 14, color: "#A89880", fontFamily: "monospace", letterSpacing: 1, display: "flex" }}>
          onulmood.com/blog
        </div>
      </div>

      {/* 우측 상단 읽기 시간 */}
      {article && (
        <div style={{
          position: "absolute", top: 32, right: 64,
          display: "flex",
        }}>
          <div style={{
            fontSize: 11, color: "#B4A890", fontFamily: "monospace",
            display: "flex",
          }}>
          </div>
        </div>
      )}

      {/* 장식 점 */}
      <div style={{
        position: "absolute", bottom: 120, right: 64,
        width: 160, height: 160,
        borderRadius: "50%",
        border: `2px solid ${catColor}20`,
        display: "flex",
      }} />
      <div style={{
        position: "absolute", bottom: 80, right: 100,
        width: 80, height: 80,
        borderRadius: "50%",
        border: `2px solid ${catColor}15`,
        display: "flex",
      }} />
    </div>,
    { ...size }
  );
}
