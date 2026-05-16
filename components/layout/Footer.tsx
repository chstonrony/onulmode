import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #D8CEC0",
      background: "#efe3cf",
      padding: "32px 24px 100px", // 100px: 모바일 하단 탭 공간 확보
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>

        {/* 브랜드 */}
        <p style={{
          fontSize: 14, fontWeight: 700,
          fontFamily: "var(--font-serif)", color: "#2A2520",
          marginBottom: 4,
        }}>
          오늘무드
        </p>
        <p style={{
          fontSize: 11, color: "#A89880",
          fontFamily: "var(--font-serif)", marginBottom: 20,
          lineHeight: 1.6,
        }}>
          오늘의 감정을 우걱우걱 갈아드립니다.
        </p>

        {/* 링크 */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: 20, flexWrap: "wrap", marginBottom: 20,
        }}>
          {[
            { href: "/privacy", label: "개인정보처리방침" },
            { href: "/terms",   label: "이용약관" },
            { href: "/contact", label: "문의하기" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontSize: 12, color: "#9A9080",
              textDecoration: "none", fontFamily: "var(--font-serif)",
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* 카피라이트 */}
        <p style={{
          fontSize: 11, color: "#C4BAB0",
          fontFamily: "monospace", letterSpacing: "0.04em",
        }}>
          © 2026 오늘무드. 감정 찌꺼기는 책임 안 짐.
        </p>
      </div>
    </footer>
  );
}
