import Header from "@/components/Header";
import Link from "next/link";
import { Grid } from "lucide-react";
import fs from "fs";
import path from "path";

interface Asset {
  category?: string | null;
}

export const metadata = {
  title: "カテゴリー一覧 | GX Prime Visuals",
  description: "カテゴリー別にAI生成素材を探す",
};

export default function CategoriesPage() {
  // Read assets.json at build time
  const filePath = path.join(process.cwd(), "public", "data", "assets.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const assets: Asset[] = JSON.parse(fileContents);

  // Build counts: { "水中": 12, ... }
  const categoryCountMap: Record<string, number> = {};
  for (const a of assets) {
    const c = (a?.category ?? "").trim();
    if (!c) continue;
    categoryCountMap[c] = (categoryCountMap[c] ?? 0) + 1;
  }

  // Get unique categories (only non-empty), sorted
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

            return (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className="group relative p-8 bg-slate-900 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <Grid className="w-8 h-8 text-cyan-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors truncate">
                        {category}
                      </h2>

                      {/* 件数バッジ */}
                      <span className="text-xs font-bold tabular-nums text-slate-200/90 bg-white/5 px-2 py-1 rounded-lg border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                        {count}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 mt-1">素材を見る →</p>
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
