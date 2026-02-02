"use client";

import React from "react";
import Link from "next/link";
import { 
  Image as ImageIcon, 
  Grid, 
  Tag, 
  Heart, 
  Mail,
  Zap
} from "lucide-react";

export default function Header() {
  const menuItems = [
    { name: "ギャラリー", href: "/gallery/", icon: <ImageIcon className="w-4 h-4" /> },
    { name: "カテゴリー", href: "/", icon: <Grid className="w-4 h-4" /> }, // トップのカテゴリーセクションへ
    { name: "タグ一覧", href: "/tags/", icon: <Tag className="w-4 h-4" /> },
    { name: "お気に入り", href: "/favorites/", icon: <Heart className="w-4 h-4" /> },
    { name: "お問い合わせ", href: "/contact/", icon: <Mail className="w-4 h-4" /> }, // 🚀 リンクを修正
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ロゴ部分 */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase italic">
            AI MATERIAL PRIME
          </span>
        </Link>

        {/* ナビゲーションメニュー */}
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

        {/* モバイル用メニュー（必要に応じて） */}
        <div className="md:hidden text-white text-xs">Menu</div>
      </div>
    </header>
  );
}
