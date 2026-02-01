import MaterialGallery from "@/components/MaterialGallery";

export const metadata = {
    title: 'ギャラリー | 未来を描くAI生成画像素材素材集',
    description: '水素エネルギー、スマートシティ、次世代モビリティなど、未来を象徴する高品質なAI生成画像素材を一覧で。商用利用可能なフリー素材が豊富。',
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

            <MaterialGallery />
        </div>
    );
}
