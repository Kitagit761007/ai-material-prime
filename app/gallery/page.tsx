import ImageGrid from "@/components/ImageGrid";

export const metadata = {
    title: 'ギャラリー | GX Prime Visuals',
    description: 'AI生成の高品質なGXビジュアル素材一覧。',
};

export default function GalleryPage() {
    return (
        <div className="min-h-screen pb-20">
            <div className="pt-24 pb-12 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">フルギャラリー</h1>
                <p className="text-slate-400">すべての高品質アセットを閲覧できます。</p>
            </div>
            <ImageGrid />
        </div>
    );
}
