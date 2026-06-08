import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { FEELINGS } from "@/lib/feelings";
import { CONTENT_ARTICLES } from "@/lib/contentSystem";

const BASE = "https://onulmood.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/release`,                 lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`,                    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/best-results`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/emotion-fatigue`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/hide-emotions`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/funny-but-comforting`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/archive`,                 lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/compost`,                 lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/collection`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/insights`,                lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/guide`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/archive-guide`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`,                     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/emotion-dictionary`,      lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/feelings`,               lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/magazine`,               lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/about`,                   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/creator`,                 lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`,                 lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`,                 lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/terms`,                   lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url:             `${BASE}/blog/${article.slug}`,
    lastModified:    new Date(article.date),
    changeFrequency: "monthly",
    priority:        0.7,
  }));

  const feelingRoutes: MetadataRoute.Sitemap = FEELINGS.map((f) => ({
    url:             `${BASE}/feelings/${f.slug}`,
    lastModified:    now,
    changeFrequency: "monthly",
    priority:        0.7,
  }));

  const magazineRoutes: MetadataRoute.Sitemap = CONTENT_ARTICLES.map(a => ({
    url:             `${BASE}/magazine/${a.category}/${a.slug}`,
    lastModified:    new Date(a.date),
    changeFrequency: "monthly",
    priority:        0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...feelingRoutes, ...magazineRoutes];
}
