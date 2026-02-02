"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Download, Tag, Monitor, Share2, Linkedin, Send, ExternalLink, ShieldCheck, FileType } from "lucide-react";
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

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 bg-slate-950">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>
                <button onClick={() => { setSearchQuery(title); document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-cyan-400 font-bold hover:text-white transition-all">カテゴリー詳細を見る →</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img: any) => (
                    <div key={img.id} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer shadow-2xl" onClick={() => setSelectedImage(img)}>
                        <Image src={getFinalUrl(img)} alt={img.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-8 flex flex-col justify-end text-left">
                            <h3 className="text-xl font-bold text-white mb-2">{img.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <DetailModal image={selectedImage} url={getFinalUrl(selectedImage)} onClose={() => setSelectedImage(null)} setSearchQuery={setSearchQuery} />
            )}
        </section>
    );
}

function DetailModal({ image, url, onClose, setSearchQuery }: any) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    // ダウンロード機能（別タブで開く）
    const handleDownload = () => {
        window.open(url, '_blank');
    };

    // タグ検索機能
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
                {/* 左：画像表示 */}
                <div className="relative flex-1 bg-black/40 flex items-center justify-center">
                    <Image src={url} alt={image.title} fill className="object-contain" unoptimized />
                    <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full text-white transition-all"><X /></button>
                </div>

                {/* 右：詳細情報 */}
                <div className="w-full md:w-[400px] p-8 flex flex-col bg-slate-900/50 overflow-y-auto text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-slate-400 text-xs mb-8 leading-relaxed">{image.description || "このアセットの詳細は現在準備中です。"}</p>
                    
                    <div className="space-y-3 mb-8">
                        {/* メタデータ群 */}
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                            <Monitor className="w-4 h-4 text-cyan-400" />
                            <div>
                                <p className="text-[9px] text-slate-500 uppercase font-black">サイズ</p>
                                <p className="text-xs text-white font-bold">{image.width || 1024} × {image.height || 1024} px</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                            <FileType className="w-4 h-4 text-cyan-400" />
                            <div>
                                <p className="text-[9px] text-slate-500 uppercase font-black">形式 / モデル</p>
                                <p className="text-xs text-white font-bold">{url.endsWith('.png') ? 'PNG' : 'JPG'} / {image.id.split('-')[0].toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            <div>
                                <p className="text-[9px] text-slate-500 uppercase font-black">ライセンス</p>
                                <p className="text-xs text-white font-bold">商用利用可 (Free for Personal & Commercial)</p>
                            </div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                                <Tag className="w-4 h-4 text-cyan-400" />
                                <p className="text-[9px] text-slate-500 uppercase font-black">タグ (クリックで検索)</p>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {image.tags?.map((tag: string) => (
                                    <button key={tag} onClick={() => handleTagClick(tag)} className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition-colors">#{tag}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SNS共有（X, LinkedIn, LINE） */}
                    <div className="mb-8">
                        <p className="text-[9px] text-slate-500 uppercase font-black mb-3">素材をSNSで紹介する</p>
                        <div className="flex gap-2">
                            <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(image.title)}`)} className="p-3 bg-white/5 rounded-full hover:bg-[#000000] transition-colors text-white" title="X (Twitter)"><Share2 className="w-4 h-4" /></button>
                            <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)} className="p-3 bg-white/5 rounded-full hover:bg-[#0077b5] transition-colors text-white" title="LinkedIn"><Linkedin className="w-4 h-4" /></button>
                            <button onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`)} className="p-3 bg-white/5 rounded-full hover:bg-[#00b900] transition-colors text-white" title="LINE"><Send className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <button onClick={handleDownload} className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 mt-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Download className="w-5 h-5" /> 高画質ダウンロード
                    </button>
                </div>
            </div>
        </div>
    );
}
