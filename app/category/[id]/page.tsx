import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 ビルド予約：GitHub Pagesはこのリストを見て「GX.html」などを作成します。
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

// 🚀 ページの土台：ここでは「データを受け取るだけ」に徹します。
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsは「Promise」なので、必ず await で待ちます（これが最新のビルドルールです）
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
        
        {/* 実際の画像表示（ブラウザで動く処理）は、MaterialGalleryに丸投げします */}
        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
