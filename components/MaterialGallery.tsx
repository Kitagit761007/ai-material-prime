"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MaterialGallery() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        // キャッシュを避けるためにタイムスタンプを付与
        fetch(`/data/assets.json?v=${Date.now()}`)
            .then(res => res.json())
            .then(data => setAssets(data))
            .catch(err => console.error("JSON読み込み失敗:", err));
    }, []);

    if (assets.length === 0) return <div className="text-white p-10">読み込み中... ({assets.length})</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:columns-3 gap-6 p-6">
            {assets.map((item: any) => (
                <div key={item.id} className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                    <Image 
                        src={item.url} 
                        alt={item.title} 
                        width={600} 
                        height={400} 
                        className="w-full h-auto object-cover"
                        unoptimized // ✅ ここが重要：余計な最適化で画像を消さない
                    />
                    <div className="p-4 bg-slate-950/50">
                        <p className="text-white text-sm font-bold">{item.title}</p>
                        <p className="text-gx-cyan text-[10px]">{item.category}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
