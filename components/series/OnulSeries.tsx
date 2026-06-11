import Link from "next/link";

const SERIES = [
  {
    name: "오늘무드",
    domain: "onulmood.com",
    href: "https://onulmood.com",
    tag: "감정",
    desc: "오늘 감정, 우걱이한테 던져버리기",
    color: "#C8607A",
    bg: "#F5EFE0",
    current: true,
  },
  {
    name: "오늘눈치",
    domain: "onulnunchi.com",
    href: "https://onulnunchi.com",
    tag: "분위기",
    desc: "오늘 분위기, 진짜 괜찮은 거 맞아?",
    color: "#5A8FA8",
    bg: "#EAF2F7",
    current: false,
  },
  {
    name: "오늘핏",
    domain: "coming soon",
    href: "#",
    tag: "스타일",
    desc: "오늘 뭐 입지? 기분으로 정하는 오늘의 핏",
    color: "#A8845A",
    bg: "#F5EFE4",
    current: false,
    soon: true,
  },
];

interface OnulSeriesProps {
  /** 현재 서비스명을 숨길지 여부 (기본 false — 모두 표시) */
  hideCurrentBadge?: boolean;
  style?: React.CSSProperties;
}

export default function OnulSeries({ hideCurrentBadge = false, style }: OnulSeriesProps) {
  return (
    <div style={{
      padding: "28px 0",
      ...style,
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 16 }}>
        <p style={{
          fontSize: 10, color: "#A89880",
          fontFamily: "monospace", letterSpacing: "0.14em",
          marginBottom: 4,
        }}>
          ONEUL SERIES
        </p>
        <p style={{
          fontSize: 13, color: "#5A5248",
          fontFamily: "var(--font-serif)", fontWeight: 300,
          lineHeight: 1.6,
        }}>
          하루를 처음부터 끝까지, 같이.
        </p>
      </div>

      {/* 서비스 카드들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SERIES.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            target={s.current ? "_self" : "_blank"}
            rel={s.current ? undefined : "noopener noreferrer"}
            style={{ textDecoration: "none", pointerEvents: s.soon ? "none" : "auto" }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 16px",
              background: s.current ? s.bg : "#F5EFE0",
              border: `1px solid ${s.current ? s.color + "40" : "#D8CEC0"}`,
              borderLeft: `3px solid ${s.color}`,
              borderRadius: "0 4px 4px 0",
              opacity: s.soon ? 0.55 : 1,
              transition: "opacity 0.15s",
            }}>
              {/* 태그 */}
              <span style={{
                fontSize: 9, padding: "2px 7px",
                background: `${s.color}18`, color: s.color,
                border: `1px solid ${s.color}30`,
                borderRadius: 10,
                fontFamily: "monospace", letterSpacing: "0.06em",
                flexShrink: 0,
              }}>
                {s.tag}
              </span>

              {/* 이름 + 설명 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{
                    fontSize: 14, fontWeight: 700,
                    fontFamily: "var(--font-serif)",
                    color: "#2A2520",
                  }}>
                    {s.name}
                  </span>
                  {!hideCurrentBadge && s.current && (
                    <span style={{
                      fontSize: 9, color: s.color,
                      fontFamily: "monospace", letterSpacing: "0.06em",
                    }}>
                      ← 지금 여기
                    </span>
                  )}
                  {s.soon && (
                    <span style={{
                      fontSize: 9, color: "#A89880",
                      fontFamily: "monospace", letterSpacing: "0.06em",
                    }}>
                      COMING SOON
                    </span>
                  )}
                </div>
                <p style={{
                  fontSize: 12, color: "#7A7260",
                  fontFamily: "var(--font-serif)", fontWeight: 300,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {s.desc}
                </p>
              </div>

              {/* 도메인 */}
              {!s.soon && (
                <span style={{
                  fontSize: 9, color: "#B4A890",
                  fontFamily: "monospace",
                  flexShrink: 0,
                }}>
                  {s.domain}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
