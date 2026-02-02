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
    const loadFavs = () => {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoriteIds(favs);
      setIsLoading(false);
    };
    loadFavs();
    window.addEventListener("favoritesUpdated", loadFavs);
    return () => window.removeEventListener("favoritesUpdated", loadFavs);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            GALLERY TOP
          </Link>
        </div>

        <div className="mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-pink-500 fill-current" />
            <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.2em]">Saved Items</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter">お気に入り</h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-transparent mt-6" />
        </div>

        {!isLoading && favoriteIds.length > 0 ? (
          <MaterialGallery initialIds={favoriteIds} />
        ) : !isLoading ? (
          <div className="py-20 text-center bg-white/5 rounded-3xl border border-white/5">
            <p className="text-slate-400 mb-8">お気に入りはまだありません。</p>
            <Link href="/" className="px-8 py-4 bg-cyan-500 text-white font-bold rounded-2xl">素材を探す</Link>
          </div>
        ) : null}
      </main>
    </div>
  );
}
