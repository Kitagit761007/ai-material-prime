"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DetailModal } from "./CategorySection";

export default function MaterialGallery({ filterCategory }: { filterCategory?: string }) {
  const [assets, setAssets] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    fetch('/data/assets.json').then(res => res.json()).then(data => {
      if (filterCategory) {
        setAssets(data.filter((item: any) => item.category === filterCategory));
      } else {
        setAssets(data);
      }
    });
  }, [filterCategory]);

  const getUrl = (item: any) => {
    let folder = item.id.startsWith("mid-") ? "mid" : 
                 item.id.startsWith("niji-") ? "niji" : 
                 item.id.startsWith("gpt-") ? "GPT" : 
                 item.id.startsWith("nano-") ? "nano" : "grok";
    let ext = folder === "GPT" ? ".png" : ".jpg";
    return `/assets/images/${folder}/${item.id}${ext}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map(item => (
        <GalleryItem key={item.id} item={item} url={getUrl(item)} onOpen={() => setSelectedImage(item)} />
      ))}
      {selectedImage && <DetailModal image={selectedImage} url={getUrl(selectedImage)} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}

function GalleryItem({ item, url, onOpen }: any) {
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer group" onClick={onOpen}>
      <Image src={url} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform" unoptimized onError={() => setError(true)} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 flex flex-col justify-end">
        <p className="text-white font-bold truncate">{item.title}</p>
      </div>
    </div>
  );
}
