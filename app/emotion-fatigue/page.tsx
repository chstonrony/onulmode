import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "왜 사람은 괜찮은 척할수록 더 지칠까? | 감정 피로 | 오늘무드",
  description: "아무 일 없는 척하는 데에도 생각보다 많은 에너지가 들어갑니다. 감정을 억제할수록 더 지치는 이유, 그리고 가끔 감정을 버려야 하는 이유에 대해.",
  keywords: ["감정 피로", "감정 노동", "괜찮은 척", "감정 억제", "번아웃", "감정 소진", "감정 관리", "마음 건강", "감정 해소", "스트레스 해소"],
  openGraph: { type: "article", locale: "ko_KR", url: "https://onulmood.com/emotion-fatigue", title: "왜 사람은 괜찮은 척할수록 더 지칠까?", description: "아무 일 없는 척하는 데에도 생각보다 많은 에너지가 들어갑니다.", siteName: "오늘무드" },
  twitter: { card: "summary_large_image", title: "왜 사람은 괜찮은 척할수록 더 지칠까? | 오늘무드", description: "아무 일 없는 척하는 데에도 생각보다 많은 에너지가 들어갑니다." },
  alternates: { canonical: "https://onulmood.com/emotion-fatigue" },
};

const BG    = "#151210";
const CARD  = "#1E1A17";
const LINE  = "#2C2622";
const ROSE  = "#C8607A";
const RDIM  = "#8C3E52";
const T1    = "#EDE4D0";   // primary
const T2    = "#A89880";   // secondary
const T3    = "#6B5E52";   // dim
const AMB   = "#C4874A";

const PROSE: React.CSSProperties = {
  fontFamily: "var(--font-prose)",
  fontWeight: 300,
  lineHeight: 2.1,
  letterSpacing: "-0.02em",
};

export default function EmotionFatiguePage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: T1 }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/blog" style={{ ...PROSE, fontSize: 13, color: T3, textDecoration: "none", display: "inline-block", marginBottom: 44 }}>
          ← 감정 이야기
        </Link>

        {/* 태그 */}
        <div style={{ marginBottom: 22 }}>
          <span style={{ ...PROSE, fontSize: 11, padding: "3px 12px", background: `${ROSE}20`, color: ROSE, border: `1px solid ${RDIM}`, borderRadius: 20 }}>
            감정 이야기
          </span>
          <span style={{ fontSize: 11, color: T3, fontFamily: "monospace", marginLeft: 12 }}>5분 읽기</span>
        </div>

        {/* 제목 */}
        <h1 className="article-title" style={{ fontSize: "clamp(24px, 6vw, 32px)", color: T1, marginBottom: 18 }}>
          왜 사람은 괜찮은 척할수록<br />더 지칠까?
        </h1>

        <p style={{ ...PROSE, fontSize: 16, color: T2, marginBottom: 12 }}>
          아무 일 없는 척하는 데에도<br />
          생각보다 많은 에너지가 들어갑니다.
        </p>
        <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", marginBottom: 52 }}>2026. 05. 19</p>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 1 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            "괜찮은 척"은 생각보다 피곤하다
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            하루 중에 우리가 하는 것들을 한번 세어보면 이상한 게 있어요.
            밥도 먹고, 일도 하고, 사람도 만나는데 — 유독 퇴근하면 아무것도 하기 싫은 날.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 24 }}>
            그 이유 중 하나가 바로 <strong style={{ color: T1, fontWeight: 600 }}>감정 노동</strong>입니다.
            몸이 피곤한 게 아니라, 감정을 계속 관리하느라 뇌가 지친 거예요.
          </p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "24px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 18 }}>오늘 내가 소비한 감정 목록</p>
            {[
              { label: "분위기 맞추기", desc: "웃기 싫은데 같이 웃어주기. 공감 안 되는 얘기에 고개 끄덕이기." },
              { label: "웃기",         desc: "실제로 즐겁지 않은 상황에서 자연스럽게 웃음 유지하기." },
              { label: "괜찮다고 하기", desc: '"어, 나 괜찮아"를 반사적으로 말하기. 실제로는 별로 안 괜찮아도.' },
              { label: "혼자 삭히기",  desc: "말할 타이밍을 놓쳐서, 혹은 말해봤자 소용없을 것 같아서 그냥 참기." },
            ].map((item, i) => (
              <div key={i} style={{ paddingBottom: i < 3 ? 16 : 0, marginBottom: i < 3 ? 16 : 0, borderBottom: i < 3 ? `1px solid ${LINE}` : "none" }}>
                <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-maru)", color: T1, marginBottom: 5, letterSpacing: "-0.02em" }}>{item.label}</p>
                <p style={{ ...PROSE, fontSize: 13, color: T3, lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            이것들은 딱히 힘든 일처럼 안 보여요. 근데 하루 종일 이걸 반복하면?
            묘하게 아무것도 하기 싫어지는, 그 무기력함의 정체가 여기에 있습니다.
          </p>
        </section>

        {/* 우걱이 1 */}
        <div style={{ background: `${ROSE}12`, border: `1px solid ${RDIM}44`, borderLeft: `3px solid ${ROSE}`, borderRadius: "0 6px 6px 0", padding: "18px 22px", marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>우걱이 코멘트</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 15, color: T1, lineHeight: 1.8, letterSpacing: "-0.02em" }}>
            참은 감정 오래 두면 눅눅해짐.
          </p>
          <p style={{ ...PROSE, fontSize: 13, color: T2, marginTop: 6 }}>(실제로 꽤 많이 쌓임)</p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 2 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            사람은 감정보다 '억제'에 더 지친다
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            심리학에서 말하는 감정 억제는 단순히 "감정을 안 느끼는 것"이 아닙니다.
            감정은 이미 올라왔는데, 그것을 <strong style={{ color: T1, fontWeight: 600 }}>표현하지 않기 위해 에너지를 쓰는 것</strong>이에요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>쉽게 말하면 이런 거예요.</p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "22px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: T3, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 14 }}>비유하자면</p>
            <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 15, color: T1, lineHeight: 1.85, letterSpacing: "-0.02em" }}>
              음악을 듣는 것보다<br />
              음악을 억지로 <em>안</em> 듣는 게 더 힘든 것처럼.<br /><br />
              감정이 올라오는 걸 느끼면서<br />
              그걸 티 안 내려고 계속 누르고 있는 게<br />
              <strong style={{ color: AMB }}>실제 감정을 느끼는 것보다 훨씬 더 많은 에너지를 씁니다.</strong>
            </p>
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            그래서 "그냥 참았는데 왜 이렇게 피곤하지?"라는 생각이 드는 거예요.
            참는 게 쉬운 게 아니라, 참는 게 오히려 더 힘든 일이었던 거니까요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            게다가 억제된 감정은 사라지지 않아요.
            어딘가에 고여서, 나중에 전혀 관계없는 일에 터지거나,
            그냥 무기력함으로 변해버립니다.
          </p>
        </section>

        {/* 우걱이 2 */}
        <div style={{ background: `${AMB}10`, border: `1px solid ${AMB}30`, borderLeft: `3px solid ${AMB}`, borderRadius: "0 6px 6px 0", padding: "18px 22px", marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: AMB, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>우걱이 권장사항</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 15, color: T1, lineHeight: 1.8, letterSpacing: "-0.02em" }}>
            혼자 삭히기 전에 한 번 던질 것.
          </p>
          <p style={{ ...PROSE, fontSize: 13, color: T2, marginTop: 6 }}>삭혀도 사라지지 않음. 오히려 더 진해짐.</p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 3 */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            그래서 가끔은 감정을 버려야 한다
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            감정을 "해소한다"는 게 꼭 누군가에게 털어놓는 것만은 아니에요.
            때로는 그냥 — 어딘가에 <strong style={{ color: T1, fontWeight: 600 }}>던져버리는 것</strong>으로 충분할 때가 있어요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            "짜증나"라고 한 번 말하는 것. "오늘 좀 힘들었다"를 적어두는 것.
            아무도 안 보는 곳에 감정 하나를 꺼내두는 것.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            별거 아닌 것 같지만, 이게 실제로 감정 억제의 사이클을 끊어줍니다.
            "나 지금 이런 감정이 있어"를 인식하고 꺼내는 것 자체가,
            억제보다 훨씬 적은 에너지로 감정을 처리하는 방법이에요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            오늘무드의 감정 파쇄기가 그런 공간이에요.
            기록도 아니고, 일기도 아니고.
            그냥 오늘 감정 하나 꺼내서 던지면, 우걱이가 받아서 파쇄해버립니다.
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 4 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            감정 피로의 신호들
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            감정적으로 지쳐있다는 걸 모르는 채로 살아가는 사람들이 의외로 많아요.
            "그냥 좀 피곤한 것 같다"고만 생각하는데, 사실 이런 신호들이 쌓여있는 경우가 많아요.
          </p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "22px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 16 }}>감정 피로 체크리스트</p>
            {[
              "웃어야 할 것 같아서 웃었는데, 집에 가면 아무것도 하기 싫어진다",
              "괜찮다고 반사적으로 말하는 횟수가 늘었다",
              "사람 만나는 게 점점 귀찮아졌다",
              "별거 아닌 일에 갑자기 눈물이 나거나 예민하게 반응한다",
              "쉬어도 쉬어지지 않는 느낌이 든다",
              "뭔가 감정이 무뎌진 것 같은 느낌이 든다",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 5 ? 12 : 0 }}>
                <span style={{ color: ROSE, flexShrink: 0, fontFamily: "monospace", fontSize: 12, marginTop: 2 }}>•</span>
                <p style={{ ...PROSE, fontSize: 13, color: T2, lineHeight: 1.8 }}>{item}</p>
              </div>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            이 중 세 개 이상 해당된다면, 몸이 아니라 감정이 지쳐있는 거예요.
            몸의 피로는 자면 풀리는데, 감정 피로는 자도 안 풀려요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            치료가 필요한 게 아니에요. 그냥 감정을 어딘가에 내려놓는 경험이 필요한 거예요.
            안에 계속 들고 있으면 무거워지기만 하거든요.
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 5 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            작게라도 꺼내는 것이 왜 중요한가
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            감정을 꺼낸다는 게 꼭 누군가에게 털어놓는 것만을 의미하지 않아요.
            "오늘 좀 지쳤어"라고 혼자 인정하는 것도 꺼내는 거예요.
            "진짜 짜증났다"라고 속으로라도 말하는 것도요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            이 작은 행위가 감정 억제 사이클을 끊어줘요.
            억제는 에너지가 드는 일이에요. 꺼내는 건 오히려 그 에너지를 아껴줘요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            매일 완벽하게 감정을 정리할 필요 없어요.
            오늘 감정 하나만, 잠깐이라도 꺼내보는 것.
            그게 감정 피로를 막는 가장 현실적인 방법이에요.
          </p>
        </section>

        {/* 우걱이 마지막 */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "24px 28px", marginBottom: 52, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: T3, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 18 }}>from. 우걱이</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 17, color: T1, lineHeight: 1.9, letterSpacing: "-0.02em" }}>
            오늘 참은 거 있으면<br />
            그냥 나한테 줘요.<br />
            내가 부숴드릴게요.
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: `${ROSE}15`, border: `1px solid ${RDIM}`, borderRadius: 8, padding: "36px 28px", textAlign: "center", marginBottom: 56 }}>
          <h2 className="article-h2" style={{ fontSize: 18, color: T1, marginBottom: 10 }}>
            오늘 감정,<br />우걱이한테 잠깐 던져볼래?
          </h2>
          <p style={{ ...PROSE, fontSize: 14, color: T2, marginBottom: 28 }}>기록 안 해도 돼요. 그냥 꺼내서 버리면 됩니다.</p>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ROSE, color: "#F5EFE0", padding: "13px 30px", borderRadius: 6, fontSize: 15, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
            감정 파쇄하러 가기
          </Link>
        </div>

        {/* 관련 글 */}
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontFamily: "monospace", color: T3, letterSpacing: "0.08em", marginBottom: 16, borderBottom: `1px solid ${LINE}`, paddingBottom: 12 }}>비슷한 이야기</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/blog", title: "감정 이야기 모아보기", desc: "번아웃, 억울함, 외로움… 감정에 대해 솔직하게." },
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
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {[{ href: "/", label: "홈" }, { href: "/blog", label: "감정 이야기" }, { href: "/about", label: "소개" }, { href: "/privacy", label: "개인정보처리방침" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ ...PROSE, fontSize: 11, color: T3, textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
