import type { Metadata } from "next";
import ArchiveClient from "./ArchiveClient";

export const metadata: Metadata = {
  title: "우걱이 감정처리소 | 오늘무드",
  description: "우걱이 감정처리소입니다. 처리된 감정들은 사라지지 않고 아카이브에 남아, 때로는 이상한 부산물이 되어 발견됩니다. 원래 감정, 파쇄 결과, 감정씨앗을 카드로 돌아보세요.",
  keywords: ["감정퇴비실", "감정 기록", "감정 아카이브", "자기 돌봄", "오늘무드"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/archive",
    title: "감정퇴비실 | 오늘무드",
    description: "기록된 감정들이 퇴비가 되어 내 하루의 기록으로 남습니다.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/archive" },
  robots: { index: false, follow: true },
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
