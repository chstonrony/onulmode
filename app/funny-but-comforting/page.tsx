import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "웃긴 콘텐츠인데 왜 위로가 될까? | 오늘무드",
  description: "밈이 위로가 되는 이유, 병맛 콘텐츠가 공감을 주는 이유. 웃음과 위로는 생각보다 같은 곳에서 시작합니다. 오늘무드 세계관으로 풀어보는 감정 해소 이야기.",
  keywords: ["병맛 위로", "밈 공감", "웃긴 콘텐츠", "감정 해소", "공감 문화", "MZ 감성", "우울 해소", "웃음 치료", "감정 표현", "공감 밈"],
  openGraph: { type: "article", locale: "ko_KR", url: "https://onulmood.com/funny-but-comforting", title: "웃긴 콘텐츠인데 왜 위로가 될까?", description: "병맛과 위로는 생각보다 같은 곳에서 시작합니다.", siteName: "오늘무드" },
  twitter: { card: "summary_large_image", title: "웃긴 콘텐츠인데 왜 위로가 될까? | 오늘무드", description: "병맛 콘텐츠가 왜 이상하게 위로되는지 그 이유." },
  alternates: { canonical: "https://onulmood.com/funny-but-comforting" },
};

const BG     = "#0C0B0A";
const CARD   = "#161412";
const LINE   = "#201E1A";
const ROSE   = "#C8607A";
const RDIM   = "#6A2E3E";
const AMB    = "#C4874A";
const PURPLE = "#9B7ABF";
const T1     = "#E8E0D0";
const T2     = "#907A66";
const T3     = "#4C4038";

const PROSE: React.CSSProperties = {
  fontFamily: "var(--font-prose)",
  fontWeight: 300,
  lineHeight: 2.1,
  letterSpacing: "-0.02em",
};

export default function FunnyButComfortingPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: T1 }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/blog" style={{ ...PROSE, fontSize: 13, color: T3, textDecoration: "none", display: "inline-block", marginBottom: 44 }}>
          ← 감정 이야기
        </Link>

        {/* 태그 */}
        <div style={{ marginBottom: 22 }}>
          <span style={{ ...PROSE, fontSize: 11, padding: "3px 12px", background: `${AMB}18`, color: AMB, border: `1px solid ${AMB}44`, borderRadius: 20 }}>MZ 감성</span>
          <span style={{ fontSize: 11, color: T3, fontFamily: "monospace", marginLeft: 12 }}>4분 읽기</span>
        </div>

        {/* 제목 */}
        <h1 className="article-title" style={{ fontSize: "clamp(24px, 6vw, 32px)", color: T1, marginBottom: 18 }}>
          웃긴 콘텐츠인데<br />왜 위로가 될까?
        </h1>

        <p style={{ ...PROSE, fontSize: 16, color: T2, marginBottom: 12 }}>
          병맛이고 웃긴데,<br />
          이상하게 위로가 되는 순간이 있어요.
        </p>
        <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", marginBottom: 52 }}>2026. 05. 19</p>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
          "충전선 접촉불량 상태." 라는 말에 갑자기 웃음이 나왔는데,
          잠깐 뒤에 뭔가 뭉클했던 경험 있나요?
        </p>
        <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 48 }}>
          웃겼는데, 이상하게 위로가 됐어요.
          그게 왜 그런 건지 — 저도 궁금해서 조금 생각해봤어요.
        </p>

        {/* 섹션 1 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            밈이 위로가 되는 이유
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            밈의 핵심은 <strong style={{ color: T1, fontWeight: 600 }}>공감</strong>이에요.
            내가 혼자 느낀다고 생각했던 감정을,
            누군가 이미 정확하게 표현해뒀다는 것 — 그게 위로예요.
          </p>

          <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
            {[
              { meme: "사회생활 가능한 척 모드", why: "내 상태를 딱 설명하는데 아무도 몰랐던 것 같았거든요." },
              { meme: "구겨진 영수증 멘탈", why: "오래된 상처가 지워지지 않는다는 걸 이렇게 표현한 거잖아요." },
              { meme: "새벽 3시 알고리즘 빨려들기", why: "자야 하는데 자기 싫은 그 저항감, 나만 그런 게 아니었어요." },
            ].map((item, i) => (
              <div key={i} style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "18px 20px" }}>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 15, color: AMB, marginBottom: 8, letterSpacing: "-0.02em" }}>"{item.meme}"</p>
                <p style={{ ...PROSE, fontSize: 13, color: T2, lineHeight: 1.8 }}>{item.why}</p>
              </div>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            "나만 이런 게 아니구나"가 위로예요.
            웃기게 표현됐든, 정색하고 표현됐든 — 그 공감의 본질은 같아요.
          </p>
        </section>

        {/* 우걱이 1 */}
        <div style={{ background: `${AMB}0E`, border: `1px solid ${AMB}28`, borderLeft: `3px solid ${AMB}`, borderRadius: "0 6px 6px 0", padding: "18px 22px", marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: AMB, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>우걱이 관측</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 15, color: T1, lineHeight: 1.85, letterSpacing: "-0.02em" }}>
            웃기면서 정확한 표현 = 공감 2배.<br />
            위로는 꼭 진지해야 하는 게 아님.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 2 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            병맛이 진심을 건드리는 방식
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            "정색하고 진지한 이야기"보다 "웃기게 털어놓은 이야기"가 때로 더 공감이 가요.
            왜일까요?
          </p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "22px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 18 }}>병맛이 통하는 원리</p>
            {[
              { title: "방어막을 낮춤", desc: "웃으면서 받아들이면 진지한 이야기보다 거부감이 낮아요. 웃음이 방어막을 허물어요." },
              { title: "정확한 표현", desc: "병맛 표현은 오히려 감정의 핵심을 정확하게 집어요. '눅눅해졌다'가 '우울하다'보다 더 정확할 때가 있어요." },
              { title: "가볍게 꺼낼 수 있음", desc: "심각하게 말하면 무거워지는 감정도, 웃기게 포장하면 꺼낼 수 있어요. 말하는 것 자체가 해소가 돼요." },
            ].map((item, i) => (
              <div key={i} style={{ paddingBottom: i < 2 ? 18 : 0, marginBottom: i < 2 ? 18 : 0, borderBottom: i < 2 ? `1px solid ${LINE}` : "none" }}>
                <p style={{ fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, color: T1, marginBottom: 6, letterSpacing: "-0.02em" }}>{item.title}</p>
                <p style={{ ...PROSE, fontSize: 13, color: T2, lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            병맛은 표면이 가볍지만, 그 아래에 진심이 있어요.
            그 진심이 누군가에게 닿으면 — 그게 위로예요.
          </p>
        </section>

        {/* 우걱이 2 */}
        <div style={{ background: `${PURPLE}0E`, border: `1px solid ${PURPLE}28`, borderLeft: `3px solid ${PURPLE}`, borderRadius: "0 6px 6px 0", padding: "18px 22px", marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: PURPLE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>우걱이 코멘트</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 15, color: T1, lineHeight: 1.85, letterSpacing: "-0.02em" }}>
            웃기면서 던지는 것도 감정 해소임.<br />
            형식보다 꺼내는 것 자체가 중요.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 3 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            오늘무드가 병맛인 이유
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            오늘무드에는 우걱이가 있어요.
            감정을 삭제해주는, 약간 이상한 캐릭터예요.
            파쇄기가 있고, 감정을 던지면 갈아버립니다.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            진지한 마음 상담 앱이 아니에요.
            무겁고 진중한 일기앱도 아니에요.
            그냥 — 오늘 감정 꺼내서 웃기게 던지면, 우걱이가 받아서 파쇄해버리는 곳.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            근데 그게 이상하게 위로가 된다는 피드백이 많아요.
            왜인지는 — 이제 이 글을 읽었으니 알겠죠?
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 4 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            왜 진지하게 말하기가 어려울까
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            "나 요즘 좀 힘들어"라고 말하는 것보다
            "나 완전 번아웃인듯 ㅋㅋ"이라고 말하는 게 더 쉬운 이유가 있어요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            진지하게 말하면 그게 무거워져요. 상대방도 진지하게 반응해야 하고,
            나도 설명을 더 해야 하고, 감정에 더 깊이 들어가야 해요.
            근데 웃기게 말하면 — 가볍게 꺼내고 가볍게 넘길 수 있어요.
          </p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "22px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 16 }}>거리두기의 기능</p>
            {[
              { label: "자기 보호", desc: "웃음은 감정과 나 사이에 적당한 거리를 만들어줘요. 너무 깊이 빠지지 않아도 되게 해주는 장치예요." },
              { label: "수용 촉진", desc: "웃으면서 받아들이면 방어막이 낮아져요. 진지한 내용도 더 잘 받아들여지게 돼요." },
              { label: "연결 시작점", desc: "가볍게 꺼낸 것이 더 깊은 대화의 시작점이 되기도 해요. 웃음이 입구가 되는 거예요." },
            ].map((item, i) => (
              <div key={i} style={{ paddingBottom: i < 2 ? 14 : 0, marginBottom: i < 2 ? 14 : 0, borderBottom: i < 2 ? `1px solid ${LINE}` : "none" }}>
                <p style={{ fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, color: AMB, marginBottom: 5, letterSpacing: "-0.02em" }}>{item.label}</p>
                <p style={{ ...PROSE, fontSize: 13, color: T2, lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            병맛은 가벼운 게 아니에요. 심각한 것을 다루기 쉬운 방식으로 포장한 거예요.
            그 포장지 아래에 진심이 있어요.
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 5 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            공감이 위로인 이유
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            "나만 이런 게 아니구나"라는 경험이 왜 위로가 될까요?
            외로움이 조금 줄어들기 때문이에요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            힘들 때 가장 힘든 건 그 감정 자체보다, "나만 이런 것 같다"는 고립감인 경우가 많아요.
            그런데 누군가 이미 같은 감정을 겪고, 그걸 표현해뒀다는 사실 하나가
            그 고립감을 깨줘요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            그래서 병맛이든, 진지함이든, 형식은 중요하지 않아요.
            "맞아, 나도 그랬어"라는 순간이 핵심이에요.
            그 순간이 위로예요.
          </p>
        </section>

        {/* 우걱이 마지막 */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "24px 28px", textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 12, color: T3, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 18 }}>from. 우걱이</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 17, color: T1, lineHeight: 1.9, letterSpacing: "-0.02em" }}>
            진지하게 말 안 해도 돼요.<br />
            웃기게 던져도 받아드림.<br />
            어차피 다 파쇄할 거니까.
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: `${ROSE}12`, border: `1px solid ${RDIM}`, borderRadius: 8, padding: "34px 24px", textAlign: "center", marginBottom: 56 }}>
          <h2 className="article-h2" style={{ fontSize: 17, color: T1, marginBottom: 8 }}>
            오늘 감정,<br />웃기게든 진지하게든 한 번 던져봐요.
          </h2>
          <p style={{ ...PROSE, fontSize: 13, color: T2, marginBottom: 26 }}>어떤 형식이든 다 받아요. 파쇄는 우걱이가 함.</p>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ROSE, color: "#F5EFE0", padding: "13px 30px", borderRadius: 6, fontSize: 15, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
            감정 파쇄하러 가기
          </Link>
        </div>

        {/* 관련 글 */}
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontFamily: "monospace", color: T3, letterSpacing: "0.08em", marginBottom: 14, borderBottom: `1px solid ${LINE}`, paddingBottom: 12 }}>비슷한 이야기</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/best-results", title: "인기 감정 결과 모음", desc: "사람들이 가장 많이 저장한 병맛 감정 결과 아카이브." },
              { href: "/hide-emotions", title: "혼자 삭힌 감정은 어디로 갈까?", desc: "삭힌 감정이 새벽에 다시 나오는 이유에 대해." },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "16px 20px", background: CARD, border: `1px solid ${LINE}`, borderRadius: 6 }}>
                  <p style={{ fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, color: T1, marginBottom: 5, letterSpacing: "-0.02em" }}>{item.title}</p>
                  <p style={{ ...PROSE, fontSize: 12, color: T3, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 푸터 */}
        <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 24 }}>
          <p style={{ ...PROSE, fontSize: 11, color: T3, textAlign: "center", marginBottom: 12 }}>© 2026 오늘무드. All rights reserved.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[{ href: "/", label: "홈" }, { href: "/blog", label: "감정 이야기" }, { href: "/about", label: "소개" }, { href: "/privacy", label: "개인정보처리방침" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ ...PROSE, fontSize: 11, color: T3, textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
