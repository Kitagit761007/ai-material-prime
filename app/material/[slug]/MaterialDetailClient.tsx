"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Download, Heart } from "lucide-react";

interface Asset {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
}

export default function MaterialDetailClient({ slug }: { slug: string }) {
    const router = useRouter();
    const [asset, setAsset] = useState<Asset | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    const getUrl = (item: Asset) => {
        if (!item) return "";
        const f = item.id.startsWith("mid-")
            ? "mid"
            : item.id.startsWith("niji-")
                ? "niji"
                : item.id.startsWith("gpt-")
                    ? "GPT"
                    : item.id.startsWith("nano-")
                        ? "nano"
                        : "grok";
        return `/assets/images/${f}/${item.id}${f === "GPT" ? ".png" : ".jpg"}`;
    };

    useEffect(() => {
        fetch("/data/assets.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((item: Asset) => item.id === slug);
                if (found) {
                    setAsset(found);
                } else {
                    router.push("/404");
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                router.push("/404");
            });
    }, [slug, router]);

    useEffect(() => {
        if (typeof window === "undefined" || !asset) return;
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favs.includes(asset.id));
    }, [asset]);

    const toggleFavorite = () => {
        if (!asset) return;
        let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (favs.includes(asset.id)) {
            favs = favs.filter((id: string) => id !== asset.id);
            setIsFavorite(false);
        } else {
            favs.push(asset.id);
            setIsFavorite(true);
        }
        localStorage.setItem("favorites", JSON.stringify(favs));
        window.dispatchEvent(new Event("favoritesUpdated"));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gx-cyan" />
            </div>
        );
    }

    if (!asset) {
        return null;
    }

    const imageUrl = getUrl(asset);

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex flex-col lg:flex-row gap-8 bg-slate-900 rounded-3xl overflow-hidden border border-white/10">
                    {/* Image Section */}
                    <div className="relative w-full lg:flex-1 bg-black flex items-center justify-center p-8">
                        <div className="relative w-full aspect-square max-w-2xl">
                            <Image
                                src={imageUrl}
                                alt={asset.title}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <button
                            onClick={toggleFavorite}
                            className={`absolute bottom-6 right-6 p-4 rounded-full border transition-all ${isFavorite
                                    ? "bg-pink-500 text-white border-pink-400"
                                    : "bg-black/50 text-white border-white/20 hover:bg-black/70"
                                }`}
                        >
                            <Heart className={isFavorite ? "fill-current" : ""} />
                        </button>
                    </div>

                    {/* Info Section */}
                    <div className="w-full lg:w-[400px] p-8 text-left">
                        <h1 className="text-3xl font-black text-white italic uppercase mb-4 tracking-tighter">
                            {asset.title}
                        </h1>

                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6 text-slate-300 text-sm">
                            {asset.description || "高品質AIビジュアル素材。商用利用可能。"}
                        </div>

                        {asset.tags && asset.tags.length > 0 && (
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2">
                                    {asset.tags.map((tag, index) => (
                                        <Link
                                            key={index}
                                            href={`/search?q=${encodeURIComponent(
                                                tag.replace("#", "")
                                            )}`}
                                            className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs hover:bg-gx-cyan hover:text-white transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <a
                            href={imageUrl}
                            download
                            className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-2xl transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            無料ダウンロード
                        </a>

                        {asset.category && (
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <p className="text-slate-500 text-sm mb-2">カテゴリー</p>
                                <Link
                                    href={`/category/${asset.category}`}
                                    className="text-gx-cyan hover:text-cyan-400 font-bold transition-colors"
                                >
                                    {asset.category}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
