import type { Metadata } from "next";
import CompostClient from "./CompostClient";

export const metadata: Metadata = {
  title: "감정퇴비 창고 | 오늘무드",
  description: "버린 감정도 지나고 보면 내 하루의 기록이 됩니다. 파쇄된 감정들이 퇴비가 되어 남은 기록을 돌아보세요.",
  keywords: ["감정퇴비", "감정 기록", "감정처리소", "오늘무드", "자기 돌봄"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/compost",
    title: "감정퇴비 창고 | 오늘무드",
    description: "버린 감정도 지나고 보면 내 하루의 기록이 됩니다.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/compost" },
};

export default function CompostPage() {
  return <CompostClient />;
}
