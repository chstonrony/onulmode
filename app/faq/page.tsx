import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "자주 묻는 질문 (FAQ) | 오늘무드",
  description: "오늘무드에 대해 자주 묻는 질문들을 모았어요. 심리검사인지, 결과가 진단인지, 기록이 어디에 저장되는지, 우걱이는 누구인지 등 궁금한 점을 확인해보세요.",
  keywords: ["오늘무드 FAQ", "오늘무드 사용법", "감정파쇄 원리", "데이터 저장", "개인정보", "심리검사 아님", "우걱이"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/faq",
    title: "자주 묻는 질문 | 오늘무드",
    description: "오늘무드에 대해 자주 묻는 질문들을 확인해보세요.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/faq" },
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

const FAQ_LIST = [
  {
    q: "오늘무드는 심리검사인가요?",
    a: "아닙니다. 오늘무드는 의학적 진단이나 심리검사가 아니라, 하루의 감정을 가볍게 기록하고 돌아보기 위한 감성 기록 서비스입니다. 결과물은 엔터테인먼트 목적으로 제공되며, 심리적 진단이나 의학적 조언으로 해석해서는 안 됩니다.",
  },
  {
    q: "결과는 정확한 진단인가요?",
    a: "아닙니다. 결과는 사용자가 선택하거나 입력한 감정을 바탕으로 생성되는 감성 콘텐츠입니다. \"눅눅한 오징어칩 바스러기\"나 \"충전선 접촉불량 상태\" 같은 결과는 현재 감정 상태를 유머러스하게 표현한 것이에요. 자신의 감정을 돌아보는 참고용으로 사용해주세요.",
  },
  {
    q: "감정퇴비실은 무엇인가요?",
    a: "감정퇴비실은 사용자가 남긴 감정 파쇄 결과를 모아두는 공간입니다. 단순 저장소가 아니라, 시간이 지나며 나의 감정 패턴을 돌아볼 수 있는 작은 감정 아카이브예요. 오늘 어떤 감정이 있었는지, 그 감정이 어떤 결과로 처리됐는지 기록이 남아요.",
  },
  {
    q: "우걱이는 누구인가요?",
    a: "우걱이는 말하지 못한 감정을 대신 씹어먹는 오늘무드의 캐릭터예요. 감정을 없애거나 해결해주는 게 아니라, 잠깐 가볍게 바라볼 수 있도록 도와주는 존재예요. 어떤 감정을 가져와도 판단 없이 받아서 처리해줍니다.",
  },
  {
    q: "개인정보는 어떻게 처리되나요?",
    a: "오늘무드는 모든 감정 기록을 사용자의 기기(브라우저 로컬스토리지)에만 저장해요. 서버로 전송되지 않고, 외부에서 볼 수 없어요. 오늘무드 팀도 사용자의 기록을 볼 수 없습니다. 자세한 내용은 개인정보처리방침을 참고해주세요.",
  },
  {
    q: "문의는 어디로 하나요?",
    a: "문의하기 페이지를 통해 버그 신고, 기능 제안, 기타 의견을 남길 수 있어요. 모든 피드백은 서비스 개선에 소중하게 활용됩니다.",
  },
  {
    q: "오늘무드는 무료인가요?",
    a: "네, 오늘무드의 모든 기능은 무료로 사용할 수 있어요. 회원가입 없이 바로 사용 가능하고, 결제나 구독이 필요 없어요. 서비스 운영을 위해 일부 광고가 표시될 수 있어요.",
  },
  {
    q: "오늘무드를 자녀나 청소년이 사용해도 되나요?",
    a: "네, 오늘무드는 청소년도 사용할 수 있어요. 오늘무드는 청소년의 감정 언어와 회복에 관심이 많은 운영자가 만든 서비스예요. 다만 오늘무드는 전문 상담이나 치료 서비스가 아니에요. 심각한 어려움이 있다면 전문가와 상담하는 것을 권장해요.",
  },
];

export default function FaqPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            FAQ
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 28px)", color: INK, lineHeight: 1.45, letterSpacing: "-0.025em", marginBottom: 14 }}>
            자주 묻는 질문
          </h1>
          <p style={{ ...PROSE, fontSize: 15 }}>
            오늘무드에 대해 궁금한 점들을 모았어요. 아래에서 원하는 답을 찾아보세요.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 48 }} />

        {/* FAQ 목록 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FAQ_LIST.map((item, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${LINE}`, padding: "28px 0" }}>
              <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: ROSE, fontFamily: "monospace", fontSize: 12, flexShrink: 0, marginTop: 3 }}>Q.</span>
                {item.q}
              </h2>
              <div style={{ paddingLeft: 22, borderLeft: `2px solid ${LINE}` }}>
                <p style={{ ...PROSE, fontSize: 14 }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 도움말 */}
        <div style={{ marginTop: 48, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "28px 24px" }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
            더 궁금한 점이 있으신가요?
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 20 }}>
            아래 페이지에서 더 자세한 내용을 확인할 수 있어요.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ fontSize: 13, color: ROSE, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 400, border: `1px solid ${ROSE}`, padding: "7px 16px", borderRadius: 4 }}>
              문의하기
            </Link>
            <Link href="/guide" style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300, border: `1px solid ${LINE}`, padding: "7px 16px", borderRadius: 4 }}>
              감정 기록 가이드
            </Link>
            <Link href="/about" style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300, border: `1px solid ${LINE}`, padding: "7px 16px", borderRadius: 4 }}>
              오늘무드 소개
            </Link>
          </div>
        </div>

        {/* 법적 고지 */}
        <div style={{ marginTop: 32, padding: "18px 20px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
            오늘무드는 의료 서비스, 심리치료, 상담 서비스가 아닙니다. 제공되는 모든 콘텐츠는 감정 기록과 자기 돌봄을 위한 엔터테인먼트 목적으로 제공됩니다. 심각한 심리적 어려움이 있는 경우 전문가와 상담하시기를 권장합니다.
          </p>
        </div>

      </div>
    </div>
  );
}
