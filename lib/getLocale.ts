import { cookies, headers } from "next/headers";
import { Locale, LOCALES } from "./i18n";

/* 서버 컴포넌트에서 현재 로케일을 가져옵니다.
   우선순위: 쿠키 > Accept-Language 헤더 > 기본값(ko) */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const saved = cookieStore.get("onulmode_locale")?.value as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;

  const headerStore = await headers();
  const accept = headerStore.get("accept-language") ?? "";
  const lang = accept.split(",")[0]?.split("-")[0]?.toLowerCase();

  if (lang === "ja") return "ja";
  if (lang === "zh") return "zh";
  if (lang === "es") return "es";
  if (lang === "en") return "en";
  return "ko";
}
