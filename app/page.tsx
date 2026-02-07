"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import MaterialGallery from "@/components/MaterialGallery";
import { useSearch } from "@/context/SearchContext";
import assetsData from "@/public/data/assets.json";

type Asset = {
  id: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
};

export default function Home() {
  const { searchQuery, setSearchQuery } = useSearch();

  const assets = assetsData as Asset[];

  // トップで見せたいカテゴリ（まずは固定）
  const categories = ["GX", "未来都市", "モビリティ"];
<<<<<<< HEAD

  // トップ用のカテゴリ説明（SEO/AdSense的に「中身のある日本語」に寄せる）
  const categoryDescriptions: Record<string, string> = {
    GX: "脱炭素・再生可能エネルギー・次世代インフラをテーマにしたビジュアル素材。資料・Web・動画の背景にも使いやすい構図を中心にまとめています。",
    未来都市:
      "スマートシティ、都市交通、クリーンテックなど“近未来の街”を想起させる素材を収録。世界観づくりやキービジュアルにも使えるラインナップです。",
    モビリティ:
      "EV・水素・次世代交通など移動体の表現に特化した素材。プロダクト紹介やコンセプト提案の補助素材として使いやすいものを揃えています。",
  };

  // カテゴリーセクション（各カテゴリから3枚プレビュー）
  const sections = categories
    .map((cat) => {
      const images = assets.filter((a) => a.category === cat).slice(0, 3);
      return {
        title: cat,
        description: categoryDescriptions[cat] ?? `${cat}のビジュアルコレクション。`,
        images,
      };
    })
    // 念のため、画像が1枚もないカテゴリは表示しない
    .filter((s) => s.images.length > 0);

  const hasSearch = Boolean(searchQuery && searchQuery.trim().length > 0);
=======
  const sections = categories.map((cat) => ({
    title: cat,
    description: `${cat}のビジュアルコレクション。`,
    images: assetsData.filter((asset) => asset.category === cat).slice(0, 3),
  }));
>>>>>>> main

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
<<<<<<< HEAD

      <main>
        {/* ヒーロー（検索） */}
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* トップ説明（SEO/AdSense向けに “ページの目的” を明文化） */}
        <section className="px-6 max-w-7xl mx-auto mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              未来を描くAI生成画像素材ギャラリー
            </h1>
            <p className="mt-3 text-slate-300 leading-relaxed">
              このサイトでは、近未来・クリーンテック・スマートシティなどの世界観で制作した
              画像素材をまとめて公開しています。用途に合わせて検索し、気に入った素材は
              そのままダウンロードして活用できます。
            </p>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              ※各画像の利用可否や注意点は、サイト内の表記に従ってください。掲載内容は必要に応じて更新します。
            </p>
=======
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
>>>>>>> main
          </div>
        </section>

        {/* 検索していない時だけカテゴリーのプレビューを表示 */}
        {!hasSearch &&
          sections.map((section) => (
            <CategorySection
              key={section.title}
              title={section.title}
              description={section.description}
              images={section.images}
            />
          ))}

        {/* メインギャラリー */}
        <div
          id="gallery-section"
          className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5"
        >
          <div className="mb-6">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
              {hasSearch ? `Search: ${searchQuery}` : "Explore All Assets"}
            </h2>
            <p className="mt-3 text-slate-400 leading-relaxed">
              {hasSearch
                ? "検索結果に一致する素材を表示しています。キーワードを変えると絞り込みできます。"
                : "カテゴリ別のプレビューに加えて、全素材を一覧で確認できます。気になる素材はクリックで詳細を確認してください。"}
            </p>
          </div>

          <MaterialGallery searchQuery={hasSearch ? searchQuery : undefined} />
        </div>
      </main>
    </div>
  );
}
