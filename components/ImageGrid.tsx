"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import assets from "@/data/assets.json";

interface ImageGridProps {
    initialItems?: typeof assets;
    searchQuery?: string;
    showAllButton?: boolean;
    onResultCount?: (count: number) => void;
}

export default function ImageGrid({ initialItems = assets, searchQuery = "", onResultCount }: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<typeof assets[0] | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState<number>(0);
    const router = useRouter();

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

    useEffect(() => {
        if (onResultCount) {
            onResultCount(filteredItems.length);
        }
    }, [filteredItems.length, onResultCount]);

    const handleInternalTagClick = (tag: string) => {
        const cleanTag = tag.startsWith("#") ? tag.substring(1) : tag;
        router.push(`/tags/${encodeURIComponent(cleanTag)}`);
    };

    return (
        <section className="px-6 pb-20 max-w-7xl mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredItems.map((img) => (
                    <ImageCard
                        key={img.id}
                        img={img}
                        onTagClick={handleInternalTagClick}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="py-24 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gx-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-10 h-10 text-slate-500 group-hover:text-gx-cyan transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">一致するアセットが見つかりませんでした</h3>
                    <button onClick={() => router.push("/")} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group">
                        全画像を表示する
                    </button>
                </div>
            )}

            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300" style={{ opacity: swipeOffset > 0 ? Math.max(0, 1 - swipeOffset / 300) : 1 }}>
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} />
                    <div className="relative bg-slate-900 rounded-2xl overflow-hidden max-w-6xl w-full h-auto max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10 z-10 transition-transform" style={{ transform: `translateY(${swipeOffset}px)`, transition: swipeOffset === 0 ? 'transform 0.3s ease-out' : 'none' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all duration-200 backdrop-blur-md active:scale-95 flex items-center justify-center group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:rotate-90"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <div className="md:w-2/3 bg-black/50 flex items-center justify-center relative min-h-[300px] md:h-auto">
                            <Image
                                src={`${selectedImage.id.startsWith('mid-') ? selectedImage.src.replace('.png', '.jpg') : selectedImage.src}?v=${new Date().getTime()}`}
                                alt={selectedImage.title}
                                fill
                                quality={80}
                                unoptimized={true}
                                className="object-contain"
                            />
                        </div>

                        <div className="md:w-1/3 p-6 flex flex-col bg-slate-900 overflow-y-auto min-h-0 gap-6">
                            <div className="shrink-0">
                                <h2 className="text-lg md:text-xl font-bold text-white mb-2">{selectedImage.title}</h2>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 bg-gx-cyan/20 text-gx-cyan text-xs font-bold rounded border border-gx-cyan/30">GX Score: {selectedImage.score}</span>
                                </div>
                                <p className="text-slate-300 text-sm">{selectedImage.description}</p>
                            </div>
                            <div className="shrink-0 p-5 bg-gx-cyan/5 rounded-2xl border border-gx-cyan/20">
                                <a href={selectedImage.src} download className="flex flex-col items-center justify-center gap-1 w-full py-3 bg-gx-cyan text-white font-bold text-sm rounded-xl hover:bg-gx-cyan/90 transition-all">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                        ダウンロード
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function ImageCard({ img, onTagClick, onClick }: { img: any, onTagClick: (tag: string) => void, onClick: () => void }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl bg-slate-900/50 border border-white/5 cursor-zoom-in" onClick={onClick}>
            <div className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`} />
            <Image
                src={`${img.id.startsWith('mid-') ? img.src.replace('.png', '.jpg') : img.src}?v=${new Date().getTime()}`}
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
                        <button key={tag} onClick={(e: React.MouseEvent) => { e.stopPropagation(); onTagClick(tag); }} className="px-2 py-1 bg-white/10 hover:bg-gx-cyan hover:text-white text-gx-cyan text-xs font-bold rounded cursor-pointer border border-white/5">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
