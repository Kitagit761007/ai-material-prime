"use client";

import Link from "next/link";
import assetsDataRaw from "../data/assets.json";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const assets = Array.isArray(assetsDataRaw) ? (assetsDataRaw as any[]) : [];

    const getCategoryCount = (id: string) => {
        return assets.filter((item: any) => {
            const cat = String(item.category || "").toLowerCase();
            const target = id.toLowerCase();
            return cat === target || cat.replace(/\s+/g, '') === target.replace(/\s+/g, '');
        }).length;
    };

    const categories = [
        { name: "GX", id: "Energy", en: "Green Transformation (GX)" },
        { name: "未来都市", id: "SmartCity", en: "Future City" },
        { name: "モビリティ", id: "Mobility", en: "Clean Mobility" },
        { name: "テクノロジー", id: "Tech", en: "Advanced Technology" },
        { name: "宇宙", id: "Space", en: "Space & Galaxy" },
        { name: "水中", id: "Underwater", en: "Underwater City" },
        { name: "資源・バイオ", id: "Resource", en: "Sustainable Resources" },
        { name: "エコ・ライフ", id: "Eco-Life", en: "Eco Lifestyle" }
    ];

    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-gx-cyan">
                            GX Prime Visuals
                        </Link>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                            ビジネス・プレゼンテーションのための<br />
                            高解像度AI生成アセットライブラリ。<br />
                            <span className="text-slate-500 block mt-2 leading-tight">
                                All images are AI-generated and available for free commercial and personal use under a royalty-free license.
                            </span>
                        </p>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">License</span>
                            <span className="text-gx-emerald text-[10px] font-bold font-mono leading-tight">
                                #CommercialUse #RoyaltyFree<br />
                                Commercial Use OK / No Attribution Required
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Categories */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            Categories
                        </h3>
                        <ul className="grid grid-cols-1 gap-3">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/categories/${cat.id}`}
                                        className="text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-between group"
                                    >
                                        <div className="flex flex-col">
                                            <span>{cat.name}</span>
                                            <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">{cat.en}</span>
                                        </div>
                                        <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-600 group-hover:text-gx-cyan transition-colors">{getCategoryCount(cat.id)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal & Info */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase">
                            Information
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-gx-cyan transition-colors text-sm">
                                    当サイトについて (About)
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-400 hover:text-gx-cyan transition-colors text-sm font-bold">
                                    お問い合わせ (Contact)
                                </Link>
                            </li>
                            <li className="pt-4 border-t border-white/5">
                                <Link href="/terms" className="block text-slate-500 hover:text-slate-300 transition-colors text-xs mb-2">
                                    利用規約 (Terms of Service)
                                </Link>
                                <Link href="/privacy" className="block text-slate-500 hover:text-slate-300 transition-colors text-xs">
                                    プライバシーポリシー (Privacy Policy)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact/Action */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase">
                            Support
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            アセットのリクエストや、<br />
                            エンタープライズ利用に関するご相談は<br />
                            フォームよりご連絡ください。<br />
                            <span className="text-[10px] text-slate-400 block mt-1">Free Assets for All Creators</span>
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center w-full px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-sm font-bold rounded-lg transition-all"
                        >
                            お問い合わせフォーム
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 space-y-4 md:space-y-0 text-slate-500">
                    <p className="text-[10px] font-mono uppercase">
                        © {currentYear} GX Prime Visuals. All images are AI-generated and available for free commercial and personal use.
                    </p>
                    <div className="flex gap-4 text-[10px] font-mono uppercase tracking-wider">
                        <span>Built for Future</span>
                        <span>•</span>
                        <span>Tokyo, Japan</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
