import ImageGrid from "@/components/ImageGrid";
import assets from "@/data/assets.json";
import { ChevronLeft, Hash } from "lucide-react";
import Link from "next/link";

// Static params generation for GitHub Pages compatibility
export async function generateStaticParams() {
    const tags = new Set<string>();
    assets.forEach(asset => {
        asset.tags.forEach(tag => tags.add(tag.replace("#", "")));
        tags.add(asset.category);
    });
    return Array.from(tags).map((tag) => ({
        tag: tag, // Next.js handles encoding automatically
    }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const resolvedParams = await params;
    const decodedTag = decodeURIComponent(resolvedParams.tag);

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
                        <Hash className="w-8 h-8 text-gx-cyan" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            {decodedTag}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Tag Results: {decodedTag}
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-8" />
            </div>

            <ImageGrid searchQuery={decodedTag} />
        </div>
    );
}
