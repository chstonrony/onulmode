import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /insight (단수) → /insights (복수). permanent=true → 308 (검색엔진은 301과 동일 처리)
      { source: "/insight", destination: "/insights", permanent: true },
      // 블로그 중복 글 병합 — 제거된 slug 를 통합 대상으로 영구 리다이렉트
      { source: "/blog/want-to-cry-but-cant", destination: "/blog/cant-cry-when-you-want-to", permanent: true },
      { source: "/blog/why-wounds-dont-heal", destination: "/blog/wound-that-doesnt-heal", permanent: true },
      { source: "/blog/tired-from-relationships", destination: "/blog/relationship-fatigue", permanent: true },
    ];
  },
};

export default nextConfig;
