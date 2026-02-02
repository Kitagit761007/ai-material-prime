"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, Download, Linkedin, Info, Tag as TagIcon, Layers, ChevronRight, Heart
} from "lucide-react";

// --- 省略: XLogo, getSmartRatio, getSeoDescription は既存のまま ---
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const getSmartRatio = (w: number, h: number) => {
  if (!w || !h) return "---";
  const ratio = w / h;
  const standards = [
    { name: "1:1", val: 1.0 }, { name: "16:9", val: 1.777 }, { name: "9:16", val: 0.562 },
    { name: "3:2", val: 1.5 }, { name: "2:3", val: 0.666 }, { name: "4:3", val: 1.333 }
  ];
  const closest = standards.reduce((p, c) => Math.abs(c.val - ratio) < Math.abs(p.val - ratio) ? c : p);
  return closest.name;
};

const getSeoDescription = (title: string, category: string, id: string) => {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const intros = [`「${title}」は、${category}の核心を突くビジュアルを追求した独自作品です。`,`${category}というテーマから、特に「${title}」が持つ象徴的な一瞬を切り出しました。` ];
  const bodies = [`GX時代の新たなスタンダードとなるべく、質感の細部にまで徹底的にこだわりました。`,`洗練された色彩バランスが、ビジネスプレゼンやWebデザインに圧倒的なインパクトを与えます。` ];
  return `${intros[seed % intros.length]} ${bodies[(seed + 1) % bodies.length]} 商用利用可能・クレジット不要。`;
};

// --- 詳細モーダル（❤️機能付き） ---
export function DetailModal({ image, url, onClose }: { image: any; url: string; onClose: () => void }) {
  const [metadata, setMetadata] = useState({ width: 0, height: 0, size: "...", ratio: "---" });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // お気に入り状態の確認
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(image.id));

    if (typeof window === "undefined" || !url) return;
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setMetadata({ width: w, height: h, size: "...", ratio: getSmartRatio(w, h) });
    };
    fetch(url, { method: 'HEAD' }).then(res => {
      const bytes = parseInt(res.headers.get('content-length') || '0');
      const sizeStr = bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
      setMetadata(prev => ({ ...prev, size: sizeStr }));
    });
  }, [url, image.id]);

  // お気に入り切り替え
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(image.id)) {
      favorites = favorites.filter((id: string) => id !== image.id);
      setIsFavorite(false);
    } else {
      favorites.push(image.id);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated")); // ヘッダー等に通知
  };

  const shareUrl = typeof window !== "undefined" ? window.location.origin + `/gallery/${image.id}` : "";
  const shareToX = () => window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(image.title)}`, '_blank');
  const shareToLinkedin = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareToLine = () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl max-h-[95vh] md:max-h-[85vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-[120] p-2 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-md transition-all border border-white/10 group">
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="relative w-full lg:flex-1 h-[40vh] sm:h-[45vh] lg:h-auto bg-black flex items-center justify-center p-4 overflow-hidden flex-none">
          <img src={url} alt={image.title} className="max-w-full max-h-full object-contain pointer-events-none shadow-2xl" />
          
          {/* 🚀 画像上のフローティング❤️ボタン（戦略的配置） */}
          <button 
            onClick={toggleFavorite}
            className={`absolute bottom-6 right-6 p-4 rounded-full backdrop-blur-md border transition-all active:scale-90 shadow-xl ${
              isFavorite ? "bg-pink-500 border-pink-400 text-white" : "bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="w-full lg:w-[400px] p-6 sm:p-8 flex flex-col overflow-y-auto bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/5 text-left flex-1 relative z-10">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter mb-2 leading-tight">{image.title}</h2>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6">
              <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed antialiased">
                {getSeoDescription(image.title, image.category, image.id)}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-stretch mb-8 h-12 sm:h-14 flex-none">
            <a href={url} download className="flex-[3] flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" /> 
              <span className="text-xs sm:text-sm font-black">無料DL</span>
            </a>
            <div className="flex-[2] flex gap-1.5">
              <button onClick={shareToX} className="flex-1 flex items-center justify-center bg-black rounded-xl text-white hover:bg-slate-900 transition-all border border-white/10"><XLogo className="w-4 h-4" /></button>
              <button onClick={shareToLinkedin} className="flex-1 flex items-center justify-center bg-[#0A66C2] rounded-xl text-white hover:bg-[#004182] transition-all"><Linkedin className="w-4 h-4 fill-current" /></button>
              <button onClick={shareToLine} className="flex-1 flex items-center justify-center bg-[#06C755] rounded-xl text-white hover:bg-[#05a347] transition-all"><span className="text-[10px] font-bold">LINE</span></button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 rounded-2xl border border-white/5 p-4 flex justify-between items-center text-center divide-x divide-white/10 text-white">
              {[{l:"解像度",v:metadata.width>0?`${metadata.width}×${metadata.height}`:"-"},{l:"比率",v:metadata.ratio},{l:"サイズ",v:metadata.size},{l:"形式",v:"JPG"}].map((it,i)=>(
                <div key={i} className="flex-1 flex flex-col px-1"><span className="text-[8px] text-slate-500 font-bold mb-1">{it.l}</span><span className="text-[11px] font-mono truncate">{it.v}</span></div>
              ))}
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Layers className="w-3 h-3" /> カテゴリー</h3>
                <Link href={`/category/${image.category}`} className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">{image.category}</Link>
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><TagIcon className="w-3 h-3" /> タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags?.map((tag: string) => (
                    <Link key={tag} href={`/tags/${tag}`} className="text-[10px] sm:text-[11px] text-slate-400 hover:text-white transition-colors">#{tag}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- カテゴリーセクション（メイン） ---
export default function CategorySection({ title, description, images }: { title: string; description: string; images: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const getUrl = (item: any) => {
    const folder = item.id.startsWith("mid-") ? "mid" : item.id.startsWith("niji-") ? "niji" : item.id.startsWith("gpt-") ? "GPT" : item.id.startsWith("nano-") ? "nano" : "grok";
    const ext = folder === "GPT" ? ".png" : ".jpg";
    return `/assets/images/${folder}/${item.id}${ext}`;
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl font-black text-white italic uppercase tracking-tighter mb-2 leading-tight">{title}</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">{description}</p>
        </div>
        <Link href={`/category/${title}`} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors group text-sm sm:text-base">
          VIEW ALL <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/5" onClick={() => setSelectedImage(img)}>
            <Image src={getUrl(img)} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 p-6 text-left"><p className="text-white font-bold text-base sm:text-lg">{img.title}</p></div>
          </div>
        ))}
      </div>
      {selectedImage && <DetailModal image={selectedImage} url={getUrl(selectedImage)} onClose={() => setSelectedImage(null)} />}
    </section>
  );
}
