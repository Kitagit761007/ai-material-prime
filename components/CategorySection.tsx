"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Download, Tag, Monitor, Share2, Link2, ChevronRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

export default function CategorySection({ title, description, images }: any) {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const { setSearchQuery } = useSearch();

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
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>
                <button 
                    onClick={() => {
                        setSearchQuery(title);
                        document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-all group shrink-0"
                >
                    カテゴリーを詳しく見る <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img: any) => (
                    <div key={img.id} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl cursor-pointer" onClick={() => setSelectedImage(img)}>
                        <Image src={getFinalUrl(img)} alt={img.title} fill className="object-cover transition-all duration-700 group-hover:scale-110" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-8 flex flex-col justify-end text-left">
                            <h3 className="text-xl font-bold text-white mb-2">{img.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <DetailModal 
                    image={selectedImage} 
                    url={getFinalUrl(selectedImage)} 
                    onClose={() => setSelectedImage(null)} 
                    setSearchQuery={setSearchQuery}
                />
            )}
        </section>
    );
}

export function DetailModal({ image, url, onClose, setSearchQuery }: any) {
    const handleTagClick = (tag: string) => {
        setSearchQuery(tag);
        onClose();
        setTimeout(() => {
            document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl" onClick={onClose}>
            <div className="relative max-w-6xl w-full h-full flex flex-col md:flex-row bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="relative flex-1 bg-black/20 flex items-center justify-center">
                    <Image src={url} alt={image.title} fill className="object-contain" unoptimized />
                    <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full text-white transition-all"><X /></button>
                </div>
                <div className="w-full md:w-[400px] p-8 flex flex-col bg-slate-900/50 overflow-y-auto text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-slate-400 text-xs mb-8 leading-relaxed">{image.description}</p>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                            <Monitor className="w-5 h-5 text-cyan-400" />
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-black">解像度</p>
                                <p className="text-white font-bold">{image.width || 1024} × {image.height || 1024} px</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                            <Tag className="w-5 h-5 text-cyan-400" />
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-black">タグ</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {image.tags?.map((tag: string) => (
                                        <button 
                                            key={tag} 
                                            onClick={() => handleTagClick(tag)}
                                            className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition-colors"
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-3">素材を共有</p>
                        <div className="flex gap-2">
                            <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)} className="p-3 bg-white/5 rounded-full hover:bg-cyan-500 transition-colors text-white"><Share2 className="w-4 h-4" /></button>
                            <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="p-3 bg-white/5 rounded-full hover:bg-green-600 transition-colors text-white"><Link2 className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center gap-2 mt-auto">
                        <Download className="w-5 h-5" /> 無料ダウンロード
                    </button>
                </div>
            </div>
        </div>
    );
}
