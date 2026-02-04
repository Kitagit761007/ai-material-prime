import Header from "@/components/Header";
import Link from "next/link";
import { Grid } from "lucide-react";
import fs from "fs";
import path from "path";

interface Asset {
    category: string;
}

export const metadata = {
    title: "カテゴリー一覧 | GX Prime Visuals",
    description: "カテゴリー別にAI生成素材を探す",
};

export default function CategoriesPage() {
    // Read categories from assets.json at build time
    const filePath = path.join(process.cwd(), "public", "data", "assets.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const assets: Asset[] = JSON.parse(fileContents);

    // Get unique categories
    const categories = Array.from(
        new Set(assets.map((asset) => asset.category))
    ).sort();

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
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={`/category/${encodeURIComponent(category)}`}
                            className="group relative p-8 bg-slate-900 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                                    <Grid className="w-8 h-8 text-cyan-500" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                                        {category}
                                    </h2>
                                    <p className="text-sm text-slate-400 mt-1">
                                        素材を見る →
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
