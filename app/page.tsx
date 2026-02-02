"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import MaterialGallery from "@/components/MaterialGallery";
import { useSearch } from "@/context/SearchContext";
import assetsData from "@/public/data/assets.json";

export default function Home() {
  const { searchQuery, setSearchQuery } = useSearch();

  // 以前の、トップページで完結する表示形式です
  const categories = ["GX", "未来都市", "モビリティ"];
  const sections = categories.map(cat => ({
    title: cat,
    description: `${cat}のビジュアルコレクション。`,
    images: assetsData.filter(asset => asset.category === cat).slice(0, 3)
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main>
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* 検索中ではない時だけ、カテゴリーセクションを表示 */}
        {!searchQuery && sections.map(section => (
          <CategorySection 
            key={section.title} 
            title={section.title} 
            description={section.description} 
            images={section.images} 
          />
        ))}

        <div id="gallery-section" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-4xl font-black text-white italic uppercase mb-12">
            {searchQuery ? `Search: ${searchQuery}` : "Explore All Assets"}
          </h2>
          {/* MaterialGallery が検索やカテゴリーの「表示切り替え」をすべて担当します */}
          <MaterialGallery filterCategory={searchQuery || undefined} />
        </div>
      </main>
    </div>
  );
}
