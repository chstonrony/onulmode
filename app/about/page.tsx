import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "우걱이 사용설명서 | 오늘무드",
  description: "우걱이는 감정을 완벽히 해결하지는 못하지만, 잠시 내려놓게 해주는 이상한 감정 처리 장치입니다. 오늘무드와 우걱이에 대한 안내서.",
  keywords: ["오늘무드 소개", "우걱이 사용설명서", "감정퇴비실", "감정 기록 서비스", "자기 돌봄"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/about",
    title: "우걱이 사용설명서 | 오늘무드",
    description: "감정을 완벽히 해결하지는 못하지만, 잠시 내려놓게 해주는 이상한 감정 처리 장치 안내서.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/about" },
};

const BG    = "#EDE4D0";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const ROSE  = "#C8607A";
const INK   = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#6A6058";
const GREEN = "#6A9B7A";

const PROSE: React.CSSProperties = {
  fontFamily: "var(--font-prose)",
  fontWeight: 300,
  lineHeight: 2.1,
  letterSpacing: "-0.01em",
  color: DIM,
};

const SECTIONS = [
  {
    num: "01",
    title: "우걱이는 누구인가요?",
    content: `우걱이는 오늘무드 감정 처리소에서 일하는 이상한 존재입니다.

사람들이 말하지 못한 감정, 괜찮은 척 넘긴 마음, 새벽에 갑자기 떠오르는 생각들을 우걱우걱 씹어먹습니다.

완벽히 해결해주진 않아요. 그냥 씹어먹습니다. 그리고 때로는 이상한 감정퇴비 한 줄을 남겨둡니다.`,
  },
  {
    num: "02",
    title: "오늘무드는 어떤 곳인가요?",
    content: `오늘무드는 감정을 진단하거나 치료하는 서비스가 아닙니다.

오늘의 감정을 조금 가볍게 꺼내보고, 재미있고 이상한 방식으로 잠시 내려놓을 수 있게 만든 감정 콘텐츠 서비스입니다.

우걱이라는 캐릭터를 통해 감정을 유머러스하게 처리하고, 감정퇴비실에 기록을 남기고, 감정도감과 우걱이 연구소 같은 콘텐츠로 감정을 조금 더 잘 이해할 수 있도록 만들었습니다.`,
  },
  {
    num: "03",
    title: "왜 감정을 파쇄하나요?",
    content: `모든 감정을 꼭 오래 붙잡고 있을 필요는 없습니다.

어떤 감정은 기록보다 배출이 먼저 필요합니다. 우걱이는 그 감정을 씹고, 파쇄하고, 때로는 감정퇴비로 남깁니다.

버린다는 게 사라진다는 뜻이 아니에요. 형태가 바뀌는 거예요. 오늘의 서운함이 내일의 한 줄이 될 수도 있습니다.`,
  },
  {
    num: "04",
    title: "감정퇴비실이란?",
    content: `감정퇴비실은 버려진 감정이 아주 작은 문장으로 남는 곳입니다.

감정은 사라지지 않고, 가끔 다른 모양으로 바뀝니다. 우걱이가 씹고 남긴 찌꺼기들이 발효되어 씨앗이 됩니다.

오늘의 서운함이 내일의 이해가 되기도 하고, 오늘의 억울함이 나중에 용기가 되기도 합니다. 그 과정이 감정퇴비실에서 일어납니다.`,
  },
  {
    num: "05",
    title: "오늘무드가 추구하는 가치",
    content: `오늘무드는 몇 가지 마음을 지키며 만들어집니다.

감정 존중 — 어떤 감정도 틀리지 않았다고 봅니다. 짜증도, 서운함도, 무기력도 그럴 만한 이유가 있어요. 오늘무드는 감정을 고쳐야 할 것으로 보지 않습니다.

자기 이해 — 감정을 들여다보는 일은 결국 나를 알아가는 일입니다. 오늘 어떤 마음이 올라왔는지 한 번 멈춰 보는 것만으로도 충분히 의미가 있어요.

가벼운 회복 — 크게 마음먹지 않아도 됩니다. 오늘 하나만 내려놓아도 됩니다. 회복은 거창한 결심이 아니라 작은 반복에서 옵니다.

일상의 유머 — 무거운 마음도 한 번 웃고 나면 조금 가벼워집니다. 우걱이가 그 역할을 맡아, 감정을 너무 심각하지 않게 바라보도록 돕습니다.`,
  },
  {
    num: "06",
    title: "왜 만들었나요?",
    content: `감정을 다루는 서비스는 많지만, 대부분 감정을 '분석'하거나 '해결'하려 합니다. 오늘무드는 조금 다른 질문에서 시작했어요. "꼭 해결하지 않아도, 그냥 잠시 내려놓을 수 있는 곳이 있다면 어떨까?"

마음이 지친 사람들을 곁에서 오래 지켜보며, 감정을 억지로 없애려 할수록 오히려 더 무거워진다는 걸 자주 보았습니다.

그래서 진단도, 점수도, 정답도 없이 — 오늘의 마음을 가볍게 꺼내 우걱이에게 던지고, 한 번 웃고, 작은 기록으로 남길 수 있는 공간을 만들고 싶었어요. 무겁게 다가가지 않으면서도 진심은 남는 서비스. 그게 오늘무드를 만든 이유입니다.`,
  },
  {
    num: "07",
    title: "어떤 사람을 위한 서비스인가요?",
    content: `오늘무드는 특별히 아픈 사람만을 위한 곳이 아니에요. 오히려 "이 정도로 힘들다고 해도 되나" 싶은, 작고 애매한 감정을 자주 삼키는 사람들을 위한 공간입니다.

말 못 하고 넘긴 서운함이 있는 사람, 괜찮은 척이 습관이 된 사람, 새벽에 혼자 생각이 많아지는 사람, 바빠서 자기 감정을 들여다볼 틈이 없던 사람.

누구에게 꺼내기엔 사소하고, 그냥 두기엔 마음에 걸리는 감정을 가진 사람이라면 누구나 편하게 와도 됩니다. 거창한 결심도, 회원가입도 필요 없어요. 오늘 마음 하나만 들고 오면 충분합니다.`,
  },
  {
    num: "08",
    title: "운영자 소개",
    content: `오늘무드는 청소년의 회복과 성장을 돕는 디렉터, 최샤론 목사가 만들었습니다.

오랫동안 마음이 지친 사람들 곁에 있으면서, 감정을 억지로 없애려 할수록 오히려 더 무거워진다는 걸 자주 보았습니다. 그래서 감정을 '해결해야 할 문제'가 아니라 '잠시 내려놓아도 되는 것'으로 바라보도록 돕는 공간을 만들고 싶었어요.

오늘무드는 웃기게 만들었지만, 만들다 보니 위로가 조금 남았습니다. 감정을 너무 오래 혼자 들고 있지 않았으면 좋겠습니다. 말 못 했던 것, 괜찮은 척했던 것, 새벽에 혼자 생각하던 것들을 여기 두고 가도 됩니다.

오늘은 여기까지만 내려놓아도 괜찮습니다.`,
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 서비스 목적 명시 — AdSense 심사용 */}
        <div style={{ background: "#1A2A1A", border: "1.5px solid #2A4A2A", borderRadius: 8, padding: "20px 20px", marginBottom: 40 }}>
          <p style={{ fontSize: 9, color: GREEN, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 10 }}>
            🌱 임시 감정 파쇄 장치 안내서 v0.0.3
          </p>
          <p style={{ fontFamily: "var(--font-prose)", fontWeight: 300, fontSize: 12, color: "#A8CCA0", lineHeight: 1.85 }}>
            오늘무드는 오락과 자기돌봄을 위한 서비스이며, 심리상담, 의료 진단, 치료를 대체하지 않습니다.
          </p>
        </div>

        {/* 헤더 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            ABOUT — 우걱이 감정처리소
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(24px, 5.5vw, 30px)", color: INK, lineHeight: 1.4, letterSpacing: "-0.025em", marginBottom: 16 }}>
            우걱이 사용설명서
          </h1>
          <p style={{ ...PROSE, fontSize: 15, color: DIM }}>
            감정을 완벽히 해결하지는 못하지만,<br />
            잠시 내려놓게 해주는 이상한 감정 처리 장치
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 48 }} />

        {/* 섹션들 */}
        {SECTIONS.map((s, i) => (
          <section key={s.num} style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", flexShrink: 0 }}>{s.num}</span>
              <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 19, color: INK, letterSpacing: "-0.02em", lineHeight: 1.4 }}>
                {s.title}
              </h2>
            </div>
            <div style={{ paddingLeft: 24, borderLeft: `2px solid ${i === 4 ? ROSE : LINE}` }}>
              {s.content.split("\n\n").map((para, pi) => (
                <p key={pi} style={{ ...PROSE, fontSize: 14, marginBottom: pi < s.content.split("\n\n").length - 1 ? 14 : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 48 }} />

        {/* 우걱이 선언문 */}
        <div style={{ background: "#1A2A1A", borderRadius: 6, padding: "24px 22px", marginBottom: 48 }}>
          <p style={{ fontSize: 9, color: GREEN, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 14 }}>
            우걱이 선언문
          </p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 14, color: "#A8CCA0", lineHeight: 2.0, letterSpacing: "-0.01em" }}>
            "버리러 오는 감정은 다 받습니다.<br />
            예쁜 감정이 아니어도 됩니다.<br />
            설명이 안 되는 감정도 됩니다.<br />
            그냥 던지면 씹어먹겠습니다."
          </p>
        </div>

        {/* 오늘무드가 할 수 없는 것 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            오늘무드가 할 수 없는 것
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "심리 진단이나 정신건강 평가를 제공하지 않습니다.",
              "의료적 조언이나 치료를 대신하지 않습니다.",
              "전문 상담을 대체하지 않습니다.",
              "감정 문제를 완전히 해결해주지 않습니다.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 14px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <span style={{ color: MUTED, fontFamily: "monospace", fontSize: 11, flexShrink: 0, marginTop: 1 }}>✗</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 오늘무드가 할 수 있는 것 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            오늘무드가 할 수 있는 것
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "오늘의 감정을 재미있고 가볍게 꺼낼 공간을 제공합니다.",
              "감정을 이해하는 콘텐츠를 통해 조금 더 나를 알게 해줍니다.",
              "우걱이와 함께 잠깐 웃으며 감정을 내려놓을 수 있게 해줍니다.",
              "감정퇴비실에 기록을 남겨 나의 감정 패턴을 돌아볼 수 있게 해줍니다.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 14px", background: "#EFF6EC", border: "1px solid #C4D8BC", borderRadius: 4 }}>
                <span style={{ color: GREEN, fontFamily: "monospace", fontSize: 11, flexShrink: 0, marginTop: 1 }}>✓</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 법적 고지 */}
        <div style={{ background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4, padding: "16px 18px", marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.85 }}>
            오늘무드는 오락과 자기돌봄을 위한 감정 콘텐츠 서비스입니다. 심리상담, 의료 진단, 치료를 대체하지 않습니다. 심각한 어려움이 있다면 전문가의 도움을 권장합니다.
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "32px 26px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
            오늘 감정 하나,<br />우걱이한테 던져봐요.
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 22 }}>
            해결 안 해도 됩니다. 그냥 던지면 됩니다.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ROSE, color: "#F5EFE0", padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
              우걱이한테 던지기
            </Link>
            <Link href="/guide" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: PAPER, border: `1px solid ${LINE}`, color: INK, padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 500, textDecoration: "none" }}>
              감정 기록 가이드
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { href: "/creator", label: "운영자 소개" },
            { href: "/faq", label: "자주 묻는 질문" },
            { href: "/privacy", label: "개인정보처리방침" },
            { href: "/contact", label: "문의하기" },
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
