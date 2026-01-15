"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/30 backdrop-blur-md border-b border-white/10 shadow-lg"
                : "bg-transparent backdrop-blur-none border-b border-transparent"
                }`}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-gx-cyan">
                    GX Prime Visuals
                </Link>

                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="#" className="text-sm font-medium hover:text-gx-cyan transition-colors">
                        ギャラリー
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:text-gx-cyan transition-colors">
                        当サイトについて
                    </Link>
                    <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-gx-cyan text-gx-cyan hover:bg-gx-cyan hover:text-white transition-all rounded-full">
                        お問い合わせ / 接続
                    </button>
                </nav>
            </div>
        </header>
    );
}
