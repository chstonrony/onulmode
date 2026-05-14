import type { Metadata, Viewport } from "next";
import { Gowun_Batang, Noto_Sans_KR, Crimson_Text } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

/* 고운바탕 — 따뜻한 한국어 세리프, 에디토리얼 */
const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

/* 노토 산스 KR — 300 라이트 바디텍스트 */
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

/* Crimson Text — 영문 에디토리얼 액센트 */
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-en",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "오늘무드 — 마음 임시 보관소",
  description: "오늘의 감정을 잠깐 여기 두고 가세요.",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "오늘무드" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F6F1E9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${gowunBatang.variable} ${notoSansKR.variable} ${crimsonText.variable}`}>
      <body>
        <main className="min-h-screen pb-24 max-w-lg mx-auto">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
