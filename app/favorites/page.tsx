"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import MaterialGallery from "@/components/MaterialGallery";
import Link from "next/link";
import { Heart, ChevronLeft } from "lucide-react";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Undoトースト用
  const [toastOpen, setToastOpen] = useState(false);
  const [lastRemovedId, setLastRemovedId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const readFavorites = (): string[] => {
    try {
      const raw = localStorage.getItem("favoriteIds") || "[]";
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeFavorites = (ids: string[]) => {
    localStorage.setItem("favoriteIds", JSON.stringify(ids));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const openToast = (assetId: string) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setLastRemovedId(assetId);
    setToastOpen(true);

    timerRef.current = window.setTimeout(() => {
      setToastOpen(false);
      setLastRemovedId(null);
      timerRef.current = null;
    }, 5000);
  };

  useEffect(() => {
    const loadFavs = () => {
      const favs = readFavorites();
      setFavoriteIds(favs);
      setIsLoading(false);
    };

    loadFavs();

    // ✅ お気に入り更新
    window.addEventListener("favoritesUpdated", loadFavs);

    // ✅ FavoriteButtonから「解除」を受け取ってトースト表示
    const onRemoved = (e: any) => {
      const removedId = e?.detail?.assetId;
      if (removedId) openToast(removedId);
    };
    window.addEventListener("favoriteRemoved", onRemoved as EventListener);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavs);
      window.removeEventListener("favoriteRemoved", onRemoved as EventListener);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const undo = () => {
    if (!lastRemovedId) return;

    const current = readFavorites();
    if (!current.includes(lastRemovedId)) {
      writeFavorites([...current, lastRemovedId]);
    } else {
      window.dispatchEvent(new Event("favoritesUpdated"));
    }

    setToastOpen(false);
    setLastRemovedId(null);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-left">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> GALLERY TOP
          </Link>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-pink-500 fill-current" />
            <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Saved Items
            </span>
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
            <Heart className="w-16 h-16 text-slate-800 mx-auto mb-6" />
            <p className="text-slate-400 mb-3 font-bold">まだお気に入りはありません</p>
            <p className="text-slate-500 text-sm mb-8">
              画像詳細の ❤️ を押すと、ここに保存されます。
            </p>
            <Link href="/" className="px-10 py-4 bg-cyan-500 text-white font-bold rounded-2xl">
              素材を探しに行く
            </Link>
          </div>
        ) : null}

        {/* ✅ Undoトースト（ページが持つので消えない） */}
        {toastOpen && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
            <div className="flex items-center gap-3 bg-slate-900/95 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl">
              <span className="text-slate-200 text-sm font-bold">
                お気に入りから削除しました
              </span>
              <button
                onClick={undo}
                className="text-sm font-black text-pink-400 hover:text-pink-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-xl transition-all"
              >
                元に戻す
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
