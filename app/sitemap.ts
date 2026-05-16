import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";

const BASE = "https://onulmode.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/release`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/archive`,       lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url:             `${BASE}/blog/${article.slug}`,
    lastModified:    new Date(article.date),
    changeFrequency: "monthly",
    priority:        0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
