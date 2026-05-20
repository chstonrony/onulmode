import type { Metadata } from "next";
import BestResultsClient from "./BestResultsClient";

export const metadata: Metadata = {
  title: "인기 감정 결과 모음 | 감정 실험실 아카이브 | 오늘무드",
  description: "눅눅한 오징어칩 바스러기, 충전선 접촉불량, 사회생활 가능한 척 모드… 사람들이 가장 많이 저장하고 공유한 이상한 감정 결과 아카이브.",
  keywords: [
    "감정 결과", "감정 유형", "내 감정 맞춤", "감정 테스트", "감정 표현",
    "번아웃 증상", "감정 노동", "MZ감성", "감정 공유", "오늘무드",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/best-results",
    title: "인기 감정 결과 모음 | 오늘무드 감정 실험실",
    description: "눅눅한 오징어칩 바스러기부터 사회생활 가능한 척 모드까지. 사람들이 가장 공감한 이상한 감정 결과들.",
    siteName: "오늘무드",
  },
  twitter: {
    card: "summary_large_image",
    title: "인기 감정 결과 모음 | 오늘무드",
    description: "눅눅한 오징어칩 바스러기, 충전선 접촉불량… 내 감정 찾아보기.",
  },
  alternates: {
    canonical: "https://onulmood.com/best-results",
  },
};

export default function BestResultsPage() {
  return <BestResultsClient />;
}
