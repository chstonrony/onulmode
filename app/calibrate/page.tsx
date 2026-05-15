"use client";

import { useState, useRef } from "react";

interface Dot { x: number; y: number; label: string; id: number }

const EMOTIONS = [
  "지쳤어", "짜증나", "서운해", "답답해", "억울해", "불안해",
  "허무해", "무기력해", "외로워", "슬퍼", "화났어", "귀찮아",
  "막막해", "질렸어", "후회돼", "모르겠어",
];

export default function CalibratePage() {
  const videoRef    = useRef<HTMLDivElement>(null);
  const [dots, setDots]   = useState<Dot[]>([]);
  const [next, setNext]   = useState(0);   // 다음에 찍을 감정 인덱스
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width)  * 100);
    const y = Math.round(((e.clientY - rect.top)  / rect.height) * 100);
    const label = EMOTIONS[next % EMOTIONS.length];
    setDots(prev => [...prev, { x, y, label, id: Date.now() }]);
    setNext(n => n + 1);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    setHover({
      x: Math.round(((e.clientX - rect.left) / rect.width)  * 100),
      y: Math.round(((e.clientY - rect.top)  / rect.height) * 100),
    });
  }

  function removeLast() {
    setDots(p => p.slice(0, -1));
    setNext(n => Math.max(0, n - 1));
  }

  function copyCode() {
    const code = dots.map(d =>
      `  { k: "${d.label}", label: t.emotions["${d.label}"], x: "${d.x}%", y: "${d.y}%", size: 14 },`
    ).join("\n");
    navigator.clipboard.writeText(code);
    alert("클립보드에 복사됨!");
  }

  const currentEmotion = EMOTIONS[next % EMOTIONS.length];

  return (
    <div style={{ background: "#1a1612", minHeight: "100vh", padding: "24px", color: "#F5EFE0", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: 18, marginBottom: 8, color: "#C8607A" }}>📍 핫스팟 좌표 캘리브레이션</h1>
      <p style={{ fontSize: 12, color: "#8A8070", marginBottom: 16 }}>
        영상 위 텍스트 위치를 클릭하세요. 순서대로 감정 단어가 배정됩니다.
      </p>

      {/* 안내 */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ background: "#C8607A", color: "#fff", padding: "4px 14px", borderRadius: 4, fontSize: 13, fontWeight: 700 }}>
          다음: {currentEmotion}
        </div>
        <span style={{ fontSize: 11, color: "#6A6258" }}>({next}/{EMOTIONS.length} 완료)</span>
        <button onClick={removeLast} style={{ marginLeft: "auto", background: "#2A2218", border: "1px solid #4A4238", color: "#8A8070", padding: "4px 10px", borderRadius: 3, cursor: "pointer", fontSize: 11 }}>
          ← 되돌리기
        </button>
        <button onClick={() => { setDots([]); setNext(0); }} style={{ background: "#2A2218", border: "1px solid #4A4238", color: "#8A8070", padding: "4px 10px", borderRadius: 3, cursor: "pointer", fontSize: 11 }}>
          전체 초기화
        </button>
      </div>

      {/* 영상 + 클릭 영역 */}
      <div
        ref={videoRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
        style={{ position: "relative", width: "min(92vw, 520px)", cursor: "crosshair", borderRadius: 14, overflow: "hidden", border: "2px solid #3A3228" }}
      >
        <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
          <source src="/videos/shredder-desktop.mp4" type="video/mp4" />
        </video>

        {/* 찍힌 점들 */}
        {dots.map(d => (
          <div key={d.id} style={{
            position: "absolute",
            left: `${d.x}%`, top: `${d.y}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#C8607A", border: "2px solid #fff", boxShadow: "0 0 6px #C8607A" }} />
            <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(200,96,122,0.9)", color: "#fff", fontSize: 10, padding: "1px 5px", borderRadius: 2, whiteSpace: "nowrap" }}>
              {d.label} ({d.x},{d.y})
            </div>
          </div>
        ))}

        {/* 마우스 커서 좌표 */}
        {hover && (
          <div style={{
            position: "absolute", right: 8, bottom: 8,
            background: "rgba(0,0,0,0.75)", color: "#C8607A",
            fontSize: 11, padding: "3px 8px", borderRadius: 3, pointerEvents: "none",
          }}>
            x:{hover.x}% y:{hover.y}%
          </div>
        )}
      </div>

      {/* 찍힌 목록 */}
      {dots.length > 0 && (
        <div style={{ marginTop: 20, background: "#0E0C0A", border: "1px solid #3A3228", borderRadius: 6, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: "#8A8070" }}>찍힌 좌표 ({dots.length}개)</span>
            <button onClick={copyCode} style={{ background: "#C8607A", color: "#fff", border: "none", padding: "5px 14px", borderRadius: 3, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              코드 복사
            </button>
          </div>
          <pre style={{ fontSize: 11, color: "#D0C0A8", overflowX: "auto", margin: 0, lineHeight: 1.8 }}>
            {dots.map(d =>
              `{ k: "${d.label}", x: "${d.x}%", y: "${d.y}%" }`
            ).join("\n")}
          </pre>
        </div>
      )}

      {dots.length === EMOTIONS.length && (
        <div style={{ marginTop: 14, padding: "12px 16px", background: "#1E3A28", border: "1px solid #2A5A38", borderRadius: 6 }}>
          <p style={{ fontSize: 12, color: "#6ABF80" }}>✓ 16개 모두 완료! "코드 복사" 눌러서 결과물을 나한테 전달해줘.</p>
        </div>
      )}
    </div>
  );
}
