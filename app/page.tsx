"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import MaterialGallery from "@/components/MaterialGallery";
import JsonLd from "@/components/JsonLd";
import CategorySection from "@/components/CategorySection";
import { useSearch } from "@/context/SearchContext";

export default function Home() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [assets, setAssets] = useState<any[]>([]);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const response = await fetch('/data/assets.json');
                const data = await response.json();
                setAssets(data);
            } catch (e) {
                console.error("Error loading assets:", e);
            }
        };
        loadAssets();
    }, []);

    // カテゴリー別のフィルタリング（CategorySection用）
    const energyImages = assets.filter(item => item.category === 'GX').slice(0, 3);
    const smartCityImages = assets.filter(item => item.category === '未来都市').slice(0, 3);
    const mobilityImages = assets.filter(item => item.category === 'モビリティ').slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
            {/* 正式なヘッダー・タイトルセクション */}
            <header className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* ブランドアイコン（GXシアンのアクセント） */}
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                            <span className="text-slate-950 font-black text-xs">AI</span>
                        </div>
                        {/* ブランド名 */}
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            AI Material <span className="text-cyan-400 not-italic">Prime</span>
                        </span>
                    </Link>
                </div>
            </header>

            <main className="pt-16">
                <JsonLd images={assets.map(a => ({ src: a.url }))} />
                <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {/* 各カテゴリーセクション */}
                {energyImages.length > 0 && (
                    <CategorySection
                        title="GX / Green Transformation"
                        description="次世代エネルギーの主役、水素プラントや供給チェーンのビジュアル。"
                        images={energyImages}
                    />
                )}

                {smartCityImages.length > 0 && (
                    <CategorySection
                        title="未来都市 / Future City"
                        description="AI技術と都市機能が融合した、持続可能な生活空間。"
                        images={smartCityImages}
                    />
                )}

                <div id="gallery-section" className="py-12 text-center border-t border-white/5 mt-6 bg-slate-900/30">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-300 mb-2">最新アセット</h2>
                        <p className="text-slate-500 text-sm">New Arrivals</p>
                    </div>
                    <MaterialGallery />
                </div>
            </main>
        </div>
    );
}
