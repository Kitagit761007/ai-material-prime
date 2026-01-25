"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Download } from "lucide-react";
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

    // Filter Logic
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
        if (onResultCount) onResultCount(filteredItems.length);
    }, [filteredItems.length, onResultCount]);

    useEffect(() => {
        setIsZoomed(false);
    }, [selectedImage]);

    // Infinite Scroll
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
        if (now - lastTapRef.current < 300) {
            if (selectedImage) toggleFavorite(selectedImage.id);
        } else {
            setIsZoomed(!isZoomed);
        }
        lastTapRef.current = now;
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

            {/* Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300">
                    <div className="absolute inset-0 z-0 bg-transparent" onClick={() => { setSelectedImage(null); setModalImgSrc(""); setIsZoomed(false); }} />

                    <div className="relative z-10 w-full h-[100dvh] md:h-[90vh] max-w-[100vw] md:max-w-[95vw] flex flex-col md:flex-row bg-slate-950 md:rounded-3xl overflow-hidden shadow-2xl border-white/5 md:border" onClick={e => e.stopPropagation()}>

                        {/* 1. Image View Area */}
                        <div className="relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden min-h-[40vh] md:min-h-0">
                            <div
                                className={`relative w-full h-full p-4 transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}`}
                                onClick={handleModalImageClick}
                            >
                                <Image
                                    src={modalImgSrc || getDisplaySrc(selectedImage.src)}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain pointer-events-none select-none"
                                    onError={() => setModalImgSrc(selectedImage.src)}
                                />
                            </div>

                            {/* Fav Button (Image Corner) */}
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedImage.id); }}
                                className={`absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-2xl z-30 active:scale-90 bg-black/40 backdrop-blur-xl ${isFavorite(selectedImage.id) ? "bg-rose-500 border-rose-500 text-white animate-heart-pop" : "border-white/30 text-white"
                                    }`}
                            >
                                <Heart className={`w-7 h-7 ${isFavorite(selectedImage.id) ? "fill-white" : ""}`} />
                            </button>

                            {/* Nav Arrows */}
                            <button onClick={(e) => {
                                e.stopPropagation();
                                const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
                                setSelectedImage(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
                                setModalImgSrc("");
                            }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full border border-white/10 backdrop-blur-md z-20 hover:bg-white hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
                                setSelectedImage(filteredItems[(idx + 1) % filteredItems.length]);
                                setModalImgSrc("");
                            }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full border border-white/10 backdrop-blur-md z-20 hover:bg-white hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                        </div>

                        {/* 2. Side Panel (Scrollable) */}
                        <div className="w-full md:w-[400px] flex flex-col bg-slate-900/90 border-t md:border-t-0 md:border-l border-white/10 overflow-hidden h-[60vh] md:h-full">

                            {/* Primary Action Zone (Optimized position) */}
                            <div className="p-6 bg-slate-950/50 border-b border-white/10">
                                <a
                                    href={selectedImage.src}
                                    download
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-center justify-center gap-3 w-full py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-gx-cyan hover:text-white transition-all shadow-xl active:scale-95 group"
                                >
                                    <Download className="w-6 h-6 group-hover:animate-bounce" />
                                    FREE DOWNLOAD HD
                                </a>
                                <p className="text-[10px] text-slate-500 italic mt-3 text-center">No Attribution Required / Commercial OK</p>
                            </div>

                            {/* Scrollable Info Area */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-2xl font-bold text-white leading-tight tracking-tight">{selectedImage.title}</h2>
                                    <button onClick={() => setSelectedImage(null)} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed">{selectedImage.description}</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <span className="block text-[10px] text-slate-500 uppercase font-black mb-1">Resolution</span>
                                        <span className="text-white text-sm font-mono font-bold">{selectedImage.width} × {selectedImage.height}</span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <span className="block text-[10px] text-slate-500 uppercase font-black mb-1">Category</span>
                                        <span className="text-gx-cyan text-sm font-black uppercase">{selectedImage.category}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full" />
                                        Relevant Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {selectedImage.tags.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => handleInternalTagClick(tag)}
                                                className="px-4 py-2 bg-white/5 hover:bg-gx-cyan border border-white/10 hover:border-black text-slate-300 hover:text-black rounded-full text-xs font-bold transition-all active:scale-95"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-black/40 rounded-xl flex items-center justify-between text-[11px] font-mono text-slate-500 border border-white/5">
                                    <span className="uppercase tracking-tighter">Asset Hash</span>
                                    <span className="truncate max-w-[150px]">{selectedImage.src.split('/').pop()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Close Button */}
                        <button onClick={() => setSelectedImage(null)} className="hidden md:flex absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-[100] backdrop-blur-md border border-white/10">
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
                className={`w-full h-auto object-cover transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} group-hover:scale-105`}
                onLoad={() => setLoaded(true)}
                onError={() => setImgSrc(img.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="text-white text-sm font-bold truncate">{img.title}</p>
            </div>

            {/* Fav Button Grid */}
            <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center border transition-all z-10 ${isFavorite ? "bg-rose-500 border-rose-500 text-white animate-heart-pop shadow-lg" : "bg-black/40 border-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100"
                    }`}
            >
                <Heart className={`w-5.5 h-5.5 ${isFavorite ? "fill-white" : ""}`} />
            </button>
        </div>
    );
}
