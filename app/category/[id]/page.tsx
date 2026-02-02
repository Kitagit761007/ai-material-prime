"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 【重要】印刷予約リスト
// ここに書いた名前のページが、ビルド時に自動で作られます。
// あなたのサイトにあるカテゴリー名を正確に（大文字小文字も合わせて）並べてください。
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
  
  // URLから「GX」などの名前を受け取ります
  const categoryId = params.id ? decodeURIComponent(params.id as string) : "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* 画面上部の共通メニュー */}
      <Header />
      
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-left">
          <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">Category</p>
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
            {categoryId}
          </h1>
          <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />
        </div>
        
        {/* そのカテゴリーの画像だけを表示する機能 */}
        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
