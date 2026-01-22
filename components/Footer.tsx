"use client";

import Link from "next/link";
import assetsDataRaw from "../data/assets.json";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const assets = Array.isArray(assetsDataRaw) ? assetsDataRaw : [];

    const getCategoryCount = (name: string) => {
        return assets.filter(item => {
            const cat = String(item.category || "").toLowerCase();
            const target = name.toLowerCase();
            return cat.includes(target) || target.includes(cat);
        }).length;
    };

    const getTagCount = (name: string) => {
        return assets.filter(item => 
            Array.isArray(item.tags) && item.tags.some((t: string) => t.includes(name))
        ).length;
    };

    const categories = ["エネルギー", "モビリティ", "テクノロジー", "資源・バイオ", "スマートシティ"];

    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-gx-cyan">GX Prime Visuals</Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">AIでGXの未来を可視化するアセットライブラリ。商用利用可能。</p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gx-cyan rounded-full" />Explore Categories</h3>
                        <ul className="grid grid-cols-1 gap-4">
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <Link href={`/categories/${encodeURIComponent(cat)}`} className="text-slate-300 hover:text-gx-cyan transition-colors text-sm flex items-center justify-between group">
                                        <div className="flex items-center gap-2"><span className="w-1 h-0.5 bg-slate-800 group-hover:bg-gx-cyan transition-colors" />{cat}</div>
                                        <span className="text-xs text-slate-500 font-mono">({getCategoryCount(cat)})</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gx-cyan rounded-full" />Popular Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {["水素エネルギー", "スマートシティ", "次世代モビリティ", "クリーンエネルギー", "自然共生", "海洋開発", "宇宙開発", "循環型社会", "先端テクノロジー", "GXインフラ"].map((tag) => (
                                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="px-2 py-1 bg-white/5 hover:bg-gx-cyan/10 text-slate-300 hover:text-gx-cyan rounded-md border border-white/5 text-[10px] flex items-center gap-1">
                                    #{tag} <span className="text-[9px] text-slate-500 opacity-70">{getTagCount(tag)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gx-cyan rounded-full" />Resources</h3>
                        <ul className="space-y-4">
                            <li><Link href="/gallery" className="text-slate-300 hover:text-gx-cyan text-sm">ギャラリー</Link></li>
                            <li><Link href="/about" className="text-slate-300 hover:text-gx-cyan text-sm">当サイトについて</Link></li>
                            <li><Link href="/contact" className="text-slate-300 hover:text-gx-cyan text-sm font-bold">お問い合わせ</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 text-slate-400 text-xs font-mono">© {currentYear} GX Prime Visuals. All rights reserved.</div>
            </div>
        </footer>
    );
}
