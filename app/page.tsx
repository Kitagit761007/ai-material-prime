"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import MaterialGallery from "@/components/MaterialGallery";
import { useSearch } from "@/context/SearchContext";
import assetsData from "@/public/data/assets.json";

export default function Home() {
  const { searchQuery, setSearchQuery } = useSearch();

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
        {/* 🚀 Hero に必要な道具（props）を渡します */}
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
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
          <MaterialGallery searchQuery={searchQuery || undefined} />
        </div>
      </main>
    </div>
  );
}
