import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 サーバーの仕事：あらかじめ「GX」「未来都市」などのページを予約・作成する
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

// 🚀 サーバーの仕事：ページの土台を組み立てる
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // 最新のNext.jsルールに従い、paramsを確定させます
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
        
        {/* 表示処理（動き）は、クライアント側の MaterialGallery に丸投げします */}
        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
