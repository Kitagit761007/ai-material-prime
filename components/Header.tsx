"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu when clicking a link
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg"
                : "bg-transparent backdrop-blur-none border-b border-transparent"
                }`}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-gx-cyan z-50" onClick={closeMenu}>
                    GX Prime Visuals
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    <Link href="/gallery" className="text-sm font-medium hover:text-gx-cyan transition-colors">
                        ギャラリー
                    </Link>
                    <div className="relative group">
                        <button className="text-sm font-medium hover:text-gx-cyan transition-colors flex items-center gap-1">
                            カテゴリーから探す
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                            <Link href="/categories/Energy" className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors">エネルギー</Link>
                            <Link href="/categories/Mobility" className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors">モビリティ</Link>
                            <Link href="/categories/Tech" className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors">テクノロジー</Link>
                            <Link href="/categories/Resource" className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors">資源・バイオ</Link>
                            <Link href="/categories/Eco-Life" className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors">エコ・ライフスタイル</Link>
                        </div>
                    </div>
                    <Link href="/tags" className="text-sm font-medium hover:text-gx-cyan transition-colors">
                        タグ一覧
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-gx-cyan transition-colors">
                        当サイトについて
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-gx-cyan transition-colors">
                        お問い合わせ
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 p-2 text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Nav Overlay */}
                <div
                    className={`fixed inset-0 bg-slate-950 transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-20px]"
                        }`}
                >
                    <Link
                        href="/gallery"
                        className="text-2xl font-bold text-white hover:text-gx-cyan transition-colors"
                        onClick={closeMenu}
                    >
                        ギャラリー
                    </Link>
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">カテゴリーから探す</span>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            <Link href="/categories/Energy" className="text-lg font-medium hover:text-gx-cyan transition-colors" onClick={closeMenu}>エネルギー</Link>
                            <Link href="/categories/Mobility" className="text-lg font-medium hover:text-gx-cyan transition-colors" onClick={closeMenu}>モビリティ</Link>
                            <Link href="/categories/Tech" className="text-lg font-medium hover:text-gx-cyan transition-colors" onClick={closeMenu}>テクノロジー</Link>
                            <Link href="/categories/Resource" className="text-lg font-medium hover:text-gx-cyan transition-colors" onClick={closeMenu}>資源・バイオ</Link>
                            <Link href="/categories/Eco-Life" className="text-lg font-medium hover:text-gx-cyan transition-colors" onClick={closeMenu}>エコ・ライフスタイル</Link>
                        </div>
                    </div>
                    <Link
                        href="/tags"
                        className="text-2xl font-bold text-white hover:text-gx-cyan transition-colors"
                        onClick={closeMenu}
                    >
                        タグ一覧
                    </Link>
                    <Link
                        href="/about"
                        className="text-2xl font-bold text-white hover:text-gx-cyan transition-colors"
                        onClick={closeMenu}
                    >
                        当サイトについて
                    </Link>
                    <Link
                        href="/contact"
                        className="text-2xl font-bold text-white hover:text-gx-cyan transition-colors"
                        onClick={closeMenu}
                    >
                        お問い合わせ
                    </Link>
                </div>
            </div>
        </header>
    );
}
