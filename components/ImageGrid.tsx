"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
import { getDisplaySrc } from "../lib/imageUtils";
import { useFavorites } from "../hooks/useFavorites";
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
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavorites();
    const lastTapRef = useRef<number>(0);

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

    const handleModalImageClick = (e: React.MouseEvent) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
            // Double Tap Detected
            if (selectedImage) {
                toggleFavorite(selectedImage.id);
            }
        } else {
            // Single Click -> Toggle Zoom
            setIsZoomed(!isZoomed);
        }
        lastTapRef.current = now;
    };

    // Shared Download logic
    const handleDownload = (e: React.MouseEvent | React.TouchEvent, src: string) => {
        e.stopPropagation();
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

            {/* Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300">
                    <div className="absolute inset-0 z-0" onClick={() => { setSelectedImage(null); setModalImgSrc(""); setIsZoomed(false); }} />

                    <div className="relative z-10 w-full h-full max-w-[100vw] max-h-[100vh] md:max-w-[95vw] md:max-h-[90vh] flex flex-col md:flex-row bg-slate-950 md:rounded-3xl overflow-hidden border-white/5 md:border shadow-2xl" onClick={e => e.stopPropagation()}>

                        {/* Image Section */}
                        <div className="relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden">
                            <div
                                className={`relative w-full h-full p-4 transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}`}
                                onClick={handleModalImageClick}
                            >
                                <Image
                                    src={modalImgSrc || getDisplaySrc(selectedImage.src)}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain pointer-events-none select-none"
                                    onLoad={() => { }}
                                    onError={() => setModalImgSrc(selectedImage.src)}
                                />
                            </div>

                            {/* Navigation */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
                                    setSelectedImage(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
                                    setModalImgSrc("");
                                }} className="p-3 bg-black/40 text-white rounded-full backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
                                    setSelectedImage(filteredItems[(idx + 1) % filteredItems.length]);
                                    setModalImgSrc("");
                                }} className="p-3 bg-black/40 text-white rounded-full backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                            </div>

                            {/* Floating Heart Button in Modal */}
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedImage.id); }}
                                className={`absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-2xl z-30 active:scale-90 bg-black/40 backdrop-blur-xl ${isFavorite(selectedImage.id) ? "bg-rose-500 border-rose-500 text-white animate-heart-pop" : "border-white/30 text-white"
                                    }`}
                            >
                                <Heart className={`w-7 h-7 ${isFavorite(selectedImage.id) ? "fill-white" : ""}`} />
                            </button>
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-[380px] bg-slate-900/90 flex flex-col h-[45vh] md:h-full shrink-0 border-l border-white/10">
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-white leading-tight">{selectedImage.title}</h2>
                                    <button onClick={() => setSelectedImage(null)} className="md:hidden p-2 bg-white/10 rounded-full text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                <p className="text-slate-400 text-sm">{selectedImage.description}</p>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <span className="block text-[9px] text-slate-500 uppercase font-bold">Resolution</span>
                                        <span className="text-white text-xs font-mono">{selectedImage.width} × {selectedImage.height}</span>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <span className="block text-[9px] text-slate-500 uppercase font-bold">Category</span>
                                        <span className="text-gx-cyan text-xs font-bold uppercase">{selectedImage.category}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {selectedImage.tags.map(tag => (
                                        <button key={tag} onClick={() => handleInternalTagClick(tag)} className="px-3 py-1.5 bg-white/5 hover:bg-gx-cyan text-slate-300 hover:text-black rounded-full text-[10px] font-bold transition-all border border-white/10">
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-slate-950 border-t border-white/10">
                                <a href={selectedImage.src} download onClick={e => e.stopPropagation()} className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-extrabold rounded-2xl hover:bg-gx-cyan hover:text-white transition-all shadow-xl active:scale-95">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    DOWNLOAD HD
                                </a>
                            </div>
                        </div>

                        {/* Desktop Close */}
                        <button onClick={() => setSelectedImage(null)} className="hidden md:flex absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-50 backdrop-blur-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
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
            <div className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`} />
            <Image
                src={imgSrc}
                alt={img.title}
                width={600}
                height={800}
                className={`w-full h-auto object-cover transition-all duration-500 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} group-hover:scale-105`}
                onLoad={() => setLoaded(true)}
                onError={() => setImgSrc(img.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="text-white text-sm font-bold truncate">{img.title}</p>
            </div>

            {/* Favorite Button on Card Grid */}
            <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border transition-all z-10 ${isFavorite ? "bg-rose-500 border-rose-500 text-white animate-heart-pop" : "bg-black/40 border-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100"
                    }`}
            >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
            </button>
        </div>
    );
}
