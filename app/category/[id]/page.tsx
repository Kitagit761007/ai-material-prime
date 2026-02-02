import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 ビルド予約リスト（サーバーの仕事）
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

// 🚀 ページを組み立てる（サーバーの仕事）
// ※ params を「Promise」という箱として受け取るのが、ビルドを通すための絶対条件です
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsの箱を開けて、中身（categoryId）を取り出すまで「待つ（await）」
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
        
        {/* 画像の表示だけを、クライアント側（MaterialGallery）に任せる */}
        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
