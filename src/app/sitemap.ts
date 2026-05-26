import type { MetadataRoute } from "next";
import { SEED_PRODUCTS, SEED_CATEGORIES } from "@/lib/data/seed";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cakesbyratna.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/shop",
    "/categories",
    "/gallery",
    "/about",
    "/contact",
    "/booking",
    "/track",
    "/faq",
    "/privacy",
    "/terms",
    "/login",
    "/signup"
  ];
  const now = new Date();
  const base: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7
  }));
  const products: MetadataRoute.Sitemap = SEED_PRODUCTS.map((p) => ({
    url: `${BASE}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8
  }));
  const categories: MetadataRoute.Sitemap = SEED_CATEGORIES.map((c) => ({
    url: `${BASE}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7
  }));
  return [...base, ...products, ...categories];
}
