"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// 🚀 CategorySection から新しくなった DetailModal をインポート
import { DetailModal } from "./CategorySection";

interface MaterialGalleryProps {
  filterCategory?: string;
  searchQuery?: string;
  initialIds?: string[]; // 🚀 お気に入りIDリストを受け取る準備
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
        
        // 🚀 お気に入りIDリストがある場合はそれだけで絞り込む
        if (initialIds) {
          filtered = data.filter((item: any) => initialIds.includes(item.id));
        } else if (filterCategory) {
          filtered = data.filter((item: any) => item.category === filterCategory);
        } else if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = data.filter((item: any) => 
            item.title.toLowerCase().includes(q) || 
            item.category.toLowerCase().includes(q)
          );
        }
        
        setAssets(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filterCategory, searchQuery, initialIds]);

  const getUrl = (item: any) => {
    if (!item) return "";
    const f = item.id.startsWith("mid-") ? "mid" : item.id.startsWith("niji-") ? "niji" : item.id.startsWith("gpt-") ? "GPT" : item.id.startsWith("nano-") ? "nano" : "grok";
    return `/assets/images/${f}/${item.id}${f === "GPT" ? ".png" : ".jpg"}`;
  };

  if (loading) return <div className="py-20 text-center text-slate-500 animate-pulse font-bold tracking-widest uppercase">Loading Gallery...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map(item => (
        <div 
          key={item.id} 
          className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer group shadow-2xl"
          onClick={() => setSelectedImage(item)}
        >
          <Image src={getUrl(item)} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-6 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white font-bold truncate text-sm">{item.title}</p>
          </div>
        </div>
      ))}
      
      {/* 🚀 新しい DetailModal を使用 */}
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
