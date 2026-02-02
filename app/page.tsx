"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import MaterialGallery from "@/components/MaterialGallery";
import { useSearch } from "@/context/SearchContext";
import assetsData from "@/public/data/assets.json";

export default function Home() {
  const { searchQuery } = useSearch();

  // カテゴリーごとに画像を選別（トップページ用の表示）
  const categories = ["GX", "未来都市", "モビリティ"];
  const sections = categories.map(cat => ({
    title: cat,
    description: `${cat}スタイルのAI生成ビジュアルコレクション。`,
    images: assetsData.filter(asset => asset.category === cat).slice(0, 3)
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main>
        {/* 1. ヒーローセクション */}
        <Hero />
        
        {/* 2. カテゴリー別プレビュー（検索中ではない時だけ表示） */}
        {!searchQuery && sections.map(section => (
          <CategorySection 
            key={section.title} 
            title={section.title} 
            description={section.description} 
            images={section.images} 
          />
        ))}

        {/* 3. 全画像ギャラリー */}
        <div id="gallery-section" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
              {searchQuery ? `Search: ${searchQuery}` : "Explore All Assets"}
            </h2>
          </div>
          <MaterialGallery filterCategory={searchQuery || undefined} />
        </div>
      </main>
    </div>
  );
}
