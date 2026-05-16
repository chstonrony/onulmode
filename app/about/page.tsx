import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "우걱이 처리소 소개 | 오늘무드",
  description: "우걱이 감정처리소 공식 소개서. 감정 버리는 곳. 기록 X. 분석 X. 힐링 X. 그냥 던지면 씹어먹음.",
};

const INK  = "#2A2520";
const ROSE = "#C8607A";
const BG   = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";

export default function AboutPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 100px" }}>

        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 오늘무드
        </Link>

        {/* 회사 명판 느낌 헤더 */}
        <div style={{
          margin: "24px 0 32px",
          padding: "32px 28px",
          background: INK,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ROSE }} />
          <p style={{ fontSize: 9, fontFamily: "monospace", color: "#5A5248", letterSpacing: "0.18em", marginBottom: 10 }}>
            UGEGI EMOTIONAL DISPOSAL CO., LTD. — 설립일: 모름
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#F5EFE0", lineHeight: 1.3, marginBottom: 8 }}>
            우걱이 처리소<br/>공식 소개서
          </h1>
          <p style={{ fontSize: 12, color: "#6A6258", fontFamily: "monospace" }}>
            (기계 읽지 않아도 됨. 그냥 던지면 됨.)
          </p>
          <div style={{ position: "absolute", bottom: 16, right: 20, fontSize: 40, opacity: 0.06 }}>🦷</div>
        </div>

        {/* Q&A 형식 — 병맛 설명서 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>

          {/* Q1 */}
          <Section q="오늘무드가 뭔가요?" labelColor="#C8607A">
            <p>감정 버리는 곳임.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>기록 X. 분석 X. 힐링 멘트 X. 그냥 던지면 우걱이가 씹어먹음. 끝.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>다 해결된 건 아님. 근데 버렸잖아. 그게 다임.</p>
          </Section>

          {/* Q2 */}
          <Section q="우걱이가 뭔가요?" labelColor="#8878B0">
            <p>감정을 씹어먹는 유기체형 처리 기계임.</p>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["취향", "없음"],
                ["판단", "없음"],
                ["기억", "없음 (씹으면 사라짐)"],
                ["먹는 것", "감정만 먹음"],
                ["특이사항", "매운 거 싫어함. 근데 결국 씹음."],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 16, fontSize: 13, borderBottom: `1px dashed ${LINE}`, paddingBottom: 6 }}>
                  <span style={{ color: "#A89880", fontFamily: "monospace", minWidth: 70 }}>{k}</span>
                  <span style={{ color: INK }}>{v}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Q3 */}
          <Section q="어떻게 쓰나요?" labelColor="#5A8FA8">
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
              {[
                ["01", "감정 있음"],
                ["02", "감정 칩 누름 or 직접 적음"],
                ["03", "우걱이가 씹음"],
                ["04", "빠각 완료 — 결과지 나옴"],
                ["05", "저장하거나 친구한테 보냄"],
              ].map(([n, t]) => (
                <div key={n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: ROSE, fontWeight: 700, paddingTop: 2, minWidth: 24 }}>{n}</span>
                  <span style={{ fontSize: 14, color: "#3A3228" }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: `${ROSE}12`, border: `1px solid ${ROSE}30`, borderRadius: 3 }}>
              <p style={{ fontSize: 12, color: ROSE, fontFamily: "monospace" }}>
                ※ 결과지는 6가지 랜덤. 매번 다르게 나옴. 친구 것이랑 비교해봐.
              </p>
            </div>
          </Section>

          {/* Q4 */}
          <Section q="소화 안 되는 감정은요?" labelColor="#907840">
            <p>18% 확률로 <strong style={{ color: ROSE }}>소화 멈춤</strong> 이벤트가 발생함.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>이때는 우걱이가 천사가 됨. 위로해줌. 왜인지 모르겠는데 그냥 그렇게 됨.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>씹다가 울컥한 거임. 아무튼 그럴 수 있음.</p>
          </Section>

          {/* Q5 */}
          <Section q="왜 만들었나요?" labelColor="#6898A0">
            <p>감성 앱이 너무 많았음.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>다 예쁘고 미니멀하고 힐링됨. 그게 싫었음.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>감정을 예쁘게 관리하기 싫었음. 그냥 버리고 싶었음. 우걱이한테.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>근데 버리고 나면 좀 이상하게 가벼워짐. 그게 다임.</p>
          </Section>

        </div>

        {/* 면책 조항 — 중요한 척 병맛 */}
        <div style={{
          marginTop: 32,
          padding: "22px 24px",
          background: PAPER,
          border: `1px solid ${LINE}`,
          borderRadius: 3,
          position: "relative",
        }}>
          <p style={{ fontSize: 9, fontFamily: "monospace", color: "#A89880", letterSpacing: "0.14em", marginBottom: 12 }}>
            ■ 면책조항 (읽는 척만 해도 됨)
          </p>
          {[
            "파쇄된 감정은 복구 불가능함",
            "우걱이는 의료기기가 아님",
            "씹힌 감정이 어디로 가는지 우걱이도 모름. 아무튼 없어짐.",
            "빠각 완료 ≠ 완전히 해결됨. 그냥 버린 거임.",
            "우걱이는 판단 안 함. 하지만 매운 감정은 싫어함.",
            "이 서비스를 이용한 결과에 우걱이는 책임지지 않음. 근데 왜인지 좀 나아짐.",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 12, color: "#7A7260", marginBottom: 6 }}>
              <span style={{ color: LINE, flexShrink: 0 }}>•</span>
              <span>{t}</span>
            </div>
          ))}
        </div>

        {/* 빠각 완료 도장 + CTA */}
        <div style={{ textAlign: "center", padding: "40px 0 16px", position: "relative" }}>
          <div style={{
            display: "inline-block",
            border: `2.5px solid ${ROSE}`,
            borderRadius: 3,
            padding: "10px 28px",
            color: ROSE,
            fontSize: 16,
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            opacity: 0.75,
            marginBottom: 24,
            transform: "rotate(-2deg)",
          }}>
            빠각 완료 ✓
          </div>
          <div style={{ marginTop: 8 }}>
            <Link href="/release" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: INK, color: "#F5EFE0",
              padding: "16px 36px", borderRadius: 3,
              fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700,
              textDecoration: "none",
              boxShadow: "5px 5px 0 rgba(42,37,32,0.5)",
              letterSpacing: "0.02em",
            }}>
              감정 던지러 가기 →
            </Link>
          </div>
          <p style={{ fontSize: 11, color: "#B4A890", fontFamily: "monospace", marginTop: 14 }}>
            (우걱이 지금 배고픔 MAX 상태임)
          </p>
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 20, marginTop: 20 }}>
          <p style={{ fontSize: 11, color: "#B4A890", textAlign: "center", fontFamily: "monospace" }}>
            © 2026 오늘무드 / 우걱이 처리소. 감정 찌꺼기는 책임 안 짐.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 10 }}>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>홈</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/archive" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>파쇄함</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ q, children, labelColor }: { q: string; children: React.ReactNode; labelColor?: string }) {
  return (
    <div style={{
      padding: "20px 22px 22px",
      background: "#F5EFE0",
      border: "1px solid #D8CEC0",
      borderLeft: `3px solid ${labelColor ?? "#C8607A"}`,
      marginBottom: 8,
    }}>
      <p style={{ fontSize: 9, fontFamily: "monospace", color: labelColor ?? "#C8607A", letterSpacing: "0.12em", marginBottom: 8 }}>
        Q.
      </p>
      <h2 style={{ fontSize: 17, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 14, lineHeight: 1.4 }}>
        {q}
      </h2>
      <div style={{ fontSize: 14, color: "#3A3228", lineHeight: 1.85, fontFamily: "var(--font-serif)" }}>
        {children}
      </div>
    </div>
  );
}
