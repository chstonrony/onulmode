"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

const ROSE = "#C8607A";
const INK  = "#2A2520";

const TAB_HREFS = ["/release", "/", "/archive", "/blog"] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();

  const TABS = [
    { href: "/release", label: "파쇄하기" },
    { href: "/",        label: "우걱이"   },
    { href: "/archive", label: t.nav.archive },
    { href: "/blog",    label: t.nav.stories },
  ];

  return (
    <>
      {/* ── 모바일 하단 탭 ── */}
      <nav className="mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "#efe3cf",
        borderTop: "1px solid #D0C6B4",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        display: "flex",
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-around",
          height: 58, width: "100%",
          maxWidth: 480, margin: "0 auto",
        }}>
          {TABS.map(({ href, label }) => {
            const active = pathname === href
              || (pathname.startsWith("/result") && href === "/release")
              || (pathname.startsWith("/blog") && href === "/blog");
            return (
              <Link key={href} href={href} style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 2, padding: "4px 12px",
                textDecoration: "none",
              }}>
                <span style={{
                  fontSize: active ? 10 : 9,
                  fontFamily: "var(--font-serif)",
                  color: active ? ROSE : "#A89880",
                  fontWeight: active ? 700 : 400,
                  letterSpacing: "0.02em",
                }}>
                  {label}
                </span>
                {active && (
                  <span style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: ROSE, display: "block",
                  }}/>
                )}
              </Link>
            );
          })}
          {/* 언어 전환 */}
          <LanguageSwitcher compact />
        </div>
      </nav>

      {/* ── PC 상단 헤더 ── */}
      <header className="desktop-nav" style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(237,228,208,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #D0C6B4",
        display: "none",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "0 32px",
          height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* 로고 */}
          <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700 }}>
              오늘무드
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M7 1L8.3 5H12.5L9.2 7.8L10.5 12L7 9.5L3.5 12L4.8 7.8L1.5 5H5.7Z"
                fill={ROSE} opacity="0.8"/>
            </svg>
          </Link>

          {/* 슬로건 */}
          <p style={{ fontSize: 12, color: "#A89880", fontFamily: "var(--font-en)", fontStyle: "italic" }}>
            {t.nav.slogan}
          </p>

          {/* 네비 + 언어 */}
          <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {[
              { href: "/", label: "우걱이" },
              { href: "/blog", label: t.nav.stories },
              { href: "/archive", label: t.nav.archive },
              { href: "/about", label: t.nav.about },
            ].map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  fontSize: 14, fontFamily: "var(--font-serif)",
                  color: active ? INK : "#A89880",
                  textDecoration: "none",
                  borderBottom: active ? `1.5px solid ${INK}` : "none",
                  paddingBottom: active ? 2 : 0,
                }}>
                  {label}
                </Link>
              );
            })}
            <Link href="/release" style={{
              fontSize: 13, fontFamily: "var(--font-serif)",
              background: ROSE, color: "#F5EFE0",
              padding: "7px 18px", borderRadius: 4,
              textDecoration: "none", fontWeight: 700,
              boxShadow: `0 3px 12px ${ROSE}44`,
            }}>
              감정 지금 파쇄하기
            </Link>
            <LanguageSwitcher compact />
          </nav>
        </div>
      </header>

      <style>{`
        @media (min-width: 768px) {
          .mobile-nav { display: none !important; }
          .desktop-nav { display: block !important; }
        }
      `}</style>
    </>
  );
}
