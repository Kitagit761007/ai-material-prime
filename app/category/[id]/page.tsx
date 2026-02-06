import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// 🚀 カテゴリページの予約リスト（静的出力用）
export async function generateStaticParams() {
  // assets.json を読み込む
  const filePath = path.join(process.cwd(), "public", "data", "assets.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const assets = JSON.parse(fileContents) as Array<{ category?: string | null }>;

  // カテゴリ一覧をユニーク化
  const categories = Array.from(
    new Set(assets.map((a) => a.category).filter((c): c is string => !!c && c.trim() !== ""))
  );

  // URLセグメントは encode して返す（/category/%E... 形式に合わせる）
  return categories.map((category) => ({ id: encodeURIComponent(category) }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  // URLの %E... を日本語に戻す
  const categoryName = decodeURIComponent(resolvedParams.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">
          Category
        </p>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          {categoryName}
        </h1>
        <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />

        {/* MaterialGallery に「検索ワード」としてカテゴリ名を渡します */}
        <MaterialGallery searchQuery={categoryName} />
      </main>
    </div>
  );
}
