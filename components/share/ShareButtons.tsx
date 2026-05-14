"use client";

import { useState, RefObject } from "react";
import { toPng } from "html-to-image";

const ROSE = "#C8607A";
const INK  = "#2A2520";
const BG   = "#F5EFE0";
const LINE = "#D8CEC0";

interface Props {
  cardRef: RefObject<HTMLDivElement | null>;
  shareUrl: string;
  emotions: string[];
  onRetry: () => void;
}

export default function ShareButtons({ cardRef, shareUrl, emotions, onRetry }: Props) {
  const [saving, setSaving]   = useState(false);
  const [copied, setCopied]   = useState(false);
  const [imgBlob, setImgBlob] = useState<string | null>(null);

  /* ── 이미지 생성 공통 함수 ── */
  async function getImageBlob(): Promise<string> {
    if (imgBlob) return imgBlob;
    if (!cardRef.current) throw new Error("card not ready");
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
    setImgBlob(dataUrl);
    return dataUrl;
  }

  /* ── 이미지 저장 ── */
  async function handleSave() {
    setSaving(true);
    try {
      const dataUrl = await getImageBlob();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `오늘무드_파쇄결과_${Date.now()}.png`;
      a.click();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  }

  /* ── 카카오톡 공유 ── */
  function handleKakao() {
    const kakao = (window as any).Kakao;
    if (!kakao?.isInitialized?.()) {
      alert("카카오 SDK가 준비되지 않았어요. 링크 복사를 이용해주세요.");
      return;
    }
    const fullUrl = typeof window !== "undefined"
      ? `${window.location.origin}${shareUrl}`
      : shareUrl;

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `AI가 내 감정(${emotions.slice(0,2).join(", ")})을 이렇게 찌그러뜨림ㅋㅋ`,
        description: "너도 오늘 감정 파쇄해봐 — 오늘무드",
        imageUrl: "https://onulmode.vercel.app/og-image.png",
        link: { mobileWebUrl: fullUrl, webUrl: fullUrl },
      },
      buttons: [{
        title: "감정 파쇄하러 가기",
        link: { mobileWebUrl: fullUrl, webUrl: fullUrl },
      }],
    });
  }

  /* ── 링크 복사 ── */
  async function handleCopy() {
    const full = typeof window !== "undefined"
      ? `${window.location.origin}${shareUrl}`
      : shareUrl;
    await navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const btnBase: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    height: 48, borderRadius: 4, cursor: "pointer",
    fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700,
    border: "none", transition: "opacity 0.15s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 360 }}>

      {/* 이미지 저장 */}
      <button onClick={handleSave} disabled={saving} style={{
        ...btnBase, background: INK, color: "#F5EFE0",
        opacity: saving ? 0.7 : 1,
      }}>
        {saving ? "저장 중..." : "📥 이미지 저장"}
      </button>

      {/* 카카오톡 공유 */}
      <button onClick={handleKakao} style={{
        ...btnBase, background: "#FEE500", color: "#3C1E1E",
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M9 1.5C4.86 1.5 1.5 4.11 1.5 7.35c0 2.05 1.35 3.85 3.38 4.9l-.86 3.2c-.07.26.22.47.44.31L8.2 13.6c.26.03.53.04.8.04 4.14 0 7.5-2.61 7.5-5.85C16.5 4.11 13.14 1.5 9 1.5z"
            fill="#3C1E1E"/>
        </svg>
        카카오톡으로 공유
      </button>

      {/* 링크 복사 + 다시 파쇄 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <button onClick={handleCopy} style={{
          ...btnBase, background: copied ? "#D8E4D8" : BG,
          border: `1px solid ${LINE}`, color: copied ? "#4A7A5A" : "#5A5248",
          fontSize: 13,
        }}>
          {copied ? "✓ 복사됨" : "🔗 링크 복사"}
        </button>
        <button onClick={onRetry} style={{
          ...btnBase, background: `${ROSE}18`,
          border: `1px solid ${ROSE}44`, color: ROSE, fontSize: 13,
        }}>
          다시 파쇄하기
        </button>
      </div>

      {/* 공유 문구 힌트 */}
      <div style={{
        padding: "10px 14px", background: `${INK}06`,
        border: `1px dashed ${LINE}`, borderRadius: 4, textAlign: "center",
      }}>
        <p style={{ fontSize: 12, color: "#7A7260", fontFamily: "var(--font-serif)", lineHeight: 1.7 }}>
          &ldquo;AI가 내 기분 이렇게 찌그러뜨림ㅋㅋ<br/>
          너도 오늘 감정 파쇄해봐&rdquo;
        </p>
      </div>
    </div>
  );
}
