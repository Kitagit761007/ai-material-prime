import ImageGrid from "@/components/ImageGrid";
import assets from "@/data/assets.json";
import { ChevronLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const categoryMap: Record<string, string> = {
    "Energy": "GX / Green Transformation (GX)",
    "Mobility": "モビリティ / Clean Mobility",
    "Tech": "テクノロジー / Advanced Tech",
    "Resource": "資源・バイオ / Sustainable Resource",
    "SmartCity": "未来都市 / Future City",
    "Eco-Life": "エコ・ライフ / Eco Lifestyle",
    "Space": "宇宙 / Space & Galaxy",
    "Underwater": "水中 / Underwater City"
};

type Props = {
    params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const japaneseTitle = categoryMap[category];

    if (!japaneseTitle) {
        return {
            title: "Category Not Found | AI MATERIAL PRIME",
        };
    }

    return {
        title: `${japaneseTitle} | AI MATERIAL PRIME`,
        description: `Download high-quality, royalty-free AI generated assets for ${japaneseTitle}.`,
    };
}

export async function generateStaticParams() {
    const categories = ["Energy", "Mobility", "Tech", "Resource", "SmartCity", "Eco-Life", "Space", "Underwater"];
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
