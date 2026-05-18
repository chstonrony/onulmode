"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

const ROSE   = "#C8607A";
const INK    = "#2A2520";
const PURPLE = "#7A70A8";

const MOBILE_TABS = [
  { href: "/release", label: "파쇄시작",    color: ROSE,   cta: true  },
  { href: "/",        label: "우걱이",      color: INK,    cta: false },
  { href: "/archive", label: "감정파쇄함",  color: INK,    cta: false },
  { href: "/blog",    label: "감정보관소",  color: PURPLE, cta: false },
] as const;

const DESKTOP_LINKS = [
  { href: "/",        label: "우걱이"          },
  { href: "/blog",    label: "감정보관소"       },
  { href: "/archive", label: "감정 파쇄함"      },
  { href: "/about",   label: "우걱이 사용설명서" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/release") return pathname === "/release" || pathname.startsWith("/result");
    if (href === "/blog")    return pathname.startsWith("/blog");
    return pathname === href;
  }

  return (
    <>
      {/* ── 모바일 하단 탭 ── */}
      <nav className="mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "#efe3cf",
        borderTop: "1.5px solid #C8C0B0",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        display: "flex",
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-around",
          height: 60, width: "100%",
          maxWidth: 480, margin: "0 auto",
          padding: "0 4px",
        }}>
          {MOBILE_TABS.map(({ href, label, color, cta }) => {
            const active = isActive(href);

            if (cta) {
              return (
                <motion.div
                  key={href}
                  whileTap={{ scale: 0.92, rotate: -2 }}
                  style={{ display: "flex" }}
                >
                  <Link href={href} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: ROSE, color: "#FAF8F2",
                    padding: "7px 14px",
                    fontSize: 11, fontFamily: "var(--font-serif)", fontWeight: 700,
                    textDecoration: "none", letterSpacing: "0.04em",
                    border: `1.5px solid ${INK}`,
                    boxShadow: `2px 2px 0 ${INK}`,
                    transform: "rotate(-1.5deg)",
                    whiteSpace: "nowrap",
                  }}>
                    파쇄시작
                  </Link>
                </motion.div>
              );
            }

            const tabColor = active ? color : "#A89880";

            return (
              <motion.div
                key={href}
                whileTap={{ rotate: [-2, 2, -1, 0], transition: { duration: 0.25 } }}
                style={{ display: "flex" }}
              >
                <Link href={href} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 3, padding: "4px 8px",
                  textDecoration: "none",
                }}>
                  <span style={{
                    fontSize: active ? 10 : 9,
                    fontFamily: "var(--font-serif)",
                    color: tabColor,
                    fontWeight: active ? 700 : 400,
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </span>
                  {active && (
                    <span style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: color, display: "block",
                    }}/>
                  )}
                </Link>
              </motion.div>
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
        borderBottom: "1.5px solid #C8C0B0",
        display: "none",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "0 32px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* 로고 */}
          <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700 }}>
              오늘무드
            </span>
            <svg width="12" height="12" viewBox="0 0 14 14">
              <path d="M7 1L8.3 5H12.5L9.2 7.8L10.5 12L7 9.5L3.5 12L4.8 7.8L1.5 5H5.7Z"
                fill={ROSE} opacity="0.8"/>
            </svg>
          </Link>

          {/* 슬로건 */}
          <p style={{ fontSize: 11, color: "#B4A890", fontFamily: "var(--font-en)", fontStyle: "italic", letterSpacing: "0.04em" }}>
            우걱이가 운영하는 감정 처리소
          </p>

          {/* 네비 + CTA + 언어 */}
          <nav style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {DESKTOP_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              const isBlog = href === "/blog";
              return (
                <motion.div
                  key={href}
                  whileHover={{ rotate: [-0.8, 0.8, -0.4, 0], transition: { duration: 0.3 } }}
                  style={{ display: "inline-block" }}
                >
                  <Link href={href} style={{
                    fontSize: 13, fontFamily: "var(--font-serif)",
                    color: active ? INK : isBlog ? PURPLE : "#A89880",
                    textDecoration: "none",
                    borderBottom: active ? `1.5px solid ${INK}` : "none",
                    paddingBottom: active ? 2 : 0,
                    fontWeight: active ? 700 : 400,
                  }}>
                    {label}
                  </Link>
                </motion.div>
              );
            })}

            {/* 파쇄시작 CTA */}
            <motion.div
              whileHover={{ rotate: [-1.5, 1, -0.5, 0], scale: 1.03, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95, rotate: -2 }}
              style={{ display: "inline-block" }}
            >
              <Link href="/release" style={{
                fontSize: 13, fontFamily: "var(--font-serif)",
                background: ROSE, color: "#F5EFE0",
                padding: "7px 18px",
                textDecoration: "none", fontWeight: 700,
                border: `1.5px solid ${INK}`,
                boxShadow: `2px 2px 0 ${INK}`,
                display: "inline-block",
                transform: "rotate(-1deg)",
                letterSpacing: "0.04em",
              }}>
                파쇄시작
              </Link>
            </motion.div>

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
