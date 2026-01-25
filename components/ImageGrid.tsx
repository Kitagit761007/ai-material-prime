"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { getDisplaySrc } from "../lib/imageUtils";
import { useFavorites } from "../hooks/useFavorites";
// 🚨 インポートパスを物理相対パスで確定（ビルドエラー回避）
import assets from "../data/assets.json";

interface ImageGridProps {
    initialItems?: typeof assets;
    searchQuery?: string;
    onResultCount?: (count: number) => void;
}

export default function ImageGrid({ initialItems, searchQuery = "", onResultCount }: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<typeof assets[0] | null>(null);
    const [modalImgSrc, setModalImgSrc] = useState<string>("");
    const [displayCount, setDisplayCount] = useState(20);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavorites();

    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            // Next image
            const currentIndex = filteredItems.findIndex(item => item.id === selectedImage?.id);
            if (currentIndex !== -1) {
                const nextIndex = (currentIndex + 1) % filteredItems.length;
                setSelectedImage(filteredItems[nextIndex]);
                setModalImgSrc("");
            }
        } else if (isRightSwipe) {
            // Previous image
            const currentIndex = filteredItems.findIndex(item => item.id === selectedImage?.id);
            if (currentIndex !== -1) {
                const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                setSelectedImage(filteredItems[prevIndex]);
                setModalImgSrc("");
            }
        }
    };

    // 検索・フィルタリングロジック
    const baseItems = initialItems || assets;
    const filteredItems = baseItems.filter(item => {
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
                        isFavorite={isFavorite(img.id)}
                        onToggleFavorite={() => toggleFavorite(img.id)}
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

            {/* Refined Pro Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Backdrop - Click to Close */}
                    <div className="absolute inset-0 z-0 bg-transparent" onClick={() => { setSelectedImage(null); setModalImgSrc(""); setIsZoomed(false); }} />

                    {/* Pro Layout Container */}
                    <div className="relative z-10 w-full h-full max-w-[100vw] max-h-[100vh] md:max-w-[95vw] md:max-h-[90vh] flex flex-col md:flex-row bg-slate-950 md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border-white/5 md:border" onClick={(e: React.MouseEvent) => e.stopPropagation()}>

                        {/* 1. Image Section - Interactive Zoom */}
                        <div
                            className={`relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden transition-all duration-300 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <div className={`relative w-full h-full flex items-center justify-center p-4 transition-transform duration-500 ease-out will-change-transform ${isZoomed ? "scale-150" : "scale-100"}`}>
                                <Image
                                    src={modalImgSrc || getDisplaySrc(selectedImage.src)}
                                    alt={selectedImage.title}
                                    fill
                                    quality={100}
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 75vw"
                                    className="object-contain"
                                    onError={() => setModalImgSrc(selectedImage.src)}
                                />
                            </div>

                            {/* Navigation Arrows Overlay */}
                            <div className="absolute inset-y-0 left-0 flex items-center z-20 pointer-events-none px-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                                        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                                        setSelectedImage(filteredItems[prevIndex]);
                                        setModalImgSrc("");
                                        setIsZoomed(false);
                                    }}
                                    className="p-3 bg-black/20 hover:bg-white text-white hover:text-slate-900 rounded-full transition-all border border-white/10 pointer-events-auto backdrop-blur-md"
                                    aria-label="Previous"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center z-20 pointer-events-none px-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                                        const nextIndex = (currentIndex + 1) % filteredItems.length;
                                        setSelectedImage(filteredItems[nextIndex]);
                                        setModalImgSrc("");
                                        setIsZoomed(false);
                                    }}
                                    className="p-3 bg-black/20 hover:bg-white text-white hover:text-slate-900 rounded-full transition-all border border-white/10 pointer-events-auto backdrop-blur-md"
                                    aria-label="Next"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                            </div>

                            {/* Floating Favorite Button (Mobile Optimized) */}
                            <div className="absolute bottom-6 right-6 z-30">
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedImage.id); }}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-2xl backdrop-blur-xl active:scale-90 ${isFavorite(selectedImage.id)
                                        ? "bg-rose-500 border-rose-500 text-white"
                                        : "bg-black/40 border-white/30 text-white hover:bg-white hover:text-slate-900"
                                        }`}
                                    aria-label="Toggle favorite"
                                >
                                    <Heart className={`w-7 h-7 ${isFavorite(selectedImage.id) ? "fill-white" : ""}`} />
                                </button>
                            </div>
                        </div>

                        {/* 2. Side Panel - Metadata & Actions */}
                        <div className="w-full md:w-[380px] bg-slate-900/90 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-[45vh] md:h-full shrink-0">
                            {/* Scroll Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
                                {/* Close Button (Mobile internal) */}
                                <div className="absolute top-4 right-4 md:hidden z-10">
                                    <button
                                        onClick={() => { setSelectedImage(null); setModalImgSrc(""); }}
                                        className="p-2 bg-white/10 rounded-full text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight">{selectedImage.title}</h2>
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{selectedImage.description}</p>
                                </div>

                                {/* Detailed Data Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Resolution</span>
                                        <span className="text-white font-mono font-bold text-sm">{selectedImage.width} × {selectedImage.height}</span>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Size</span>
                                        <span className="text-white font-mono font-bold text-sm">{selectedImage.size}</span>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Ratio</span>
                                        <span className="text-gx-cyan font-mono font-bold text-sm">{getAspectRatio(selectedImage.width, selectedImage.height)}</span>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Category</span>
                                        <span className="text-gx-emerald font-bold text-xs uppercase">{selectedImage.category}</span>
                                    </div>
                                </div>

                                {/* Tags Section */}
                                <div>
                                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-gx-cyan rounded-full"></span> Relevant Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {selectedImage.tags.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={(e) => { e.stopPropagation(); handleInternalTagClick(tag); }}
                                                className="h-9 px-4 bg-white/5 hover:bg-gx-cyan border border-white/10 hover:border-gx-cyan text-slate-300 hover:text-slate-950 rounded-full transition-all text-xs font-bold flex items-center justify-center shadow-lg active:scale-95"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* File Trace */}
                                <div className="text-[10px] font-mono text-slate-600 bg-black/20 p-3 rounded-lg flex items-center justify-between">
                                    <span className="uppercase tracking-tighter">SOURCE ID</span>
                                    <span className="truncate max-w-[150px]">{selectedImage.src.split('/').pop()}</span>
                                </div>

                            </div>

                            {/* Sticky Bottom Actions */}
                            <div className="p-6 bg-slate-950/80 border-t border-white/10 space-y-4">
                                <a
                                    href={selectedImage.src}
                                    download
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-950 font-extrabold rounded-2xl hover:bg-gx-cyan hover:text-white transition-all shadow-xl active:scale-95 group"
                                >
                                    <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    FREE DOWNLOAD HD
                                </a>

                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-[9px] text-slate-500 italic leading-tight">License: Commercial OK / No Attribution</p>
                                    <div className="flex gap-2">
                                        {getShareLinks(selectedImage).slice(0, 3).map((sns) => (
                                            <a
                                                key={sns.name}
                                                href={sns.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all ${sns.hoverClass}`}
                                            >
                                                {sns.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    {/* Desktop Close Button (Floating) */}
            <div className="absolute top-6 right-6 hidden md:block z-50">
                <button
                    onClick={() => { setSelectedImage(null); setModalImgSrc(""); setIsZoomed(false); }}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    )
}
        </section >
    );
}

function ImageCard({ img, isFavorite, onToggleFavorite, onTagClick, onClick }: {
    img: typeof assets[0],
    isFavorite: boolean,
    onToggleFavorite: () => void,
    onTagClick: (tag: string) => void,
    onClick: () => void
}) {
    const [loaded, setLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState(getDisplaySrc(img.src));

    return (
        <div className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl bg-slate-900/50 border border-white/5 cursor-zoom-in" onClick={onClick}>
            <div className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`} />
            <Image
                src={imgSrc}
                alt={img.title}
                width={600}
                height={800}
                quality={80}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`w-full h-auto object-cover transition-all duration-700 ease-in-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} group-hover:scale-105`}
                onLoad={() => setLoaded(true)}
                onError={() => setImgSrc(img.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-wrap gap-2">
                        {img.tags && img.tags.slice(0, 2).map((tag: string) => (
                            <button key={tag} onClick={(e: React.MouseEvent) => { e.stopPropagation(); onTagClick(tag); }} className="px-2 py-1 bg-white/10 text-gx-cyan text-[10px] font-bold rounded border border-white/5 hover:bg-gx-cyan hover:text-white transition-colors">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Favorite Indicator on Card */}
            <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center border transition-all z-10 ${isFavorite
                    ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/40"
                    : "bg-black/40 border-white/20 text-white opacity-0 group-hover:opacity-100 backdrop-blur-md hover:bg-white hover:text-slate-900"
                    }`}
            >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
            </button>
        </div>
    );
}
