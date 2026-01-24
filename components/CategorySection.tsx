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
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState<number>(0);

    const minSwipeDistance = 70;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
        setSwipeOffset(0);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const currentTouch = e.targetTouches[0].clientY;
        setTouchEnd(currentTouch);
        const distance = currentTouch - touchStart;
        // Only allow downward swipes
        if (distance > 0) {
            setSwipeOffset(distance);
        }
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            setSwipeOffset(0);
            return;
        }
        const distance = touchEnd - touchStart;
        const isDownSwipe = distance > minSwipeDistance;
        if (isDownSwipe) {
            setSelectedImage(null);
        }
        setSwipeOffset(0);
        setTouchStart(null);
        setTouchEnd(null);
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
                {images.map((img) => (
                    <div
                        key={img.id}
                        className="group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 cursor-zoom-in"
                        onClick={() => setSelectedImage(img)}
                    >
                        <div className="aspect-[4/5] relative">
                            <Image
                                src={getDisplaySrc(img.src)}
                                alt={img.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                ))}
            </div>

            {/* Lightbox Modal (Mirrored from ImageGrid for consistency) */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
                    style={{
                        opacity: swipeOffset > 0 ? Math.max(0, 1 - swipeOffset / 300) : 1
                    }}
                >
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} />

                    <div
                        className="relative bg-slate-900 rounded-2xl overflow-hidden max-w-6xl w-full h-auto max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10 z-10 transition-transform"
                        style={{
                            transform: `translateY(${swipeOffset}px)`,
                            transition: swipeOffset === 0 ? 'transform 0.3s ease-out' : 'none'
                        }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Swipe Indicator */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full z-30" />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all duration-200 backdrop-blur-md active:scale-95 flex items-center justify-center group"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:rotate-90"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        {/* Image Side */}
                        <div className="md:w-2/3 bg-black/50 flex items-center justify-center relative min-h-[300px] md:h-auto">
                            <Image
                                src={getDisplaySrc(selectedImage.src)}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Details Side */}
                        <div className="md:w-1/3 p-6 flex flex-col bg-slate-900 overflow-y-auto min-h-0 gap-6">
                            {/* Header */}
                            <div className="shrink-0">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight line-clamp-2">{selectedImage.title}</h2>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 bg-gx-cyan/20 text-gx-cyan text-xs font-bold rounded border border-gx-cyan/30">
                                        GX Score: {selectedImage.score}
                                    </span>
                                </div>
                                <p className="text-slate-300 leading-snug text-sm line-clamp-3">
                                    {selectedImage.description}
                                </p>
                            </div>

                            {/* DOWNLOAD UI (Prioritized) */}
                            <div className="shrink-0 p-4 bg-white/5 rounded-xl border border-white/10">
                                <a
                                    href={selectedImage.src}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gx-cyan text-white font-bold rounded-xl hover:bg-gx-cyan/90 transition-all shadow-lg shadow-gx-cyan/20 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                    無料ダウンロード / Download
                                </a>
                                <div className="text-center mt-2">
                                    <span className="text-[10px] font-bold text-gx-cyan tracking-widest uppercase block mb-1">Free Assets for All Creators</span>
                                    <p className="text-center text-[10px] font-bold text-gx-emerald flex items-center justify-center gap-1 opacity-90">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        商用利用可能・クレジット不要<br />
                                        Commercial Use OK / No Attribution Required
                                    </p>
                                </div>
                            </div>

                            {/* SPECIFICATIONS */}
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10 shrink-0">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SPECIFICATIONS</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-300">
                                    <div className="flex justify-between border-b border-white/5 pb-1">
                                        <span className="text-slate-500 text-[10px] uppercase">Resolution</span>
                                        <span className="font-mono text-white text-[11px]">{selectedImage.width} x {selectedImage.height}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-1">
                                        <span className="text-slate-500 text-[10px] uppercase">Size</span>
                                        <span className="font-mono text-white text-[11px]">{selectedImage.size}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                        <span className="text-slate-500 text-[10px] uppercase">Ratio</span>
                                        <span className="font-mono text-white text-[11px]">{selectedImage.aspectRatio}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                        <span className="text-slate-500 text-[10px] uppercase">Category</span>
                                        <span className="font-mono text-white text-[11px] capitalize">{selectedImage.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* TAGS */}
                            <div className="shrink-0 pb-2">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedImage.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 bg-white/5 text-slate-400 text-[11px] rounded border border-white/10"
                                        >
                                            {tag}
                                        </span>
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
