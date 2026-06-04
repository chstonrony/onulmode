"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/context/LocaleContext";

const ROSE   = "#C8607A";
const INK    = "#2A2520";
const PURPLE = "#7A70A8";

export default function BottomNav() {
  const pathname = usePathname();
  const { t, locale } = useLocale();

  const MOBILE_TABS = [
    { href: "/",        label: t.nav.home,    color: INK,    cta: false },
    { href: "/release", label: t.nav.shred,   color: ROSE,   cta: true  },
    { href: "/archive", label: t.nav.archive, color: INK,    cta: false },
    { href: "/blog",    label: t.nav.stories, color: PURPLE, cta: false },
  ];

  const DESKTOP_LINKS = [
    { href: "/",         label: t.nav.home    },
    { href: "/blog",     label: t.nav.stories },
    { href: "/magazine", label: locale === "ko" ? "매거진" : "Magazine" },
    { href: "/feelings", label: locale === "ko" ? "감정도감" : "Almanac" },
    { href: "/archive",  label: t.nav.archive },
    { href: "/guide",    label: t.nav.guide   },
    { href: "/about",    label: t.nav.about   },
  ];

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
          {MOBILE_TABS.map(({ href, label, color }) => {
            const active = isActive(href);

            return (
              <motion.div
                key={href}
                whileTap={{ scale: 0.92, rotate: -1.5, transition: { duration: 0.15 } }}
                style={{ display: "flex" }}
              >
                <Link href={href} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: 2, padding: "4px 8px",
                  textDecoration: "none",
                  ...(active ? {
                    background: color === ROSE ? ROSE : INK,
                    color: "#FAF8F2",
                    border: `1.5px solid ${INK}`,
                    boxShadow: `2px 2px 0 ${INK}`,
                    transform: "rotate(-1.5deg)",
                    padding: "5px 10px",
                  } : {}),
                }}>
                  <span style={{
                    fontSize: active ? 10 : 9,
                    fontFamily: "var(--font-serif)",
                    color: active ? "#FAF8F2" : "#A89880",
                    fontWeight: active ? 700 : 400,
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </span>
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
            {t.nav.slogan}
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
                {t.nav.shred}
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
