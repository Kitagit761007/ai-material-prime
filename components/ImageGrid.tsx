"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getDisplaySrc } from "../lib/imageUtils";
// 🚨 インポートパスを物理相対パスで確定（ビルドエラー回避）
import assets from "../data/assets.json";

interface ImageGridProps {
    initialItems?: typeof assets;
    searchQuery?: string;
    onResultCount?: (count: number) => void;
}

export default function ImageGrid({ searchQuery = "", onResultCount }: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<typeof assets[0] | null>(null);
    const [modalImgSrc, setModalImgSrc] = useState<string>("");
    const [displayCount, setDisplayCount] = useState(20);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const router = useRouter();

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
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Tap-to-close Backdrop */}
                    <div className="absolute inset-0 bg-transparent cursor-zoom-out z-0" onClick={() => { setSelectedImage(null); setModalImgSrc(""); }} />

                    {/* Immersive Navigation Arrows - Higher Z-Index */}
                    <div className="absolute inset-y-0 left-0 md:left-4 flex items-center z-40 pointer-events-none">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                                const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                                setSelectedImage(filteredItems[prevIndex]);
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
                                const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                                const nextIndex = (currentIndex + 1) % filteredItems.length;
                                setSelectedImage(filteredItems[nextIndex]);
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

                    {/* Main Content Area - Full Width/Height */}
                    <div
                        className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12 z-20 cursor-zoom-out"
                        onClick={() => { setSelectedImage(null); setModalImgSrc(""); }}
                    >
                        <div className="relative w-full h-full max-w-6xl max-h-[80vh] transition-transform duration-500 will-change-transform pointer-events-none">
                            <Image
                                src={modalImgSrc || getDisplaySrc(selectedImage.src)}
                                alt={selectedImage.title}
                                fill
                                quality={100}
                                loading="lazy"
                                sizes="95vw"
                                className="object-contain"
                                onError={() => setModalImgSrc(selectedImage.src)}
                            />
                        </div>

                        {/* Bottom Info Bar Overlay */}
                        <div
                            className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center gap-4 pointer-events-none"
                        >
                            <div className="text-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg tracking-tight select-none">
                                    {selectedImage.title}
                                </h2>
                                <p className="text-slate-400 font-mono text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-4 opacity-80 select-none">
                                    <span>FILE: {selectedImage.src.split('/').pop()}</span>
                                    <span className="hidden md:inline w-1 h-1 bg-white/20 rounded-full" />
                                    <span className="hidden md:inline">{selectedImage.width} x {selectedImage.height}</span>
                                </p>
                            </div>

                            {/* Minimal Action Row */}
                            <div className="flex items-center gap-4 pointer-events-auto mt-4">
                                <a
                                    href={selectedImage.src}
                                    download
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-center gap-3 px-8 py-3 bg-white text-slate-950 font-extrabold rounded-full hover:bg-gx-cyan hover:text-white transition-all shadow-2xl active:scale-95"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    <span className="tracking-wide">DOWNLOAD HD</span>
                                </a>
                                <div className="hidden md:flex gap-2">
                                    {getShareLinks(selectedImage).map((sns) => (
                                        <a
                                            key={sns.name}
                                            href={sns.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={e => e.stopPropagation()}
                                            className={`w-12 h-12 bg-black/40 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all ${sns.hoverClass}`}
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
