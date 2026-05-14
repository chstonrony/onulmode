import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "오늘무드 소개 | 감정 파쇄기 — 오늘의 감정을 버리는 앱",
  description: "오늘무드는 말 못 한 마음, 짜증, 억울함, 외로움을 감정 파쇄기에 넣고 버리는 감성 웹 서비스입니다. 기록하지 않아도 괜찮아요.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#EDE4D0", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 오늘무드
        </Link>

        {/* 히어로 */}
        <div style={{ margin: "24px 0 48px", padding: "40px 32px", background: "#F5EFE0", borderRadius: 4, border: "1px solid #D8CEC0", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#C8607A", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 16 }}>
            EMOTIONAL DISPOSAL MACHINE
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", lineHeight: 1.3, marginBottom: 16 }}>
            오늘무드
          </h1>
          <p style={{ fontSize: 18, fontFamily: "var(--font-serif)", color: "#5A5248", lineHeight: 1.7 }}>
            오늘의 감정을<br/>
            <strong style={{ color: "#C8607A" }}>여기 넣어 둘게.</strong>
          </p>
        </div>

        {/* 서비스 소개 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 16 }}>
            오늘무드가 뭔가요?
          </h2>
          <p style={{ fontSize: 15, color: "#5A5248", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
            오늘무드는 <strong>감정 일기 앱이 아닙니다.</strong>
            기록하고 분석하는 곳이 아니라, 오늘 쌓인 감정을 그냥
            <strong> 버리는 곳</strong>입니다.
          </p>
          <p style={{ fontSize: 15, color: "#5A5248", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
            말 못 한 마음, 짜증, 억울함, 외로움, 현타, 서운함…
            이 감정들을 감정 파쇄기에 넣으면 조용히 갈아버립니다.
            기록하지 않아도 괜찮아요. 그냥 버려도 돼요.
          </p>
          <p style={{ fontSize: 15, color: "#5A5248", lineHeight: 1.9, fontWeight: 300 }}>
            다 해결된 건 아니어도, 조금은 가벼워질지도.
          </p>
        </section>

        {/* 기능 소개 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 20 }}>
            어떻게 사용하나요?
          </h2>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              {
                step: "01",
                title: "감정 선택",
                desc: "지금 느끼는 감정을 선택하거나 직접 써요. 지쳤어, 서운해, 억울해, 허무해 — 뭐든 괜찮아요.",
              },
              {
                step: "02",
                title: "감정 파쇄기에 넣기",
                desc: "감정 쪽지를 파쇄기 슬롯에 드래그하거나, 버리는 방법을 골라요. 폭파, 태우기, 흘려보내기, 가라앉히기.",
              },
              {
                step: "03",
                title: "파쇄 완료",
                desc: "조용히 갈아버립니다. 오늘 마음 조금 정리 완료. 다 해결된 건 아니어도, 버렸잖아.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{
                display: "flex", gap: 20, padding: "20px 24px",
                background: "#F5EFE0", borderRadius: 4, border: "1px solid #D8CEC0",
              }}>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "#C8607A", fontWeight: 700, flexShrink: 0 }}>
                  {step}
                </span>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 6 }}>{title}</p>
                  <p style={{ fontSize: 14, color: "#7A7260", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 왜 만들었나 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#2A2520", marginBottom: 16 }}>
            왜 만들었나요?
          </h2>
          <p style={{ fontSize: 15, color: "#5A5248", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
            요즘 감성 앱들은 너무 다 깔끔하고, 힐링하고, 미니멀해서 구분이 안 가요.
            오늘무드는 조금 다르게 접근했어요.
          </p>
          <p style={{ fontSize: 15, color: "#5A5248", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
            <strong>감정을 저장하는 게 아니라 처리하는 경험.</strong><br/>
            우울하지 않고, 이상하게 귀여운 감정 배출 공간.
          </p>
          <p style={{ fontSize: 15, color: "#5A5248", lineHeight: 1.9, fontWeight: 300 }}>
            열면 바로 "아 나 지금 이거 필요했어"가 되는 앱을 만들고 싶었어요.
          </p>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#C8607A", color: "#F5EFE0",
            padding: "14px 32px", borderRadius: 4,
            fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 18px rgba(200,96,122,0.4)",
          }}>
            감정 버리러 가기 →
          </Link>
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: "1px solid #D8CEC0", paddingTop: 24, marginTop: 48 }}>
          <p style={{ fontSize: 12, color: "#A89880", textAlign: "center" }}>
            © 2026 오늘무드. All rights reserved.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
            <Link href="/" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>홈</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/archive" style={{ fontSize: 12, color: "#A89880", textDecoration: "none" }}>기록장</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
