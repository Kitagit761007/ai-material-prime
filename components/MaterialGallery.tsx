"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Heart, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { downloadImage } from "../lib/imageUtils";
import { useFavorites } from "@/context/FavoritesContext";
import { useSearch } from "@/context/SearchContext";

interface Asset {
    id: string;
    url: string;
    title: string;
    description: string;
    score: number;
    width: number;
    height: number;
    category: string;
    tags: string[];
}

export default function MaterialGallery() {
    const { searchQuery, selectedCategory } = useSearch();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
    const [displayCount, setDisplayCount] = useState(20);
    const [isZoomed, setIsZoomed] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const response = await fetch(`/data/assets.json?v=${Date.now()}`);
                const data = await response.json();
                setAssets(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        loadAssets();
    }, []);

    const filteredItems = assets.filter((item) => {
        if (selectedCategory && item.category !== selectedCategory) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase().trim();
        return item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    });

    const visibleItems = filteredItems.slice(0, displayCount);

    const handleNext = () => {
        if (!selectedImage) return;
        const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
        setSelectedImage(filteredItems[(idx + 1) % filteredItems.length]);
    };

    const handlePrev = () => {
        if (!selectedImage) return;
        const idx = filteredItems.findIndex(i => i.id === selectedImage.id);
        setSelectedImage(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
    };

    return (
        <section id="gallery-section" className="px-6 pb-20 max-w-7xl mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {visibleItems.map((item) => (
                    <div key={item.id} className="relative group rounded-2xl overflow-hidden break-inside-avoid bg-slate-900/50 border border-white/5 cursor-zoom-in" onClick={() => setSelectedImage(item)}>
                        <Image src={item.url} alt={item.title} width={600} height={800} className="w-full h-auto object-cover" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                            <p className="text-white text-sm font-bold truncate">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl" onClick={() => setSelectedImage(null)}>
                    <div className="relative w-full h-[90vh] max-w-[95vw] flex flex-col md:flex-row bg-slate-950 md:rounded-3xl overflow-hidden border border-white/10" onClick={e => e.stopPropagation()}>
                        <div className="relative flex-1 bg-black/40 flex items-center justify-center">
                            <div className="relative w-full h-full p-4">
                                {/* ✅ ここを selectedImage.url に修正しました */}
                                <Image src={selectedImage.url} alt={selectedImage.title} fill className="object-contain" unoptimized />
                            </div>
                            <button onClick={() => setSelectedImage(null)} className="absolute top-4 left-4 p-2 bg-black/40 rounded-full text-white"><X /></button>
                            <button onClick={handlePrev} className="absolute left-4 top-1/2 p-4 bg-black/40 text-white rounded-full"><ChevronLeft /></button>
                            <button onClick={handleNext} className="absolute right-4 top-1/2 p-4 bg-black/40 text-white rounded-full"><ChevronRight /></button>
                        </div>
                        <div className="w-full md:w-[400px] p-8 bg-slate-900">
                            <h2 className="text-2xl font-bold text-white mb-4">{selectedImage.title}</h2>
                            <p className="text-slate-400 mb-6">{selectedImage.description}</p>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <span className="text-gx-cyan font-bold">{selectedImage.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
