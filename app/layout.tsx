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
  title: "오늘무드 | 하루 감정 기록과 감정파쇄기",
  description: "오늘무드는 하루의 감정을 가볍게 기록하고, 우걱이와 함께 감정을 유머러스하게 정리하는 감성 기록 웹서비스입니다. 번아웃, 억울함, 서운함을 감정파쇄기에 넣고 버려보세요.",
  keywords: ["감정기록", "감정파쇄기", "스트레스 해소", "마음정리", "오늘무드", "감정 일기", "자기 돌봄", "번아웃 해소", "MZ 감성"],
  authors: [{ name: "오늘무드" }],
  creator: "오늘무드",
  publisher: "오늘무드",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com",
    title: "오늘무드 | 하루 감정 기록과 감정파쇄기",
    description: "하루의 감정을 가볍게 기록하고 정리하는 감성 웹서비스. 우걱이가 감정을 파쇄해드립니다.",
    siteName: "오늘무드",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "오늘무드 감정 기록 서비스" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘무드 | 하루 감정 기록과 감정파쇄기",
    description: "하루의 감정을 가볍게 기록하고 우걱이와 함께 정리하는 감성 기록 서비스.",
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
