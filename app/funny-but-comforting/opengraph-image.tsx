import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0C0B0A", display: "flex", flexDirection: "column", fontFamily: "serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)", display: "flex" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 80px", position: "relative" }}>
        <div style={{ fontSize: 13, color: "#C4874A", fontFamily: "monospace", letterSpacing: 4, marginBottom: 28, display: "flex" }}>MZ 감성 · ONULMOOD</div>
        <div style={{ fontSize: 60, fontWeight: 700, color: "#E8E0D0", lineHeight: 1.35, marginBottom: 28, display: "flex", flexWrap: "wrap", maxWidth: "80%" }}>
          웃긴 콘텐츠인데 왜 위로가 될까?
        </div>
        <div style={{ fontSize: 22, color: "#907A66", lineHeight: 1.7, maxWidth: "70%", display: "flex", flexWrap: "wrap" }}>
          병맛이고 웃긴데, 이상하게 위로가 되는 순간이 있어요.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 80px 40px", borderTop: "1px solid #201E1A", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4874A", display: "flex" }} />
          <div style={{ fontSize: 13, color: "#C4874A", fontFamily: "monospace", letterSpacing: 2, display: "flex" }}>우걱이: 웃기면서 정확한 표현 = 공감 2배</div>
        </div>
        <div style={{ fontSize: 13, color: "#4C4038", fontFamily: "monospace", letterSpacing: 1, display: "flex" }}>onulmood.com</div>
      </div>
    </div>,
    { ...size }
  );
}
