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
            {assets.map((item: any) => {
                // --- 🛠️ フォルダ名の強制変換ロジック ---
                let folder = "grok"; // デフォルト
                if (item.id.startsWith("mid-")) folder = "mid";
                if (item.id.startsWith("niji-")) folder = "niji";
                if (item.id.startsWith("gpt-")) folder = "GPT";   // 👈 ここを実際のフォルダ名に！
                if (item.id.startsWith("nano-")) folder = "nano"; // 👈 ここを実際のフォルダ名に！
                if (item.id.startsWith("g-")) folder = "grok";

                // URLが空、または間違っている場合に強制的に再構築する
                const finalUrl = `/assets/images/${folder}/${item.id}.jpg`;
                
                return (
                    <div key={item.id} className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                        <Image 
                            src={finalUrl} // ✅ JSONの値を無視して、正しいルールでURLを作る
                            alt={item.title || "AI Material"} 
                            width={600} 
                            height={400} 
                            className="w-full h-auto object-cover"
                            unoptimized
                        />
                        <div className="p-4 bg-slate-950/50">
                            {/* タイトルがない場合はIDを表示する（生存確認用） */}
                            <p className="text-white text-sm font-bold truncate">
                                {item.title || `Asset: ${item.id}`}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
