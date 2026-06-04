"use client";

import Link from "next/link";
import OnulSeries from "@/components/series/OnulSeries";
import { useLocale } from "@/context/LocaleContext";

const BG   = "#efe3cf";
const LINE = "#D8CEC0";
const INK  = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#C4BAB0";

export default function Footer() {
  const { locale } = useLocale();

  const FOOTER_LINKS = [
    {
      heading: locale === "ko" ? "서비스" : "Service",
      links: [
        { href: "/", label: locale === "ko" ? "오늘무드 홈" : "Home" },
        { href: "/release", label: locale === "ko" ? "감정 파쇄하기" : "Shred Emotions" },
        { href: "/today", label: locale === "ko" ? "오늘 감정 기록" : "Log Today" },
        { href: "/archive", label: locale === "ko" ? "감정처리소" : "Processing Center" },
        { href: "/compost", label: locale === "ko" ? "감정퇴비 창고" : "Compost Warehouse" },
        { href: "/collection", label: locale === "ko" ? "감정 부산물 도감" : "Collection" },
      ],
    },
    {
      heading: locale === "ko" ? "도움말" : "Help",
      links: [
        { href: "/guide", label: locale === "ko" ? "감정 기록 가이드" : "Guide" },
        { href: "/feelings", label: locale === "ko" ? "우걱이 감정도감" : "Emotion Almanac" },
        { href: "/emotion-dictionary", label: locale === "ko" ? "우걱이 감정사전" : "Emotion Dictionary" },
        { href: "/archive-guide", label: locale === "ko" ? "감정처리소 사용법" : "Archive Guide" },
        { href: "/faq", label: locale === "ko" ? "자주 묻는 질문" : "FAQ" },
        { href: "/magazine", label: locale === "ko" ? "우걱이 매거진" : "Ugogi Magazine" },
        { href: "/blog", label: locale === "ko" ? "감정 이야기" : "Stories" },
      ],
    },
    {
      heading: locale === "ko" ? "정보" : "Info",
      links: [
        { href: "/about", label: locale === "ko" ? "오늘무드 소개" : "About" },
        { href: "/creator", label: locale === "ko" ? "운영자 소개" : "Creator" },
        { href: "/privacy", label: locale === "ko" ? "개인정보처리방침" : "Privacy" },
        { href: "/terms", label: locale === "ko" ? "이용약관" : "Terms" },
        { href: "/contact", label: locale === "ko" ? "문의하기" : "Contact" },
      ],
    },
  ];

  return (
    <footer style={{
      borderTop: "1px solid #D8CEC0",
      background: BG,
      padding: "40px 24px 100px",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* 오늘 시리즈 */}
        <OnulSeries style={{ marginBottom: 36, textAlign: "left" }} />

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 32 }} />

        {/* 링크 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px 16px", marginBottom: 36 }}>
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <p style={{ fontSize: 10, fontFamily: "monospace", color: MUTED, letterSpacing: "0.12em", marginBottom: 12 }}>
                {col.heading.toUpperCase()}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} style={{
                    fontSize: 12, color: "#7A7260",
                    textDecoration: "none", fontFamily: "var(--font-prose)",
                    fontWeight: 300, lineHeight: 1.4,
                  }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 20 }}>
          {/* 브랜드 */}
          <p style={{
            fontSize: 13, fontWeight: 600,
            fontFamily: "var(--font-serif)", color: INK,
            marginBottom: 4,
          }}>
            오늘무드
          </p>
          <p style={{
            fontSize: 11, color: MUTED,
            fontFamily: "var(--font-prose)", fontWeight: 300, marginBottom: 14,
            lineHeight: 1.7,
          }}>
            {locale === "ko"
              ? "하루의 감정을 가볍게 기록하고, 우걱이와 함께 감정을 유머러스하게 정리하는 감성 기록 서비스."
              : "A lighthearted emotional record service to log daily feelings and process them with Ugogi."}
          </p>

          {/* 법적 고지 */}
          <p style={{ fontSize: 10, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.7, marginBottom: 12 }}>
            {locale === "ko"
              ? "오늘무드는 의료 서비스가 아닙니다. 모든 콘텐츠는 엔터테인먼트 및 감정 기록 목적으로 제공됩니다."
              : "OnulMood is not a medical service. All content is for entertainment and personal journaling purposes."}
          </p>

          {/* 카피라이트 */}
          <p style={{ fontSize: 10, color: DIM, fontFamily: "monospace", letterSpacing: "0.04em", marginBottom: 16 }}>
            © 2026 오늘무드. All rights reserved.
          </p>

          {/* 신뢰 메뉴 — 고정 링크 */}
          <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 14 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
              {[
                { href: "/about",         label: "오늘무드 소개" },
                { href: "/guide",         label: "감정 기록 가이드" },
                { href: "/feelings",      label: "우걱이 감정도감" },
                { href: "/archive-guide", label: "감정처리소 안내" },
                { href: "/faq",           label: "자주 묻는 질문" },
                { href: "/creator",       label: "운영자 소개" },
                { href: "/privacy",       label: "개인정보처리방침" },
                { href: "/terms",         label: "이용약관" },
                { href: "/contact",       label: "문의하기" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ fontSize: 11, color: MUTED, textDecoration: "none", fontFamily: "var(--font-prose)", fontWeight: 300 }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
