"use client";

import { useState, RefObject } from "react";
import { toPng } from "html-to-image";

const ROSE = "#C8607A";
const INK  = "#2A2520";
const BG   = "#F5EFE0";
const LINE = "#D8CEC0";
const OG_IMAGE_URL = "https://onulmood.com/opengraph-image";

interface Props {
  cardRef: RefObject<HTMLDivElement | null>;
  shareUrl: string;
  emotions: string[];
  productName?: string;
  onRetry: () => void;
}

export default function ShareButtons({ cardRef, shareUrl, emotions, productName, onRetry }: Props) {
  const [saving, setSaving]   = useState(false);
  const [copied, setCopied]   = useState(false);
  const [imgBlob, setImgBlob] = useState<string | null>(null);

  const fullUrl = typeof window !== "undefined"
    ? `${window.location.origin}${shareUrl}`
    : shareUrl;

  const emotionStr = emotions.slice(0, 2).join("+");

  /* ── 이미지 생성 공통 ── */
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
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: productName
          ? `우걱이가 내 감정을 "${productName}"으로 만들어버림ㅋㅋ`
          : `우걱이가 내 ${emotionStr} 이렇게 갈아버림ㅋㅋ`,
        description: "나는 뭐 나오나 궁하면 해봐. 매번 달라 — 오늘무드",
        imageUrl: OG_IMAGE_URL,
        link: { mobileWebUrl: fullUrl, webUrl: fullUrl },
      },
      buttons: [{
        title: "나도 감정 파쇄하기",
        link: { mobileWebUrl: fullUrl, webUrl: fullUrl },
      }],
    });
  }

  /* ── 트위터/X 공유 ── */
  function handleTwitter() {
    const text = `AI가 내 ${emotionStr} 이렇게 갈아버림ㅋㅋ\n우걱이 처리 완료. 너도 해봐\n#오늘무드 #감정파쇄기`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(tweetUrl, "_blank", "width=600,height=400");
  }

  /* ── 링크 복사 ── */
  async function handleCopy() {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const btnBase: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    height: 48, borderRadius: 3, cursor: "pointer",
    fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700,
    border: "none", transition: "opacity 0.15s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 360 }}>

      {/* 이미지 저장 — 가장 중요 */}
      <button onClick={handleSave} disabled={saving} style={{
        ...btnBase,
        background: INK, color: "#F5EFE0",
        opacity: saving ? 0.7 : 1,
        boxShadow: "3px 3px 0 rgba(42,37,32,0.4)",
      }}>
        {saving ? "생성 중..." : "내 감정 결과지 저장 📥"}
      </button>

      {/* 공유 버튼 2개 — 나란히 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {/* 카카오 */}
        <button onClick={handleKakao} style={{
          ...btnBase, background: "#FEE500", color: "#3C1E1E",
          fontSize: 13,
        }}>
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M9 1.5C4.86 1.5 1.5 4.11 1.5 7.35c0 2.05 1.35 3.85 3.38 4.9l-.86 3.2c-.07.26.22.47.44.31L8.2 13.6c.26.03.53.04.8.04 4.14 0 7.5-2.61 7.5-5.85C16.5 4.11 13.14 1.5 9 1.5z"
              fill="#3C1E1E"/>
          </svg>
          카카오 공유
        </button>
        {/* 트위터/X */}
        <button onClick={handleTwitter} style={{
          ...btnBase, background: INK, color: "#F5EFE0", fontSize: 13,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
          X 공유
        </button>
      </div>

      {/* 링크 복사 + 다시 파쇄 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <button onClick={handleCopy} style={{
          ...btnBase,
          background: copied ? "#D8E4D8" : BG,
          border: `1px solid ${LINE}`,
          color: copied ? "#4A7A5A" : "#5A5248",
          fontSize: 13,
        }}>
          {copied ? "✓ 복사됨" : "🔗 링크 복사"}
        </button>
        <button onClick={onRetry} style={{
          ...btnBase,
          background: `${ROSE}18`,
          border: `1px solid ${ROSE}44`,
          color: ROSE,
          fontSize: 13,
        }}>
          새 감정 던지기
        </button>
      </div>

      {/* 바이럴 힌트 */}
      <div style={{
        padding: "10px 14px",
        background: `${INK}08`,
        border: `1.5px solid ${INK}20`,
        borderRadius: 2,
        textAlign: "center",
      }}>
        <p style={{ fontSize: 13, color: INK, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 4 }}>
          나만 당할 수 없음
        </p>
        <p style={{ fontSize: 11, color: "#7A7260", fontFamily: "var(--font-serif)", lineHeight: 1.7 }}>
          야 너도 해봐ㅋㅋ — 결과 매번 달라<br/>
          <span style={{ fontSize: 10, color: "#A89880" }}>이미지 저장 → 스토리에 박제 ㄱㄱ</span>
        </p>
      </div>
    </div>
  );
}
