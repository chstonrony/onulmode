import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0C0B09", display: "flex", flexDirection: "column", fontFamily: "serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)", display: "flex" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 80px", position: "relative" }}>
        <div style={{ fontSize: 13, color: "#C8607A", fontFamily: "monospace", letterSpacing: 4, marginBottom: 28, display: "flex" }}>감정 이야기 · ONULMOOD</div>
        <div style={{ fontSize: 60, fontWeight: 700, color: "#E5DDD0", lineHeight: 1.35, marginBottom: 28, display: "flex", flexWrap: "wrap", maxWidth: "80%" }}>
          혼자 삭힌 감정은 어디로 갈까?
        </div>
        <div style={{ fontSize: 22, color: "#8C7D6A", lineHeight: 1.7, maxWidth: "70%", display: "flex", flexWrap: "wrap" }}>
          말 못 하고 삭힌 감정들, 사실 어디로 가는 게 아니에요.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 80px 40px", borderTop: "1px solid #1E1C18", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8607A", display: "flex" }} />
          <div style={{ fontSize: 13, color: "#C8607A", fontFamily: "monospace", letterSpacing: 2, display: "flex" }}>우걱이: 안 버린 감정은 새벽에 다시 튀어나옴</div>
        </div>
        <div style={{ fontSize: 13, color: "#4A4438", fontFamily: "monospace", letterSpacing: 1, display: "flex" }}>onulmood.com</div>
      </div>
    </div>,
    { ...size }
  );
}
