"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Download, Heart, Tag as TagIcon, Layers, ChevronRight } from "lucide-react";

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

// 🚀 export をつけることで他から呼び出せるようにします
export function DetailModal({ image, url, onClose }: { image: any; url: string; onClose: () => void }) {
  const [metadata, setMetadata] = useState({ width: 0, height: 0, size: "...", ratio: "---" });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // お気に入り確認
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.includes(image.id));

    if (typeof window === "undefined" || !url) return;
    const img = new window.Image();
    img.src = url;
    img.onload = () => setMetadata(prev => ({ ...prev, width: img.naturalWidth, height: img.naturalHeight }));
    fetch(url, { method: 'HEAD' }).then(res => {
      const bytes = parseInt(res.headers.get('content-length') || '0');
      const sizeStr = bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
      setMetadata(prev => ({ ...prev, size: sizeStr }));
    }).catch(() => {});
  }, [url, image.id]);

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-[120] p-2 bg-black/60 hover:bg-black text-white rounded-full transition-all border border-white/10 group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
        <div className="relative w-full lg:flex-1 h-[40vh] bg-black flex items-center justify-center p-4 flex-none">
          <img src={url} alt={image.title} className="max-w-full max-h-full object-contain" />
          <button onClick={toggleFavorite} className={`absolute bottom-6 right-6 p-4 rounded-full border transition-all active:scale-90 shadow-xl ${isFavorite ? "bg-pink-500 border-pink-400 text-white" : "bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"}`}><Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} /></button>
        </div>
        <div className="w-full lg:w-[400px] p-8 flex flex-col overflow-y-auto bg-slate-900 border-l border-white/5 text-left">
          <h2 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">{image.title}</h2>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6 text-slate-300 text-xs leading-relaxed">
            AI素材「{image.title}」は${image.category}をテーマに制作されました。商用利用可能。
          </div>
          <a href={url} download className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all mb-8">
            <Download className="w-5 h-5" /> 無料DL
          </a>
          <div className="space-y-4">
            <div>
              <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Layers className="w-3 h-3" /> Category</h3>
              <Link href={`/category/${image.category}`} className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">{image.category}</Link>
            </div>
          </div>
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
        <div><h2 className="text-4xl font-black text-white italic uppercase mb-2 tracking-tighter">{title}</h2><p className="text-slate-400 text-sm">{description}</p></div>
        <Link href={`/category/${title}`} className="text-cyan-400 font-bold flex items-center gap-2">VIEW ALL <ChevronRight className="w-5 h-5" /></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer" onClick={() => setSelectedImage(img)}>
            <Image src={getUrl(img)} alt={img.title} fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
      {selectedImage && <DetailModal image={selectedImage} url={getUrl(selectedImage)} onClose={() => setSelectedImage(null)} />}
    </section>
  );
}
