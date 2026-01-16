"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ImageGrid from "@/components/ImageGrid";
import JsonLd from "@/components/JsonLd";
import CategorySection from "@/components/CategorySection";
import assets from "@/data/assets.json";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const hydrogenImages = assets.filter(item => item.category === 'hydrogen').slice(0, 3);
    const smartCityImages = assets.filter(item => item.category === 'smartcity').slice(0, 3);
    const infraImages = assets.filter(item => item.category === 'infrastructure').slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            <JsonLd images={assets.map(a => ({ src: a.src }))} />
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Category Sections */}
            {hydrogenImages.length > 0 && (
                <CategorySection
                    title="水素エネルギー / Hydrogen"
                    description="次世代エネルギーの主役、水素プラントや供給チェーンのビジュアル。"
                    images={hydrogenImages}
                />
            )}

            {smartCityImages.length > 0 && (
                <CategorySection
                    title="スマートシティ / Smart City"
                    description="IOE技術と都市機能が融合した、未来の生活空間。"
                    images={smartCityImages}
                />
            )}

            {infraImages.length > 0 && (
                <CategorySection
                    title="次世代インフラ / Infrastructure"
                    description="強靭でサステナブルな社会基盤のイメージ。"
                    images={infraImages}
                />
            )}

            <div className="py-12 text-center border-t border-white/5 mt-12 bg-slate-900/30">
                <h2 className="text-2xl font-bold text-slate-300 mb-2">最新アセット</h2>
                <p className="text-slate-500 text-sm mb-8">New Arrivals</p>
                <ImageGrid searchQuery={searchQuery} />
            </div>
        </div>
    );
}
