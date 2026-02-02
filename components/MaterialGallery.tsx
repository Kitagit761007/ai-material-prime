"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MaterialGallery() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetch(`/data/assets.json?v=${Date.now()}`)
            .then(res => res.json())
            .then(setAssets);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {assets.map((item: any) => (
                <GalleryItem key={item.id} item={item} />
            ))}
        </div>
    );
}

function GalleryItem({ item }: any) {
    const [hasError, setHasError] = useState(false);
    
    // 画像がない場合はカードごと消滅させる（歯抜けを見せない）
    if (hasError) return null;

    let folder = "grok";
    let ext = ".jpg";
    if (item.id.startsWith("mid-")) folder = "mid";
    if (item.id.startsWith("niji-")) folder = "niji";
    if (item.id.startsWith("gpt-")) { folder = "GPT"; ext = ".png"; } // ✅ GPT対応
    if (item.id.startsWith("nano-")) folder = "nano";
    if (item.id.startsWith("g-")) folder = "grok";

    const finalUrl = `/assets/images/${folder}/${item.id}${ext}`;

    return (
        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10">
            <div className="aspect-[4/3] relative">
                <Image 
                    src={finalUrl} 
                    alt={item.title || item.id} 
                    fill
                    className="object-cover"
                    unoptimized
                    onError={() => setHasError(true)} // ✅ niji-107などの欠損画像をスキップ
                />
            </div>
            <div className="p-4 bg-slate-950/80">
                <p className="text-white text-xs font-bold truncate">
                    {item.title || `Asset: ${item.id}`}
                </p>
            </div>
        </div>
    );
}
