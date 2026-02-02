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
                // --- 🛠️ フォルダ名の強制補正 ---
                let folder = "grok";
                if (item.id.startsWith("mid-")) folder = "mid";
                if (item.id.startsWith("niji-")) folder = "niji";
                if (item.id.startsWith("gpt-")) folder = "GPT";   // ✅ 大文字に修正
                if (item.id.startsWith("nano-")) folder = "nano";
                if (item.id.startsWith("g-")) folder = "grok";

                // URLを強制再構築（拡張子が.jpgであることを前提）
                const finalUrl = `/assets/images/${folder}/${item.id}.jpg`;

                return (
                    <div key={item.id} className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                        <div className="aspect-[4/3] relative">
                            <Image 
                                src={finalUrl} 
                                alt={item.title || item.id} 
                                fill
                                className="object-cover"
                                unoptimized
                                onError={(e: any) => {
                                    // 万が一.jpgでダメなら.pngを試す（デバッグ用ヒント）
                                    console.log(`Failed to load: ${finalUrl}`);
                                }}
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
