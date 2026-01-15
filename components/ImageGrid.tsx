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
            {filter && (
                <div className="mb-8 flex items-center gap-4">
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

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((img) => (
                    <ImageCard key={img.id} img={img} onTagClick={handleTagClick} />
                ))}
            </div>
        </section>
    );
}

function ImageCard({ img, onTagClick }: { img: any, onTagClick: (tag: string) => void }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl bg-slate-900/50 border border-white/5">
            <div
                className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
            />

            <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={800} // Approximate height for Masonry feel foundation
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
                    {img.tags && img.tags.map((tag: string) => (
                        <button
                            key={tag}
                            onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
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
