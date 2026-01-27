import assets from "@/data/assets.json";
import { ChevronLeft, LayoutGrid, Zap, Cpu, Building2, Recycle, Leaf, Car } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: 'カテゴリー一覧 | 未来領域のビジュアルカテゴリー',
    description: 'モビリティ、エネルギー、テクノロジーなど、AI Material Primeで提供している全ての画像素材のカテゴリーを一覧で。気になる分野から素材を探せます。',
};

// Category icon mapping
const categoryIcons: Record<string, any> = {
    "Mobility": Car,
    "Energy": Zap,
    "Tech": Cpu,
    "SmartCity": Building2,
    "Resource": Recycle,
    "Eco-Life": Leaf,
};

// Category Japanese names
const categoryNames: Record<string, string> = {
    "Mobility": "モビリティ",
    "Energy": "エネルギー",
    "Tech": "テクノロジー",
    "SmartCity": "スマートシティ",
    "Resource": "資源循環",
    "Eco-Life": "エコライフ",
};

// Category descriptions
const categoryDescriptions: Record<string, string> = {
    "Mobility": "次世代の移動手段と交通システム",
    "Energy": "クリーンで持続可能なエネルギー",
    "Tech": "先端技術とイノベーション",
    "SmartCity": "未来の都市とインフラ",
    "Resource": "循環型社会と資源管理",
    "Eco-Life": "自然共生とサステナブルな暮らし",
};

export default function CategoriesPage() {
    // Get all unique categories and counts
    const categoryMap: Record<string, number> = {};
    assets.forEach(asset => {
        const category = asset.category;
        categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

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
                        <LayoutGrid className="w-8 h-8 text-gx-cyan" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            カテゴリー一覧 / Categories
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                            現在 <span className="text-gx-cyan font-bold text-base">{Object.keys(categoryMap).length}</span> カテゴリーの素材を提供中
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-10" />
            </div>

            <main className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCategories.map(([category, count]) => {
                        const Icon = categoryIcons[category] || LayoutGrid;
                        const japaneseName = categoryNames[category] || category;
                        const description = categoryDescriptions[category] || "";

                        return (
                            <Link
                                key={category}
                                href={`/categories/${encodeURIComponent(category)}`}
                                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-gx-cyan/50 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-gx-cyan/20 overflow-hidden"
                            >
                                {/* Background gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gx-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-4 bg-gx-cyan/10 rounded-2xl border border-gx-cyan/20 group-hover:bg-gx-cyan/20 transition-colors">
                                            <Icon className="w-8 h-8 text-gx-cyan" />
                                        </div>
                                        <div className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                                            <span className="text-xs text-slate-400 group-hover:text-gx-cyan font-mono transition-colors">
                                                {count} 件
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-gx-cyan transition-colors">
                                        {japaneseName}
                                    </h2>
                                    <p className="text-sm text-slate-500 mb-1">{category}</p>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {description}
                                    </p>

                                    {/* Arrow indicator */}
                                    <div className="mt-6 flex items-center gap-2 text-slate-500 group-hover:text-gx-cyan transition-colors">
                                        <span className="text-sm font-medium">詳細を見る</span>
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
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
