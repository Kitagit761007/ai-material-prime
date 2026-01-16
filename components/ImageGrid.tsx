"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import assets from "@/data/assets.json";
// Trigger Run #19

interface ImageGridProps {
    initialItems?: typeof assets;
    searchQuery?: string;
    showAllButton?: boolean;
    onResultCount?: (count: number) => void;
}

export default function ImageGrid({ initialItems = assets, searchQuery = "", onResultCount }: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<typeof assets[0] | null>(null);
    const router = useRouter();

    // Dynamic filtering based on searchQuery
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
            {/* Grid */}
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

            {/* No Results Fallback */}
            {filteredItems.length === 0 && (
                <div className="py-24 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gx-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-10 h-10 text-slate-500 group-hover:text-gx-cyan transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                        一致するアセットが見つかりませんでした
                    </h3>
                    <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                        「<span className="text-gx-cyan font-semibold">{searchQuery}</span>」に一致する画像はありませんでした。<br />
                        キーワードを変えるか、他のカテゴリーを探索してみてください。
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
                    >
                        <svg className="w-4 h-4 text-gx-cyan group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        全画像を表示する
                    </button>
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
                    {/* Backdrop Click to Close */}
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} />

                    <div className="relative bg-slate-900 rounded-2xl overflow-hidden max-w-6xl w-full h-auto max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10 z-10" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>

                        {/* Image Side */}
                        <div className="md:w-2/3 bg-black/50 flex items-center justify-center relative min-h-[300px] md:h-auto">
                            <Image
                                src={selectedImage.src}
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
                                    無料ダウンロード (PNG)
                                </a>
                                <p className="text-center text-[10px] font-bold text-gx-emerald mt-3 flex items-center justify-center gap-1 opacity-90">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    商用利用可能・ロイヤリティフリー・クレジット不要
                                </p>
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
                                        <button
                                            key={tag}
                                            onClick={(e: React.MouseEvent) => {
                                                setSelectedImage(null);
                                                handleInternalTagClick(tag);
                                            }}
                                            className="px-2 py-0.5 bg-white/5 text-slate-400 text-[11px] rounded border border-white/10 hover:border-gx-cyan hover:text-gx-cyan transition-colors"
                                        >
                                            {tag}
                                        </button>
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
