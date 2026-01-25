"use client";

import { useState } from "react";
import Image from "next/image";
import { getDisplaySrc } from "../lib/imageUtils";

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

export default function CategorySection({ title, description, images }: CategorySectionProps) {
    const [selectedImage, setSelectedImage] = useState<CategoryImage | null>(null);
    const [modalImgSrc, setModalImgSrc] = useState<string>("");
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);
    const [touchEndY, setTouchEndY] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState<number>(0);

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
                    const [currentSrc, setCurrentSrc] = useState(getDisplaySrc(img.src));
                    return (
                        <div
                            key={img.id}
                            className="group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 cursor-zoom-in"
                            onClick={() => setSelectedImage(img)}
                        >
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src={currentSrc}
                                    alt={img.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={() => setCurrentSrc(img.src)}
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-lg mb-1">{img.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-gx-cyan/20 text-gx-cyan text-xs font-bold rounded">
                                        Score: {img.score}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Modal (Mirrored from ImageGrid for consistency) */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
                    style={{
                        opacity: swipeOffset > 0 ? Math.max(0, 1 - swipeOffset / 300) : 1
                    }}
                >
                    {/* Tap-to-close Backdrop */}
                    <div className="absolute inset-0 bg-transparent cursor-zoom-out z-0" onClick={() => { setSelectedImage(null); setModalImgSrc(""); }} />

                    {/* Immersive Navigation Arrows - Higher Z-Index */}
                    <div className="absolute inset-y-0 left-0 md:left-4 flex items-center z-40 pointer-events-none">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = images.findIndex(item => item.id === selectedImage.id);
                                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                                setSelectedImage(images[prevIndex]);
                                setModalImgSrc("");
                            }}
                            className="p-4 md:p-6 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all pointer-events-auto backdrop-blur-md active:scale-95"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 md:right-4 flex items-center z-40 pointer-events-none">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = images.findIndex(item => item.id === selectedImage.id);
                                const nextIndex = (currentIndex + 1) % images.length;
                                setSelectedImage(images[nextIndex]);
                                setModalImgSrc("");
                            }}
                            className="p-4 md:p-6 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all pointer-events-auto backdrop-blur-md active:scale-95"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>

                    {/* Top Controls Overlay */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex justify-end items-center z-50 pointer-events-none">
                        <button
                            onClick={() => { setSelectedImage(null); setModalImgSrc(""); }}
                            className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all pointer-events-auto backdrop-blur-md"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div
                        className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12 z-20 cursor-zoom-out transition-transform"
                        style={{
                            transform: `translateY(${swipeOffset}px)`,
                            transition: swipeOffset === 0 ? 'transform 0.3s ease-out' : 'none'
                        }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        onClick={() => { setSelectedImage(null); setModalImgSrc(""); }}
                    >
                        <div className="relative w-full h-full max-w-5xl max-h-[75vh] pointer-events-none">
                            <Image
                                src={modalImgSrc || (selectedImage ? getDisplaySrc(selectedImage.src) : "")}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                                onError={() => setModalImgSrc(selectedImage.src)}
                                loading="lazy"
                            />
                        </div>

                        {/* Bottom Bar Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center gap-4 pointer-events-none">
                            <div className="text-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight select-none">
                                    {selectedImage.title}
                                </h2>
                                <div className="flex items-center justify-center gap-4 text-slate-400 font-mono text-xs md:text-sm tracking-widest uppercase opacity-80 select-none">
                                    <span>FILE: {selectedImage.src.split('/').pop()}</span>
                                    <span className="hidden md:inline w-1 h-1 bg-white/20 rounded-full" />
                                    <span className="hidden md:inline">FREE HD ASSET</span>
                                </div>
                            </div>

                            <a
                                href={selectedImage.src}
                                download
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                className="mt-4 px-10 py-3.5 bg-white text-slate-900 font-extrabold rounded-full hover:bg-gx-cyan hover:text-white transition-all shadow-2xl pointer-events-auto active:scale-95"
                            >
                                DOWNLOAD ASSET
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section >
    );
}
