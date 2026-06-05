import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "오늘무드 소개 | ONULMOOD",
  description: "오늘무드는 하루의 감정을 조금 더 가볍게 바라보고, 말하지 못한 마음을 안전하게 정리할 수 있는 공간이 필요하다는 생각에서 시작되었습니다.",
  keywords: ["오늘무드 소개", "감정 콘텐츠 서비스", "감정 기록", "청소년 성장", "ONULMOOD creator"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/creator",
    title: "오늘무드 소개 | ONULMOOD",
    description: "하루의 감정을 조금 더 가볍게 바라볼 수 있는 공간, 오늘무드를 만든 이유.",
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

        {/* 헤더 — 서비스 중심 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            ABOUT ONULMOOD
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 30px)", color: INK, lineHeight: 1.45, letterSpacing: "-0.025em", marginBottom: 18 }}>
            오늘무드를 만든 이유
          </h1>
          <p style={{ ...PROSE, fontSize: 15 }}>
            오늘무드는 하루의 감정을 조금 더 가볍게 바라보고,
            말하지 못한 마음을 안전하게 정리할 수 있는 공간이 필요하다는 생각에서 시작되었습니다.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 1. 서비스 철학 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            오늘무드가 만들어진 이유
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            많은 사람들이 자기 감정을 "설명할 수 없다"고 해요. 힘들다는 건 아는데, 왜 힘든지 모르겠다고. 말하고 싶은데, 어떻게 말해야 할지 모르겠다고.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            특히 아이들과 청소년, 그리고 바쁘게 하루를 살아가는 사람들이 감정을 꺼낼 공간이 없다는 걸 느꼈어요. 진지하지 않아도 되는 공간. 분석하지 않아도 되는 공간. 그냥 꺼낼 수 있는 공간.
          </p>
          <p style={{ ...PROSE, fontSize: 14 }}>
            그게 오늘무드가 만들어진 이유예요.
          </p>
        </section>

        {/* 2. 서비스 방향 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            오늘무드가 만들고 싶은 경험
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            심각하게 내 감정을 들여다보는 게 너무 무거울 때가 있어요. 그럴 때 웃음은 좋은 입구가 돼요. 웃으면서 "아, 나 이런 상태구나"를 알아채는 것.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            오늘무드는 가볍게 웃을 수 있으면서도, 그 웃음 뒤에 자기 자신을 한 번 돌아볼 수 있는 순간을 만들려고 해요.
          </p>

          <div style={{ background: `${ROSE}08`, border: `1px solid ${ROSE}20`, borderLeft: `3px solid ${ROSE}`, borderRadius: "0 6px 6px 0", padding: "18px 20px" }}>
            <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 14, color: INK, lineHeight: 1.95 }}>
              "ㅋㅋ 재밌네"에서 끝나는 게 아니라,<br />
              "아... 내가 이런 감정이었구나"를<br />
              느끼고 떠날 수 있게 만들고 싶어요.
            </p>
          </div>
        </section>

        {/* 3. 운영자 소개 — 페이지 중반에 자연스럽게 */}
        <section style={{ marginBottom: 52 }}>
          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 8, padding: "28px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${ROSE}12`, border: `1.5px solid ${ROSE}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                🌱
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 17, color: INK, letterSpacing: "-0.02em", marginBottom: 4 }}>
                  Sharon Choi
                </p>
                <p style={{ fontSize: 11, color: ROSE, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 2 }}>
                  Pastor · Youth Growth &amp; Recovery Director
                </p>
                <p style={{ fontSize: 10, color: MUTED, fontFamily: "monospace", letterSpacing: "0.04em" }}>
                  Creator of ONULMOOD
                </p>
              </div>
            </div>
            <p style={{ ...PROSE, fontSize: 14, marginBottom: 14 }}>
              아이들과 청소년, 그리고 바쁘게 하루를 살아가는 사람들이 자신의 감정을 조금 더 다정하게 바라볼 수 있기를 바라는 마음으로 오늘무드를 만들었습니다.
            </p>
            <p style={{ ...PROSE, fontSize: 14 }}>
              오늘무드는 상담 서비스가 아니에요. 감정을 가볍게 꺼내고, 조금 웃기게 정리하고, 그 안에서 자기 자신을 발견하는 감정 콘텐츠 서비스입니다.
            </p>
          </div>
        </section>

        {/* 4. 기록에 대한 태도 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            기록을 대하는 태도
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 16 }}>
            누군가 오늘무드를 열고 감정을 꺼낸다는 건, 그 사람이 자신의 마음을 잠깐 들여다보기로 했다는 뜻이에요. 그 결정을 가볍게 여기지 않아요.
          </p>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 20 }}>
            모든 기록은 사용자의 기기에만 저장돼요. 서버로 보내지 않고, 분석하지 않고, 광고에 활용하지 않아요. 그 공간은 온전히 사용자의 것이에요.
          </p>

          <div style={{ background: "#1A2A1A", borderRadius: 6, padding: "20px 22px" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "#A8CCA0", lineHeight: 2.0 }}>
              "당신이 오늘 느낀 감정은,<br />
              오늘 당신이 살았다는 증거예요.<br />
              그 기록, 소중하게 다루겠습니다."
            </p>
          </div>
        </section>

        {/* 5. 앞으로 */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 20, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            앞으로 만들어갈 것들
          </h2>
          <p style={{ ...PROSE, fontSize: 14, marginBottom: 20 }}>
            감정 기록과 감정 콘텐츠를 계속 확장해갈 예정이에요.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "우걱이 감정사전 — 설명하기 어려운 감정을 하나씩 정리",
              "감정 회복 콘텐츠 — 번아웃, 외로움, 무기력을 가볍게 다루는 글",
              "청소년 감정 언어 — 자신의 감정을 표현하는 법을 배울 수 있도록",
              "감정 기록 기능 — 매일 감정을 기록하고 패턴을 돌아보기",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "11px 14px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <span style={{ color: ROSE, fontFamily: "monospace", fontSize: 10, flexShrink: 0, marginTop: 4 }}>→</span>
                <p style={{ ...PROSE, fontSize: 13, color: INK }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 피드백 */}
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "26px 24px", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.02em", marginBottom: 8 }}>
            피드백을 기다립니다
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 18 }}>
            불편한 점, 원하는 기능, 감사한 마음 — 어떤 이야기든 환영해요.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: INK, color: "#F5EFE0", padding: "10px 22px", borderRadius: 4, fontSize: 13, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
            문의하기
          </Link>
        </div>

        {/* 면책 */}
        <div style={{ padding: "12px 14px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4, marginBottom: 28 }}>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
            오늘무드는 감정 기록과 자기 돌봄을 위한 콘텐츠 서비스입니다. 심리상담, 의료 진단, 치료를 대체하지 않으며, 심각한 어려움이 있다면 전문가의 도움을 권장합니다.
          </p>
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
