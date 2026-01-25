import assets from "@/data/assets.json";
import { ChevronLeft, Hash, Tag } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: 'タグ一覧 | 未来領域のビジュアルキーワード',
    description: '水素、都市、宇宙、テクノロジーなど、AI Material Primeで提供している全ての画像素材のタグを一覧で。気になるキーワードから素材を探せます。',
};

export default function TagsPage() {
    // Get all unique tags and counts
    const tagMap: Record<string, number> = {};
    assets.forEach(asset => {
        asset.tags.forEach(tag => {
            const cleanTag = tag.replace("#", "");
            tagMap[cleanTag] = (tagMap[cleanTag] || 0) + 1;
        });
    });

    const sortedTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);

    return (
        <div className="flex flex-col min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 w-full mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gx-cyan/10 rounded-2xl border border-gx-cyan/20">
                        <Tag className="w-8 h-8 text-gx-cyan" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            タグ一覧 / Tags Cloud
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                            現在 <span className="text-gx-cyan font-bold text-base">{Object.keys(tagMap).length}</span> 種類のタグが使用されています
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-10" />
            </div>

            <main className="max-w-7xl mx-auto px-6 w-full">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                        {sortedTags.map(([tag, count]) => {
                            // Calculate font size based on weight (1 to 2rem)
                            const size = 0.8 + Math.min(count * 0.1, 1.2);
                            return (
                                <Link
                                    key={tag}
                                    href={`/tags/${encodeURIComponent(tag)}`}
                                    className="px-4 py-2 bg-white/5 hover:bg-gx-cyan/10 text-slate-400 hover:text-gx-cyan rounded-xl border border-white/10 hover:border-gx-cyan/50 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
                                    style={{ fontSize: `${size}rem` }}
                                >
                                    <Hash className="w-4 h-4 text-slate-600 group-hover:text-gx-cyan transition-colors" />
                                    <span>{tag}</span>
                                    <span className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-slate-500 group-hover:text-gx-cyan/70 font-mono">
                                        {count}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
