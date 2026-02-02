"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DetailModal } from "./CategorySection";

// 🚀 全てのページ（トップ・検索・お気に入り・タグ）に対応する万能な型定義
interface MaterialGalleryProps {
  filterCategory?: string;
  searchQuery?: string;
  initialAssets?: any[];
  onResultCount?: (count: number | null) => void;
}

export default function MaterialGallery({ 
  filterCategory, 
  searchQuery, 
  initialAssets, 
  onResultCount 
}: MaterialGalleryProps) {
  const [assets, setAssets] = useState<any[]>(initialAssets || []);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    // お気に入りページなどで既にデータがある場合
    if (initialAssets) {
      setAssets(initialAssets);
      if (onResultCount) onResultCount(initialAssets.length);
      return;
    }

    // データの読み込みとフィルタリング
    fetch('/data/assets.json')
      .then(res => res.json())
      .then(data => {
        let filtered = data;
        
        if (filterCategory) {
          // カテゴリーで絞り込み
          filtered = data.filter((item: any) => item.category === filterCategory);
        } else if (searchQuery) {
          // タグまたは検索ワードで絞り込み
          const q = searchQuery.toLowerCase();
          filtered = data.filter((item: any) => 
            item.title.toLowerCase().includes(q) || 
            item.category.toLowerCase().includes(q) ||
            (item.tags && item.tags.some((t: string) => t.toLowerCase().includes(q)))
          );
        }
        
        setAssets(filtered);
        if (onResultCount) onResultCount(filtered.length);
      })
      .catch(err => console.error("Data load failed:", err));
  }, [filterCategory, searchQuery, initialAssets, onResultCount]);

  const getUrl = (item: any) => {
    if (!item) return "";
    const folder = item.id.startsWith("mid-") ? "mid" : 
                   item.id.startsWith("niji-") ? "niji" : 
                   item.id.startsWith("gpt-") ? "GPT" : 
                   item.id.startsWith("nano-") ? "nano" : "grok";
    const ext = folder === "GPT" ? ".png" : ".jpg";
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
          <Image src={getUrl(item)} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 flex flex-col justify-end text-left">
            <p className="text-white font-bold truncate text-sm">{item.title}</p>
          </div>
        </div>
      ))}
      {selectedImage && (
        <DetailModal image={selectedImage} url={getUrl(selectedImage)} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
