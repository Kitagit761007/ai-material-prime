import ImageGrid from "@/components/ImageGrid";
import assets from "@/public/data/assets.json";
import { ChevronLeft, Hash } from "lucide-react";
import Link from "next/link";
import TagSlider from "@/components/TagSlider";
import { Metadata } from "next";

type Props = {
    params: Promise<{ tag: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const tag = resolvedParams.tag ? decodeURIComponent(resolvedParams.tag) : "";

    return {
        title: `「${tag}」のAI画像素材 | 未来を描くビジュアル`,
        description: `${tag}に関連する高品質なAI生成画像素材。スマートシティや水素エネルギーなど、未来領域のビジュアルを無料でダウンロード可能。`,
        alternates: {
            canonical: `/tags/${resolvedParams.tag}`,
        },
    };
}

// Static params generation for GitHub Pages compatibility
export async function generateStaticParams() {
    const tags = new Set<string>();
    assets.forEach(asset => {
        asset.tags.forEach(tag => tags.add(tag.replace("#", "")));
        tags.add(asset.category);
    });
    // Ensure tags are returned in their raw form; Next.js handles the filesystem encoding for [tag]
    return Array.from(tags).map((tag) => ({
        tag: tag,
    }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const resolvedParams = await params;
    const rawTag = resolvedParams.tag;
    const decodedTag = rawTag ? decodeURIComponent(rawTag) : "";

    // Server-side calculation of hit count for SSG
    const query = decodedTag.toLowerCase().replace("#", "");
    const resultCount = assets.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().replace("#", "").includes(query)) ||
        item.category.toLowerCase().includes(query)
    ).length;

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
                            「{decodedTag || "不明なタグ"}」の検索結果
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                            該当する素材が <span className="text-gx-cyan font-bold text-base">{resultCount}</span> 件見つかりました
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-10 mb-2" />
                <TagSlider currentTag={decodedTag} />
            </div>

            <ImageGrid searchQuery={decodedTag} />
        </div>
    );
}
