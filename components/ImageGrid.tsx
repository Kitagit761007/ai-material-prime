"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// 🚨 インポートパスを物理相対パスで確定（ビルドエラー回避）
import assets from "../data/assets.json";

interface ImageGridProps {
    initialItems?: typeof assets;
    searchQuery?: string;
    onResultCount?: (count: number) => void;
}

export default function ImageGrid({ searchQuery = "", onResultCount }: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<typeof assets[0] | null>(null);
    const [swipeOffset, setSwipeOffset] = useState<number>(0);
    // 💡 初期表示枚数を20枚に設定
    const [displayCount, setDisplayCount] = useState(20);
    const router = useRouter();

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

    // 実際に表示する分だけを切り出す
    const visibleItems = filteredItems.slice(0, displayCount);

    useEffect(() => {
        if (onResultCount) {
            onResultCount(filteredItems.length);
        }
    }, [filteredItems.length, onResultCount]);

    // 無限スクロールの検知ロジック（スロットリング不要な軽量設計）
    const handleScroll = useCallback(() => {
        if (typeof window === "undefined") return;
        
        // ページの最下部から800px手前に来たら次の20枚を読み込む
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

            {/* 読み込み完了時のメッセージ */}
            {displayCount >= filteredItems.length && filteredItems.length > 0 && (
                <div className="py-12 text-center">
                    <p className="text-slate-500 text-sm italic">
                        すべての画像を表示しました
                    </p>
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

            {/* ライトボックス */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} />
                    <div className="relative bg-slate-900 rounded-2xl overflow-hidden max-w-6xl w-full h-auto max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10 z-10" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <div className="md:w-2/3 bg-black/50 flex items-center justify-center relative min-h-[300px] md:h-auto">
                            <Image
                                // 🚨 パス判定による画像置換ルールを維持
                                src={`${selectedImage.src.includes('mid/mid-') ? selectedImage.src.replace('.png', '.jpg') : selectedImage.src}?v=${new Date().getTime()}`}
                                alt={selectedImage.title}
                                fill
                                quality={80}
                                unoptimized={true}
                                className="object-contain"
                            />
                        </div>

                        <div className="md:w-1/3 p-6 flex flex-col bg-slate-900 overflow-y-auto">
                            <div className="mb-6">
                                <h2 className="text-lg md:text-xl font-bold text-white mb-2">{selectedImage.title}</h2>
                                <p className="text-slate-300 text-sm leading-relaxed">{selectedImage.description}</p>
                            </div>
                            <a href={selectedImage.src} download className="w-full py-4 bg-gx-cyan text-white text-center font-bold rounded-xl hover:bg-gx-cyan/90 transition-all shadow-lg shadow-gx-cyan/20">
                                高解像度画像をダウンロード
                            </a>
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
                // 🚨 ここもパス判定ルールを維持
                src={`${img.src.includes('mid/mid-') ? img.src.replace('.png', '.jpg') : img.src}?v=${new Date().getTime()}`}
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
                        <button key={tag} onClick={(e: React.MouseEvent) => { e.stopPropagation(); onTagClick(tag); }} className="px-2 py-1 bg-white/10 text-gx-cyan text-xs font-bold rounded border border-white/5 hover:bg-gx-cyan hover:text-white transition-colors">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
