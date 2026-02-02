import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 ビルド予約リスト
export async function generateStaticParams() {
  return [
    { id: 'GX' }, { id: '未来都市' }, { id: 'モビリティ' },
    { id: 'grok' }, { id: 'GPT' }, { id: 'niji' }, { id: 'mid' }
  ];
}

// 🚀 ページ本体：必ず async にし、params を await します
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // ここが重要！ params は Promise なので await で中身を取り出します
  const resolvedParams = await params;
  const categoryId = decodeURIComponent(resolvedParams.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-left">
        <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic font-sans">Category</p>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          {categoryId}
        </h1>
        <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />
        
        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
