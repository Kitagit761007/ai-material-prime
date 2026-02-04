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

    // Load favorite status from localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;

        const favorites = JSON.parse(localStorage.getItem("favoriteIds") || "[]");
        setIsFavorite(favorites.includes(assetId));

        // Listen for favorite updates from other components
        const handleFavoritesUpdate = () => {
            const updatedFavorites = JSON.parse(
                localStorage.getItem("favoriteIds") || "[]"
            );
            setIsFavorite(updatedFavorites.includes(assetId));
        };

        window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
        return () =>
            window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    }, [assetId]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent navigation when clicking on cards

        let favorites: string[] = JSON.parse(
            localStorage.getItem("favoriteIds") || "[]"
        );

        if (favorites.includes(assetId)) {
            // Remove from favorites
            favorites = favorites.filter((id) => id !== assetId);
            setIsFavorite(false);
        } else {
            // Add to favorites
            favorites.push(assetId);
            setIsFavorite(true);
        }

        localStorage.setItem("favoriteIds", JSON.stringify(favorites));

        // Dispatch event for other components to sync
        window.dispatchEvent(new Event("favoritesUpdated"));
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`${sizeClasses[size]} rounded-full backdrop-blur-md transition-all ${isFavorite
                    ? "bg-pink-500/90 text-white hover:bg-pink-600"
                    : "bg-black/50 text-white hover:bg-black/70"
                } ${className}`}
            aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
            title={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
        >
            <Heart
                className={`${iconSizes[size]} ${isFavorite ? "fill-current" : ""}`}
            />
        </button>
    );
}
