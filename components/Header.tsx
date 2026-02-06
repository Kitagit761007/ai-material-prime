"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Grid, Tag, Heart, Mail, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [assets, setAssets] = useState<any[]>([]);

  // お気に入り数
  useEffect(() => {
    const loadFavCount = () => {
      try {
        const favs = JSON.parse(localStorage.getItem("favoriteIds") || "[]");
        setFavoriteCount(Array.isArray(favs) ? favs.length : 0);
      } catch {
        setFavoriteCount(0);
      }
    };

    loadFavCount();
    window.addEventListener("favoritesUpdated", loadFavCount);
    return () => window.removeEventListener("favoritesUpdated", loadFavCount);
  }, []);

  // assets.json 取得（カテゴリ件数用）
  useEffect(() => {
    let cancelled = false;

    fetch("/data/assets.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setAssets(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (cancelled) return;
        setAssets([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // カテゴリ総数
  const categoryTotalCount = useMemo(() => {
    const set = new Set(
      assets
        .map((a: any) => (typeof a?.category === "string" ? a.category.trim() : ""))
        .filter((c: string) => c !== "")
    );
    return set.size;
  }, [assets]);

  const menuItems = [
    { name: "ギャラリー", href: "/gallery/", icon: <span className="text-sm">🖼️</span> },
    {
      name: "カテゴリー",
      href: "/categories/",
      icon: (
        <span className="inline-flex items-center gap-2">
          <Grid className="w-4 h-4" />
          <span className="text-[10px] font-bold text-slate-200/80 tabular-nums bg-white/5 px-1.5 py-0.5 rounded">
            {categoryTotalCount}
          </span>
        </span>
      ),
    },
    { name: "タグ一覧", href: "/tags/", icon: <Tag className="w-4 h-4" /> },
    {
      name: "お気に入り",
      href: "/favorites/",
      icon: (
        <span className="inline-flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span className="text-[10px] font-bold text-pink-400 tabular-nums">
            {favoriteCount}
          </span>
        </span>
      ),
    },
    { name: "お問い合わせ", href: "/contact/", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            {/* ✅ SVGは next/image を避けて <img> にする（ビルド安定） */}
            <img
              src="/brand/bolt.svg"
              alt="GX Prime Visuals"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>

          <span className="text-xl font-black text-white tracking-tighter uppercase italic">
            GX Prime Visuals
          </span>
        </Link>

        {/* PCメニュー */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
          aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-b border-white/5 shadow-xl">
          <nav className="flex flex-col p-4 gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
