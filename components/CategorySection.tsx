"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DetailModal } from "./CategorySection";

// 🚀 initialIds を「任意（?）」で受け取れるように型を定義
interface MaterialGalleryProps {
  filterCategory?: string;
  searchQuery?: string;
  initialIds?: string[]; 
}

export default function MaterialGallery({ 
  filterCategory, 
  searchQuery, 
  initialIds 
}: MaterialGalleryProps) {
  const [assets, setAssets] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/data/assets.json')
      .then(res => res.json())
      .then(data => {
        let filtered = data;
        
        // 🚀 お気に入りIDリストが渡された場合の処理
        if (initialIds && initialIds.length > 0) {
          filtered = data.filter((item: any) => initialIds.includes(item.id));
        } else if (initialIds && initialIds.length === 0) {
          filtered = []; // お気に入りが空なら空にする
        }
        // カテゴリー絞り込み
        else if (filterCategory) {
          filtered = data.filter((item: any) => item.category === filterCategory);
        } 
        // 検索/タグ絞り込み
        else if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = data.filter((item: any) => 
            item.title.toLowerCase().includes(q) || 
            item.category.toLowerCase().includes(q) ||
            (item.tags && item.tags.some((t: string) => t.toLowerCase().includes(q)))
          );
        }
        
        setAssets(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error("Load failed:", err);
        setLoading(false);
      });
  }, [filterCategory, searchQuery, initialIds]);

  const getUrl = (item: any) => {
    if (!item) return "";
    const folder = item.id.startsWith("mid-") ? "mid" : 
                   item.id.startsWith("niji-") ? "niji" : 
                   item.id.startsWith("gpt-") ? "GPT" : 
                   item.id.startsWith("nano-") ? "nano" : "grok";
    const ext = folder === "GPT" ? ".png" : ".jpg";
    return `/assets/images/${folder}/${item.id}${ext}`;
  };

  if (loading) return <div className="py-20 text-center text-slate-500 animate-pulse font-bold tracking-widest">LOADING...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map(item => (
        <div 
          key={item.id} 
          className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer group"
          onClick={() => setSelectedImage(item)}
        >
          <Image src={getUrl(item)} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-6 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity">
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
