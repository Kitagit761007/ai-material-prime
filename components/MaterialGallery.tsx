"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MaterialGallery() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetch(`/data/assets.json?v=${Date.now()}`)
            .then(res => res.json())
            .then(data => setAssets(data));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {assets.map((item: any) => (
                <div key={item.id} className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                    <Image 
                        src={item.url} // ✅ JSONにある正しい住所を使う
                        alt={item.title} 
                        width={600} 
                        height={400} 
                        className="w-full h-auto object-cover"
                        unoptimized
                    />
                    <div className="p-4 bg-slate-950/50">
                        <p className="text-white text-sm font-bold truncate">{item.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
