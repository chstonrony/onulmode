import type { Metadata, Viewport } from "next";
import { Gowun_Batang, Noto_Sans_KR, Crimson_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
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
  metadataBase: new URL("https://onulmode.vercel.app"),
  verification: { google: "cfO4F7I7CgH-iEUeShOV5RofN4k3vs8ixumUd_-vMIM" },
  title: "오늘무드 | 감정 파쇄기 — 오늘의 감정을 여기서 버려요",
  description: "말 못 한 마음, 짜증, 억울함, 외로움을 감정 파쇄기에 넣고 버려보세요. 기록하지 않아도 괜찮아요. 오늘 마음 조금 정리 완료.",
  keywords: ["감정일기", "감정파쇄기", "스트레스 해소", "마음정리", "오늘무드", "감정기록", "MZ감성앱"],
  authors: [{ name: "오늘무드" }],
  creator: "오늘무드",
  publisher: "오늘무드",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmode.vercel.app",
    title: "오늘무드 | 감정 파쇄기",
    description: "말 못 한 마음도, 짜증도, 억울함도 그냥 던져버려. 우걱이가 씹어먹음.",
    siteName: "오늘무드",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "오늘무드 감정 파쇄기" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘무드 | 감정 파쇄기",
    description: "감정 던지면 우걱이가 씹어먹음. 결과지 랜덤으로 나옴ㅋㅋ",
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
