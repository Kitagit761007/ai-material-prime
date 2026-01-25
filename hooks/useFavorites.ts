"use client";

import { useFavorites as useFavoritesContext } from '@/context/FavoritesContext';

/**
 * Proxy hook that connects to the global FavoritesContext.
 * This ensures all components share the same state and persistence logic.
 */
export function useFavorites() {
    return useFavoritesContext();
}
