"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  assetId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function FavoriteButton({
  assetId,
  size = "md",
  className = "",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // ✅ Undo用トースト
  const [toastOpen, setToastOpen] = useState(false);
  const [lastRemovedId, setLastRemovedId] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  // Size configurations
  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const readFavorites = (): string[] => {
    try {
      const raw = localStorage.getItem("favoriteIds") || "[]";
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeFavorites = (favorites: string[]) => {
    localStorage.setItem("favoriteIds", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const openUndoToast = (removedId: string) => {
    // 既存タイマーをクリア
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }

    setLastRemovedId(removedId);
    setToastOpen(true);

    // 5秒で自動クローズ
    toastTimerRef.current = window.setTimeout(() => {
      setToastOpen(false);
      setLastRemovedId(null);
      toastTimerRef.current = null;
    }, 5000);
  };

  // Load favorite status from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const favorites = readFavorites();
    setIsFavorite(favorites.includes(assetId));

    // Listen for favorite updates from other components
    const handleFavoritesUpdate = () => {
      const updatedFavorites = readFavorites();
      setIsFavorite(updatedFavorites.includes(assetId));
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, [assetId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation when clicking on cards

    const favorites = readFavorites();

    if (favorites.includes(assetId)) {
      // Remove from favorites
      const next = favorites.filter((id) => id !== assetId);
      setIsFavorite(false);
      writeFavorites(next);

      // ✅ Undo提示（解除時だけ）
      openUndoToast(assetId);
    } else {
      // Add to favorites
      const next = [...favorites, assetId];
      setIsFavorite(true);
      writeFavorites(next);
    }
  };

  const undoRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!lastRemovedId) return;

    const favorites = readFavorites();
    if (!favorites.includes(lastRemovedId)) {
      const next = [...favorites, lastRemovedId];
      writeFavorites(next);
    }

    // 現在のボタン自身が対象なら即反映
    if (lastRemovedId === assetId) setIsFavorite(true);

    // トーストを閉じる
    setToastOpen(false);
    setLastRemovedId(null);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  };

  return (
    <>
      <button
        onClick={toggleFavorite}
        className={`${sizeClasses[size]} rounded-full backdrop-blur-md transition-all ${
          isFavorite
            ? "bg-pink-500/90 text-white hover:bg-pink-600"
            : "bg-black/50 text-white hover:bg-black/70"
        } ${className}`}
        aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
        title={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
      >
        <Heart className={`${iconSizes[size]} ${isFavorite ? "fill-current" : ""}`} />
      </button>

      {/* ✅ Undoトースト（解除した時だけ出る） */}
      {toastOpen && lastRemovedId && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
          <div className="flex items-center gap-3 bg-slate-900/95 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl">
            <span className="text-slate-200 text-sm font-bold">
              お気に入りから削除しました
            </span>
            <button
              onClick={undoRemove}
              className="text-sm font-black text-pink-400 hover:text-pink-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-xl transition-all"
            >
              元に戻す
            </button>
          </div>
        </div>
      )}
    </>
  );
}
