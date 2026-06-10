import type { Metadata, Viewport } from "next";
import { Gowun_Batang, Noto_Sans_KR, Crimson_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import { LocaleProvider } from "@/context/LocaleContext";

const gowunBatang = Gowun_Batang({
  subsets: ["latin"], weight: ["400","700"],
  variable: "--font-serif", display: "swap", preload: false,
});
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"], weight: ["300","400","500"],
  variable: "--font-sans", display: "swap", preload: false,
});
const crimsonText = Crimson_Text({
  subsets: ["latin"], weight: ["400","600"],
  style: ["normal","italic"],
  variable: "--font-en", display: "swap", preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onulmood.com"),
  verification: { google: "cfO4F7I7CgH-iEUeShOV5RofN4k3vs8ixumUd_-vMIM" },
  other: { "google-adsense-account": "ca-pub-2116440046629856" },
  title: "오늘무드 | 하루 감정 기록과 우걱이 감정처리소",
  description: "오늘무드는 하루 동안 생긴 감정을 가볍게 기록하고, 우걱이와 함께 감정을 정리해보는 감정 콘텐츠 서비스입니다. 감정 이야기, 감정 기록, 감정도감과 함께 오늘의 마음을 조금 더 가볍게 돌아보세요.",
  keywords: ["감정기록", "감정 콘텐츠", "감정 이야기", "마음정리", "오늘무드", "감정 일기", "자기 돌봄", "감정도감", "우걱이"],
  authors: [{ name: "오늘무드" }],
  creator: "오늘무드",
  publisher: "오늘무드",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com",
    title: "오늘무드 | 하루 감정 기록과 우걱이 감정처리소",
    description: "하루의 감정을 가볍게 기록하고 돌아보는 감정 콘텐츠 서비스. 감정 이야기와 감정도감도 함께해요.",
    siteName: "오늘무드",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "오늘무드 감정 콘텐츠 서비스" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘무드 | 하루 감정 기록과 우걱이 감정처리소",
    description: "하루의 감정을 가볍게 기록하고 우걱이와 함께 돌아보는 감정 콘텐츠 서비스.",
    images: ["/opengraph-image"],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "오늘무드" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#efe3cf",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const kakaoKey  = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const gaId      = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko" className={`${gowunBatang.variable} ${notoSansKR.variable} ${crimsonText.variable}`}>
      <head>
        {/* 구조화 데이터 — 사이트/조직 신뢰 신호 (Search Console) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://onulmood.com/#website",
                url: "https://onulmood.com",
                name: "오늘무드",
                description: "하루의 감정을 가볍게 기록하고 우걱이와 함께 돌아보는 감정 콘텐츠 서비스",
                inLanguage: "ko-KR",
                publisher: { "@id": "https://onulmood.com/#organization" },
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://onulmood.com/magazine?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://onulmood.com/#organization",
                name: "오늘무드",
                url: "https://onulmood.com",
                logo: { "@type": "ImageObject", url: "https://onulmood.com/opengraph-image" },
                description: "감정을 진단하거나 치료하지 않고, 가볍게 꺼내 기록하도록 돕는 감정 콘텐츠 서비스",
                foundingDate: "2026",
                sameAs: [],
              },
            ],
          }) }}
        />
        {/* 카카오 SDK */}
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" crossOrigin="anonymous" async />
        {kakaoKey && (
          <script dangerouslySetInnerHTML={{ __html:
            `window.addEventListener('load',function(){var k="${kakaoKey}";if(k&&window.Kakao&&!window.Kakao.isInitialized())window.Kakao.init(k);});`
          }} />
        )}
      </head>
      <body>
        <LocaleProvider>
          <div className="app-shell">
            <main className="main-content">
              {children}
              <Footer />
            </main>
          </div>
          <BottomNav />
        </LocaleProvider>

        {/* Google Analytics GA4 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Google AdSense — NEXT_PUBLIC_ADSENSE_ID 설정 후 활성화 */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
