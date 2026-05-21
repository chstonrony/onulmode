import { ARTICLES, type Article } from "./articles";
import { ARTICLE_TRANSLATIONS } from "./articlesTranslations";
import type { Locale } from "./i18n";

export interface LocalizedArticle extends Article {
  localizedTitle: string;
  localizedDescription: string;
  localizedContent: string;
  isTranslated: boolean;
}

/** 단일 아티클을 로케일에 맞게 반환 */
export function getLocalizedArticle(slug: string, locale: Locale): LocalizedArticle | undefined {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return undefined;

  const translations = ARTICLE_TRANSLATIONS[slug];

  if (!translations || locale === "ko") {
    return {
      ...article,
      localizedTitle: article.title,
      localizedDescription: article.description,
      localizedContent: article.content,
      isTranslated: false,
    };
  }

  if (locale === "en" && translations.en) {
    return {
      ...article,
      localizedTitle: translations.en.title,
      localizedDescription: translations.en.description,
      localizedContent: translations.en.content ?? article.content,
      isTranslated: true,
    };
  }

  /* ja / es / zh — 메타데이터는 해당 언어, 본문은 영어 폴백 */
  const meta = translations[locale as keyof typeof translations] as { title: string; description: string } | undefined;
  const enContent = translations.en?.content;

  return {
    ...article,
    localizedTitle: meta?.title ?? translations.en?.title ?? article.title,
    localizedDescription: meta?.description ?? translations.en?.description ?? article.description,
    localizedContent: enContent ?? article.content,
    isTranslated: !!meta,
  };
}

/** 전체 아티클 목록을 로케일에 맞게 반환 */
export function getLocalizedArticles(locale: Locale): LocalizedArticle[] {
  return ARTICLES.map((article) => {
    const result = getLocalizedArticle(article.slug, locale);
    return result!;
  });
}
