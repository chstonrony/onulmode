"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, LOCALES, translations } from "@/lib/i18n";

type Dict = typeof translations[Locale];

interface LocaleContextValue {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ko",
  t: translations.ko,
  setLocale: () => {},
});

function detectLocale(): Locale {
  if (typeof window === "undefined") return "ko";
  const saved = localStorage.getItem("onulmode_locale") as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;
  const lang = navigator.language.slice(0, 2).toLowerCase();
  if (lang === "ja") return "ja";
  if (lang === "zh") return "zh";
  if (lang === "es") return "es";
  if (lang === "en") return "en";
  return "ko";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("onulmode_locale", l);
    document.cookie = `onulmode_locale=${l};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = l;
  };

  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
