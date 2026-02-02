"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X, Download, Tag, Monitor } from "lucide-react";

export default function CategorySection({ title, description, images }: any) {
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // 画像URLの生成ロジック
    const getFinalUrl = (img: any) => {
        let folder = "grok";
        let ext = ".jpg";
        if (img.id.startsWith("mid-")) folder = "mid";
        if (img.id.startsWith("niji-")) folder = "niji";
        if (img.id.startsWith("gpt-")) { folder = "GPT"; ext = ".png"; }
        if (img.id.startsWith("nano-")) folder = "nano";
        if (img.id.startsWith("g-")) folder = "grok";
        return `/assets/images/${folder}/${img.id}${ext}`;
    };

    if (!images || images.length === 0) return null;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 bg-slate-950">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-cyan-500" />
                        <span className="text-cyan-500 font-bold text-xs uppercase tracking-[0.3em]">Featured Collection</span>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>
                <Link href="/gallery" className="flex items-center gap-2 text-cyan-400 font-bold hover:text-white hover:gap-4 transition-all group shrink-0">
                    ギャラリーを見る <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img: any) => (
                    <div 
                        key={img.id} 
                        className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image src={getFinalUrl(img)} alt={img.title} fill className="object-cover transition-all duration-700 group-hover:scale-110" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-8 flex flex-col justify-end">
                            <h3 className="text-xl font-bold text-white mb-2">{img.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 詳細モーダル（メタデータ対応） */}
            {selectedImage && (
                <DetailModal 
                    image={selectedImage} 
                    url={getFinalUrl(selectedImage)} 
                    onClose={() => setSelectedImage(null)} 
                />
            )}
        </section>
    );
}

// 共通モーダルコンポーネント
export function DetailModal({ image, url, onClose }: any) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in" onClick={onClose}>
            <div className="relative max-w-6xl w-full h-full flex flex-col md:flex-row bg-slate-900 rounded-3xl overflow-hidden border border-white/10" onClick={e => e.stopPropagation()}>
                <div className="relative flex-1 bg-black/20 flex items-center justify-center">
                    <Image src={url} alt={image.title} fill className="object-contain" unoptimized />
                    <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full text-white transition-all"><X /></button>
                </div>
                <div className="w-full md:w-[400px] p-8 flex flex-col bg-slate-900/50 overflow-y-auto">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{image.title}</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">{image.description}</p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                <Monitor className="w-5 h-5 text-cyan-400" />
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">解像度</p>
                                    <p className="text-white font-bold">{image.width} × {image.height}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                <Tag className="w-5 h-5 text-cyan-400" />
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">タグ</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {image.tags?.map((tag: string) => (
                                            <span key={tag} className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" /> 無料ダウンロード
                    </button>
                </div>
            </div>
        </div>
    );
}
