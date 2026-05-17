import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "오늘무드 | 감정 파쇄기 — 감정 지금 버려봐";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#efe3cf",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "serif",
      }}
    >
      {/* 코너 라벨 */}
      <div style={{ position: "absolute", top: 36, left: 52, fontSize: 11, color: "#9A8E80", letterSpacing: 4, display: "flex" }}>
        UGEGI EMOTIONAL DISPOSAL CO. v0.0.3
      </div>
      <div style={{ position: "absolute", top: 36, right: 52, fontSize: 11, color: "#9A8E80", letterSpacing: 2, display: "flex" }}>
        우걱이 처리소
      </div>

      {/* 배경 낙서선 */}
      <div style={{ position: "absolute", bottom: 110, left: 52, fontSize: 10, color: "#C8B898", display: "flex", opacity: 0.6 }}>
        ⚠ 감정 과식 주의 ⚠
      </div>
      <div style={{ position: "absolute", top: 120, right: 60, fontSize: 10, color: "#C8B898", display: "flex", opacity: 0.5 }}>
        소화 안 될 수 있음
      </div>

      {/* 메인 카드 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#F5EFE0",
          border: "3.5px solid #2A2520",
          padding: "48px 96px 52px",
          boxShadow: "12px 12px 0 #2A2520",
          position: "relative",
        }}
      >
        {/* 테이프 */}
        <div style={{ position: "absolute", top: -14, left: "50%", width: 64, height: 16, background: "rgba(212,188,144,0.6)", borderRadius: 2, display: "flex", marginLeft: -32 }} />

        {/* 우걱이 눈 */}
        <div style={{ display: "flex", gap: 28, marginBottom: 20 }}>
          <div style={{ width: 68, height: 76, borderRadius: "44% 50% 50% 50%", background: "#FAF4E0", border: "5px solid #1A1410", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#C8607A", marginLeft: -8, marginTop: 6, display: "flex" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "white", marginTop: 4, marginLeft: 6, display: "flex" }} />
            </div>
          </div>
          <div style={{ width: 76, height: 70, borderRadius: "50% 46% 50% 46%", background: "#FBF6E6", border: "5px solid #1A1410", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 40, height: 38, borderRadius: "48% 52% 50% 50%", background: "#C8607A", marginLeft: 10, display: "flex" }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "white", marginTop: 6, marginLeft: 8, display: "flex" }} />
            </div>
          </div>
        </div>

        {/* 레이블 */}
        <div style={{ fontSize: 13, color: "#C8607A", letterSpacing: 6, marginBottom: 18, display: "flex" }}>
          EMOTIONAL DISPOSAL MACHINE
        </div>

        {/* 타이틀 */}
        <div style={{ fontSize: 90, fontWeight: 900, color: "#2A2520", lineHeight: 1, textAlign: "center", marginBottom: 14, display: "flex" }}>
          오늘무드
        </div>

        {/* 서브타이틀 */}
        <div style={{ fontSize: 34, color: "#5A5248", textAlign: "center", display: "flex", marginBottom: 24 }}>
          감정 파쇄기
        </div>

        {/* 감정 칩들 */}
        <div style={{ display: "flex", gap: 12 }}>
          {["지쳤어", "짜증나", "허무해", "억울해", "불안해"].map((e, i) => (
            <div key={e} style={{
              background: ["#F0E0DC","#F0D8D4","#D8E8DC","#E4DCED","#E8D8EE"][i],
              color: ["#B87878","#C06858","#6898A0","#8878B0","#9068A8"][i],
              padding: "8px 16px",
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 2,
              display: "flex",
            }}>
              {e}
            </div>
          ))}
        </div>

        {/* 태그라인 */}
        <div style={{ fontSize: 18, color: "#8A8070", marginTop: 20, display: "flex", letterSpacing: 1 }}>
          클릭하면 우걱이가 씹어먹음 →
        </div>
      </div>

      {/* 도장 */}
      <div style={{
        position: "absolute",
        bottom: 70,
        right: 90,
        fontSize: 18,
        color: "#C8607A",
        border: "3px solid #C8607A",
        padding: "10px 22px",
        display: "flex",
        opacity: 0.82,
        letterSpacing: 2,
      }}>
        빠각 완료 OK
      </div>

      {/* URL */}
      <div style={{ position: "absolute", bottom: 36, left: 52, fontSize: 13, color: "#B4A890", display: "flex" }}>
        onulmood.com
      </div>

      {/* 일련번호 */}
      <div style={{ position: "absolute", bottom: 36, right: 52, fontSize: 11, color: "#C8B898", fontFamily: "monospace", display: "flex" }}>
        EMO-0000-BAGAK
      </div>
    </div>
  );
}
