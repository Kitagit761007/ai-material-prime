"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Download, Linkedin, Heart, Tag as TagIcon, Layers, ChevronRight } from "lucide-react";

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const getSmartRatio = (w: number, h: number) => {
  if (!w || !h) return "---";
  const r = w / h;
  const stds = [{ n: "1:1", v: 1 }, { n: "16:9", v: 1.77 }, { n: "3:2", v: 1.5 }, { n: "4:3", v: 1.33 }, { n: "2:3", v: 0.66 }, { n: "9:16", v: 0.56 }];
  return stds.reduce((p, c) => Math.abs(c.v - r) < Math.abs(p.v - r) ? c : p).n;
};

const getSeoDescription = (t: string, c: string, id: string) => {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const texts = [`「${t}」は、${c}をテーマに最新の生成AI技術で描かれた${id}番目の作品です。持続可能な未来へのビジョンを、精緻な質感で表現しました。`];
  return `${texts[seed % texts.length]} 商用利用可能で、プロフェッショナルな制作に最適化されています。`;
};

// 🚀 ここで DetailModal を export しているのが重要！
export function DetailModal({ image, url, onClose }: { image: any; url: string; onClose: () => void }) {
  const [metadata, setMetadata] = useState({ width: 0, height: 0, size: "...", ratio: "---" });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.includes(image.id));
    if (typeof window === "undefined" || !url) return;
    const img = new window.Image();
    img.src = url;
    img.onload = () => setMetadata(prev => ({ ...prev, width: img.naturalWidth, height: img.naturalHeight, ratio: getSmartRatio(img.naturalWidth, img.naturalHeight) }));
    fetch(url, { method: 'HEAD' }).then(res => {
      const bytes = parseInt(res.headers.get('content-length') || '0');
      const sizeStr = bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
      setMetadata(prev => ({ ...prev, size: sizeStr }));
    });
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
      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl max-h-[95vh] md:max-h-[85vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-[120] p-2 bg-black/60 hover:bg-black text-white rounded-full transition-all border border-white/10 group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
        <div className="relative w-full lg:flex-1 h-[40vh] sm:h-[45vh] lg:h-auto bg-black flex items-center justify-center p-4 overflow-hidden flex-none">
          <img src={url} alt={image.title} className="max-w-full max-h-full object-contain pointer-events-none" />
          <button onClick={toggleFavorite} className={`absolute bottom-6 right-6 p-4 rounded-full backdrop-blur-md border transition-all active:scale-90 shadow-xl ${isFavorite ? "bg-pink-500 border-pink-400 text-white" : "bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"}`}><Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} /></button>
        </div>
        <div className="w-full lg:w-[400px] p-6 sm:p-8 flex flex-col overflow-y-auto bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/5 text-left flex-1 relative z-10">
          <div className="mb-6"><h2 className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter mb-4 leading-tight">{image.title}</h2><div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6"><p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed antialiased">{getSeoDescription(image.title, image.category, image.id)}</p></div></div>
          <div className="flex gap-2 items-stretch mb-8 h-12 sm:h-14 flex-none"><a href={url} download className="flex-[3] flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/20 active:scale-[0.98]"><Download className="w-4 h-4 sm:w-5 sm:h-5" /><span className="text-xs sm:text-sm font-black uppercase">無料DL</span></a><div className="flex-[2] flex gap-1.5"><button onClick={()=>window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.origin+'/gallery/'+image.id)}&text=${encodeURIComponent(image.title)}`,'_blank')} className="flex-1 flex items-center justify-center bg-black rounded-xl text-white border border-white/10"><XLogo className="w-4 h-4" /></button><button onClick={()=>window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin+'/gallery/'+image.id)}`,'_blank')} className="flex-1 flex items-center justify-center bg-[#0A66C2] rounded-xl text-white"><Linkedin className="w-4 h-4 fill-current" /></button><button onClick={()=>window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.origin+'/gallery/'+image.id)}`,'_blank')} className="flex-1 flex items-center justify-center bg-[#06C755] rounded-xl text-white"><span className="text-[10px] font-bold">LINE</span></button></div></div>
          <div className="space-y-8"><div className="bg-white/5 rounded-2xl border border-white/5 p-4 flex justify-between items-center text-center divide-x divide-white/10 text-white">{[{l:"解像度",v:metadata.width>0?`${metadata.width}×${metadata.height}`:"-"},{l:"比率",v:metadata.ratio},{l:"サイズ",v:metadata.size},{l:"形式",v:"JPG"}].map((it,i)=>(<div key={i} className="flex-1 flex flex-col px-1"><span className="text-[8px] text-slate-500 font-bold mb-1">{it.l}</span><span className="text-[11px] font-mono truncate">{it.v}</span></div>))}</div><div className="space-y-5"><div><h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Layers className="w-3 h-3" /> カテゴリー</h3><Link href={`/category/${image.category}`} className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">{image.category}</Link></div><div><h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><TagIcon className="w-3 h-3" /> タグ</h3><div className="flex flex-wrap gap-2">{image.tags?.map((tag: string) => (<Link key={tag} href={`/tags/${tag}`} className="text-[10px] sm:text-[11px] text-slate-400 hover:text-white transition-colors">#{tag}</Link>))}</div></div></div></div>
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
    <section className="py-20 px-6 max-w-7xl mx-auto text-left">
      <div className="flex items-end justify-between mb-10"><div className="text-left"><h2 className="text-3xl sm:text-4xl font-black text-white italic uppercase tracking-tighter mb-2 leading-tight">{title}</h2><p className="text-slate-400 text-sm sm:text-base max-w-xl">{description}</p></div><Link href={`/category/${title}`} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors group text-sm sm:text-base">VIEW ALL <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" /></Link></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{images.map((img) => (<div key={img.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/5" onClick={() => setSelectedImage(img)}><Image src={getUrl(img)} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized /><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" /><div className="absolute bottom-0 left-0 p-6 text-left"><p className="text-white font-bold text-base sm:text-lg">{img.title}</p></div></div>))}</div>
      {selectedImage && <DetailModal image={selectedImage} url={getUrl(selectedImage)} onClose={() => setSelectedImage(null)} />}
    </section>
  );
}
