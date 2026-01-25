"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
import { getDisplaySrc } from "../lib/imageUtils";
import { useFavorites } from "../hooks/useFavorites";

interface CategoryImage {
    id: string;
    src: string;
    title: string;
    description: string;
    score: number;
    width: number;
    height: number;
    size: string;
    aspectRatio: string;
    category: string;
    tags: string[];
}

interface CategorySectionProps {
    title: string;
    description: string;
    images: CategoryImage[];
}

function CatCard({ img, isFavorite, onToggleFavorite, onClick }: {
    img: CategoryImage,
    isFavorite: boolean,
    onToggleFavorite: () => void,
    onClick: () => void
}) {
    const [loaded, setLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState(getDisplaySrc(img.src));

    return (
        <div
            className="group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 cursor-zoom-in"
            onClick={onClick}
        >
            <div className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`} />
            <Image
                src={imgSrc}
                alt={img.title}
                width={600}
                height={400}
                className={`w-full h-full object-cover transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} group-hover:scale-105`}
                onLoad={() => setLoaded(true)}
                onError={() => setImgSrc(img.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-xs font-bold truncate">{img.title}</p>
            </div>

            {/* Favorite Button on Card */}
            <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all z-10 ${isFavorite
                    ? "bg-rose-500 border-rose-500 text-white shadow-lg"
                    : "bg-black/40 border-white/20 text-white opacity-0 group-hover:opacity-100 backdrop-blur-md"
                    }`}
            >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
            </button>
        </div>
    );
}

export default function CategorySection({ title, description, images }: CategorySectionProps) {
    const [selectedImage, setSelectedImage] = useState<CategoryImage | null>(null);
    const [modalImgSrc, setModalImgSrc] = useState<string>("");
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);
    const [touchEndY, setTouchEndY] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState<number>(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavorites();

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchEndY(null);
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchStartY(e.targetTouches[0].clientY);
        setSwipeOffset(0);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touchStartY) return;
        const currentTouchX = e.targetTouches[0].clientX;
        const currentTouchY = e.targetTouches[0].clientY;
        setTouchEndX(currentTouchX);
        setTouchEndY(currentTouchY);

        const distanceY = currentTouchY - touchStartY;
        // Only allow downward swipes for offset visual
        if (distanceY > 0) {
            setSwipeOffset(distanceY);
        }
    };

    const onTouchEnd = () => {
        if (!touchStartX || !touchStartY || (!touchEndX && !touchEndY)) {
            setSwipeOffset(0);
            return;
        }

        const distanceX = touchEndX ? touchEndX - touchStartX : 0;
        const distanceY = touchEndY ? touchEndY - touchStartY : 0;

        const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

        if (isHorizontalSwipe) {
            if (Math.abs(distanceX) > minSwipeDistance) {
                if (distanceX < 0) {
                    // Left swipe -> Next
                    const currentIndex = images.findIndex(item => item.id === selectedImage?.id);
                    if (currentIndex !== -1) {
                        const nextIndex = (currentIndex + 1) % images.length;
                        setSelectedImage(images[nextIndex]);
                        setModalImgSrc("");
                    }
                } else {
                    // Right swipe -> Prev
                    const currentIndex = images.findIndex(item => item.id === selectedImage?.id);
                    if (currentIndex !== -1) {
                        const prevIndex = (currentIndex - 1 + images.length) % images.length;
                        setSelectedImage(images[prevIndex]);
                        setModalImgSrc("");
                    }
                }
            }
        } else {
            // Vertical swipe
            if (distanceY > minSwipeDistance) {
                // Down swipe -> Close
                setSelectedImage(null);
                setModalImgSrc("");
            }
        }

        setSwipeOffset(0);
        setTouchStartX(null);
        setTouchEndX(null);
        setTouchStartY(null);
        setTouchEndY(null);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                    {title}
                </h2>
                <p className="text-slate-400 max-w-2xl">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img) => {
                    return (
                        <CatCard
                            key={img.id}
                            img={img}
                            isFavorite={isFavorite(img.id)}
                            onToggleFavorite={() => toggleFavorite(img.id)}
                            onClick={() => setSelectedImage(img)}
                        />
                    );
                })}
            </div>

            {/* Refined Pro Modal (Sync with ImageGrid) */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-hidden"
                    style={{
                        opacity: swipeOffset > 0 ? Math.max(0, 1 - swipeOffset / 300) : 1
                    }}
                >
                    {/* Backdrop - Click to Close */}
                    <div className="absolute inset-0 z-0 bg-transparent" onClick={() => { setSelectedImage(null); setModalImgSrc(""); setIsZoomed(false); }} />

                    {/* Pro Layout Container */}
                    <div
                        className="relative z-10 w-full h-full max-w-[100vw] max-h-[100vh] md:max-w-[95vw] md:max-h-[90vh] flex flex-col md:flex-row bg-slate-950 md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border-white/5 md:border transition-transform"
                        style={{
                            transform: `translateY(${swipeOffset}px)`,
                            transition: swipeOffset === 0 ? 'transform 0.3s ease-out' : 'none'
                        }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >

                        {/* 1. Image Section - Interactive Zoom */}
                        <div
                            className={`relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden transition-all duration-300 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <div
                                className={`relative w-full h-full flex items-center justify-center p-4 md:p-12 transition-transform duration-500 ease-out will-change-transform ${isZoomed ? "scale-150" : "scale-100"}`}
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                <Image
                                    src={modalImgSrc || (selectedImage ? getDisplaySrc(selectedImage.src) : "")}
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
                                        const currentIndex = images.findIndex(item => item.id === selectedImage.id);
                                        const prevIndex = (currentIndex - 1 + images.length) % images.length;
                                        setSelectedImage(images[prevIndex]);
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
                                        const currentIndex = images.findIndex(item => item.id === selectedImage.id);
                                        const nextIndex = (currentIndex + 1) % images.length;
                                        setSelectedImage(images[nextIndex]);
                                        setModalImgSrc("");
                                        setIsZoomed(false);
                                    }}
                                    className="p-3 bg-black/20 hover:bg-white text-white hover:text-slate-900 rounded-full transition-all border border-white/10 pointer-events-auto backdrop-blur-md"
                                    aria-label="Next"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* 2. Side Panel - Metadata & Actions */}
                        <div className="w-full md:w-[380px] bg-slate-900/90 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-[45vh] md:h-full shrink-0">
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
                                {/* Close Button (Mobile internal) */}
                                <div className="absolute top-4 right-4 md:hidden z-10">
                                    <button
                                        onClick={() => { setSelectedImage(null); setModalImgSrc(""); setIsZoomed(false); }}
                                        className="p-2 bg-white/10 rounded-full text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight">{selectedImage.title}</h2>
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{selectedImage.description}</p>
                                </div>

                                {/* Metadata Grid */}
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
                                        <span className="text-gx-cyan font-mono font-bold text-sm">{selectedImage.aspectRatio}</span>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Category</span>
                                        <span className="text-gx-emerald font-bold text-xs uppercase">{selectedImage.category}</span>
                                    </div>
                                </div>

                                {/* Tags Section */}
                                {selectedImage.tags && selectedImage.tags.length > 0 && (
                                    <div>
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-gx-cyan rounded-full"></span> Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {selectedImage.tags.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const cleanTag = tag.startsWith("#") ? tag.substring(1) : tag;
                                                        router.push(`/tags/${encodeURIComponent(cleanTag)}`);
                                                        setSelectedImage(null);
                                                    }}
                                                    className="h-9 px-4 bg-white/5 hover:bg-gx-cyan border border-white/10 hover:border-gx-cyan text-slate-300 hover:text-slate-950 rounded-full transition-all text-xs font-bold flex items-center justify-center shadow-lg active:scale-95"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="text-[10px] font-mono text-slate-600 bg-black/20 p-3 rounded-lg flex items-center justify-between">
                                    <span className="uppercase tracking-tighter">SOURCE ID</span>
                                    <span className="truncate max-w-[150px]">{selectedImage.src.split('/').pop()}</span>
                                </div>

                                {/* Favorite Toggle Button in Modal */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedImage.id); }}
                                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border ${isFavorite(selectedImage.id)
                                        ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite(selectedImage.id) ? "fill-rose-500" : ""}`} />
                                    {isFavorite(selectedImage.id) ? "保存済み" : "お気に入りに追加"}
                                </button>
                            </div>

                            {/* Sticky Download Action */}
                            <div className="p-6 bg-slate-950/80 border-t border-white/10">
                                <a
                                    href={selectedImage.src}
                                    download
                                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-950 font-extrabold rounded-2xl hover:bg-gx-cyan hover:text-white transition-all shadow-xl active:scale-95"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    DOWNLOAD HD
                                </a>
                                <p className="text-[9px] text-slate-500 italic mt-3 text-center">Commercial Use OK / No Attribution Required</p>
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
            )}
        </section >
    );
}
