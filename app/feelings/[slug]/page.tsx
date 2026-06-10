import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FEELINGS, getFeelingBySlug, getRelatedFeelings } from "@/lib/feelings";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEELINGS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feeling = getFeelingBySlug(slug);
  if (!feeling) return { title: "감정을 찾을 수 없어요 | 우걱이 감정도감" };

  return {
    title: feeling.seoTitle,
    description: feeling.seoDescription,
    keywords: [feeling.name, "감정도감", "우걱이", "감정 기록", "자기 돌봄", "감정 이름"],
    // 감정도감 개별 항목은 사전형 단편이라 색인에서 제외(허브 /feelings 만 색인). 사용자 접근은 그대로.
    robots: { index: false, follow: true },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `https://onulmood.com/feelings/${slug}`,
      title: feeling.seoTitle,
      description: feeling.seoDescription,
      siteName: "오늘무드",
    },
    alternates: { canonical: `https://onulmood.com/feelings/${slug}` },
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
  lineHeight: 2.0,
  letterSpacing: "-0.01em",
  color: DIM,
};

export default async function FeelingPage({ params }: Props) {
  const { slug } = await params;
  const feeling = getFeelingBySlug(slug);
  if (!feeling) notFound();

  const related = getRelatedFeelings(feeling.related);
  const currentIdx = FEELINGS.findIndex((f) => f.slug === slug);
  const prev = currentIdx > 0 ? FEELINGS[currentIdx - 1] : null;
  const next = currentIdx < FEELINGS.length - 1 ? FEELINGS[currentIdx + 1] : null;

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        {/* 뒤로가기 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <Link href="/feelings" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none" }}>
            ← 감정도감
          </Link>
          <span style={{ color: LINE }}>|</span>
          <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none" }}>
            오늘무드
          </Link>
        </div>

        {/* 감정 헤더 */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 8, padding: "32px 28px", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 8 }}>
                {feeling.code} — 우걱이 감정도감
              </p>
              <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(28px, 6vw, 36px)", color: INK, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 12 }}>
                {feeling.name}
              </h1>
              <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 15, color: DIM, fontStyle: "italic", lineHeight: 1.7 }}>
                {feeling.tagline}
              </p>
            </div>
            <span style={{ fontSize: 44, flexShrink: 0, marginLeft: 16 }}>{feeling.emoji}</span>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, padding: "3px 10px", background: `${feeling.color}18`, color: feeling.color, border: `1px solid ${feeling.color}44`, borderRadius: 20, fontFamily: "monospace", letterSpacing: "0.06em" }}>
              {feeling.name}
            </span>
            <span style={{ fontSize: 10, padding: "3px 10px", background: "transparent", color: MUTED, border: `1px solid ${LINE}`, borderRadius: 20, fontFamily: "monospace", letterSpacing: "0.06em" }}>
              {feeling.code}
            </span>
          </div>
        </div>

        {/* 우걱이 관찰 기록 */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ height: 1, flex: 1, background: LINE }} />
            <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.12em", flexShrink: 0 }}>우걱이 관찰 기록</p>
            <div style={{ height: 1, flex: 1, background: LINE }} />
          </div>
          {feeling.observation.split("\n\n").map((para, i) => (
            <p key={i} style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>{para}</p>
          ))}
        </section>

        {/* 주 출몰 지역 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 17, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            주 출몰 지역
          </h2>
          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "16px 20px" }}>
            {feeling.habitats.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < feeling.habitats.length - 1 ? 10 : 0 }}>
                <span style={{ color: feeling.color, fontFamily: "monospace", fontSize: 11, flexShrink: 0, marginTop: 2 }}>📍</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK }}>{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 자주 하는 말 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 17, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            자주 하는 말
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {feeling.phrases.map((phrase, i) => (
              <div key={i} style={{ background: `${feeling.color}08`, border: `1px solid ${feeling.color}20`, borderRadius: 4, padding: "10px 16px" }}>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 14, color: INK, lineHeight: 1.6, letterSpacing: "-0.02em" }}>
                  "{phrase}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 이 감정이 생기는 순간 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 17, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            이 감정이 생기는 순간
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {feeling.moments.map((moment, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <span style={{ color: MUTED, fontFamily: "monospace", fontSize: 10, flexShrink: 0, marginTop: 3 }}>{String(i + 1).padStart(2, "0")}.</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK }}>{moment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 우걱이 감정 메모 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 17, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            우걱이의 감정 메모
          </h2>
          <div style={{ background: INK, borderRadius: 6, padding: "22px 24px" }}>
            <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 12 }}>
              UGOGI PROCESSING NOTES — {feeling.code}
            </p>
            {feeling.memo.split("\n").map((line, i) => (
              <p key={i} style={{ fontSize: 13, fontFamily: "monospace", color: "#D8D0C0", lineHeight: 1.9, letterSpacing: "0.02em" }}>
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* 오늘의 질문 */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ background: `${feeling.color}10`, border: `1px dashed ${LINE}`, borderRadius: 6, padding: "24px 22px" }}>
            <p style={{ fontSize: 10, color: feeling.color, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 12 }}>
              오늘의 자기돌봄 질문
            </p>
            <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 16, color: INK, lineHeight: 1.85, letterSpacing: "-0.02em" }}>
              {feeling.question}
            </p>
          </div>
        </section>

        {/* 감정 파쇄 CTA */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "24px 22px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.02em", marginBottom: 8 }}>
            {feeling.name}을 우걱이한테 던져볼까요?
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 18 }}>
            이름을 알았으니, 이제 파쇄할 수 있어요.
          </p>
          <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ROSE, color: "#F5EFE0", padding: "10px 22px", borderRadius: 4, fontSize: 13, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
            감정 파쇄하러 가기 →
          </Link>
        </div>

        {/* 관련 감정 */}
        {related.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 14, borderBottom: `1px solid ${LINE}`, paddingBottom: 10 }}>
              관련 감정
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/feelings/${r.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 14px", textAlign: "center" }}>
                    <p style={{ fontSize: 20, marginBottom: 6 }}>{r.emoji}</p>
                    <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 13, color: INK, letterSpacing: "-0.02em" }}>{r.name}</p>
                    <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", marginTop: 3 }}>{r.code}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 이전/다음 감정 네비 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 48 }}>
          {prev ? (
            <Link href={`/feelings/${prev.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, padding: "14px 16px" }}>
                <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 6 }}>← 이전 감정</p>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14, color: INK }}>
                  {prev.emoji} {prev.name}
                </p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/feelings/${next.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4, padding: "14px 16px", textAlign: "right" }}>
                <p style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 6 }}>다음 감정 →</p>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 14, color: INK }}>
                  {next.name} {next.emoji}
                </p>
              </div>
            </Link>
          ) : <div />}
        </div>

        {/* 법적 고지 */}
        <div style={{ padding: "14px 16px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.7 }}>
            오늘무드 감정도감은 감정 기록과 자기 돌봄을 위한 콘텐츠입니다. 의학적 진단이나 심리치료를 목적으로 하지 않으며, 전문 상담을 대체할 수 없습니다.
          </p>
        </div>

      </div>
    </div>
  );
}
