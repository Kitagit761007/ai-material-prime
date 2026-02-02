"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DetailModal } from "./CategorySection";

export default function MaterialGallery({ filterCategory }: { filterCategory?: string }) {
  const [assets, setAssets] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    fetch('/data/assets.json')
      .then(res => res.json())
      .then(data => {
        if (filterCategory) {
          setAssets(data.filter((item: any) => item.category === filterCategory));
        } else {
          setAssets(data);
        }
      });
  }, [filterCategory]);

  const getUrl = (item: any) => {
    let folder = "grok";
    if (item.id.startsWith("mid-")) folder = "mid";
    if (item.id.startsWith("niji-")) folder = "niji";
    if (item.id.startsWith("gpt-")) folder = "GPT";
    if (item.id.startsWith("nano-")) folder = "nano";
    let ext = (folder === "GPT") ? ".png" : ".jpg";
    return `/assets/images/${folder}/${item.id}${ext}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map(item => (
        <div 
          key={item.id} 
          className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer group"
          onClick={() => setSelectedImage(item)}
        >
          <Image 
            src={getUrl(item)} 
            alt={item.title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform" 
            unoptimized 
            onError={(e) => { (e.target as any).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 flex flex-col justify-end text-left">
            <p className="text-white font-bold truncate">{item.title}</p>
          </div>
        </div>
      ))}
      
      {selectedImage && (
        <DetailModal 
          image={selectedImage} 
          url={getUrl(selectedImage)} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
}
