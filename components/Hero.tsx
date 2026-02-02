"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Briefcase, MonitorCheck } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  const [assetCount, setAssetCount] = useState(0);

  // 主要なタグリスト（ここを編集すると表示されるタグが変わります）
  const popularTags = ["GX", "未来都市", "脱炭素", "テクノロジー", "モビリティ", "水中", "宇宙"];

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const response = await fetch('/data/assets.json');
        const data = await response.json();
        setAssetCount(data.length);
      } catch (e) {
        console.error("Error loading assets:", e);
      }
    };
    loadAssets();
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const term = searchQuery.trim().replace("#", "");
    if (!term) return;
    setSearchQuery(term);

    // 検索窓での検索は、今まで通りトップページのギャラリーへスクロール
    const gallery = document.getElementById("gallery-section");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-16 pb-12 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* 背景の光の演出 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-emerald-400">
            GXの未来を、あなたの資料に。
          </span>
        </h1>
      </div>

      <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
        商用利用・クレジット不要。<br className="hidden md:block" />
        プロ仕様の次世代素材がプレゼンを加速させる。
        <span className="block text-sm text-slate-400 mt-2 font-medium">
          Commercial Use OK / No Attribution Required
        </span>
      </p>

      {/* 特徴バッジ */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
        <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-xs md:text-sm font-bold font-mono">{assetCount || 0}+ Assets</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
          <MonitorCheck className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
          <span className="text-xs md:text-sm font-bold">High-Res AI Generated</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
          <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
          <span className="text-xs md:text-sm font-bold">Commercial License included</span>
        </div>
      </div>

      {/* 検索バー */}
      <form
        onSubmit={handleSearch}
        className="relative w-full max-w-xl group flex items-center gap-2 mb-8"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="キーワードを入力..."
            className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 shadow-2xl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
        </div>
        <button
          type="submit"
          className="shrink-0 bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
        >
          検索
        </button>
      </form>

      {/* ✨ 修正：主要タグセクション（Link を使用して個別ページへ） */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {popularTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
