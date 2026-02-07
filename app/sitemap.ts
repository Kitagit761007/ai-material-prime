import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

type Asset = {
  id?: string | null;
  category?: string | null;
  tags?: string[] | null;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://ai-material-prime.com";

  // ここを更新するときのデフォルト日付（ビルド時刻）
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    // ✅ 固定ページ（存在するものだけ入れてOK）
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // あれば有効（無いなら消してOK）
    { url: `${siteUrl}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/tags`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/favorites`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
  ];

  // ✅ assets.json からカテゴリ/タグ/個別素材ページを追加
  try {
    const filePath = path.join(process.cwd(), "public", "data", "assets.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const assets: Asset[] = JSON.parse(fileContents);

    // --- categories ---
    const categories = Array.from(
      new Set(
        assets
          .map((a) => (a.category ?? "").toString().trim())
          .filter((c) => c.length > 0)
      )
    );

    for (const c of categories) {
      urls.push({
        url: `${siteUrl}/category/${encodeURIComponent(c)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }

    // --- tags ---
    const tags = Array.from(
      new Set(
        assets
          .flatMap((a) => Array.isArray(a.tags) ? a.tags : [])
          .map((t) => (t ?? "").toString().trim())
          .filter((t) => t.length > 0)
      )
    );

    for (const t of tags) {
      urls.push({
        url: `${siteUrl}/tag/${encodeURIComponent(t)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }

    // --- material detail pages ---
    const ids = Array.from(
      new Set(
        assets
          .map((a) => (a.id ?? "").toString().trim())
          .filter((id) => id.length > 0)
      )
    );

    for (const id of ids) {
      urls.push({
        url: `${siteUrl}/material/${encodeURIComponent(id)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
      });
    }
  } catch {
    // assets.json が読めない場合でも固定ページのsitemapは返す
  }

  return urls;
}
