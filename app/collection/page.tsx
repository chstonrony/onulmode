import type { Metadata } from "next";
import CollectionClient from "./CollectionClient";

export const metadata: Metadata = {
  title: "감정 부산물 도감 | 오늘무드",
  description: "감정을 파쇄하면 이상한 부산물이 생성됩니다. 우걱이 감정 부산물 도감 — 30종, 6등급 희귀도.",
  keywords: ["감정 부산물", "감정도감", "우걱이", "감정 컬렉션", "오늘무드"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/collection",
    title: "감정 부산물 도감 | 오늘무드",
    description: "감정을 파쇄하면 이상한 부산물이 생성됩니다.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/collection" },
  robots: { index: false, follow: true },
};

export default function CollectionPage() {
  return <CollectionClient />;
}
