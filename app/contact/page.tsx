import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의하기 | 오늘무드",
  description: "오늘무드에 대한 일반 문의, 오류 제보, 협업 제안을 보내주세요.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/contact",
    title: "문의하기 | 오늘무드",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/contact" },
};

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

export default function ContactPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        <div style={{ marginBottom: 44 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 10 }}>
            CONTACT
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 600, fontFamily: "var(--font-maru)", color: INK, lineHeight: 1.35, marginBottom: 12, letterSpacing: "-0.025em" }}>
            문의하기
          </h1>
          <p style={{ ...PROSE, fontSize: 14 }}>
            오늘무드에 대한 일반 문의, 오류 제보, 협업 제안을 보내주세요.
          </p>
        </div>

        {/* 이메일 연락처 */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "24px 24px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>✉</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--font-maru)", color: INK, marginBottom: 4, letterSpacing: "-0.02em" }}>
                이메일 문의
              </p>
              <p style={{ ...PROSE, fontSize: 13, marginBottom: 14 }}>
                서비스 관련 문의, 오류 제보, 협업 및 파트너십 제안
              </p>
              {/* 이메일 텍스트로 명확히 노출 */}
              <div style={{ background: "#EDE4D0", border: `1px solid ${LINE}`, borderRadius: 4, padding: "10px 16px", marginBottom: 14 }}>
                <p style={{ fontSize: 14, fontFamily: "monospace", color: INK, letterSpacing: "0.02em" }}>
                  chston0603@gmail.com
                </p>
              </div>
              <a href="mailto:chston0603@gmail.com" style={{
                display: "inline-flex", alignItems: "center",
                background: ROSE, color: "#F5EFE0",
                padding: "9px 20px", borderRadius: 4,
                fontSize: 13, fontFamily: "var(--font-maru)", fontWeight: 600,
                textDecoration: "none",
              }}>
                이메일 보내기 →
              </a>
            </div>
          </div>
        </div>

        <p style={{ ...PROSE, fontSize: 12, color: MUTED, marginBottom: 36, paddingLeft: 4 }}>
          문의 후 평균 3~5일 이내에 답변드립니다.
        </p>

        {/* FAQ */}
        <div style={{ padding: "22px 24px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, marginBottom: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-maru)", color: INK, marginBottom: 16, letterSpacing: "-0.02em" }}>
            자주 묻는 질문
          </p>
          {[
            { q: "감정 기록 데이터는 어디에 저장되나요?", a: "모든 데이터는 사용자의 브라우저에만 저장되며, 오늘무드 서버로 전송되지 않아요." },
            { q: "오늘무드는 의료 서비스인가요?", a: "아니에요. 감정을 가볍게 기록하고 정리하는 감성 콘텐츠 서비스로, 의료 진단이나 상담을 대체하지 않아요." },
            { q: "앱으로도 출시되나요?", a: "현재 웹 서비스로만 운영 중이에요. 향후 앱 출시를 검토 중이에요." },
          ].map(({ q, a }, i) => (
            <div key={q} style={{ marginBottom: i < 2 ? 14 : 0, paddingBottom: i < 2 ? 14 : 0, borderBottom: i < 2 ? `1px solid ${LINE}` : "none" }}>
              <p style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-maru)", color: INK, marginBottom: 5, letterSpacing: "-0.01em" }}>Q. {q}</p>
              <p style={{ ...PROSE, fontSize: 13 }}>A. {a}</p>
            </div>
          ))}
        </div>

        {/* 관련 링크 */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {[
            { href: "/faq", label: "자주 묻는 질문" },
            { href: "/about", label: "오늘무드 소개" },
            { href: "/privacy", label: "개인정보처리방침" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300, border: `1px solid ${LINE}`, padding: "6px 14px", borderRadius: 20 }}>
              {l.label} →
            </Link>
          ))}
        </div>

        {/* 법적 고지 */}
        <div style={{ padding: "14px 16px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
            오늘무드는 오락과 자기돌봄을 위한 감정 콘텐츠 서비스입니다. 심리상담, 의료 진단, 치료를 대체하지 않습니다.
          </p>
        </div>

      </div>
    </div>
  );
}
