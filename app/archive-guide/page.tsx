import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "감정처리소 사용법 | 오늘무드",
  description: "감정파쇄 결과를 저장하고, 다시 보며 나의 감정 패턴을 확인하는 방법을 알려드립니다. 오늘무드 감정처리소 완전 가이드.",
  keywords: ["감정처리소", "감정퇴비실", "감정 기록", "감정 패턴", "오늘무드 사용법", "감정 관리"],
  openGraph: {
    type: "article",
    locale: "ko_KR",
    url: "https://onulmood.com/archive-guide",
    title: "감정처리소 사용법 | 오늘무드",
    description: "감정파쇄 기록을 저장하고 패턴을 확인하는 방법.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/archive-guide" },
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

export default function ArchiveGuidePage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            GUIDE — 감정처리소
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 28px)", color: INK, lineHeight: 1.45, letterSpacing: "-0.025em", marginBottom: 14 }}>
            감정처리소 사용법
          </h1>
          <p style={{ ...PROSE, fontSize: 15 }}>
            감정퇴비실은 우걱이한테 던진 감정들의 기록이에요. 버리고 나서도 그 기록이 남아, 나중에 내 감정 패턴을 확인할 수 있어요.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 48 }} />

        {/* 섹션 1 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            감정파쇄란 무엇인가요?
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            오늘무드의 핵심 기능이에요. 오늘 힘들었던 일, 서운했던 것, 짜증났던 것을 글로 적어 우걱이한테 던지면, 우걱이가 "파쇄"해버립니다.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            감정을 분석하거나 해결하려는 게 아니에요. 그냥 꺼내서 보내는 것. 안에 계속 들고 있는 것보다, 어딘가에 던지는 경험 자체가 마음을 조금 가볍게 해줘요.
          </p>

          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "20px 22px" }}>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 14 }}>감정파쇄 순서</p>
            {[
              { step: "1", text: "감정 파쇄하기 페이지로 이동" },
              { step: "2", text: "오늘 있었던 감정이나 상황을 자유롭게 적기" },
              { step: "3", text: "처리 방식 선택 (파쇄, 압축, 삶기 등)" },
              { step: "4", text: "우걱이가 처리하는 동안 로딩 화면 감상" },
              { step: "5", text: "결과 확인 — 감정이 무엇으로 변환됐는지 보기" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i < 4 ? 12 : 0 }}>
                <span style={{ background: ROSE, color: "#F5EFE0", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "monospace", flexShrink: 0 }}>{item.step}</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK, marginTop: 2 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 2 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            감정퇴비실 보는 방법
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            파쇄한 감정들은 감정퇴비실에 자동으로 저장돼요. 하단 메뉴의 "감정퇴비실"을 누르면 지금까지 파쇄한 기록을 모두 볼 수 있어요.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            각 기록을 탭하면 당시에 적었던 감정의 내용, 결과물 이름, 우걱이 코멘트를 다시 볼 수 있어요. 그날의 나로 잠깐 돌아가는 기분이에요.
          </p>

          <div style={{ background: `${ROSE}10`, border: `1px solid ${ROSE}30`, borderLeft: `3px solid ${ROSE}`, borderRadius: "0 6px 6px 0", padding: "16px 20px" }}>
            <p style={{ fontSize: 11, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>알아두세요</p>
            <p style={{ ...PROSE, fontSize: 13, color: INK }}>
              감정파쇄 기록은 사용하는 기기에만 저장돼요. 서버에 전송되지 않고, 외부에서 볼 수 없어요. 브라우저를 초기화하거나 앱을 삭제하면 기록이 사라질 수 있어요.
            </p>
          </div>
        </section>

        {/* 섹션 3 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            기록을 보며 패턴 확인하기
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            기록이 쌓이면 보이는 것들이 있어요. 어떤 요일에 특히 지쳐있는지, 어떤 상황에서 감정이 자주 올라오는지, 어떤 종류의 감정이 반복되는지.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            이 패턴을 알면 나 자신을 더 잘 이해할 수 있어요. "나는 주로 월요일에 힘들구나", "회의 후에 꼭 지치는구나"처럼요.
          </p>

          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "20px 22px" }}>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 14 }}>기록을 볼 때 생각해볼 것들</p>
            {[
              "이번 주 가장 많이 나온 감정이 뭔가요?",
              "어떤 상황에서 감정을 파쇄하게 됐나요?",
              "우걱이 코멘트 중 특히 공감됐던 게 있나요?",
              "지난달보다 지금 상태가 어떻게 달라졌나요?",
            ].map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
                <span style={{ color: ROSE, fontSize: 12, fontFamily: "monospace", flexShrink: 0, marginTop: 2 }}>•</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK }}>{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 4 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            감정 부산물 도감
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            감정을 파쇄하면 가끔 이상한 부산물이 생성돼요. "눅눅한 오징어칩 바스러기", "충전선 접촉불량 상태"처럼요. 이 부산물들은 감정 부산물 도감에 수집돼요.
          </p>
          <p style={{ ...PROSE, fontSize: 14 }}>
            6가지 희귀도가 있어서, 희귀한 부산물이 나오면 나름의 수집 재미가 있어요. 수집된 부산물 목록은 도감 페이지에서 확인할 수 있어요.
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 48 }} />

        {/* CTA */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "32px 26px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
            오늘 감정,<br />파쇄해볼까요?
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 24 }}>
            기록은 자동으로 감정퇴비실에 저장돼요.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ROSE, color: "#F5EFE0", padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
              감정 파쇄하러 가기
            </Link>
            <Link href="/archive" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: PAPER, border: `1px solid ${LINE}`, color: INK, padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 500, textDecoration: "none", letterSpacing: "-0.01em" }}>
              감정퇴비실 보기
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { href: "/guide", label: "감정 기록 가이드" },
            { href: "/faq", label: "자주 묻는 질문" },
            { href: "/collection", label: "감정 부산물 도감" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300, border: `1px solid ${LINE}`, padding: "6px 14px", borderRadius: 20 }}>
              {l.label} →
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
