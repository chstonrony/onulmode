import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /insight (단수) → /insights (복수). permanent=true → 308 (검색엔진은 301과 동일 처리)
      { source: "/insight", destination: "/insights", permanent: true },
    ];
  },
};

export default nextConfig;
