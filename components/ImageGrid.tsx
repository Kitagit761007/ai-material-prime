"use client";

import { useState } from "react";
import Image from "next/image";
import assets from "@/data/assets.json";

interface ImageGridProps {
    initialItems?: typeof assets;
}

export default function ImageGrid({ initialItems = assets }: ImageGridProps) {
    const [filter, setFilter] = useState<string | null>(null);
    const [items, setItems] = useState(initialItems);
    const [selectedImage, setSelectedImage] = useState<typeof assets[0] | null>(null);

    const handleTagClick = (tag: string) => {
        if (filter === tag) {
            setFilter(null);
            setItems(initialItems);
        } else {
            setFilter(tag);
            setItems(initialItems.filter(item => item.tags.includes(tag)));
        }
    };

    return (
        <section className="px-6 pb-20 max-w-7xl mx-auto">
            {/* Filter UI */}
            {filter && (
                <div className="mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="text-slate-400">Filtering by:</span>
                    <button
                        onClick={() => { setFilter(null); setItems(initialItems); }}
                        className="px-3 py-1 bg-gx-cyan text-white rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gx-cyan/80 transition-colors"
                    >
                        {filter} <span className="text-xs">✕</span>
                    </button>
                    <button
                        onClick={() => { setFilter(null); setItems(initialItems); }}
                        className="text-xs text-slate-500 hover:text-white transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((img) => (
                    <ImageCard
                        key={img.id}
                        img={img}
                        onTagClick={handleTagClick}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
                    {/* Backdrop Click to Close */}
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} />

                    <div className="relative bg-slate-900 rounded-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10 z-10" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>

                        {/* Image Side */}
                        <div className="md:w-2/3 bg-black/50 flex items-center justify-center relative min-h-[300px] md:min-h-full">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Details Side */}
                        <div className="md:w-1/3 p-8 flex flex-col overflow-y-auto bg-slate-900">
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{selectedImage.title}</h2>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-2 py-1 bg-gx-cyan/20 text-gx-cyan text-xs font-bold rounded border border-gx-cyan/30">
                                        GX Score: {selectedImage.score}
                                    </span>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                    {selectedImage.description}
                                </p>
                            </div>

                            {/* SPECIFICATIONS */}
                            <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">SPECIFICATIONS</h3>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Resolution</span>
                                        <span className="font-mono text-white">{selectedImage.width} x {selectedImage.height} px</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">File Size</span>
                                        <span className="font-mono text-white">{selectedImage.size}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Aspect Ratio</span>
                                        <span className="font-mono text-white">{selectedImage.aspectRatio}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedImage.tags.map((tag: string) => (
                                        <button
                                            key={tag}
                                            onClick={(e: React.MouseEvent) => {
                                                setSelectedImage(null);
                                                handleTagClick(tag);
                                            }}
                                            className="px-2 py-1 bg-white/5 text-slate-300 text-xs rounded border border-white/10 hover:border-gx-cyan hover:text-gx-cyan transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/10">
                                <a
                                    href={selectedImage.src}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-gx-cyan text-white font-bold rounded-xl hover:bg-gx-cyan/90 transition-all shadow-lg shadow-gx-cyan/20 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                    無料ダウンロード (PNG)
                                </a>
                                <p className="text-center text-xs text-slate-500 mt-3">
                                    商用利用可能・クレジット表記不要
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function ImageCard({
    img,
    onTagClick,
    onClick
}: {
    img: any,
    onTagClick: (tag: string) => void,
    onClick: () => void
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl bg-slate-900/50 border border-white/5 cursor-zoom-in"
            onClick={onClick}
        >
            <div
                className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
            />

            <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={800}
                className={`w-full h-auto object-cover transition-all duration-700 ease-in-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    } group-hover:scale-105`}
                onLoad={() => setLoaded(true)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                </h3>
                <p className="text-slate-300 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
                    {img.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {img.tags && img.tags.slice(0, 3).map((tag: string) => (
                        <button
                            key={tag}
                            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onTagClick(tag); }}
                            className="px-2 py-1 bg-white/10 hover:bg-gx-cyan hover:text-white text-gx-cyan text-xs font-bold rounded cursor-pointer transition-all border border-white/5"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
