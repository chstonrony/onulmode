import type { Metadata, Viewport } from "next";
import { Gowun_Batang, Noto_Sans_KR, Crimson_Text } from "next/font/google";
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
    description: "말 못 한 마음도, 짜증도, 억울함도 그냥 던져버려. 오늘 감정 임시보관소.",
    siteName: "오늘무드",
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘무드 | 감정 파쇄기",
    description: "말 못 한 마음도, 짜증도, 억울함도 그냥 던져버려.",
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "오늘무드" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#efe3cf",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${gowunBatang.variable} ${notoSansKR.variable} ${crimsonText.variable}`}>
      <head>
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" crossOrigin="anonymous" async />
        {process.env.NEXT_PUBLIC_KAKAO_JS_KEY && (
          <script dangerouslySetInnerHTML={{ __html:
            `window.addEventListener('load',function(){var k="${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}";if(k&&window.Kakao&&!window.Kakao.isInitialized())window.Kakao.init(k);});`
          }} />
        )}
      </head>
      <body>
        {/* 모바일: 하단 탭 / PC: 상단 네비로 전환됨 (BottomNav 내부 처리) */}
        <LocaleProvider>
          <div className="app-shell">
            <main className="main-content">
              {children}
            </main>
          </div>
          <BottomNav />
        </LocaleProvider>
      </body>
    </html>
  );
}
