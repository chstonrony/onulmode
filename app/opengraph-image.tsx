import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "오늘무드 | 감정 파쇄기 — 감정 지금 버려봐";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%", height: "100%",
        background: "#1A1410",
        display: "flex", position: "relative",
        fontFamily: "serif",
        overflow: "hidden",
      }}
    >
      {/* 베이지 왼쪽 패널 */}
      <div style={{
        width: "52%", height: "100%",
        background: "#efe3cf",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "0 0 0 64px",
        position: "relative",
      }}>
        {/* 상단 라벨 */}
        <div style={{ position: "absolute", top: 40, left: 64, fontSize: 10, color: "#9A8E80", letterSpacing: 4, display: "flex" }}>
          UGEGI DISPOSAL CO. v0.0.3
        </div>

        {/* 우걱이 눈 */}
        <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
          <div style={{ width: 72, height: 80, borderRadius: "44% 50% 50% 50%", background: "#FAF4E0", border: "5px solid #1A1410", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-6deg)" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#C8607A", marginLeft: -10, marginTop: 8, display: "flex" }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "white", marginTop: 5, marginLeft: 7, display: "flex" }} />
            </div>
          </div>
          <div style={{ width: 80, height: 74, borderRadius: "50% 46% 50% 46%", background: "#FBF6E6", border: "5px solid #1A1410", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(4deg)" }}>
            <div style={{ width: 44, height: 40, borderRadius: "48% 52% 50% 50%", background: "#C8607A", marginLeft: 12, display: "flex" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "white", marginTop: 7, marginLeft: 9, display: "flex" }} />
            </div>
          </div>
        </div>

        {/* 메인 타이틀 */}
        <div style={{ fontSize: 80, fontWeight: 900, color: "#1A1410", lineHeight: 1, marginBottom: 12, display: "flex" }}>
          오늘무드
        </div>

        {/* 서브 */}
        <div style={{ fontSize: 24, color: "#C8607A", letterSpacing: 4, marginBottom: 22, display: "flex", fontWeight: 700 }}>
          감정 파쇄기
        </div>

        {/* 감정 칩 3개 */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {[
            { t: "지쳤어", bg: "#F0E0DC", c: "#B07878" },
            { t: "짜증나", bg: "#F0D8D4", c: "#C06858" },
            { t: "허무해", bg: "#D8E8DC", c: "#6898A0" },
          ].map((e) => (
            <div key={e.t} style={{ background: e.bg, color: e.c, padding: "8px 18px", fontSize: 17, fontWeight: 700, borderRadius: 2, display: "flex", border: "1.5px solid rgba(0,0,0,0.1)" }}>
              {e.t}
            </div>
          ))}
        </div>

        {/* 태그라인 */}
        <div style={{ fontSize: 15, color: "#7A7060", letterSpacing: 1, display: "flex" }}>
          클릭하면 우걱이가 씹어먹음 →
        </div>

        {/* 하단 URL */}
        <div style={{ position: "absolute", bottom: 40, left: 64, fontSize: 12, color: "#B4A890", display: "flex" }}>
          onulmood.com
        </div>
      </div>

      {/* 구분선 */}
      <div style={{ width: 4, height: "100%", background: "#1A1410", display: "flex" }} />

      {/* 검은 오른쪽 패널 */}
      <div style={{
        flex: 1, height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "0 52px",
        position: "relative",
      }}>
        {/* 코너 상태 */}
        <div style={{ position: "absolute", top: 40, right: 40, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8607A", display: "flex" }} />
          <div style={{ fontSize: 10, color: "#5A5248", fontFamily: "monospace", letterSpacing: 2, display: "flex" }}>LIVE</div>
        </div>

        {/* 메인 문구 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div style={{ fontSize: 18, color: "#5A5248", fontFamily: "monospace", letterSpacing: 3, marginBottom: 18, display: "flex" }}>
            처리 중인 감정
          </div>

          {/* 빨간 경고박스 */}
          <div style={{
            border: "2px solid #C8607A", padding: "22px 36px",
            display: "flex", flexDirection: "column", alignItems: "center",
            marginBottom: 28, position: "relative",
          }}>
            <div style={{ position: "absolute", top: -11, left: "50%", background: "#1A1410", padding: "0 12px", display: "flex", marginLeft: -50 }}>
              <span style={{ fontSize: 10, color: "#C8607A", fontFamily: "monospace", letterSpacing: 3, display: "flex" }}>WARNING</span>
            </div>
            <div style={{ fontSize: 52, color: "#FAF8F2", fontWeight: 900, lineHeight: 1, display: "flex" }}>감정</div>
            <div style={{ fontSize: 52, color: "#C8607A", fontWeight: 900, lineHeight: 1, display: "flex" }}>폐기중</div>
          </div>

          {/* 리스트 */}
          {[
            "말 못 한 것들",
            "억울함 묵은 거",
            "오늘 하루 전부",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, width: "100%" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8607A", flexShrink: 0, display: "flex" }} />
              <div style={{ fontSize: 16, color: "#8A8070", display: "flex", letterSpacing: 1 }}>{t}</div>
              <div style={{ flex: 1, height: 1, background: "#2A2520", display: "flex" }} />
              <div style={{ fontSize: 11, color: "#3A3028", fontFamily: "monospace", display: "flex" }}>투입 가능</div>
            </div>
          ))}
        </div>

        {/* 도장 */}
        <div style={{
          position: "absolute", bottom: 60, right: 48,
          border: "3px solid #C8607A", padding: "10px 20px",
          display: "flex", opacity: 0.75, transform: "rotate(-8deg)",
        }}>
          <span style={{ fontSize: 16, color: "#C8607A", letterSpacing: 3, display: "flex" }}>빠각 완료</span>
        </div>

        {/* 일련번호 */}
        <div style={{ position: "absolute", bottom: 40, left: 40, fontSize: 10, color: "#3A3028", fontFamily: "monospace", display: "flex", letterSpacing: 2 }}>
          EMO-{new Date().getFullYear()}-BAGAK
        </div>
      </div>
    </div>
  );
}
