"use client";

import { useState } from "react";
import Image from "next/image";

// Placeholder data - in a real app this would come from an API
const INITIAL_IMAGES = [
    { id: 1, src: "https://placehold.co/600x800/111827/00D1FF/png?text=Hydrogen+Plant", height: 800, title: "Future H2 Plant", score: 98 },
    { id: 2, src: "https://placehold.co/600x600/111827/00FF85/png?text=Wind+Turbines", height: 600, title: "Offshore Wind", score: 95 },
    { id: 3, src: "https://placehold.co/600x900/111827/FFFFFF/png?text=Solar+Grid", height: 900, title: "Desert Solar", score: 92 },
    { id: 4, src: "https://placehold.co/600x700/111827/00D1FF/png?text=Smart+City", height: 700, title: "Connected City", score: 99 },
    { id: 5, src: "https://placehold.co/600x500/111827/00FF85/png?text=Bio+Lab", height: 500, title: "Biotech Lab", score: 88 },
    { id: 6, src: "https://placehold.co/600x800/111827/FFFFFF/png?text=EV+Station", height: 800, title: "EV Station", score: 94 },
];

export default function ImageGrid() {
    return (
        <section className="px-6 pb-20 max-w-7xl mx-auto">
            {/* Simple column layout for Masonry-like feel without heavy libs */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {INITIAL_IMAGES.map((img) => (
                    <ImageCard key={img.id} img={img} />
                ))}
            </div>
        </section>
    );
}

function ImageCard({ img }: { img: any }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl bg-slate-900/50 border border-white/5">
            {/* Skeleton / Loading State */}
            <div
                className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
            />

            <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={img.height}
                className={`w-full h-auto object-cover transition-all duration-700 ease-in-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    } group-hover:scale-105`}
                onLoad={() => setLoaded(true)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <span className="px-2 py-1 bg-gx-emerald/20 text-gx-emerald text-xs font-bold rounded">
                        GX Score: {img.score}
                    </span>
                    <span className="text-slate-300 text-xs">#Sustainable</span>
                </div>
            </div>
        </div>
    );
}
