"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface MaterialGalleryProps {
  filterCategory?: string;
  searchQuery?: string;
  initialIds?: string[];
  onResultCount?: (count: number) => void;
}

export default function MaterialGallery({
  filterCategory,
  searchQuery,
  initialIds,
  onResultCount
}: MaterialGalleryProps) {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/data/assets.json')
      .then(res => res.json())
      .then(data => {
        let filtered = data;
        if (initialIds) {
          filtered = data.filter((item: any) => initialIds.includes(item.id));
        } else if (filterCategory) {
          filtered = data.filter((item: any) => item.category === filterCategory);
        } else if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = data.filter((item: any) => item.title.toLowerCase().includes(q));
        }
        setAssets(filtered);
        if (onResultCount) onResultCount(filtered.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filterCategory, searchQuery, initialIds, onResultCount]);

  const getUrl = (item: any) => {
    if (!item) return "";
    const f = item.id.startsWith("mid-") ? "mid" : item.id.startsWith("niji-") ? "niji" : item.id.startsWith("gpt-") ? "GPT" : item.id.startsWith("nano-") ? "nano" : "grok";
    return `/assets/images/${f}/${item.id}${f === "GPT" ? ".png" : ".jpg"}`;
  };

  if (loading) return <div className="py-20 text-center text-slate-500 font-bold uppercase">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map(item => (
        <Link key={item.id} href={`/material/${item.id}`} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer hover:border-gx-cyan/50 transition-all group">
          <Image src={getUrl(item)} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
        </Link>
      ))}
    </div>
  );
}
