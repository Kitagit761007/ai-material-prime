import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";

// ✅ 静的出力で “存在するカテゴリだけ” を生成させる
export const dynamicParams = false; // これがないと未生成パスにアクセスされて404になりやすい

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "data", "assets.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const assets = JSON.parse(fileContents) as Array<{ category?: string | null }>;

  const categories = Array.from(
    new Set(
      assets
        .map((a) => (a.category ?? "").trim())
        .filter((c) => c.length > 0)
    )
  );

  // ✅ ここで encode しない（Next側がURLとして扱うときに自動で処理する）
  return categories.map((category) => ({ id: category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  // ✅ 念のため decode（%E... でも、日本語でも両対応）
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

        {/* カテゴリ名で絞り込み（MaterialGallery側がタグ検索しか対応してない場合は次で直す） */}
        <MaterialGallery category={categoryName} />
      </main>
    </div>
  );
}
