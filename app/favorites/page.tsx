"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";
import Link from "next/link";
import { Heart, ChevronLeft } from "lucide-react";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteIds(favorites);
    setIsLoading(false);

    // 更新イベントの監視（モーダルで解除された場合など）
    const handleUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoriteIds(updated);
    };
    window.addEventListener("favoritesUpdated", handleUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            GALLERY TOP
          </Link>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-pink-500 fill-current" />
            <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">Saved Collection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
            お気に入り
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-transparent mt-6" />
        </div>

        {!isLoading && favoriteIds.length > 0 ? (
          <MaterialGallery initialIds={favoriteIds} />
        ) : !isLoading ? (
          <div className="py-20 text-center bg-white/5 rounded-3xl border border-white/5">
            <Heart className="w-16 h-16 text-slate-700 mx-auto mb-6" />
            <p className="text-slate-400 text-lg mb-8">お気に入りに登録された素材はまだありません。</p>
            <Link href="/" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-2xl transition-all">
              素材を探しに行く
            </Link>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500">読み込み中...</div>
        )}
      </main>
    </div>
  );
}
