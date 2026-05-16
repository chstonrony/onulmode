import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | 오늘무드",
  description: "오늘무드 서비스 이용약관입니다.",
};

const INK  = "#2A2520";
const ROSE = "#C8607A";
const BG   = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE = "#D8CEC0";

export default function TermsPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 100px" }}>

        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 오늘무드
        </Link>

        <div style={{ margin: "24px 0 40px" }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 10 }}>
            TERMS OF SERVICE
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.3, marginBottom: 8 }}>
            이용약관
          </h1>
          <p style={{ fontSize: 12, color: "#A89880", fontFamily: "monospace" }}>
            최종 업데이트: 2026년 5월 16일
          </p>
        </div>

        {/* 우걱이 한마디 */}
        <div style={{
          padding: "16px 20px", background: PAPER,
          border: `1.5px solid ${LINE}`, borderLeft: `3px solid ${ROSE}`,
          borderRadius: 3, marginBottom: 32,
        }}>
          <p style={{ fontSize: 13, color: "#7A7260", lineHeight: 1.8, fontFamily: "var(--font-serif)" }}>
            읽기 싫은 거 알아요. 그래도 짧게 써놨으니까 한번만 봐줘요.
          </p>
          <p style={{ fontSize: 10, color: "#B4A890", fontFamily: "monospace", marginTop: 6 }}>— 우걱이 처리소 운영팀</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>

          <Section title="제1조 서비스 목적" color="#C8607A">
            <p>오늘무드(이하 "서비스")는 오락 및 엔터테인먼트 목적으로 제공됩니다.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>감정 파쇄 결과, AI 판정, 우걱이 코멘트 등은 모두 재미를 위한 것이며 심리 상담, 의료 진단, 법적 조언 등을 대체하지 않습니다.</p>
          </Section>

          <Section title="제2조 결과물의 한계" color="#8878B0">
            <p>서비스에서 제공하는 모든 결과는 <strong>참고용</strong>입니다.</p>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "결과지의 수치와 판정은 임의로 생성됩니다.",
                "우걱이의 판단은 과학적 근거가 없습니다.",
                "실제 심리 상태와 다를 수 있습니다.",
                "심각한 감정적 어려움이 있다면 전문가 상담을 권장합니다.",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "#5A5248" }}>
                  <span style={{ color: "#D8CEC0", flexShrink: 0 }}>•</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="제3조 서비스 이용" color="#5A8FA8">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "만 14세 이상이면 누구나 이용할 수 있습니다.",
                "서비스는 무료로 제공됩니다.",
                "비상업적 개인 이용 목적으로만 사용해주세요.",
                "타인을 비방하거나 불법적인 목적으로 사용하지 마세요.",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "#5A5248" }}>
                  <span style={{ color: "#D8CEC0", flexShrink: 0 }}>•</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="제4조 데이터 및 개인정보" color="#7A9E6A">
            <p>감정 기록 데이터는 사용자 기기의 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>방문자 통계 수집 및 광고 서비스 운영에 관한 자세한 내용은 <Link href="/privacy" style={{ color: ROSE }}>개인정보처리방침</Link>을 확인하세요.</p>
          </Section>

          <Section title="제5조 서비스 변경 및 중단" color="#C4874A">
            <p>운영자는 서비스의 내용을 사전 고지 없이 변경하거나 중단할 수 있습니다.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>서비스 중단으로 인한 손해에 대해 운영자는 책임을 지지 않습니다. (우걱이도 책임 안 짐.)</p>
          </Section>

          <Section title="제6조 면책" color="#9A8E80">
            <p>서비스 이용으로 발생한 결과에 대한 책임은 이용자 본인에게 있습니다.</p>
            <p style={{ marginTop: 8, color: "#7A7260" }}>단, 우걱이는 최선을 다해 씹겠습니다.</p>
          </Section>

        </div>

        {/* 문의 */}
        <div style={{ marginTop: 32, padding: "20px 22px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 3, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#7A7260", fontFamily: "var(--font-serif)", marginBottom: 8 }}>
            약관에 대한 문의
          </p>
          <a href="mailto:chston0603@gmail.com" style={{ fontSize: 14, color: ROSE, fontFamily: "monospace", textDecoration: "none", fontWeight: 700 }}>
            chston0603@gmail.com
          </a>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 20, marginTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>홈</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/contact" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>문의하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, color }: { title: string; children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      padding: "18px 20px 20px",
      background: "#F5EFE0",
      border: "1px solid #D8CEC0",
      borderLeft: `3px solid ${color ?? "#C8607A"}`,
      marginBottom: 8,
    }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontSize: 13, color: "#3A3228", lineHeight: 1.85, fontFamily: "var(--font-serif)" }}>
        {children}
      </div>
    </div>
  );
}
