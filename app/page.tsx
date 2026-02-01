"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import MaterialGallery from "@/components/MaterialGallery";
import JsonLd from "@/components/JsonLd";
import CategorySection from "@/components/CategorySection";
import { useSearch } from "@/context/SearchContext";
import assets from "@/public/data/assets.json";

export default function Home() {
    const { searchQuery, setSearchQuery } = useSearch();

    const energyImages = assets.filter(item => item.category === 'GX').slice(0, 3);
    const smartCityImages = assets.filter(item => item.category === '未来都市').slice(0, 3);
    const mobilityImages = assets.filter(item => item.category === 'モビリティ').slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            <JsonLd images={assets.map(a => ({ src: a.url }))} />
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Category Sections */}
            {energyImages.length > 0 && (
                <CategorySection
                    title="GX / Green Transformation (GX)"
                    description="次世代エネルギーの主役、水素プラントや供給チェーンのビジュアル。 [Free Assets for All Creators]"
                    images={energyImages}
                />
            )}

            {smartCityImages.length > 0 && (
                <CategorySection
                    title="未来都市 / Future City"
                    description="AI技術と都市機能が融合した、持続可能な生活空間。 [Commercial Use OK]"
                    images={smartCityImages}
                />
            )}

            {mobilityImages.length > 0 && (
                <CategorySection
                    title="モビリティ / Clean Mobility"
                    description="排出ゼロ、自律走行。都市の移動をアップデートするビジュアル。"
                    images={mobilityImages}
                />
            )}

            <div className="py-12 text-center border-t border-white/5 mt-6 bg-slate-900/30">
                <h2 className="text-2xl font-bold text-slate-300 mb-2">最新アセット</h2>
                <p className="text-slate-500 text-sm mb-8">New Arrivals</p>
                <MaterialGallery />
            </div>
        </div>
    );
}
