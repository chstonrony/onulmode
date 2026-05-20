import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#151210", display: "flex", flexDirection: "column", fontFamily: "serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)", display: "flex" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 80px", position: "relative" }}>
        <div style={{ fontSize: 13, color: "#C8607A", fontFamily: "monospace", letterSpacing: 4, marginBottom: 28, display: "flex" }}>감정 이야기 · ONULMOOD</div>
        <div style={{ fontSize: 60, fontWeight: 700, color: "#EDE4D0", lineHeight: 1.35, marginBottom: 28, display: "flex", flexWrap: "wrap", maxWidth: "80%" }}>
          왜 사람은 괜찮은 척할수록 더 지칠까?
        </div>
        <div style={{ fontSize: 22, color: "#A89880", lineHeight: 1.7, maxWidth: "70%", display: "flex", flexWrap: "wrap" }}>
          아무 일 없는 척하는 데에도 생각보다 많은 에너지가 들어갑니다.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 80px 40px", borderTop: "1px solid #2C2622", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8607A", display: "flex" }} />
          <div style={{ fontSize: 13, color: "#C8607A", fontFamily: "monospace", letterSpacing: 2, display: "flex" }}>우걱이: 참은 감정 오래 두면 눅눅해짐</div>
        </div>
        <div style={{ fontSize: 13, color: "#4A4438", fontFamily: "monospace", letterSpacing: 1, display: "flex" }}>onulmood.com</div>
      </div>
    </div>,
    { ...size }
  );
}
