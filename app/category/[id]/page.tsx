"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 印刷予約リスト：GitHubに「このページをあらかじめ作って」と伝えます
export async function generateStaticParams() {
  return [
    { id: 'GX' },
    { id: '未来都市' },
    { id: 'モビリティ' },
    { id: 'grok' },
    { id: 'GPT' },
    { id: 'niji' },
    { id: 'mid' }
  ];
}

export default function CategoryPage() {
  const params = useParams();
  // URLからカテゴリー名（GXなど）を抜き出します
  const categoryId = params.id ? decodeURIComponent(params.id as string) : "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-left">
        <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">Category</p>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          {categoryId}
        </h1>
        <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />
        
        {/* そのカテゴリーの画像だけを表示（filterCategoryを渡します） */}
        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
