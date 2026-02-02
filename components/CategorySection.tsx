"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, Download, Share2, Twitter, Facebook, 
  Link as LinkIcon, Info, Tag as TagIcon, Layers, ChevronRight 
} from "lucide-react";

// --- 画像詳細モーダル（ここが今回強化した部分です） ---
export function DetailModal({ image, url, onClose }: { image: any; url: string; onClose: () => void }) {
  const [metadata, setMetadata] = useState<{ width: number; height: number; size: string; ratio: string } | null>(null);

  useEffect(() => {
    if (!url) return;

    // 1. 解像度とアスペクト比を実際の画像ファイルから計測
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const common = gcd(w, h);
      setMetadata({
        width: w,
        height: h,
        size: "Loading...", // 次のfetchで上書き
        ratio: `${w / common}:${h / common}`
      });
    };

    // 2. 実際のファイルサイズを計測
    fetch(url, { method: 'HEAD' })
      .then(res => {
        const bytes = parseInt(res.headers.get('content-length') || '0');
        const sizeStr = bytes > 1024 * 1024 
          ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` 
          : `${(bytes / 1024).toFixed(1)} KB`;
        setMetadata(prev => prev ? { ...prev, size: sizeStr } : null);
      })
      .catch(() => setMetadata(prev => prev ? { ...prev, size: "不明" } : null));

  }, [url]);

  const shareUrl = typeof window !== "undefined" ? window.location.origin + `/gallery/${image.id}` : "";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-[110]">
        <X className="w-8 h-8" />
      </button>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* 左側：画像プレビュー */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-4 overflow-hidden">
          <img src={url} alt={image.title} className="max-w-full max-h-full object-contain shadow-2xl" />
        </div>

        {/* 右側：情報パネル */}
        <div className="w-full lg:w-[400px] p-8 flex flex-col overflow-y-auto bg-slate-900 border-l border-white/5 text-left">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">{image.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{image.description}</p>
          </div>

          {/* メタデータ */}
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-3">
                <Info className="w-3 h-3" /> Technical Metadata
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Resolution", value: metadata?.width ? `${metadata.width} × ${metadata.height}` : "..." },
                  { label: "Aspect Ratio", value: metadata?.ratio || "..." },
                  { label: "File Size", value: metadata?.size || "..." },
                  { label: "Format", value: url.split('.').pop()?.toUpperCase() || "JPG" }
                ].map(item => (
                  <div key={item.label} className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">{item.label}</p>
                    <p className="text-sm text-white font-mono">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* カテゴリー & タグ */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking
