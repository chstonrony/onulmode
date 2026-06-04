import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "만든 사람 | 오늘무드",
  description: "오늘무드를 만든 최샤론 목사를 소개합니다. 청소년의 회복과 성장을 돕는 디렉터이자, 감정을 다정하게 바라볼 수 있는 공간을 만들고 싶었던 한 사람의 이야기.",
  keywords: ["오늘무드 운영자", "최샤론", "감정 기록 서비스", "청소년 회복", "개인 프로젝트"],
  openGraph: {
    type: "profile",
    locale: "ko_KR",
    url: "https://onulmood.com/creator",
    title: "만든 사람 | 오늘무드",
    description: "청소년의 회복과 성장을 돕는 최샤론 목사가 만든 감성 기록 서비스, 오늘무드.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/creator" },
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
  lineHeight: 2.1,
  letterSpacing: "-0.01em",
  color: DIM,
};

export default function CreatorPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            CREATOR
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 30px)", color: INK, lineHeight: 1.45, letterSpacing: "-0.025em", marginBottom: 18 }}>
            만든 사람
          </h1>
          <p style={{ ...PROSE, fontSize: 15 }}>
            오늘무드는 하루의 감정을 조금 더 가볍게 바라보고, 말하지 못한 마음을 안전하게 정리할 수 있는 공간이 필요하다는 생각에서 시작된 개인 프로젝트입니다.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 운영자 카드 */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 8, padding: "36px 28px", marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 28 }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: `${ROSE}15`, border: `2px solid ${ROSE}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
              🌱
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 6 }}>
                최샤론
              </p>
              <p style={{ fontSize: 12, color: ROSE, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 4 }}>
                목사 · 청소년 회복 디렉터
              </p>
              <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: "0.04em" }}>
                오늘무드 개발 · 운영
              </p>
            </div>
          </div>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            청소년의 회복과 성장을 돕는 디렉터, 최샤론 목사입니다.
          </p>
          <p style={{ ...PROSE, fontSize: 14 }}>
            아이들과 청소년, 그리고 바쁘게 하루를 살아가는 사람들이 자신의 감정을 조금 더 다정하게 바라볼 수 있기를 바라는 마음으로 오늘무드를 만들었습니다.
          </p>
        </div>

        {/* 왜 만들었나 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            왜 만들었을까요
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            청소년들과 함께 일하면서 알게 된 게 있어요. 많은 아이들이 자기 감정을 "설명할 수 없다"고 해요. 힘들다는 건 아는데, 왜 힘든지 모르겠다고. 말하고 싶은데, 어떻게 말해야 할지 모르겠다고.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            어른들도 마찬가지예요. 감정을 표현하는 법을 배운 적이 없고, 감정을 꺼내면 약해 보인다는 생각이 있어요. 그래서 그냥 삼키고, 버티고, 괜찮은 척해요.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            그 감정들이 어디로 가는지 알아요. 사라지지 않아요. 조용히 쌓여서 나중에 더 무거워져요.
          </p>
          <p style={{ ...PROSE, fontSize: 14 }}>
            그래서 생각했어요. 가볍게 꺼낼 수 있는 공간이 있으면 어떨까? 진지하지 않아도 되고, 분석하지 않아도 되는 공간. 그냥 던지면 우걱이가 씹어먹는 공간. 그게 오늘무드예요.
          </p>
        </section>

        {/* 감정을 웃으며 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            감정을 웃으며 바라보게 하고 싶었어요
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            심각하게 내 감정을 들여다보는 게 너무 무거울 때가 있어요. 그럴 때 웃음은 좋은 입구가 돼요. 웃으면서 "아, 나 이런 상태구나"를 알아채는 것.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            우걱이가 "충전선 접촉불량 상태"라고 말해주면, 그게 진단은 아니지만 "맞아, 나 요즘 좀 방전됐어"라는 걸 알게 돼요. 웃긴데 맞아요. 그게 공감이에요.
          </p>
          <p style={{ ...PROSE, fontSize: 14 }}>
            오늘무드는 가볍게 웃을 수 있으면서도, 그 웃음 뒤에 자기 자신을 한 번 돌아볼 수 있는 순간을 만들려고 해요.
          </p>
        </section>

        {/* 기록에 대한 태도 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            사용자의 기록을 소중하게 생각해요
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            누군가 오늘무드를 열고 감정을 꺼낸다는 건, 그 사람이 자신의 마음을 잠깐 들여다보기로 했다는 뜻이에요. 그 결정을 가볍게 여기지 않아요.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            그래서 모든 기록은 사용자의 기기에만 저장해요. 서버로 보내지 않고, 분석하지 않고, 광고에 활용하지 않아요. 그 공간은 온전히 사용자의 것이에요.
          </p>

          <div style={{ background: `${ROSE}10`, border: `1px solid ${ROSE}30`, borderLeft: `3px solid ${ROSE}`, borderRadius: "0 6px 6px 0", padding: "18px 20px" }}>
            <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 14, color: INK, lineHeight: 1.85 }}>
              "당신이 오늘 느낀 감정은,<br />
              오늘 당신이 살았다는 증거예요.<br />
              그 기록, 소중하게 다루겠습니다."
            </p>
          </div>
        </section>

        {/* 앞으로 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            앞으로 오늘무드가 할 것들
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 20 }}>
            감정 기록과 자기돌봄 콘텐츠를 계속 확장할 예정이에요. 감정 사전, 감정 회복 가이드, 청소년을 위한 감정 언어 콘텐츠 등 다양한 방향으로 발전시켜나갈 계획이에요.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "우걱이 감정사전 — 자주 느끼지만 설명하기 어려운 감정들을 정리",
              "감정 회복 가이드 — 번아웃, 외로움, 무기력 회복을 위한 실질적 가이드",
              "청소년 감정 언어 — 아이들이 자신의 감정을 표현하는 법을 배울 수 있도록",
              "오늘의 감정 기록 — 매일 간단하게 감정을 기록하고 패턴을 확인하는 기능",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <span style={{ color: ROSE, fontFamily: "monospace", fontSize: 10, flexShrink: 0, marginTop: 4 }}>→</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 문의 */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "28px 24px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
            피드백을 기다립니다
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 20 }}>
            사용하면서 불편한 점, 원하는 기능, 감사한 마음 — 어떤 이야기든 환영해요.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: INK, color: "#F5EFE0", padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
            문의하기
          </Link>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { href: "/about", label: "오늘무드 소개" },
            { href: "/faq", label: "자주 묻는 질문" },
            { href: "/privacy", label: "개인정보처리방침" },
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
