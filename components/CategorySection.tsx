"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
    title: string;
    description: string;
    images: any[];
}

export default function CategorySection({ title, description, images }: CategorySectionProps) {
    if (!images || images.length === 0) return null;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 bg-slate-950">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-cyan-500" />
                        <span className="text-cyan-500 font-bold text-xs uppercase tracking-[0.3em]">Featured Collection</span>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
                </div>
                <Link href="/gallery" className="flex items-center gap-2 text-cyan-400 font-bold hover:text-white hover:gap-4 transition-all group shrink-0">
                    EXPLORE ALL <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img: any) => (
                    <CategoryCard key={img.id} img={img} />
                ))}
            </div>
        </section>
    );
}

function CategoryCard({ img }: any) {
    const [hasError, setHasError] = useState(false);
    if (hasError) return null;

    // フォルダ・拡張子の自動補正（本番運用でも役立つロジック）
    let folder = "grok";
    let ext = ".jpg";
    if (img.id.startsWith("mid-")) folder = "mid";
    if (img.id.startsWith("niji-")) folder = "niji";
    if (img.id.startsWith("gpt-")) { folder = "GPT"; ext = ".png"; }
    if (img.id.startsWith("nano-")) folder = "nano";
    if (img.id.startsWith("g-")) folder = "grok";

    const finalUrl = `/assets/images/${folder}/${img.id}${ext}`;

    return (
        <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
            <Image
                src={finalUrl} 
                alt={img.title || "AI Material"}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                unoptimized 
                onError={() => setHasError(true)}
            />
            {/* 装飾用オーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">Premium Asset</p>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{img.title || "Untitled Work"}</h3>
                <div className="h-1 w-0 bg-cyan-500 group-hover:w-12 transition-all duration-500 delay-100" />
            </div>
        </div>
    );
}
