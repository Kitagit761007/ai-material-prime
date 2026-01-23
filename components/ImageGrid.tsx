"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// 🚨 インポートパスを物理相対パスで確定（ビルドエラー回避）
import assets from "../data/assets.json";

interface ImageGridProps {
    initialItems?: typeof assets;
    searchQuery?: string;
    onResultCount?: (count: number) => void;
}

export default function ImageGrid({ searchQuery = "", onResultCount }: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<typeof assets[0] | null>(null);
    const [displayCount, setDisplayCount] = useState(20);
    const [isZoomed, setIsZoomed] = useState(false);
    const router = useRouter();

    // 検索・フィルタリングロジック
    const filteredItems = assets.filter(item => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase().replace("#", "");
        return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.tags.some(tag => tag.toLowerCase().replace("#", "").includes(query)) ||
            item.category.toLowerCase().includes(query)
        );
    });

    const visibleItems = filteredItems.slice(0, displayCount);

    useEffect(() => {
        if (onResultCount) {
            onResultCount(filteredItems.length);
        }
    }, [filteredItems.length, onResultCount]);

    useEffect(() => {
        setIsZoomed(false);
    }, [selectedImage]);

    // 無限スクロール
    const handleScroll = useCallback(() => {
        if (typeof window === "undefined") return;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800) {
            if (displayCount < filteredItems.length) {
                setDisplayCount(prev => Math.min(prev + 20, filteredItems.length));
            }
        }
    }, [displayCount, filteredItems.length]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleInternalTagClick = (tag: string) => {
        const cleanTag = tag.startsWith("#") ? tag.substring(1) : tag;
        router.push(`/tags/${encodeURIComponent(cleanTag)}`);
        if (selectedImage) setSelectedImage(null);
    };

    const getAspectRatio = (w: number, h: number) => {
        const ratio = w / h;
        if (Math.abs(ratio - 16 / 9) < 0.1) return "16:9";
        if (Math.abs(ratio - 9 / 16) < 0.1) return "9:16";
        if (Math.abs(ratio - 4 / 3) < 0.1) return "4:3";
        if (Math.abs(ratio - 3 / 4) < 0.1) return "3:4";
        if (Math.abs(ratio - 1) < 0.1) return "1:1";
        if (Math.abs(ratio - 21 / 9) < 0.1) return "21:9";
        return "Free";
    };

    const getShareLinks = (img: typeof assets[0]) => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const text = `${img.title} - GX Prime Visuals`;
        return [
            {
                name: "X (Twitter)",
                icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
                href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                hoverClass: "hover:bg-black hover:border-black hover:text-white"
            },
            {
                name: "LinkedIn",
                icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                hoverClass: "hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white"
            },
            {
                name: "LINE",
                icon: <span className="font-bold text-xs">LINE</span>,
                href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
                hoverClass: "hover:bg-[#06C755] hover:border-[#06C755] hover:text-white"
            }
        ];
    };

    return (
        <section className="px-6 pb-20 max-w-7xl mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {visibleItems.map((img) => (
                    <ImageCard
                        key={img.id}
                        img={img}
                        onTagClick={handleInternalTagClick}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>

            {displayCount >= filteredItems.length && filteredItems.length > 0 && (
                <div className="py-12 text-center">
                    <p className="text-slate-500 text-sm italic">すべての画像を表示しました</p>
                </div>
            )}

            {filteredItems.length === 0 && (
                <div className="py-24 text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">一致するアセットが見つかりませんでした</h3>
                    <button onClick={() => router.push("/")} className="px-8 py-4 bg-white/5 text-gx-cyan font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                        全画像を表示する
                    </button>
                </div>
            )}

            {/* Enhanced Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} />
                    <div className="relative bg-slate-950 rounded-2xl overflow-hidden max-w-7xl w-full h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10 z-10" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        {/* Image Section - Interactive Zoom */}
                        <div
                            className={`md:w-3/4 h-[50vh] md:h-full bg-black/40 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-white/5 overflow-hidden transition-all ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <div className={`relative w-full h-full p-2 transition-transform duration-500 ease-out will-change-transform ${isZoomed ? "scale-150" : "scale-100"}`}>
                                <Image
                                    src={`${selectedImage.src.includes('mid/mid-') ? selectedImage.src.replace('.png', '.jpg') : selectedImage.src}?v=${new Date().getTime()}`}
                                    alt={selectedImage.title}
                                    fill
                                    quality={100}
                                    priority
                                    unoptimized={true}
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Info Section - Refined Layout */}
                        <div className="md:w-1/4 h-[50vh] md:h-full bg-slate-950 flex flex-col border-l border-white/5 relative">
                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight">{selectedImage.title}</h2>

                                    {/* Compact Metadata Row (Above Fold) */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="text-[10px] font-mono font-bold bg-gx-cyan/10 text-gx-cyan px-2 py-0.5 rounded border border-gx-cyan/20">
                                            {getAspectRatio(selectedImage.width, selectedImage.height)}
                                        </span>
                                        <span className="text-[10px] font-mono bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/5">
                                            {selectedImage.width} x {selectedImage.height}
                                        </span>
                                        <span className="text-[10px] font-bold bg-gx-emerald/10 text-gx-emerald px-2 py-0.5 rounded border border-gx-emerald/20 flex items-center gap-1">
                                            Royalty Free
                                        </span>
                                    </div>
                                </div>

                                {/* Tags - High Priority (Above Fold) */}
                                <div>
                                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedImage.tags.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={(e) => { e.stopPropagation(); handleInternalTagClick(tag); }}
                                                className="text-[11px] px-2 py-1 bg-white/5 text-slate-300 hover:bg-gx-cyan hover:text-white rounded border border-white/5 transition-all"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description - Secondary Priority */}
                                <div className="pt-4 border-t border-white/5">
                                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Description</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        {selectedImage.description}
                                    </p>
                                </div>

                                {/* File Name - Low Priority */}
                                <div className="pt-2">
                                    <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono">
                                        <span>FILENAME</span>
                                        <span className="truncate max-w-[150px]" title={selectedImage.src.split('/').pop()}>
                                            {selectedImage.src.split('/').pop()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Footer for Actions */}
                            <div className="p-6 bg-slate-950/90 backdrop-blur-md border-t border-white/10 space-y-3 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                                <a
                                    href={selectedImage.src}
                                    download
                                    className="block w-full py-3.5 bg-gx-cyan text-white text-center font-bold text-sm rounded-xl hover:bg-gx-cyan/90 transition-all shadow-lg shadow-gx-cyan/20 flex items-center justify-center gap-2 group"
                                >
                                    <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Download High-Res
                                </a>
                                <div className="flex justify-between items-center gap-2">
                                    {getShareLinks(selectedImage).map((sns) => (
                                        <a
                                            key={sns.name}
                                            href={sns.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-1 py-2.5 bg-transparent border border-white/10 rounded-lg flex items-center justify-center text-slate-400 transition-all duration-300 ${sns.hoverClass}`}
                                            title={`Share on ${sns.name}`}
                                        >
                                            {sns.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function ImageCard({ img, onTagClick, onClick }: { img: typeof assets[0], onTagClick: (tag: string) => void, onClick: () => void }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl bg-slate-900/50 border border-white/5 cursor-zoom-in" onClick={onClick}>
            <div className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`} />
            <Image
                // 🚨 ここもパス判定ルールを維持
                src={`${img.src.includes('mid/mid-') ? img.src.replace('.png', '.jpg') : img.src}?v=${new Date().getTime()}`}
                alt={img.title}
                width={600}
                height={800}
                quality={80}
                unoptimized={true}
                className={`w-full h-auto object-cover transition-all duration-700 ease-in-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} group-hover:scale-105`}
                onLoad={() => setLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                    {img.tags && img.tags.slice(0, 3).map((tag: string) => (
                        <button key={tag} onClick={(e: React.MouseEvent) => { e.stopPropagation(); onTagClick(tag); }} className="px-2 py-1 bg-white/10 text-gx-cyan text-xs font-bold rounded border border-white/5 hover:bg-gx-cyan hover:text-white transition-colors">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
