import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["ko", "en", "ja", "es", "zh"] as const;
type Locale = (typeof LOCALES)[number];

function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("onulmode_locale")?.value as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;

  const accept = request.headers.get("accept-language") ?? "";
  const lang = accept.split(",")[0]?.split("-")[0]?.toLowerCase() ?? "";

  if (lang === "ja") return "ja";
  if (lang === "zh") return "zh";
  if (lang === "es") return "es";
  if (lang === "en") return "en";
  return "ko";
}

export function middleware(request: NextRequest) {
  const locale = detectLocale(request);
  const response = NextResponse.next();

  /* 쿠키가 없으면 자동 설정 (1년) */
  if (!request.cookies.has("onulmode_locale")) {
    response.cookies.set("onulmode_locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
