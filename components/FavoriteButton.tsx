"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const favorites = readFavorites();
    setIsFavorite(favorites.includes(assetId));

    const handleFavoritesUpdate = () => {
      const updatedFavorites = readFavorites();
      setIsFavorite(updatedFavorites.includes(assetId));
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
  }, [assetId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let favorites = readFavorites();

    if (favorites.includes(assetId)) {
      // Remove
      favorites = favorites.filter((id) => id !== assetId);
      setIsFavorite(false);
      localStorage.setItem("favoriteIds", JSON.stringify(favorites));

      // ✅ 他コンポーネント同期
      window.dispatchEvent(new Event("favoritesUpdated"));

      // ✅ 「解除された」ことをページ側に通知（トーストはページ側が出す）
      window.dispatchEvent(
        new CustomEvent("favoriteRemoved", { detail: { assetId } })
      );
    } else {
      // Add
      favorites.push(assetId);
      setIsFavorite(true);
      localStorage.setItem("favoriteIds", JSON.stringify(favorites));
      window.dispatchEvent(new Event("favoritesUpdated"));
    }
  };

  return (
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
  );
}
