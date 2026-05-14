import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 오늘무드",
  description: "오늘무드 서비스의 개인정보처리방침입니다.",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 36 }}>
    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2A2520", marginBottom: 12, borderBottom: "1.5px solid #D8CEC0", paddingBottom: 8 }}>
      {title}
    </h2>
    <div style={{ fontSize: 14, color: "#5A5248", lineHeight: 1.85, fontWeight: 300 }}>
      {children}
    </div>
  </section>
);

export default function PrivacyPage() {
  return (
    <div style={{ background: "#EDE4D0", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 오늘무드
        </Link>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#2A2520", fontFamily: "var(--font-serif)", margin: "20px 0 8px" }}>
          개인정보처리방침
        </h1>
        <p style={{ fontSize: 13, color: "#A89880", marginBottom: 40 }}>
          최종 업데이트: 2026년 5월 14일
        </p>

        <div style={{ background: "#F5EFE0", borderRadius: 4, padding: "20px 24px", marginBottom: 36, border: "1px solid #D8CEC0" }}>
          <p style={{ fontSize: 14, color: "#5A5248", lineHeight: 1.8, fontWeight: 300 }}>
            오늘무드(이하 "서비스")는 사용자의 개인정보를 소중히 여기며, 「개인정보 보호법」을 준수합니다.
            본 방침은 서비스 이용 시 수집되는 정보와 그 활용 방식을 안내합니다.
          </p>
        </div>

        <Section title="1. 수집하는 개인정보 항목">
          <p>오늘무드는 다음과 같은 정보를 수집합니다:</p>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}><strong>자동 수집 정보:</strong> 접속 IP, 브라우저 종류, 방문 일시, 서비스 이용 기록</li>
            <li style={{ marginBottom: 6 }}><strong>로컬 저장 데이터:</strong> 감정 기록 데이터 (브라우저 localStorage에만 저장, 서버 전송 없음)</li>
            <li style={{ marginBottom: 6 }}><strong>광고 관련:</strong> Google AdSense를 통한 쿠키 및 광고 식별자</li>
          </ul>
        </Section>

        <Section title="2. 개인정보 수집 및 이용 목적">
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>서비스 제공 및 품질 개선</li>
            <li style={{ marginBottom: 6 }}>서비스 이용 통계 분석</li>
            <li style={{ marginBottom: 6 }}>맞춤형 광고 제공 (Google AdSense)</li>
          </ul>
        </Section>

        <Section title="3. 개인정보 보유 및 이용 기간">
          <p>
            감정 기록 데이터는 사용자의 브라우저 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다.
            사용자가 브라우저 데이터를 삭제하면 즉시 소멸됩니다. 서비스 이용 통계는 수집 후 최대 2년간 보관됩니다.
          </p>
        </Section>

        <Section title="4. 제3자 제공">
          <p>오늘무드는 원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우는 예외입니다:</p>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>사용자가 사전에 동의한 경우</li>
            <li style={{ marginBottom: 6 }}>법령에 의한 경우</li>
            <li style={{ marginBottom: 6 }}>Google AdSense 광고 서비스 운영을 위한 경우 (Google LLC)</li>
          </ul>
        </Section>

        <Section title="5. Google AdSense 및 쿠키">
          <p>
            본 서비스는 Google AdSense 광고 서비스를 이용합니다. Google은 쿠키를 사용하여 사용자에게
            관심 기반 광고를 제공할 수 있습니다. 사용자는{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer"
              style={{ color: "#C8607A" }}>
              Google 광고 설정
            </a>
            에서 맞춤 광고를 비활성화할 수 있습니다.
          </p>
          <p style={{ marginTop: 10 }}>
            쿠키 수집을 원하지 않는 경우 브라우저 설정에서 쿠키를 차단할 수 있으나,
            일부 서비스 기능이 제한될 수 있습니다.
          </p>
        </Section>

        <Section title="6. 사용자의 권리">
          <p>사용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>개인정보 열람 요청</li>
            <li style={{ marginBottom: 6 }}>개인정보 정정·삭제 요청</li>
            <li style={{ marginBottom: 6 }}>개인정보 처리 정지 요청</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            문의: <strong>chston0603@gmail.com</strong>
          </p>
        </Section>

        <Section title="7. 개인정보 보호책임자">
          <p>
            성명: 오늘무드 운영팀<br/>
            이메일: chston0603@gmail.com<br/>
            처리 기간: 문의 접수 후 10일 이내 답변
          </p>
        </Section>

        <Section title="8. 방침 변경">
          <p>
            본 개인정보처리방침은 법령 또는 서비스 변경에 따라 업데이트될 수 있습니다.
            변경 시 서비스 내 공지사항을 통해 안내합니다.
          </p>
        </Section>

        <div style={{ borderTop: "1px solid #D8CEC0", paddingTop: 24, marginTop: 16 }}>
          <p style={{ fontSize: 12, color: "#A89880", textAlign: "center" }}>
            © 2026 오늘무드. All rights reserved.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>홈</Link>
            <Link href="/about" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>서비스 소개</Link>
            <Link href="/archive" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>기록장</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
