import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { Grid } from "lucide-react";
import fs from "fs";
import path from "path";

interface Asset {
  id?: string | null;
  category?: string | null;
  url?: string | null;   // assets.json にある想定: "/assets/images/.."
  score?: number | null; // あるなら代表選定に使う
}

export const metadata = {
  title: "カテゴリー一覧 | GX Prime Visuals",
  description: "カテゴリー別にAI生成素材を探す",
};

function toPublicImageUrl(asset: Asset): string {
  // ✅ 1) まず id から作る（MaterialGallery と同じ考え方）
  const id = (asset.id ?? "").toString().trim();
  if (id) {
    const folder = id.startsWith("mid-")
      ? "mid"
      : id.startsWith("niji-")
      ? "niji"
      : id.startsWith("gpt-")
      ? "GPT"
      : id.startsWith("nano-")
      ? "nano"
      : "grok";

    const ext = folder === "GPT" ? ".png" : ".jpg";
    return `/assets/images/${folder}/${id}${ext}`;
  }

  // ✅ 2) url は fallback（形式だけ整える）
  const raw = (asset.url ?? "").toString().trim();
  if (raw) {
    // "assets/..." で来たら "/assets/..." に補正
    if (raw.startsWith("assets/")) return `/${raw}`;
    // "/assets/..." or "http..." はそのまま
    if (raw.startsWith("/") || raw.startsWith("http")) return raw;
    // その他は先頭に / を付けてみる
    return `/${raw}`;
  }

  return "";
}

export default function CategoriesPage() {
  // Read assets.json at build time
  const filePath = path.join(process.cwd(), "public", "data", "assets.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const assets: Asset[] = JSON.parse(fileContents);

  // category -> count
  const categoryCountMap: Record<string, number> = {};
  // category -> best asset (score最大 or 最初)
  const categoryCoverMap: Record<string, Asset> = {};

  for (const a of assets) {
    const c = (a?.category ?? "").trim();
    if (!c) continue;

    categoryCountMap[c] = (categoryCountMap[c] ?? 0) + 1;

    const current = categoryCoverMap[c];
    if (!current) {
      categoryCoverMap[c] = a;
      continue;
    }

    const curScore =
      typeof current?.score === "number" ? (current.score as number) : -Infinity;
    const nextScore =
      typeof a?.score === "number" ? (a.score as number) : -Infinity;

    if (nextScore > curScore) {
      categoryCoverMap[c] = a;
    }
  }

  // ユニークカテゴリ（空除外）
  const categories = Object.keys(categoryCountMap).sort((a, b) =>
    a.localeCompare(b, "ja")
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">
            Categories
          </p>
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            カテゴリー一覧
          </h1>
          <div className="h-1 w-20 bg-cyan-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const count = categoryCountMap[category] ?? 0;
            const coverAsset = categoryCoverMap[category];
            const coverUrl = coverAsset ? toPublicImageUrl(coverAsset) : "";

            return (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-8 transition-all hover:scale-[1.02] hover:border-cyan-500/40"
              >
                {/* 背景画像（カードにだけ影響。テキストは薄くならない） */}
                {coverUrl && (
                  <>
                    <Image
                      src={coverUrl}
                      alt={`${category} cover`}
                      fill
                      className="absolute inset-0 object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                      unoptimized
                      priority={false}
                    />
                    {/* 読みやすさ用の薄幕（opacityで全体を薄くしない） */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/35 to-slate-950/20" />
                    <div className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/10" />
                  </>
                )}

                {/* 前景コンテンツ */}
                <div className="relative flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <Grid className="w-8 h-8 text-cyan-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-white group-hover:text-cyan-200 transition-colors truncate">
                        {category}
                      </h2>

                      {/* 件数バッジ */}
                      <span className="text-xs font-bold tabular-nums text-slate-200/90 bg-white/10 px-2 py-1 rounded-lg border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                        {count}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300/80 mt-1">
                      素材を見る →
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
