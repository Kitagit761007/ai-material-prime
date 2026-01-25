"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Heart, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getDisplaySrc, downloadImage } from "../lib/imageUtils";
import { useFavorites } from "@/context/FavoritesContext";
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
    const pathname = usePathname();
    const { isFavorite, toggleFavorite } = useFavorites();
    const lastTapRef = useRef<number>(0);
    const touchStartX = useRef<number>(0);

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

    // Navigation logic
    const handleNextImage = useCallback(() => {
        if (!selectedImage) return;
        const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
        setSelectedImage(filteredItems[(idx + 1) % filteredItems.length]);
        setModalImgSrc("");
        setIsZoomed(false);
    }, [selectedImage, filteredItems]);

    const handlePrevImage = useCallback(() => {
        if (!selectedImage) return;
        const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
        setSelectedImage(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
        setModalImgSrc("");
        setIsZoomed(false);
    }, [selectedImage, filteredItems]);

    // Swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX.current;
        const threshold = 50;

        if (deltaX > threshold) {
            handlePrevImage();
        } else if (deltaX < -threshold) {
            handleNextImage();
        }
    };

    // --- Modal Management (Back Gesture & Scroll Lock) ---
    const closeModal = useCallback(() => {
        if (selectedImage) {
            setSelectedImage(null);
            setModalImgSrc("");
            setIsZoomed(false);
        }
    }, [selectedImage]);

    useEffect(() => {
        if (!selectedImage) return;

        window.history.pushState({ modalOpen: true }, "");

        const handlePopState = () => {
            setSelectedImage(null);
            setModalImgSrc("");
            setIsZoomed(false);
        };

        window.addEventListener("popstate", handlePopState);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("popstate", handlePopState);
            document.body.style.overflow = "";
        };
    }, [selectedImage]);

    const handleManualClose = () => {
        if (window.history.state?.modalOpen) {
            window.history.back();
        } else {
            closeModal();
        }
    };

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage) {
            const filename = selectedImage.src.split('/').pop() || 'download.webp';
            await downloadImage(selectedImage.src, filename);
        }
    };

    // Infinite Scroll
    const handleScroll = useCallback(() => {
        if (typeof window === "undefined" || selectedImage) return;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800) {
            if (displayCount < filteredItems.length) {
                setDisplayCount(prev => Math.min(prev + 20, filteredItems.length));
            }
        }
    }, [displayCount, filteredItems.length, selectedImage]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleInternalTagClick = (tag: string) => {
        const cleanTag = tag.startsWith("#") ? tag.substring(1) : tag;
        router.push(`/tags/${encodeURIComponent(cleanTag)}`);
        if (selectedImage) handleManualClose();
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

            {/* Pro Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl duration-300 animate-in fade-in">
                    {/* Backdrop */}
                    <div className="absolute inset-0 z-0 bg-transparent" onClick={handleManualClose} />

                    <div className="relative z-10 w-full h-[100dvh] md:h-[90vh] max-w-[100vw] md:max-w-[95vw] flex flex-col md:flex-row bg-slate-950 md:rounded-3xl overflow-hidden shadow-2xl border-white/10 md:border" onClick={e => e.stopPropagation()}>

                        {/* LEFT: Image Viewport */}
                        <div
                            className="relative flex-1 bg-black/40 flex items-center justify-center min-h-[40vh] md:min-h-0 overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className={`relative w-full h-full p-4 transition-transform duration-500 ease-out will-change-transform ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}`}
                                onClick={handleModalImageClick}
                            >
                                <Image
                                    src={modalImgSrc || getDisplaySrc(selectedImage.src)}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain pointer-events-none select-none"
                                    priority
                                    onError={() => setModalImgSrc(selectedImage.src)}
                                />
                            </div>

                            {/* Floating Heart */}
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedImage.id); }}
                                className={`absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-2xl z-30 active:scale-90 bg-black/40 backdrop-blur-xl ${isFavorite(selectedImage.id) ? "bg-rose-500 border-rose-500 text-white animate-heart-pop" : "border-white/30 text-white"
                                    }`}
                            >
                                <Heart className={`w-7 h-7 ${isFavorite(selectedImage.id) ? "fill-white" : ""}`} />
                            </button>

                            {/* Mobile Close Icon */}
                            <button onClick={handleManualClose} className="md:hidden absolute top-4 left-4 p-2 bg-black/40 rounded-full text-white backdrop-blur-md z-30">
                                <X className="w-6 h-6" />
                            </button>

                            {/* Navigation Arrows */}
                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
                                <button onClick={handlePrevImage} className="p-4 bg-black/40 text-white rounded-full border border-white/10 backdrop-blur-md pointer-events-auto hover:bg-white hover:text-black transition-all shadow-xl active:scale-90">
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button onClick={handleNextImage} className="p-4 bg-black/40 text-white rounded-full border border-white/10 backdrop-blur-md pointer-events-auto hover:bg-white hover:text-black transition-all shadow-xl active:scale-90">
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: Content Panel (SCROLLABLE) */}
                        <div className="w-full md:w-[420px] flex flex-col bg-slate-900 overflow-hidden h-[60vh] md:h-full border-t md:border-t-0 md:border-l border-white/10">

                            {/* TOP ACTION BAR - STICKY */}
                            <div className="p-6 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shrink-0 z-10">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center justify-center gap-3 w-full py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-gx-cyan hover:text-white transition-all shadow-xl active:scale-95 group"
                                >
                                    <Download className="w-6 h-6 group-hover:animate-bounce" />
                                    FREE DOWNLOAD HD
                                </button>
                                <p className="text-[10px] text-slate-500 italic mt-3 text-center tracking-tight">Commercial Use OK / No Attribution Required</p>
                            </div>

                            {/* MAIN INFO - SCROLLABLE */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 space-y-10 scrollbar-thin scrollbar-thumb-white/10 overscroll-contain">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="h-0.5 w-6 bg-gx-cyan rounded-full" />
                                        <span className="text-[10px] font-black text-gx-cyan uppercase tracking-[0.2em]">Asset Details</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white leading-tight tracking-tight mb-4">{selectedImage.title}</h2>
                                    <p className="text-slate-400 text-sm leading-relaxed">{selectedImage.description}</p>
                                </div>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                                        <span className="block text-[9px] text-slate-500 uppercase font-black mb-1.5 opacity-60">Resolution</span>
                                        <span className="text-white text-sm font-bold font-mono">{selectedImage.width} × {selectedImage.height}</span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                                        <span className="block text-[9px] text-slate-500 uppercase font-black mb-1.5 opacity-60">Format</span>
                                        <span className="text-gx-cyan text-sm font-black uppercase">WebP / HD</span>
                                    </div>
                                </div>

                                {/* Tags Section */}
                                <div>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full shadow-[0_0_8px_#00d1ff]" />
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {selectedImage.tags.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => handleInternalTagClick(tag)}
                                                className="px-4 py-2 bg-white/5 hover:bg-gx-cyan border border-white/10 hover:border-transparent text-slate-300 hover:text-slate-950 rounded-full text-xs font-bold transition-all active:scale-90"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Trace */}
                                <div className="p-4 bg-black/40 rounded-2xl flex items-center justify-between text-[10px] font-mono text-slate-600 border border-white/5">
                                    <span className="uppercase tracking-widest opacity-50 text-[8px]">Index ID</span>
                                    <span className="truncate max-w-[150px]">{selectedImage.src.split('/').pop()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Large Desktop Close */}
                        <button onClick={handleManualClose} className="hidden md:flex absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-[100] backdrop-blur-md border border-white/10 transition-all active:scale-95 shadow-2xl">
                            <X className="w-8 h-8" />
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

            {/* Fav Button Grid - Fixed Right Bottom with stopPropagation and translucent background */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
                className={`absolute bottom-[10px] right-[10px] w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-sm ${isFavorite
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40 animate-heart-pop"
                        : "bg-black/40 border-2 border-white/30 text-white group-hover:border-white hover:bg-white hover:text-black"
                    }`}
                aria-label="お気に入り"
            >
                <Heart className={`w-5.5 h-5.5 ${isFavorite ? "fill-white" : "stroke-white"}`} />
            </button>
        </div>
    );
}
