import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "감정 기록 가이드 | 오늘무드",
  description: "감정을 기록하면 왜 좋을까요? 감정에 이름 붙이기, 짧은 기록의 힘, 오늘무드 5단계 사용법까지 알려드립니다.",
  keywords: ["감정 기록", "감정 일기", "자기 돌봄", "하루 회고", "감정 이름 붙이기", "오늘무드 사용법", "감정 처리"],
  openGraph: {
    type: "article",
    locale: "ko_KR",
    url: "https://onulmood.com/guide",
    title: "감정 기록 가이드 | 오늘무드",
    description: "감정을 기록하면 왜 가벼워질까요? 오늘무드 감정 기록 완전 가이드.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/guide" },
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

export default function GuidePage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            GUIDE — 감정 기록
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 30px)", color: INK, lineHeight: 1.45, letterSpacing: "-0.025em", marginBottom: 18 }}>
            감정을 기록하면<br />좋은 이유
          </h1>
          <p style={{ ...PROSE, fontSize: 15 }}>
            감정을 기록한다는 게 거창한 일이 아니에요. 오늘 내가 어떤 감정을 지나갔는지 잠깐 들여다보는 것. 그것만으로도 달라질 때가 있어요.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 1 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            감정에 이름을 붙이면<br />마음이 정리됩니다
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            "뭔가 기분이 안 좋아"에서 멈추지 않고 "나 오늘 서운했구나"라고 구체적인 이름을 붙이는 것. 이게 감정 기록의 첫 번째 단계예요.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            막연한 불편함은 안에서 계속 맴돌지만, 이름이 붙으면 "아, 이게 억울함이었구나"라고 정리돼요. 심리학에서는 이걸 '감정 라벨링'이라고 해요. 감정에 이름을 붙이는 것만으로도 뇌의 스트레스 반응이 줄어든다는 연구가 있어요.
          </p>

          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "20px 22px", marginBottom: 0 }}>
            <p style={{ fontSize: 11, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 14 }}>이름 붙이기 연습</p>
            {[
              { before: "기분이 안 좋아", after: "오늘 팀장한테 무시당한 것 같아서 억울해" },
              { before: "그냥 힘들어", after: "몸은 괜찮은데 아무것도 하기 싫은 무기력함" },
              { before: "짜증나", after: "기대했는데 실망해서 생긴 서운함" },
            ].map((item, i) => (
              <div key={i} style={{ paddingBottom: i < 2 ? 12 : 0, marginBottom: i < 2 ? 12 : 0, borderBottom: i < 2 ? `1px solid ${LINE}` : "none" }}>
                <p style={{ fontSize: 12, color: MUTED, fontFamily: "monospace", marginBottom: 4 }}>전: "{item.before}"</p>
                <p style={{ fontSize: 13, color: INK, fontFamily: "var(--font-prose)", fontWeight: 400 }}>후: "{item.after}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 2 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            짧은 기록도 충분합니다
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            일기를 꼼꼼하게 써야 한다는 생각이 기록을 어렵게 만들어요. 매일 몇 문단씩 쓰는 것보다, 하루에 한 문장이라도 꺼내는 게 더 나아요.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            "오늘 회의에서 억울했다." 이 한 문장으로 충분해요. 분석하거나 해결책을 찾으려 하지 않아도 돼요. 꺼냈다는 것 자체가 처리의 시작이에요.
          </p>

          <div style={{ background: `${ROSE}10`, border: `1px solid ${ROSE}30`, borderLeft: `3px solid ${ROSE}`, borderRadius: "0 6px 6px 0", padding: "16px 20px" }}>
            <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>오늘무드 팁</p>
            <p style={{ ...PROSE, fontSize: 13, color: INK }}>
              감정을 기록하기 어렵다면, 오늘무드 감정 파쇄기에 그냥 써서 던져보세요. 완성된 문장이 아니어도 돼요. 단어 하나, 느낌 하나만으로도 충분해요.
            </p>
          </div>
        </section>

        {/* 섹션 3 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            웃으며 바라보는 감정도<br />회복의 시작입니다
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            자기 감정을 진지하게 들여다보는 게 너무 무거울 때가 있어요. 그럴 때 웃음은 좋은 입구가 돼요.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            우걱이가 내 감정을 "눅눅한 오징어칩 바스러기"로 만들어주면, 그게 진단은 아니지만 "맞아, 나 요즘 좀 바삭함을 잃었어"라는 걸 알게 돼요. 웃긴데 공감이 돼요. 그게 시작이에요.
          </p>
          <p style={{ ...PROSE, fontSize: 14 }}>
            감정을 무겁게 다루지 않아도 돼요. 웃으면서 "아, 나 이런 상태구나"를 알아채는 것. 그것도 충분한 자기 돌봄이에요.
          </p>
        </section>

        {/* 섹션 4 - 오늘무드 사용법 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            오늘무드 사용법
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 24 }}>
            오늘무드는 다섯 단계로 이루어져 있어요. 각 단계는 짧고 가볍게 이루어져 있어요.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                step: "1",
                title: "지금 감정을 고릅니다",
                desc: "지금 이 순간 가장 가까운 감정을 하나 골라요. 기쁨, 슬픔, 분노, 불안, 무기력 — 어떤 것도 괜찮아요. 정확하지 않아도 돼요.",
              },
              {
                step: "2",
                title: "우걱이에게 던집니다",
                desc: "오늘 있었던 일이나 느낌을 짧게 써서 던져요. 긴 글이 아니어도 돼요. 우걱이는 어떤 감정도 판단 없이 받아요.",
              },
              {
                step: "3",
                title: "결과지를 확인합니다",
                desc: "우걱이가 파쇄한 결과가 나와요. 웃기고 병맛스러운 결과지이지만, 그 안에 나의 감정 상태가 담겨있어요.",
              },
              {
                step: "4",
                title: "오늘의 한 줄 질문에 답합니다",
                desc: "결과지 마지막에는 짧은 자기돌봄 질문이 있어요. 바로 대답하지 않아도 돼요. 잠깐 마음속에서 생각해보는 것만으로 충분해요.",
              },
              {
                step: "5",
                title: "감정처리소에 남깁니다",
                desc: "파쇄된 감정은 감정처리소에 저장돼요. 나중에 돌아보며 내 감정 패턴을 확인하거나, 그냥 '내가 이날 이런 감정이었구나'를 기억할 수 있어요.",
              },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "18px 20px" }}>
                <div style={{ width: 32, height: 32, background: ROSE, color: "#F5EFE0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontFamily: "monospace", fontWeight: 700, flexShrink: 0 }}>
                  {item.step}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 15, color: INK, letterSpacing: "-0.02em", marginBottom: 6 }}>{item.title}</p>
                  <p style={{ ...PROSE, fontSize: 13 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 하루 돌아보기 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            기록이 쌓이면 보이는 것들
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            매일 조금씩 기록하다 보면, 어느 날 한 달치 기록을 보면서 "아, 나 이때 많이 힘들었구나" 또는 "이 시기에는 꽤 괜찮았는데"라는 걸 알 수 있어요.
          </p>
          <p style={{ ...PROSE, fontSize: 14 }}>
            그 기록이 거울이 돼요. 어떤 상황에서 내가 지치는지, 어떤 감정이 자주 오는지 패턴을 알 수 있어요. 그게 스스로를 이해하는 시작이에요.
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 48 }} />

        {/* CTA */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "32px 26px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
            지금 시작해볼까요?
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 24 }}>우걱이가 기다리고 있어요.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ROSE, color: "#F5EFE0", padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
              감정 파쇄하러 가기
            </Link>
            <Link href="/today" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: PAPER, border: `1px solid ${LINE}`, color: INK, padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 500, textDecoration: "none" }}>
              오늘 감정 기록하기
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { href: "/faq", label: "자주 묻는 질문" },
            { href: "/archive-guide", label: "감정처리소 사용법" },
            { href: "/emotion-dictionary", label: "우걱이 감정사전" },
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
