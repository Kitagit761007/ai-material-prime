import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 タグページの予約リスト（GitHub Pages用）
export async function generateStaticParams() {
  const commonTags = ['GX', '未来都市', '脱炭素', 'テクノロジー', 'モビリティ', '水中', '宇宙'];
  return commonTags.map(tag => ({ id: tag }));
}

export default async function TagPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const tagId = decodeURIComponent(resolvedParams.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">Tag</p>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          #{tagId}
        </h1>
        <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />
        
        {/* MaterialGallery に「検索ワード」としてタグ名を渡します */}
        <MaterialGallery searchQuery={tagId} />
      </main>
    </div>
  );
}
