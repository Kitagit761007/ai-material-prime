"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, Download, Twitter, Linkedin, // Linkedinを追加
  Link as LinkIcon, Info, Tag as TagIcon, Layers, ChevronRight 
} from "lucide-react";

// --- LINEアイコン（LucideにないためSVGで定義） ---
const LineIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.35 11.1h-.01c0-2.7-2.2-4.9-4.9-4.9h-9c-2.7 0-4.9 2.2-4.9 4.9v6c0 1.27.48 2.43 1.27 3.3-.15 1.11-.66 2.67-1.3 3.78a.64.64 0 0 0 .96.78c1.43-1.1 3.57-2.32 4.92-2.66.75.32 1.57.5 2.44.5h9.01c2.7 0 4.9-2.2 4.9-4.9v-6c0-.27-.02-.53-.06-.79v-.01zm-4.9 8.9h-9c-2.2 0-4-1.8-4-4v-6c0-2.2 1.8-4 4-4h9c2.2 0 4 1.8 4 4v6c0 2.2-1.8 4-4 4zm-5.8-3.5h-2.8a.5.5 0 0 1-.5-.5v-2.8a.5.5 0 0 1 .5-.5h2.8a.5.5 0 0 1 .5.5v2.8a.5.5 0 0 1-.5.5zm0-1h-1.8v-1.8h1.8v1.8zm5.8 1h-2.8a.5.5 0 0 1-.5-.5v-2.8a.5.5 0 0 1 .5-.5h2.8a.5.5 0 0 1 .5.5v2.8a.5.5 0 0 1-.5.5zm0-1h-1.8v-1.8h1.8v1.8z"/>
  </svg>
);

// --- 画像詳細モーダル ---
export function DetailModal({ image, url, onClose }: { image: any; url: string; onClose: () => void }) {
  const [metadata, setMetadata] = useState<{ width: number; height: number; size: string; ratio: string }>({
    width: 0,
    height: 0,
    size: "Calculating...",
    ratio: "---"
  });

  useEffect(() => {
    if (typeof window === "undefined" || !url) return;

    // 1. 解像度とアスペクト比を計測
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      
      const calculateGCD = (a: number, b: number): number => (b === 0 ? a : calculateGCD(b, a % b));
      const common = calculateGCD(w, h);
      
      setMetadata(prev => ({
        ...prev,
        width: w,
        height: h,
        ratio: `${w / common}:${h / common}`
      }));
    };

    // 2. ファイルサイズを計測
    fetch(url, { method: 'HEAD' })
      .then(res => {
        const bytes = parseInt(res.headers.get('content-length') || '0');
        const sizeStr = bytes > 1024 * 1024 
          ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` 
          : `${(bytes / 1024).toFixed(1)} KB`;
        setMetadata(prev => ({ ...prev, size: sizeStr }));
      })
      .catch(() => setMetadata(prev => ({ ...prev, size: "不明" })));

  }, [url]);

  // シェア用URLとテキストの準備
  const shareUrl = typeof window !== "undefined" ? window.location.origin + `/gallery/${image.id}` : "";
  const shareText = `${image.title} - AI MATERIAL PRIME`;

  // 各SNSのシェア関数
  const shareToX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };
  const shareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };
  const shareToLine = () => {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-[110]">
        <X className="w-8 h-8" />
      </button>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* 左側：プレビュー */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-4">
          <img src={url} alt={image.title} className="max-w-full max-h-full object-contain" />
        </div>

        {/* 右側：情報パネル */}
        <div className="w-full lg:w-[400px] p-8 flex flex-col overflow-y-auto bg-slate-900 border-l border-white/5 text-left">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">{image.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{image.description}</p>
          </div>

          <div className="space-y-6 mb-8">
            {/* メタデータ */}
            <div>
              <h3 className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-3">
                <Info className="w-3 h-3" /> Metadata
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Resolution</p>
                  <p className="text-sm text-white font-mono">{metadata.width > 0 ? `${metadata.width} × ${metadata.height}` : "Loading..."}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Ratio</p>
                  <p className="text-sm text-white font-mono">{metadata.ratio}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Size</p>
                  <p className="text-sm text-white font-mono">{metadata.size}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Format</p>
                  <p className="text-sm text-white font-mono uppercase">{url.split('.').pop()}</p>
                </div>
              </div>
            </div>

            {/* カテゴリー & タグ */}
            <div className="space-y-4">
              <div>
                <h3 className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-2">
                  <Layers className="w-3 h-3" /> Category
                </h3>
                <Link href={`/category/${image.category}`} className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                  {image.category}
                </Link>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-2">
                  <TagIcon className="w-3 h-3" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags?.map((tag: string) => (
                    <Link key={tag} href={`/tags/${tag}`} className="text-[11px] text-slate-400 hover:text-white">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
            <a href={url} download className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-cyan-500/20">
              <Download className="w-5 h-5" /> DOWNLOAD
            </a>
            
            {/* SNSシェアボタン (ここを修正) */}
            <div className="flex gap-2">
              {/* X (旧Twitter) - 黒 */}
              <button onClick={shareToX} className="flex-1 flex items-center justify-center p-3 bg-black rounded-xl text-white hover:bg-slate-900 transition-all border border-white/10">
                <Twitter className="w-5 h-5 fill-current" />
              </button>
              
              {/* LinkedIn - 青 */}
              <button onClick={shareToLinkedin} className="flex-1 flex items-center justify-center p-3 bg-[#0A66C2] rounded-xl text-white hover:bg-[#095aab] transition-all shadow-lg shadow-blue-500/20">
                <Linkedin className="w-5 h-5 fill-current" />
              </button>
              
              {/* LINE - 緑 */}
              <button onClick={shareToLine} className="flex-1 flex items-center justify-center p-3 bg-[#06C755] rounded-xl text-white hover:bg-[#05b34c] transition-all shadow-lg shadow-green-500/20">
                <LineIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- カテゴリーセクション ---
export default function CategorySection({ title, description, images }: { title: string; description: string; images: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const getUrl = (item: any) => {
    const folder = item.id.startsWith("mid-") ? "mid" : 
                   item.id.startsWith("niji-") ? "niji" : 
                   item.id.startsWith("gpt-") ? "GPT" : 
                   item.id.startsWith("nano-") ? "nano" : "grok";
    const ext = folder === "GPT" ? ".png" : ".jpg";
    return `/assets/images/${folder}/${item.id}${ext}`;
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div className="text-left">
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">{title}</h2>
          <p className="text-slate-400 max-w-xl">{description}</p>
        </div>
        <Link href={`/category/${title}`} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors group">
          VIEW ALL <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div 
            key={img.id} 
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/5"
            onClick={() => setSelectedImage(img)}
          >
            <Image src={getUrl(img)} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 p-6 text-left">
              <p className="text-white font-bold text-lg">{img.title}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <DetailModal 
          image={selectedImage} 
          url={getUrl(selectedImage)} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </section>
  );
}
