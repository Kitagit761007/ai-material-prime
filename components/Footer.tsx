"use client";

import Link from "next/link";
import assets from "../data/assets.json"; // 👈 集計のためにデータを読み込みます

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // --- カテゴリーごとの枚数を自動集計 ---
    const getCategoryCount = (catName: string) => {
        return assets.filter(item => item.category === catName).length;
    };

    // --- 特定のタグを持つ枚数を自動集計 ---
    const getTagCount = (tagName: string) => {
        return assets.filter(item => item.tags.includes(`#${tagName}`)).length;
    };

    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-gx-cyan">
                            GX Prime Visuals
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            AIでGXの未来を可視化するアセットライブラリ。すべての素材は商用利用可能・クレジット不要。
                        </p>
                        <div className="flex gap-4 pt-2">
                            <span className="text-gx-emerald underline decoration-gx-emerald/30 underline-offset-4 text-xs font-bold font-mono">
                                #RoyaltyFreeAssets
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Explore Categories (新しいカテゴリー名に修正) */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full" />
                            Explore Categories
                        </h3>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                { id: "Energy", name: "エネルギー" },
                                { id: "Mobility", name: "モビリティ" },
                                { id: "Tech", name: "テクノロジー" },
                                { id: "Resource", name: "資源・バイオ" },
                                { id: "SmartCity", name: "スマートシティ" }
                            ].map((cat) => (
                                <li key={cat.id}>
                                    <Link href={`/categories/${cat.id}`} className="text-slate-300 hover:text-gx-cyan transition-colors text-sm flex items-center justify-between group">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-0.5 bg-slate-800 group-hover:bg-gx-cyan transition-colors" />
                                            {cat.name}
                                        </div>
                                        <span className="text-xs text-slate-500 font-mono">({getCategoryCount(cat.id)})</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Popular Tags (精鋭10種に修正 & 件数自動表示) */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full" />
                            Popular Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "水素エネルギー", "スマートシティ", "次世代モビリティ", 
                                "クリーンエネルギー", "自然共生", "海洋開発", 
                                "宇宙開発", "循環型社会", "先端テクノロジー", "GXインフラ"
                            ].map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/tags/${encodeURIComponent(tag)}`}
                                    className="px-2 py-1 bg-white/5 hover:bg-gx-cyan/10 text-slate-300 hover:text-gx-cyan rounded-md border border-white/5 hover:border-gx-cyan/20 text-[10px] transition-all flex items-center gap-1"
                                >
                                    #{tag}
                                    <span className="text-[9px] text-slate-500 opacity-70">{getTagCount(tag)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Links & Contact */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full" />
                            Resources
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/gallery" className="text-slate-300 hover:text-gx-cyan transition-colors text-sm">ギャラリー</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-300 hover:text-gx-cyan transition-colors text-sm">当サイトについて</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-300 hover:text-gx-cyan transition-colors text-sm font-bold text-gx-cyan/80">お問い合わせ</Link>
                            </li>
                            <li className="pt-2 flex gap-4 border-t border-white/5 mt-4">
                                <Link href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors text-[10px] uppercase tracking-tighter">Terms</Link>
                                <Link href="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors text-[10px] uppercase tracking-tighter">Privacy</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 space-y-4 md:space-y-0 text-slate-400">
                    <p className="text-xs font-mono">
                        © {currentYear} GX Prime Visuals. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
