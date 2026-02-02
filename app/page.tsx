"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import MaterialGallery from "@/components/MaterialGallery";
import JsonLd from "@/components/JsonLd";
import CategorySection from "@/components/CategorySection";
import { useSearch } from "@/context/SearchContext";
import { Menu, Heart, MessageSquare, Tag as TagIcon, LayoutGrid, Image as ImageIcon } from "lucide-react";

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

    const energyImages = assets.filter(item => item.category === 'GX').slice(0, 3);

    // ヘッダーリンク用のスクロール関数
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
            <header className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                            <span className="text-slate-950 font-black text-xs">AI</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            AI Material <span className="text-cyan-400 not-italic">Prime</span>
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/" className="text-[11px] font-bold text-white hover:text-cyan-400 transition-colors">ホーム</Link>
                        <button onClick={() => scrollTo('gallery-section')} className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><ImageIcon className="w-3 h-3" />ギャラリー</button>
                        <button onClick={() => scrollTo('category-section')} className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><LayoutGrid className="w-3 h-3" />カテゴリー</button>
                        <button onClick={() => { setSearchQuery(''); scrollTo('gallery-section'); }} className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><TagIcon className="w-3 h-3" />タグ一覧</button>
                        <Link href="/" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Heart className="w-3 h-3" />お気に入り</Link>
                        <Link href="mailto:info@example.com" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><MessageSquare className="w-3 h-3" />お問い合わせ</Link>
                    </nav>

                    <button className="lg:hidden text-white"><Menu /></button>
                </div>
            </header>

            <main className="pt-16">
                <JsonLd images={assets.map(a => ({ src: a.url }))} />
                <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div id="category-section">
                    {energyImages.length > 0 && (
                        <CategorySection title="GX / Green Transformation" description="次世代エネルギーのビジュアル資産。" images={energyImages} />
                    )}
                </div>

                <div id="gallery-section" className="py-12 bg-slate-900/30">
                    <div className="max-w-7xl mx-auto px-6 mb-12 text-left">
                        <h2 className="text-3xl font-black text-white uppercase italic">Latest Assets / <span className="text-cyan-400">最新アセット</span></h2>
                        <div className="h-1 w-12 bg-cyan-500 mt-2" />
                    </div>
                    <MaterialGallery />
                </div>
            </main>
        </div>
    );
}
