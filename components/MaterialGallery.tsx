"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Download, Heart, Maximize2 } from "lucide-react";

export default function MaterialGallery() {
    const [assets, setAssets] = useState([]);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    useEffect(() => {
        fetch(`/data/assets.json?v=${Date.now()}`).then(res => res.json()).then(setAssets);
    }, []);

    // 正しい画像パスを生成する関数
    const getFinalUrl = (item: any) => {
        let folder = "grok";
        let ext = ".jpg";
        if (item.id.startsWith("mid-")) folder = "mid";
        if (item.id.startsWith("niji-")) folder = "niji";
        if (item.id.startsWith("gpt-")) { folder = "GPT"; ext = ".png"; }
        if (item.id.startsWith("nano-")) folder = "nano";
        if (item.id.startsWith("g-")) folder = "grok";
        return `/assets/images/${folder}/${item.id}${ext}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assets.map((item: any) => (
                    <GalleryCard key={item.id} item={item} url={getFinalUrl(item)} onClick={() => setSelectedImage(item)} />
                ))}
            </div>

            {/* --- 画像拡大モーダル --- */}
            {selectedImage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-5xl w-full h-full flex flex-col md:flex-row bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                        {/* 左：画像エリア */}
                        <div className="relative flex-1 bg-black/20 flex items-center justify-center overflow-hidden">
                            <Image src={getFinalUrl(selectedImage)} alt={selectedImage.title} fill className="object-contain" unoptimized />
                            <button onClick={() => setSelectedImage(null)} className="absolute top-6 left-6 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full text-white transition-all"><X /></button>
                        </div>
                        {/* 右：詳細エリア */}
                        <div className="w-full md:w-80 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 bg-slate-900/50">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">{selectedImage.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">{selectedImage.description}</p>
                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Category</p>
                                        <p className="text-cyan-400 font-bold">{selectedImage.category}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" /> DOWNLOAD HD
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function GalleryCard({ item, url, onClick }: any) {
    const [hasError, setHasError] = useState(false);
    if (hasError) return null;

    return (
        <div className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-zoom-in" onClick={onClick}>
            <Image src={url} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized onError={() => setHasError(true)} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <Maximize2 className="absolute top-4 right-4 text-white/50 group-hover:text-cyan-400 transition-colors" />
                <p className="text-white font-bold truncate">{item.title}</p>
            </div>
        </div>
    );
}
