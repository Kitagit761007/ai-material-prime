"use client";
import Link from "next/link";
import { ImageIcon, LayoutGrid, Tag, Heart, MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="text-slate-950 font-black text-xs">AI</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            AI Material <span className="text-cyan-400 not-italic">Prime</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/gallery" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"><ImageIcon className="w-3 h-3" />ギャラリー</Link>
          <Link href="/category" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"><LayoutGrid className="w-3 h-3" />カテゴリー</Link>
          <Link href="/tags" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"><Tag className="w-3 h-3" />タグ一覧</Link>
          <Link href="/favorites" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"><Heart className="w-3 h-3" />お気に入り</Link>
          <Link href="/contact" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"><MessageSquare className="w-3 h-3" />お問い合わせ</Link>
        </nav>
      </div>
    </header>
  );
}
