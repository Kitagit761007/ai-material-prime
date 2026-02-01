import ImageGrid from "@/components/ImageGrid";
import assets from "@/public/data/assets.json";
import { ChevronLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const categoryMap: Record<string, string> = {
    "GX": "GX / Green Transformation (GX)",
    "モビリティ": "モビリティ / Clean Mobility",
    "テクノロジー": "テクノロジー / Advanced Tech",
    "資源・バイオ": "資源・バイオ / Sustainable Resource",
    "未来都市": "未来都市 / Future City",
    "エコ・ライフ": "エコ・ライフ / Eco Lifestyle",
    "宇宙": "宇宙 / Space & Galaxy",
    "水中": "水中 / Underwater City"
};

type Props = {
    params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const japaneseTitle = categoryMap[category] || category;

    return {
        title: `${japaneseTitle} | 画像素材集`,
        description: `${japaneseTitle}をテーマにした高品質なAI生成画像素材を無料で提供しています。商用利用可・クレジット表示不要。`,
        alternates: {
            canonical: `/categories/${category}`,
        },
    };
}

export async function generateStaticParams() {
    const categories = ["GX", "モビリティ", "テクノロジー", "資源・バイオ", "未来都市", "エコ・ライフ", "宇宙", "水中"];
    return categories.map((cat) => ({
        category: cat,
    }));
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const japaneseTitle = categoryMap[category];

    if (!japaneseTitle) {
        notFound();
    }

    const resultCount = assets.filter(item => item.category === category).length;

    return (
        <div className="flex flex-col min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 w-full mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gx-cyan/10 rounded-2xl border border-gx-cyan/20">
                        <LayoutGrid className="w-8 h-8 text-gx-cyan" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            {japaneseTitle}
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                            このカテゴリーには <span className="text-gx-cyan font-bold text-base">{resultCount}</span> 件の素材があります
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-10" />
            </div>

            <ImageGrid searchQuery={category} />
        </div>
    );
}
