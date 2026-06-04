import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "혼자 삭힌 감정은 어디로 갈까? | 오늘무드",
  description: "말 못 하고 삭힌 감정들, 사실 어디로 가는 게 아니에요. 조용히 쌓여서 새벽에 다시 튀어나올 뿐이에요. 감정을 혼자 삭히면 생기는 일들.",
  keywords: ["감정 억제", "감정 혼자 삭히기", "감정 해소", "새벽 감정", "감정 불안", "감정 정리", "감정 표현", "마음 건강", "스트레스 해소", "감정 노동"],
  openGraph: { type: "article", locale: "ko_KR", url: "https://onulmood.com/hide-emotions", title: "혼자 삭힌 감정은 어디로 갈까?", description: "말 못 하고 삭힌 감정들은 사라지지 않아요. 조용히 쌓여서 새벽에 다시 튀어나올 뿐.", siteName: "오늘무드" },
  twitter: { card: "summary_large_image", title: "혼자 삭힌 감정은 어디로 갈까? | 오늘무드", description: "안 버린 감정은 가끔 새벽에 다시 튀어나옴." },
  alternates: { canonical: "https://onulmood.com/hide-emotions" },
};

const BG   = "#0C0B09";
const CARD = "#151310";
const LINE = "#1E1C18";
const ROSE = "#C8607A";
const RDIM = "#6A2E3E";
const AMB  = "#C4874A";
const T1   = "#E5DDD0";
const T2   = "#8C7D6A";
const T3   = "#4A4438";

const PROSE: React.CSSProperties = {
  fontFamily: "var(--font-prose)",
  fontWeight: 300,
  lineHeight: 2.1,
  letterSpacing: "-0.02em",
};

export default function HideEmotionsPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: T1 }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)", pointerEvents: "none", zIndex: 50 }} />

      <div style={{ maxWidth: 620, margin: "0 auto", padding: "48px 22px 100px", position: "relative", zIndex: 1 }}>

        <Link href="/blog" style={{ ...PROSE, fontSize: 13, color: T3, textDecoration: "none", display: "inline-block", marginBottom: 44 }}>
          ← 감정 이야기
        </Link>

        {/* 태그 */}
        <div style={{ marginBottom: 22 }}>
          <span style={{ ...PROSE, fontSize: 11, padding: "3px 12px", background: `${ROSE}18`, color: ROSE, border: `1px solid ${RDIM}`, borderRadius: 20 }}>감정 이야기</span>
          <span style={{ fontSize: 11, color: T3, fontFamily: "monospace", marginLeft: 12 }}>4분 읽기</span>
        </div>

        {/* 제목 */}
        <h1 className="article-title" style={{ fontSize: "clamp(24px, 6vw, 32px)", color: T1, marginBottom: 18 }}>
          혼자 삭힌 감정은<br />어디로 갈까?
        </h1>

        <p style={{ ...PROSE, fontSize: 16, color: T2, marginBottom: 12 }}>
          말 못 하고 삭힌 감정들,<br />
          사실 어디로 가는 게 아니에요.
        </p>
        <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", marginBottom: 52 }}>2026. 05. 19</p>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>"나 그냥 참았어."</p>
        <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
          이 말, 하루에 몇 번이나 하는지 세어본 적 있나요?
          아니면 — 말도 안 하고 그냥 삭혀버린 날은요.
        </p>
        <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 48 }}>
          삭힌다는 건 참는 것도, 해소하는 것도 아니에요.
          그냥 <strong style={{ color: T1, fontWeight: 600 }}>감정을 어딘가에 밀어넣고 뚜껑을 덮는 것</strong>에 가까워요.
        </p>

        {/* 섹션 1 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            삭힌 감정은 사라지지 않는다
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            삭힌 감정이 어디로 가는지 알면 좀 놀랄 수도 있어요.
            없어지는 게 아니에요. 표현되지 않은 채로 몸 어딘가에 남아있어요.
          </p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "22px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 18 }}>삭힌 감정의 행방</p>
            {[
              { state: "단기", result: "가슴이 답답하거나, 이유 없이 짜증이 남" },
              { state: "중기", result: "무기력함으로 변해서 아무것도 하기 싫어짐" },
              { state: "장기", result: "전혀 관계없는 일에 갑자기 터지거나, 눈물이 남" },
              { state: "새벽", result: "자려는데 갑자기 생각이 밀려오기 시작함" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: i < 3 ? 14 : 0, marginBottom: i < 3 ? 14 : 0, borderBottom: i < 3 ? `1px solid ${LINE}` : "none" }}>
                <span style={{ fontSize: 11, color: ROSE, flexShrink: 0, minWidth: 36, fontFamily: "monospace" }}>{row.state}</span>
                <span style={{ ...PROSE, fontSize: 13, color: T2, lineHeight: 1.8 }}>{row.result}</span>
              </div>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            "오래 된 일인데 왜 이게 갑자기 생각나지?" 싶을 때 있죠?
            그게 삭혀뒀던 감정이 뚜껑을 밀고 나오는 거예요.
          </p>
        </section>

        {/* 우걱이 1 */}
        <div style={{ background: `${ROSE}10`, border: `1px solid ${RDIM}40`, borderLeft: `3px solid ${ROSE}`, borderRadius: "0 6px 6px 0", padding: "18px 22px", marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>우걱이 코멘트</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 15, color: T1, lineHeight: 1.85, letterSpacing: "-0.02em" }}>
            안 버린 감정은 가끔 새벽에 다시 튀어나옴.
          </p>
          <p style={{ ...PROSE, fontSize: 12, color: T2, marginTop: 6 }}>(보통 가장 자고 싶을 때 튀어나옴)</p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 2 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            새벽에 갑자기 생각나는 이유
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            낮에는 바빠서 뚜껑을 꽉 누르고 있다가,
            밤에 누우면 누르던 힘이 사라지잖아요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            그때 뚜껑이 살짝 열리면서 삭혀뒀던 것들이 올라와요.
            "왜 그 사람이 그때 그랬지"부터 시작해서,
            "내가 그때 뭘 잘못한 건가"로 이어지고,
            "그래서 나는 왜 이 꼴인가"까지 가는 그 경로.
          </p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "22px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 18 }}>새벽 감정 전개 패턴</p>
            {[
              "PM 11:30 — 피곤해서 눕는다",
              "AM 12:02 — 왜인지 잠이 안 온다",
              "AM 12:15 — 오래된 일 하나가 생각난다",
              "AM 12:40 — 관련된 기억이 줄줄이 따라온다",
              "AM 01:10 — 결국 '나는 왜 이러지' 루프 진입",
              "AM 02:30 — 지쳐서 겨우 잠든다",
            ].map((line, i) => (
              <p key={i} style={{ fontSize: 13, color: i === 4 ? ROSE : T2, fontFamily: "monospace", lineHeight: 1.9, fontWeight: i === 4 ? 700 : 300 }}>{line}</p>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            이게 반복되면 점점 새벽이 두려워져요.
            눕는 순간 생각이 시작된다는 걸 알게 되거든요.
          </p>
        </section>

        {/* 우걱이 2 */}
        <div style={{ background: `${AMB}0E`, border: `1px solid ${AMB}28`, borderLeft: `3px solid ${AMB}`, borderRadius: "0 6px 6px 0", padding: "18px 22px", marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: AMB, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>우걱이 관측 기록</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 15, color: T1, lineHeight: 1.85, letterSpacing: "-0.02em" }}>
            새벽 12시~3시 감정 파쇄 요청 급증.<br />
            이 시간대 감정 대부분: 삭혔다가 나온 것들.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 3 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            그렇다고 다 털어놓으라는 말은 아니에요
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            모든 감정을 누군가에게 말할 필요는 없어요.
            그게 가능한 사람도 별로 없고, 때로는 말하는 것 자체가 더 힘들기도 하니까.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            하지만 적어도, <strong style={{ color: T1, fontWeight: 600 }}>어딘가에는 꺼내두는 게 필요해요.</strong>
            누군가 들어줄 필요도 없이. 기록으로 남길 필요도 없이.
            그냥 꺼내서 — 버리면 됩니다.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            뚜껑이 열리면서 나온 감정은, 한 번 꺼내서 버려야
            다시 새벽에 튀어나오지 않아요.
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 4 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            혼자 삭히는 습관이 생기는 이유
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            삭히는 게 습관이 된 사람들은 대부분 그럴 만한 이유가 있어요.
            말했다가 더 상처받은 경험이 있거나, 말해봤자 달라지지 않는다는 걸 배웠거나,
            아니면 그냥 "내가 예민한 건가"라는 의심이 항상 먼저 오거나.
          </p>

          <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "22px 26px", marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: T3, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 16 }}>삭히게 만드는 말들</p>
            {[
              { said: "\"그게 왜 힘들어?\"", effect: "내 감정이 과한 것처럼 느껴지게 만들어요." },
              { said: "\"다들 그렇게 살아.\"", effect: "내 감정을 일반화해서 무효화해요." },
              { said: "\"또 그 얘기야?\"", effect: "같은 감정을 반복하면 안 된다는 압박이 생겨요." },
              { said: "\"그냥 잊어버려.\"", effect: "감정을 무시하는 방법을 권유하는 거예요." },
            ].map((item, i) => (
              <div key={i} style={{ paddingBottom: i < 3 ? 14 : 0, marginBottom: i < 3 ? 14 : 0, borderBottom: i < 3 ? `1px solid ${LINE}` : "none" }}>
                <p style={{ fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, color: ROSE, marginBottom: 5, letterSpacing: "-0.02em" }}>{item.said}</p>
                <p style={{ ...PROSE, fontSize: 13, color: T2, lineHeight: 1.8 }}>{item.effect}</p>
              </div>
            ))}
          </div>

          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            이런 반응들을 반복적으로 경험하면, 결국 "말 안 하는 게 낫다"는 결론에 이르게 돼요.
            그게 삭히는 습관의 시작이에요. 당신이 약해서가 아니라, 적응한 거예요.
          </p>
        </section>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 52 }} />

        {/* 섹션 5 */}
        <section style={{ marginBottom: 52 }}>
          <h2 className="article-h2" style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: T1, marginBottom: 20 }}>
            꺼내는 것과 털어놓는 것은 달라요
          </h2>

          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            감정을 꺼내는 게 꼭 누군가에게 털어놓는 것을 의미하지 않아요.
            털어놓는 건 상대방이 필요하고, 그 사람이 잘 받아줄 준비가 되어있어야 해요.
            근데 꺼내는 건 혼자서도 할 수 있어요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2, marginBottom: 20 }}>
            일기를 쓰는 것, 메모에 적는 것, 아무도 안 보는 곳에 한 줄 쓰는 것.
            말로 혼자 뱉어보는 것. 어딘가에 던져버리는 것.
            이 모든 것이 "꺼내는" 행위예요.
          </p>
          <p style={{ ...PROSE, fontSize: 15, color: T2 }}>
            삭힌 감정을 꺼내는 데 완벽한 방법은 없어요.
            형식보다 "꺼냈다"는 경험 자체가 중요해요.
            그 경험이 쌓이면, 새벽에 뚜껑이 열려도 그렇게 무겁지 않아요.
          </p>
        </section>

        {/* 우걱이 마지막 */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "24px 28px", textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 12, color: T3, fontFamily: "monospace", letterSpacing: "0.06em", marginBottom: 18 }}>from. 우걱이</p>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 17, color: T1, lineHeight: 1.9, letterSpacing: "-0.02em" }}>
            새벽에 또 생각 났으면<br />
            그냥 지금 여기 던져요.<br />
            새벽 감정도 받아드림.
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: `${ROSE}12`, border: `1px solid ${RDIM}`, borderRadius: 8, padding: "34px 24px", textAlign: "center", marginBottom: 56 }}>
          <h2 className="article-h2" style={{ fontSize: 17, color: T1, marginBottom: 8 }}>
            지금 머릿속에 맴도는 것,<br />한 번만 꺼내봐요.
          </h2>
          <p style={{ ...PROSE, fontSize: 13, color: T2, marginBottom: 26 }}>삭히지 않아도 돼요. 그냥 여기 던지면 됩니다.</p>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ROSE, color: "#F5EFE0", padding: "13px 30px", borderRadius: 6, fontSize: 15, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
            감정 파쇄하러 가기
          </Link>
        </div>

        {/* 관련 글 */}
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontFamily: "monospace", color: T3, letterSpacing: "0.08em", marginBottom: 14, borderBottom: `1px solid ${LINE}`, paddingBottom: 12 }}>비슷한 이야기</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/emotion-fatigue", title: "왜 사람은 괜찮은 척할수록 더 지칠까?", desc: "감정 노동이 왜 그렇게 피곤한지에 대해." },
              { href: "/funny-but-comforting", title: "웃긴 콘텐츠인데 왜 위로가 될까?", desc: "병맛과 위로가 사실 같은 곳에서 시작하는 이유." },
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
