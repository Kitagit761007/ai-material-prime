"use client";
import { useState } from "react";
import Image from "next/image";
import { X, Download, Tag, Monitor, Share2, Link2, ChevronRight, ShieldCheck, FileType, Linkedin, Send } from "lucide-react";
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
            {selectedImage && <DetailModal image={selectedImage} url={getFinalUrl(selectedImage)} onClose={() => setSelectedImage(null)} setSearchQuery={setSearchQuery} />}
        </section>
    );
}

// 🚀 export をつけて他のファイルからも呼べるようにします
export function DetailModal({ image, url, onClose, setSearchQuery }: any) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl" onClick={onClose}>
            <div className="relative max-w-6xl w-full h-full flex flex-col md:flex-row bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="relative flex-1 bg-black/40 flex items-center justify-center">
                    <Image src={url} alt={image.title} fill className="object-contain" unoptimized />
                    <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full text-white transition-all"><X /></button>
                </div>
                <div className="w-full md:w-[400px] p-8 flex flex-col bg-slate-950 text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-slate-400 text-xs mb-8">{image.description || "詳細データ準備中"}</p>
                    <button onClick={() => window.open(url, '_blank')} className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-xl hover:bg-white transition-all">無料ダウンロード</button>
                </div>
            </div>
        </div>
    );
}
