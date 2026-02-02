"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Download, Tag, Monitor, Share2, Twitter, Facebook, Link2 } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

export default function CategorySection({ title, description, images }: any) {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const { setSearchQuery } = useSearch(); // タグ検索用

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

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 bg-slate-950">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="text-left">
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>
                {/* 404を避けるため、一旦トップのギャラリーへ飛ばして検索フィルタをかける仕様にします */}
                <button 
                    onClick={() => {
                        setSearchQuery(title);
                        document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-all group shrink-0"
                >
                    カテゴリーを詳しく見る →
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img: any) => (
                    <div key={img.id} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer" onClick={() => setSelectedImage(img)}>
                        <Image src={getFinalUrl(img)} alt={img.title} fill className="object-cover transition-all duration-700 group-hover:scale-110" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-8 flex flex-col justify-end">
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

function DetailModal({ image, url, onClose, setSearchQuery }: any) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in" onClick={onClose}>
            <div className="relative max-w-6xl w-full h-full flex flex-col md:flex-row bg-slate-900 rounded-3xl overflow-hidden border border-white/10" onClick={e => e.stopPropagation()}>
                <div className="relative flex-1 bg-black/20 flex items-center justify-center">
                    <Image src={url} alt={image.title} fill className="object-contain" unoptimized />
                    <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full text-white"><X /></button>
                </div>
                <div className="w-full md:w-[400px] p-8 flex flex-col bg-slate-900/50 overflow-y-auto">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                        <p className="text-slate-400 text-xs mb-8 leading-relaxed">{image.description}</p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                <Monitor className="w-5 h-5 text-cyan-400" />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 uppercase font-black">解像度</p>
                                    <p className="text-white font-bold">{image.width || 1024} × {image.height || 1024} px</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                <Tag className="w-5 h-5 text-cyan-400" />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 uppercase font-black">タグ</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {image.tags?.map((tag: string) => (
                                            <button 
                                                key={tag} 
                                                onClick={() => { setSearchQuery(tag); onClose(); document.getElementById('gallery-section')?.scrollIntoView(); }}
                                                className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition-colors"
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SNS共有セクション */}
                        <div className="mb-8 text-left">
                            <p className="text-[10px] text-slate-500 uppercase font-black mb-3">素材をシェアする</p>
                            <div className="flex gap-2">
                                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-cyan-500 transition-colors text-white"><Twitter className="w-4 h-4" /></a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-600 transition-colors text-white"><Facebook className="w-4 h-4" /></a>
                                <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="p-3 bg-white/5 rounded-full hover:bg-green-600 transition-colors text-white"><Link2 className="w-4 h-4" /></button>
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
