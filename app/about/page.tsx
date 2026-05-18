import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "우걱이 사용설명서 | 오늘무드",
  description: "우걱이는 감정을 처리하기 위해 만들어진 임시 감정 파쇄 장치입니다. 정확히 왜 먹는지는 아직 밝혀지지 않았습니다.",
};

const INK   = "#2A2520";
const ROSE  = "#C8607A";
const BG    = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const MUTED = "#A89880";

export default function AboutPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 22px 100px" }}>

        <Link href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          ← 오늘무드
        </Link>

        {/* ── 상단 헤더 — 오래된 매뉴얼 표지 ── */}
        <div style={{ margin: "24px 0 32px", position: "relative" }}>
          {/* 테이프 */}
          <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%) rotate(-1deg)", width: 80, height: 18, background: "rgba(212,188,144,0.55)", zIndex: 2 }}/>

          <div style={{
            background: PAPER,
            border: `2.5px solid ${INK}`,
            boxShadow: `6px 6px 0 ${INK}`,
            padding: "32px 28px 28px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* 줄 노트 배경 */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(transparent,transparent 28px,rgba(180,170,150,0.12) 28px,rgba(180,170,150,0.12) 29px)", backgroundPosition: "0 44px", pointerEvents: "none" }}/>

            <p style={{ fontSize: 8, fontFamily: "monospace", color: ROSE, letterSpacing: "0.18em", marginBottom: 10 }}>
              UGEGI EMOTIONAL DISPOSAL CO. — MANUAL v0.0.3
            </p>
            <h1 style={{ fontSize: 30, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.3, marginBottom: 6 }}>
              우걱이 사용설명서
            </h1>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-en)", fontStyle: "italic", marginBottom: 20 }}>
              temporary emotional release machine manual
            </p>

            {/* 경고 스티커 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", background: `${ROSE}10`, border: `1.5px solid ${ROSE}40` }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
                <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.7 }}>
                  우걱이는 오늘도 감정을 먹고 있습니다.<br/>
                  <span style={{ color: "#7A7260" }}>정확히 왜 먹는지는 아직 밝혀지지 않았습니다.</span>
                </p>
              </div>
            </div>

            {/* 일련번호 */}
            <p style={{ fontSize: 8, fontFamily: "monospace", color: LINE, marginTop: 16, letterSpacing: "0.1em" }}>
              DOC-EMO-2026-0518 · 감정 처리 장치 공식 안내서
            </p>
          </div>
        </div>

        {/* ── SECTION 1 ── */}
        <ManualSection num="01" title="우걱이는 무엇인가요?" color="#C8607A">
          <p>우걱이는 감정을 처리하기 위해 만들어진 <strong>임시 감정 파쇄 장치</strong>입니다.</p>
          <p style={{ marginTop: 8, color: "#7A7260" }}>
            언제부터 존재했는지는 알 수 없지만,<br/>
            새벽 2시 이후 활동량이 급격히 증가하며,<br/>
            특히 <strong style={{ color: ROSE }}>"괜찮은 척한 감정"</strong>을 잘 먹는 것으로 알려져 있습니다.
          </p>

          <div style={{ marginTop: 16, padding: "14px 16px", background: "#FAF8F2", border: `1px dashed ${LINE}`, borderRadius: 2 }}>
            <p style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, letterSpacing: "0.12em", marginBottom: 8 }}>
              현재까지 확인된 먹이
            </p>
            {["서운함", "애매한 후회", "답장 없는 카톡", "혼자 삭힌 감정", "이유 없이 울컥한 밤", "사회생활 가능한 척"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 5, color: "#5A5248" }}>
                <span style={{ color: ROSE, flexShrink: 0 }}>—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, padding: "10px 14px", background: `${INK}06`, border: `1px solid ${LINE}` }}>
            <p style={{ fontSize: 11, fontFamily: "monospace", color: "#7A7260", lineHeight: 1.7 }}>
              ※ 우걱이는 완벽한 해결을 제공하지 않습니다.<br/>
              다만 잠시 숨 쉴 공간 정도는 만들어줍니다.
            </p>
          </div>
        </ManualSection>

        {/* ── SECTION 2 ── */}
        <ManualSection num="02" title="감정은 왜 파쇄하나요?" color="#7878B0">
          <p>사람들은 종종 감정을 처리하지 못한 채<br/>마음 구석에 임시 저장해둡니다.</p>
          <p style={{ marginTop: 10, color: "#7A7260" }}>
            우걱이는 그 감정들을 잠시 대신 씹어주기 위해 존재합니다.
          </p>
          <p style={{ marginTop: 10, color: "#7A7260" }}>
            파쇄된 감정은 대부분 복구되지 않으며,<br/>
            일부 감정은 이상한 모양으로 변형되어 돌아올 수 있습니다.
          </p>
          <div style={{ marginTop: 14, padding: "12px 16px", background: `${ROSE}10`, border: `1.5px solid ${ROSE}30`, borderLeft: `3px solid ${ROSE}` }}>
            <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.8, fontStyle: "italic" }}>
              "하지만 이상하게도,<br/>조금은 가벼워졌다는 후기가 계속 발견되고 있습니다."
            </p>
          </div>
        </ManualSection>

        {/* ── SECTION 3 ── */}
        <ManualSection num="03" title="파쇄 과정 안내" color="#5A8FA8">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["1", "감정을 꺼냅니다."],
              ["2", "괜찮은 척을 멈춥니다."],
              ["3", "우걱이에게 감정을 던집니다."],
              ["4", "이상한 소리가 납니다."],
              ["5", "조금 멍해집니다."],
              ["6", "가끔은 웃깁니다."],
            ].map(([n, t]) => (
              <div key={n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{
                  fontSize: 9, fontFamily: "monospace", color: "#FAF8F2",
                  background: INK, padding: "2px 7px", flexShrink: 0, letterSpacing: "0.06em",
                }}>
                  {n}
                </span>
                <span style={{ fontSize: 14, color: "#3A3228", lineHeight: 1.7 }}>{t}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 10, fontFamily: "monospace", color: MUTED, marginTop: 14, letterSpacing: "0.08em" }}>
            ※ 개인차가 존재합니다.
          </p>
        </ManualSection>

        {/* ── SECTION 4 — 주의사항 ── */}
        <ManualSection num="04" title="주의사항" color="#B07840">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "우걱이는 새벽 시간대에 과하게 활성화될 수 있습니다.",
              "감정을 너무 오래 참은 경우 파쇄 시간이 증가할 수 있습니다.",
              "\"아무렇지 않다\"를 반복 입력할 경우 기계가 조용히 째려볼 수 있습니다.",
              "우걱이는 감정을 먹지만 인생까지 해결하진 못합니다.",
              "그러나 이상하게 다시 들어오게 된다는 보고가 많습니다.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "#5A5248", lineHeight: 1.7 }}>
                <span style={{ color: ROSE, flexShrink: 0, fontFamily: "monospace" }}>—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </ManualSection>

        {/* ── SECTION 5 — 오늘무드 소개 ── */}
        <ManualSection num="05" title="오늘무드 소개" color="#6A9870">
          <p style={{ lineHeight: 1.9, color: "#5A5248" }}>
            오늘무드는 감정을 완벽하게 해결하기보다,<br/>
            잠시 내려놓을 수 있는 공간을 만들기 위해 시작되었습니다.
          </p>
          <div style={{ margin: "18px 0", padding: "18px 20px", background: "#FAF8F2", border: `1.5px solid ${LINE}`, borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", top: -8, left: 16, background: "#FAF8F2", padding: "0 8px" }}>
              <span style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, letterSpacing: "0.1em" }}>SHARON'S NOTE</span>
            </div>
            <p style={{ fontSize: 14, fontFamily: "var(--font-serif)", color: "#5A5248", lineHeight: 2, fontStyle: "italic" }}>
              웃기려고 만들었는데,<br/>
              가끔은 위로가 되었고,<br/>
              가볍게 만들었는데,<br/>
              생각보다 진심이 남았습니다.
            </p>
          </div>
          <p style={{ fontSize: 15, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, lineHeight: 1.9 }}>
            오늘의 감정을 너무 오래 들고 있지 마세요.
          </p>
          <p style={{ marginTop: 8, color: "#7A7260", lineHeight: 1.9 }}>
            필요하면,<br/>
            우걱이가 잠시 대신 씹어드립니다.
          </p>
        </ManualSection>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", padding: "36px 0 8px", position: "relative" }}>
          <div style={{
            display: "inline-block",
            border: `2.5px solid ${ROSE}`,
            padding: "10px 28px",
            color: ROSE,
            fontSize: 16,
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            opacity: 0.75,
            marginBottom: 28,
            transform: "rotate(-2deg)",
          }}>
            빠각 완료 ✓
          </div>
          <div>
            <Link href="/release" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: INK, color: "#F5EFE0",
              padding: "16px 36px",
              border: `2px solid ${INK}`,
              fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700,
              textDecoration: "none",
              boxShadow: `5px 5px 0 ${INK}80`,
              letterSpacing: "0.02em",
            }}>
              감정 던지러 가기 →
            </Link>
          </div>
          <p style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", marginTop: 14 }}>
            (우걱이 지금 배고픔 MAX 상태임)
          </p>
        </div>

        {/* ── 하단 문구 ── */}
        <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 28, marginTop: 16, textAlign: "center" }}>
          <p style={{ fontSize: 18, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, marginBottom: 6 }}>
            "지금 이 감정이야."
          </p>
          <p style={{ fontSize: 11, fontFamily: "var(--font-en)", fontStyle: "italic", color: MUTED, letterSpacing: "0.06em", marginBottom: 24 }}>
            temporary emotional release space
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            <Link href="/" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>우걱이</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/contact" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>문의</Link>
          </div>
          <p style={{ fontSize: 10, color: LINE, fontFamily: "monospace", marginTop: 16, letterSpacing: "0.06em" }}>
            © 2026 오늘무드 / 우걱이 처리소
          </p>
        </div>

      </div>
    </div>
  );
}

function ManualSection({ num, title, color, children }: {
  num: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      marginBottom: 10,
      padding: "22px 24px 24px",
      background: PAPER,
      border: `1.5px solid ${LINE}`,
      borderLeft: `3px solid ${color}`,
      position: "relative",
    }}>
      {/* 섹션 번호 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 8, fontFamily: "monospace", color, letterSpacing: "0.14em" }}>
          SECTION {num}
        </span>
        <div style={{ flex: 1, height: 1, background: LINE }} />
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, marginBottom: 14, lineHeight: 1.4 }}>
        {title}
      </h2>
      <div style={{ fontSize: 14, color: "#3A3228", lineHeight: 1.85, fontFamily: "var(--font-serif)" }}>
        {children}
      </div>
    </div>
  );
}
