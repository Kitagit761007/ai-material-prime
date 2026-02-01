"use client";

import React, { useEffect, useState } from "react";
import MaterialGallery from "@/components/MaterialGallery";
import { ChevronLeft, Hash } from "lucide-react";
import Link from "next/link";
import TagSlider from "@/components/TagSlider";
import { useParams } from "next/navigation";

interface Asset {
    id: string;
    url: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
}

export default function TagPage() {
    const params = useParams();
    const tag = params.tag ? decodeURIComponent(params.tag as string) : "";
    const [assets, setAssets] = useState<Asset[]>([]);
    const [resultCount, setResultCount] = useState(0);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const response = await fetch('/data/assets.json');
                const data = await response.json();
                setAssets(data);

                const query = tag.toLowerCase().replace("#", "");
                const count = data.filter((item: Asset) =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.tags.some(t => t.toLowerCase().replace("#", "").includes(query)) ||
                    item.category.toLowerCase().includes(query)
                ).length;
                setResultCount(count);
            } catch (e) {
                console.error(e);
            }
        };
        loadAssets();
    }, [tag]);

    return (
        <div className="flex flex-col min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 w-full mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gx-cyan/10 rounded-2xl border border-gx-cyan/20">
                        <Hash className="w-8 h-8 text-gx-cyan" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            「{tag || "不明なタグ"}」の検索結果
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                            該当する素材が <span className="text-gx-cyan font-bold text-base">{resultCount}</span> 件見つかりました
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-10 mb-2" />
                <TagSlider currentTag={tag} />
            </div>

            <MaterialGallery searchQuery={tag} />
        </div>
    );
}
