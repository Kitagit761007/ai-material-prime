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
            {assets.map((item: any) => {
                // --- 🛠️ フォルダと拡張子の自動補正ロジック ---
                let url = item.url;

                // 1. フォルダ名の補正
                url = url.replace('/assets/images/g/', '/assets/images/grok/');
                url = url.replace('/assets/images/gpt/', '/assets/images/GPT/');

                // 2. GPTなどの拡張子補正（.jpgで失敗する対策）
                if (item.id.startsWith('gpt-')) {
                    url = url.replace('.jpg', '.png');
                }

                return (
                    <div key={item.id} className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                        <div className="aspect-[4/3] relative">
                            <Image 
                                src={url} 
                                alt={item.title || item.id} 
                                fill
                                className="object-cover"
                                unoptimized
                                onError={(e) => console.log("Failed to load:", url)}
                            />
                        </div>
                        <div className="p-4 bg-slate-950/80">
                            <p className="text-white text-xs font-bold truncate">
                                {item.title || `Asset: ${item.id}`}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
