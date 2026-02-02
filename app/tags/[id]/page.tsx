import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 重要：GitHub Pages（静的書き出し）で動かすための「予約リスト」
export async function generateStaticParams() {
  const commonTags = ["GX", "未来都市", "脱炭素", "テクノロジー", "モビリティ", "水中", "宇宙"];
  return commonTags.map((tag) => ({ id: tag }));
}

// 🚀 ページ本体
export default async function TagPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15 の仕様に合わせて params を待機
  const resolvedParams = await params;
  const tagId = decodeURIComponent(resolvedParams.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic font-sans">
          Tag
        </p>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          #{tagId}
        </h1>
        <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />
        
        {/* MaterialGallery にタグ名を渡してフィルタリング */}
        <MaterialGallery searchQuery={tagId} />
      </main>
    </div>
  );
}
