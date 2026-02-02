import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 印刷予約：ここで「どのページを作るか」を印刷所に伝えます
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

// 画面の構成（サーバー側で組み立て）
export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = decodeURIComponent(params.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-left">
        <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">Category</p>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          {categoryId}
        </h1>
        <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />
        
        {/* 画像の表示処理（クライアント側）にバトンタッチ */}
        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
