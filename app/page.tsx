"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import MaterialGallery from "@/components/MaterialGallery";
import JsonLd from "@/components/JsonLd";
import CategorySection from "@/components/CategorySection";
import { useSearch } from "@/context/SearchContext";
import { Menu, Heart } from "lucide-react";

export default function Home() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [assets, setAssets] = useState<any[]>([]);

    useEffect(() => {
        fetch('/data/assets.json').then(res => res.json()).then(setAssets);
    }, []);

    const energyImages = assets.filter(item => item.category === 'GX').slice(0, 3);
    const smartCityImages = assets.filter(item => item.category === '未来都市').slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
            <header className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                            <span className="text-slate-950 font-black text-xs">AI</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            AI Material <span className="text-cyan-400 not-italic">Prime</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">ホーム</Link>
                        <Link href="/gallery" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors">ギャラリー</Link>
                        <Link href="/favorites" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <Heart className="w-4 h-4" /> お気に入り
                        </Link>
                    </nav>

                    <button className="md:hidden text-white"><Menu /></button>
                </div>
            </header>

            <main className="pt-16">
                <JsonLd images={assets.map(a => ({ src: a.url }))} />
                <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {energyImages.length > 0 && (
                    <CategorySection title="GX / Green Transformation" description="次世代エネルギーのビジュアル資産。" images={energyImages} />
                )}

                <div id="gallery-section" className="py-12 bg-slate-900/30">
                    <div className="max-w-7xl mx-auto px-6 mb-12 text-left">
                        <h2 className="text-3xl font-black text-white">LATEST ASSETS / 最新アセット</h2>
                        <div className="h-1 w-12 bg-cyan-500 mt-2" />
                    </div>
                    <MaterialGallery />
                </div>
            </main>
        </div>
    );
}
