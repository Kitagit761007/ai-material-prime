import React, { useState, useEffect } from "react";
import MaterialGallery from "@/components/MaterialGallery";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Asset {
    id: string;
    url: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
}

export default function FavoritesPage() {
    const { favorites, isLoaded: favsLoaded } = useFavorites();
    const [allAssets, setAllAssets] = useState<Asset[]>([]);
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const response = await fetch('/data/assets.json');
                const data = await response.json();
                setAllAssets(data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsAssetsLoading(false);
            }
        };
        loadAssets();
    }, []);

    if (!favsLoaded || isAssetsLoading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gx-cyan border-t-transparent rounded-full animate-spin" />
        </div>;
    }

    // Filter assets whose IDs are in favorites
    const favoriteAssets = allAssets.filter(asset => favorites.includes(asset.id));

    return (
        <div className="min-h-screen pb-20 pt-24">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                        <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            保存済み / Favorites
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                            現在 <span className="text-rose-500 font-bold text-base">{favoriteAssets.length}</span> 件の素材が保存されています
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-rose-500/50 via-white/5 to-transparent mt-10" />
            </div>

            {favoriteAssets.length > 0 ? (
                <MaterialGallery initialAssets={favoriteAssets} />
            ) : (
                <div className="max-w-7xl mx-auto px-6 text-center py-20">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <Heart className="w-10 h-10 text-slate-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">保存された画像はありません</h2>
                    <p className="text-slate-500 mb-8">気になった画像を❤️でお気に入りに追加してみましょう。</p>
                    <Link
                        href="/gallery"
                        className="inline-flex py-3 px-8 bg-gx-cyan text-slate-950 font-bold rounded-xl hover:scale-105 transition-all"
                    >
                        ギャラリーを見る
                    </Link>
                </div>
            )}
        </div>
    );
}
