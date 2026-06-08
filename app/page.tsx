import type { Metadata } from "next";
import HomeClient from "./HomeClient";

// 홈 자기참조 canonical — "사용자가 선택한 표준 없음" 중복 이슈 해결.
// (홈은 클라이언트 컴포넌트라 metadata 를 직접 못 내보내므로 서버 래퍼에서 선언)
export const metadata: Metadata = {
  alternates: { canonical: "https://onulmood.com" },
};

export default function Page() {
  return <HomeClient />;
}
