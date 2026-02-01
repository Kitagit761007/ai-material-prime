"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { downloadImage } from "../lib/imageUtils";
import { useFavorites } from "@/context/FavoritesContext";
import { useSearch } from "@/context/SearchContext";

interface CategoryImage {
    id: string;
    url: string;
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

export default function CategorySection({ title, description, images }: CategorySectionProps) {
    const [selectedImage, setSelectedImage] = useState<CategoryImage | null>(null);
    const [modalImgSrc, setModalImgSrc] = useState<string>("");
    const [isZoomed, setIsZoomed] = useState(false);
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavorites();
    const { setSearchQuery } = useSearch();
    const lastTapRef = useRef<number>(0);
    const touchStartX = useRef<number>(0);

    const handleTagClick = (tag: string) => {
        setSearchQuery(tag);
        handleManualClose();
        if (window.location.pathname !== "/") {
            router.push("/");
        }
        setTimeout(() => {
            const gallery = document.getElementById("gallery-section");
            if (gallery) {
                gallery.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage) {
            const filename = selectedImage.url.split('/').pop() || 'download.webp';
            await downloadImage(selectedImage.url, filename);
        }
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

    // Navigation logic
    const handleNextImage = useCallback(() => {
        if (!selectedImage) return;
        const idx = images.findIndex(i => i.id === selectedImage.id);
        setSelectedImage(images[(idx + 1) % images.length]);
        setModalImgSrc("");
        setIsZoomed(false);
    }, [selectedImage, images]);

    const handlePrevImage = useCallback(() => {
        if (!selectedImage) return;
        const idx = images.findIndex(i => i.id === selectedImage.id);
        setSelectedImage(images[(idx - 1 + images.length) % images.length]);
        setModalImgSrc("");
        setIsZoomed(false);
    }, [selectedImage, images]);

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
        setSelectedImage(null);
        setModalImgSrc("");
        setIsZoomed(false);
    }, []);

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

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-1 w-10 bg-gx-cyan rounded-full" />
                    <span className="text-xs font-black text-gx-cyan uppercase tracking-[0.3em]">Collection</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight">
                    {title}
                </h2>
                <p className="text-slate-400 max-w-2xl leading-relaxed">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img) => (
                    <CatCard
                        key={img.id}
                        img={img}
                        isFavorite={isFavorite(img.id)}
                        onToggleFavorite={() => toggleFavorite(img.id)}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>

            {/* Pro Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl duration-300 animate-in fade-in">
                    <div className="absolute inset-0 z-0 bg-transparent" onClick={handleManualClose} />

                    <div className="relative z-10 w-full h-[100dvh] md:h-[90vh] max-w-[100vw] md:max-w-[95vw] flex flex-col md:flex-row bg-slate-950 md:rounded-3xl overflow-hidden shadow-2xl border-white/10 md:border" onClick={e => e.stopPropagation()}>

                        {/* Image Area */}
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
                                    src={selectedImage.url}
                                    alt={selectedImage.title}
                                    fill
                                    priority
                                    className="object-contain pointer-events-none select-none"
                                    onError={(e: any) => {
                                        e.target.src = selectedImage.url;
                                    }}
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
                                <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); handlePrevImage(); }} className="p-4 bg-black/40 text-white rounded-full border border-white/10 backdrop-blur-md pointer-events-auto hover:bg-white hover:text-black transition-all shadow-xl active:scale-90">
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleNextImage(); }} className="p-4 bg-black/40 text-white rounded-full border border-white/10 backdrop-blur-md pointer-events-auto hover:bg-white hover:text-black transition-all shadow-xl active:scale-90">
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        {/* Side Panel */}
                        <div className="w-full md:w-[420px] flex flex-col bg-slate-900 overflow-hidden h-[60vh] md:h-full border-t md:border-t-0 md:border-l border-white/10">

                            {/* Sticky Top Action */}
                            <div className="p-6 md:pt-14 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shrink-0 z-10 relative">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center justify-center gap-3 w-full py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-gx-cyan hover:text-white transition-all shadow-xl active:scale-95 group"
                                >
                                    <Download className="w-6 h-6 group-hover:animate-bounce" />
                                    FREE DOWNLOAD HD
                                </button>
                                <p className="text-[10px] text-slate-500 italic mt-3 text-center">Standard License: Commercial OK</p>
                            </div>

                            {/* Scrollable Info */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 scrollbar-thin scrollbar-thumb-white/10 overscroll-contain">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="h-0.5 w-6 bg-gx-cyan rounded-full" />
                                        <span className="text-[10px] font-black text-gx-cyan uppercase tracking-widest">Metadata</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white leading-tight tracking-tight mb-4">{selectedImage.title}</h2>
                                    <p className="text-slate-400 text-sm leading-relaxed">{selectedImage.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <span className="block text-[10px] text-slate-500 uppercase font-black mb-1">Resolution</span>
                                        <span className="text-white text-sm font-mono font-bold">{selectedImage.width} × {selectedImage.height}</span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <span className="block text-[10px] text-slate-500 uppercase font-black mb-1">Category</span>
                                        <span className="text-gx-cyan text-sm font-black uppercase tracking-tighter">{selectedImage.category}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2.5">
                                    {selectedImage.tags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            className="px-4 py-2 bg-white/5 hover:bg-gx-cyan border border-white/10 hover:border-transparent text-slate-300 hover:text-slate-950 rounded-full text-xs font-bold transition-all"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Large Desktop Close */}
                        <button onClick={handleManualClose} className="hidden md:flex absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-rose-500 text-white rounded-full z-[100] backdrop-blur-md border border-white/10 transition-all active:scale-95 shadow-xl group">
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

function CatCard({ img, isFavorite, onToggleFavorite, onClick }: {
    img: CategoryImage,
    isFavorite: boolean,
    onToggleFavorite: () => void,
    onClick: () => void
}) {
    const [loaded, setLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState(img.url);

    return (
        <div className="group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 cursor-zoom-in aspect-[4/3] shadow-xl" onClick={onClick}>
            <div className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`} />
            <Image
                src={imgSrc}
                alt={img.title}
                fill
                className={`object-cover transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} group-hover:scale-110`}
                onLoad={() => setLoaded(true)}
                onError={() => {
                    const fallbackSrc = img.url.startsWith('/') ? img.url : "/" + img.url;
                    if (imgSrc !== fallbackSrc) {
                        setImgSrc(fallbackSrc);
                    }
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
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
            >
                <Heart className={`w-5.5 h-5.5 ${isFavorite ? "fill-white" : "stroke-white"}`} />
            </button>
        </div>
    );
}
