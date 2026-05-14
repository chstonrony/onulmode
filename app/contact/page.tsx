import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의하기 | 오늘무드",
  description: "오늘무드 서비스에 대한 문의, 광고 제휴, 협업 제안을 보내주세요.",
};

export default function ContactPage() {
  return (
    <div style={{ background: "#EDE4D0", minHeight: "100vh" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 오늘무드
        </Link>

        <div style={{ margin: "24px 0 40px" }}>
          <p style={{ fontSize: 11, color: "#C8607A", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 10 }}>
            CONTACT
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", lineHeight: 1.3, marginBottom: 12 }}>
            문의하기
          </h1>
          <p style={{ fontSize: 15, color: "#7A7260", lineHeight: 1.75, fontWeight: 300 }}>
            오늘무드 팀에게 메시지를 보내주세요.<br/>
            광고 제휴, 협업, 버그 신고 모두 환영해요.
          </p>
        </div>

        {/* 연락처 카드들 */}
        {[
          {
            icon: "✉",
            title: "이메일 문의",
            desc: "광고 제휴, 협업 제안, 일반 문의",
            value: "chston0603@gmail.com",
            href: "mailto:chston0603@gmail.com",
            label: "이메일 보내기",
          },
          {
            icon: "🐛",
            title: "버그 신고",
            desc: "서비스 오류, UI 문제, 기능 개선 제안",
            value: "GitHub Issues",
            href: "https://github.com/chstonrony/onulmode/issues",
            label: "이슈 남기기",
          },
        ].map(item => (
          <div key={item.title} style={{
            marginBottom: 16, padding: "22px 24px",
            background: "#F5EFE0", border: "1px solid #D8CEC0", borderRadius: 4,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <span style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 4 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 13, color: "#A89880", fontWeight: 300, marginBottom: 10 }}>
                  {item.desc}
                </p>
                <a href={item.href} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center",
                  background: "#C8607A", color: "#F5EFE0",
                  padding: "8px 18px", borderRadius: 4,
                  fontSize: 13, fontFamily: "var(--font-serif)", fontWeight: 700,
                  textDecoration: "none",
                }}>
                  {item.label} →
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* FAQ */}
        <div style={{ marginTop: 36, padding: "24px", background: "#F5EFE0", border: "1px solid #D8CEC0", borderRadius: 4 }}>
          <p style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 16 }}>
            자주 묻는 질문
          </p>
          {[
            { q: "감정 기록 데이터는 어디에 저장되나요?", a: "모든 데이터는 사용자의 브라우저에만 저장되며 서버로 전송되지 않아요." },
            { q: "광고 제휴는 어떻게 하나요?", a: "이메일로 제안서를 보내주세요. 2~3일 내로 답변드려요." },
            { q: "앱으로도 출시되나요?", a: "현재 웹 서비스로만 운영 중이에요. 향후 앱 출시를 검토 중이에요." },
          ].map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #D8CEC0" }}>
              <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 5 }}>Q. {q}</p>
              <p style={{ fontSize: 13, color: "#7A7260", fontWeight: 300, lineHeight: 1.7 }}>A. {a}</p>
            </div>
          ))}
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: "1px solid #D8CEC0", paddingTop: 24, marginTop: 40 }}>
          <p style={{ fontSize: 12, color: "#A89880", textAlign: "center" }}>© 2026 오늘무드. All rights reserved.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
            <Link href="/about" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>소개</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>홈</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
