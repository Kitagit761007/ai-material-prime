"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Download, Heart, ChevronRight } from "lucide-react";

// 🚀 export をつけることで MaterialGallery.tsx から呼び出せるようになります
export function DetailModal({ image, url, onClose }: { image: any; url: string; onClose: () => void }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.includes(image.id));
  }, [image.id]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favs.includes(image.id)) {
      favs = favs.filter((id: string) => id !== image.id);
      setIsFavorite(false);
    } else {
      favs.push(image.id);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 z-[120] p-2 bg-black/60 text-white rounded-full"><X className="w-6 h-6" /></button>
        <div className="relative w-full lg:flex-1 h-[40vh] lg:h-auto bg-black flex items-center justify-center p-4">
          <img src={url} alt={image.title} className="max-w-full max-h-full object-contain" />
          <button onClick={toggleFavorite} className={`absolute bottom-6 right-6 p-4 rounded-full border transition-all active:scale-90 ${isFavorite ? "bg-pink-500 text-white border-pink-400" : "bg-black/50 text-white border-white/20"}`}>
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="w-full lg:w-[400px] p-8 text-left bg-slate-900 overflow-y-auto">
          <h2 className="text-2xl font-black text-white italic uppercase mb-4">{image.title}</h2>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6 text-slate-300 text-sm leading-relaxed">
            {image.description || "次世代AIによって生成された高品質なビジュアル素材です。商用利用可能。"}
          </div>
          <a href={url} download className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-2xl mb-8 transition-all">
            <Download className="w-5 h-5" /> 無料ダウンロード
          </a>
          <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2">Category</div>
          <Link href={`/category/${image.category}`} className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">{image.category}</Link>
        </div>
      </div>
    </div>
  );
}

export default function CategorySection({ title, description, images }: { title: string; description: string; images: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const getUrl = (item: any) => {
    const f = item.id.startsWith("mid-") ? "mid" : item.id.startsWith("niji-") ? "niji" : item.id.startsWith("gpt-") ? "GPT" : item.id.startsWith("nano-") ? "nano" : "grok";
    return `/assets/images/${f}/${item.id}${f === "GPT" ? ".png" : ".jpg"}`;
  };
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10 text-left">
        <div><h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">{title}</h2><p className="text-slate-400">{description}</p></div>
        <Link href={`/category/${title}`} className="text-cyan-400 font-bold flex items-center gap-2 hover:text-cyan-300 transition-colors">VIEW ALL <ChevronRight className="w-5 h-5" /></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5" onClick={() => setSelectedImage(img)}>
            <Image src={getUrl(img)} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white font-bold">{img.title}</div>
          </div>
        ))}
      </div>
      {selectedImage && <DetailModal image={selectedImage} url={getUrl(selectedImage)} onClose={() => setSelectedImage(null)} />}
    </section>
  );
}
