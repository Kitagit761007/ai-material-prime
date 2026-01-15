import ImageGrid from "@/components/ImageGrid";
import assets from "@/data/assets.json";

export const metadata = {
    title: 'GX Asset Library | GX Prime Visuals',
    description: 'AI生成の高品質なGXビジュアル素材一覧。',
};

export default function GalleryPage() {
    return (
        <div className="min-h-screen pb-20">
            <div className="pt-24 pb-12 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    GX Asset Library
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto">
                    独自のAnti-Gravity Pipelineによって生成された、高品質なGXアセットコレクション。
                    <br />
                    詳細表示・ダウンロードが可能です。
                </p>
            </div>

            {/* Pass all assets explicitly, though default is all */}
            <ImageGrid initialItems={assets} />
        </div>
    );
}
