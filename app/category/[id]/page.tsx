import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";
import fs from "fs";
import path from "path";

interface Asset {
  category: string;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "data", "assets.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const assets: Asset[] = JSON.parse(fileContents);

  const categories = Array.from(
    new Set(assets.map((asset) => asset.category))
  );

  return categories.map((category) => ({
    id: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const categoryName = decodeURIComponent(params.id);

  return {
    title: `${categoryName} | GX Prime Visuals`,
    description: `${categoryName}カテゴリーのAI生成素材一覧`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const categoryId = decodeURIComponent(resolvedParams.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">Category</p>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
          {categoryId}
        </h1>
        <div className="h-1 w-20 bg-cyan-500 mt-4 mb-12" />

        <MaterialGallery filterCategory={categoryId} />
      </main>
    </div>
  );
}
