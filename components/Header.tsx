"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import assetsDataRaw from "../data/assets.json";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Explicitly cast to any[] to avoid TS errors if JSON type is inferred as object
    const assets = Array.isArray(assetsDataRaw) ? (assetsDataRaw as any[]) : [];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const getCategoryCount = (name: string) => {
        return assets.filter((item: any) => {
            const cat = String(item.category || "").toLowerCase();
            const target = name.toLowerCase();
            return cat.includes(target) || target.includes(cat);
        }).length;
    };

    const categories = [
        { name: "エネルギー" },
        { name: "モビリティ" },
        { name: "テクノロジー" },
        { name: "資源・バイオ" },
        { name: "スマートシティ" },
        { name: "エコ・ライフスタイル" }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent border-b border-transparent"}`}>
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-gx-cyan z-50" onClick={closeMenu}>GX Prime Visuals</Link>
                <nav className="hidden md:flex gap-8 items-center">
                    <Link href="/gallery" className="text-sm font-medium hover:text-gx-cyan transition-colors">ギャラリー</Link>
                    <div className="relative group">
                        <button className="text-sm font-medium hover:text-gx-cyan transition-colors flex items-center gap-1">カテゴリーから探す <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" /></button>
                        <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden py-2">
                            {categories.map((cat) => (
                                <Link key={cat.name} href={`/categories/${encodeURIComponent(cat.name)}`} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-white/5 transition-colors group/item">
                                    <span className="group-hover/item:text-gx-cyan transition-colors">{cat.name}</span>
                                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">{getCategoryCount(cat.name)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link href="/tags" className="text-sm font-medium hover:text-gx-cyan transition-colors">タグ一覧</Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-gx-cyan transition-colors">お問い合わせ</Link>
                </nav>
                <button className="md:hidden z-50 p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
                <div className={`fixed inset-0 bg-slate-950 transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-6 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-20px]"}`}>
                    <Link href="/gallery" className="text-2xl font-bold text-white" onClick={closeMenu}>ギャラリー</Link>
                    <div className="grid grid-cols-2 gap-3 w-full px-10">
                        {categories.map((cat) => (
                            <Link key={cat.name} href={`/categories/${encodeURIComponent(cat.name)}`} className="bg-white/5 py-3 rounded-lg text-center text-sm" onClick={closeMenu}>
                                {cat.name} <span className="block text-[10px] text-gx-cyan opacity-60">{getCategoryCount(cat.name)} assets</span>
                            </Link>
                        ))}
                    </div>
                    <Link href="/tags" className="text-xl font-medium text-white" onClick={closeMenu}>タグ一覧</Link>
                </div>
            </div>
        </header>
    );
}
