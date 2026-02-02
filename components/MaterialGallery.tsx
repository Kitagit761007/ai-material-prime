"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { DetailModal } from "./CategorySection"; // 先ほど作ったモーダルを再利用

export default function MaterialGallery() {
    const [assets, setAssets] = useState([]);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    useEffect(() => {
        fetch(`/data/assets.json?v=${Date.now()}`).then(res => res.json()).then(setAssets);
    }, []);

    const getFinalUrl = (item: any) => {
        let folder = "grok";
        let ext = ".jpg";
        if (item.id.startsWith("mid-")) folder = "mid";
        if (item.id.startsWith("niji-")) folder = "niji";
        if (item.id.startsWith("gpt-")) { folder = "GPT"; ext = ".png"; }
        if (item.id.startsWith("nano-")) folder = "nano";
        if (item.id.startsWith("g-")) folder = "grok";
        return `/assets/images/${folder}/${item.id}${ext}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assets.map((item: any) => (
                    <div 
                        key={item.id} 
                        className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-zoom-in" 
                        onClick={() => setSelectedImage(item)}
                    >
                        <Image src={getFinalUrl(item)} alt={item.title} fill className="object-cover transition-all duration-700 group-hover:scale-110" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                            <Maximize2 className="absolute top-4 right-4 text-white/50 group-hover:text-cyan-400 transition-colors" />
                            <p className="text-white font-bold truncate">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <DetailModal 
                    image={selectedImage} 
                    url={getFinalUrl(selectedImage)} 
                    onClose={() => setSelectedImage(null)} 
                />
            )}
        </div>
    );
}
