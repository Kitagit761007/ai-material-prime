"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Hash, Tag } from "lucide-react";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useRouter } from "next/navigation";

interface Asset {
    id: string;
    url: string;
    title: string;
    description: string;
    score: number;
    width: number;
    height: number;
    category: string;
    tags: string[];
}

export default function TagsPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const { setSearchQuery } = useSearch();
    const router = useRouter();

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const response = await fetch('/data/assets.json');
                const data = await response.json();
                setAssets(data);
            } catch (e) {
                console.error(e);
            }
        };
        loadAssets();
    }, []);

    // Get all unique tags and counts
    const tagMap: Record<string, number> = {};
    assets.forEach(asset => {
        asset.tags.forEach(tag => {
            const cleanTag = tag.replace("#", "");
            tagMap[cleanTag] = (tagMap[cleanTag] || 0) + 1;
        });
    });

    const sortedTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);

    const handleTagClick = (tag: string) => {
        setSearchQuery(tag);
        router.push("/#gallery-section");
    };

    return (
        <div className="flex flex-col min-h-screen pt-16 md:pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 w-full mb-6 md:mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gx-cyan/10 rounded-2xl border border-gx-cyan/20">
                        <Tag className="w-8 h-8 text-gx-cyan" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            タグ一覧 / Tags Cloud
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                            現在 <span className="text-gx-cyan font-bold text-base">{Object.keys(tagMap).length}</span> 種類のタグが使用されています
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-10" />
            </div>

            <main className="max-w-7xl mx-auto px-6 w-full">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                        {sortedTags.map(([tag, count]) => {
                            const size = 0.8 + Math.min(count * 0.1, 1.2);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className="px-4 py-2 bg-white/5 hover:bg-gx-cyan/10 text-slate-400 hover:text-gx-cyan rounded-xl border border-white/10 hover:border-gx-cyan/50 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
                                    style={{ fontSize: `${size}rem` }}
                                >
                                    <Hash className="w-4 h-4 text-slate-600 group-hover:text-gx-cyan transition-colors" />
                                    <span>{tag}</span>
                                    <span className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-slate-500 group-hover:text-gx-cyan/70 font-mono">
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
