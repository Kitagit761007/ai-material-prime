"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import MaterialGallery from "@/components/MaterialGallery";
import { useSearch } from "@/context/SearchContext";
import assetsData from "@/public/data/assets.json";

export default function Home() {
  const { searchQuery, setSearchQuery } = useSearch();

  // カテゴリーごとのプレビュー設定
  const categories = ["GX", "未来都市", "モビリティ"];
  const sections = categories.map((cat) => ({
    title: cat,
    description: `${cat}のビジュアルコレクション。`,
    images: assetsData.filter((asset) => asset.category === cat).slice(0, 3),
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main>
        {/* 検索機能をHeroに渡す以前の形式 */}
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* 検索中ではない時だけカテゴリーセクションを表示 */}
        {!searchQuery &&
          sections.map((section) => (
            <CategorySection
              key={section.title}
              title={section.title}
              description={section.description}
              images={section.images}
            />
          ))}

        {/* メインギャラリー：検索ワードがあればそれに基づいて表示 */}
        <div
  id="gallery-section"
  className="pt-8 pb-16 px-6 max-w-7xl mx-auto border-t border-white/5"
>
          <div className="mb-8">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
              {searchQuery ? `Search: ${searchQuery}` : "Explore All Assets"}
            </h2>
          </div>
          <MaterialGallery searchQuery={searchQuery || undefined} />
        </div>
      </main>
    </div>
  );
}
