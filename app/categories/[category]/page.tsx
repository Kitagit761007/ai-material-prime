import ImageGrid from "@/components/ImageGrid";
import assets from "@/data/assets.json";
import { ChevronLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryMap: Record<string, string> = {
    "Energy": "エネルギー / Energy",
    "Mobility": "モビリティ / Mobility",
    "Tech": "テクノロジー / Tech",
    "Resource": "資源・インフラ / Resource",
    "Eco-Life": "エコライフ / Eco-Life"
};

export async function generateStaticParams() {
    const categories = ["Energy", "Mobility", "Tech", "Resource", "Eco-Life"];
    return categories.map((cat) => ({
        category: cat,
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const resolvedParams = await params;
    const category = resolvedParams.category;
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
