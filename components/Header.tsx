"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight, Heart } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [assets, setAssets] = useState<any[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const { setSelectedCategory, clearFilters } = useSearch();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        const loadAssets = async () => {
            try {
                const response = await fetch('/data/assets.json');
                const data = await response.json();
                setAssets(data);
            } catch (e) {
                console.error("Error loading assets:", e);
            }
        };
        loadAssets();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll lock when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    const handleCategoryClick = (id: string) => {
        setSelectedCategory(id);
        closeMenu();
        if (pathname !== "/") {
            router.push("/");
        }
        // Small delay to ensure we are on the home page before scrolling
        setTimeout(() => {
            const gallery = document.getElementById("gallery-section");
            if (gallery) {
                gallery.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    const handleLogoClick = () => {
        clearFilters();
        closeMenu();
        if (pathname !== "/") {
            router.push("/");
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const getCategoryCount = (id: string) => {
        return assets.filter((item: any) => item.category === id).length;
    };

    const categories = [
        { name: "GX", id: "GX", en: "Green Transformation (GX)" },
        { name: "未来都市", id: "未来都市", en: "Future City" },
        { name: "モビリティ", id: "モビリティ", en: "Clean Mobility" },
        { name: "テクノロジー", id: "テクノロジー", en: "Advanced Technology" },
        { name: "宇宙", id: "宇宙", en: "Space & Galaxy" },
        { name: "水中", id: "水中", en: "Underwater City" },
        { name: "資源・バイオ", id: "資源・バイオ", en: "Sustainable Resources" },
        { name: "エコ・ライフ", id: "エコ・ライフ", en: "Eco Lifestyle" }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMenuOpen ? "z-[9999] bg-slate-950" : "z-50"} ${!isMenuOpen && scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg" : !isMenuOpen ? "bg-transparent border-b border-transparent" : "border-b border-white/10"}`}>
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className={`text-xl font-bold font-mono tracking-tighter text-gx-cyan transition-all ${isMenuOpen ? "z-[101]" : "z-50"}`} onClick={(e) => { e.preventDefault(); handleLogoClick(); }}>GX Prime Visuals</Link>
                <nav className="hidden md:flex gap-8 items-center">
                    <Link href="/gallery" className="text-sm font-medium hover:text-gx-cyan transition-colors">ギャラリー</Link>
                    <div className="relative group">
                        <button className="text-sm font-medium hover:text-gx-cyan transition-colors flex items-center gap-1">カテゴリーから探す <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" /></button>
                        <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden py-2">
                            {categories.map((cat) => (
                                <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors group/item border-b border-white/5 last:border-0 text-left">
                                    <div className="flex flex-col">
                                        <span className="text-sm group-hover/item:text-gx-cyan transition-colors text-white">{cat.name}</span>
                                        <span className="text-[10px] text-slate-500 font-medium">{cat.en}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">{getCategoryCount(cat.id)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <Link href="/tags" className="text-sm font-medium hover:text-gx-cyan transition-colors">タグ一覧</Link>
                    <Link href="/favorites" className="text-sm font-medium hover:text-gx-cyan transition-colors flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        保存済み
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-gx-cyan transition-colors">お問い合わせ</Link>
                </nav>
                <button className={`md:hidden p-2 text-white transition-all ${isMenuOpen ? "z-[101]" : "z-50"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
                <div className={`fixed inset-0 bg-[#020617] transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-4 ${isMenuOpen ? "opacity-100 pointer-events-auto z-[100]" : "opacity-0 pointer-events-none translate-y-[-20px]"}`}>
                    <Link href="/gallery" className="w-[calc(100%-3rem)] bg-white/5 p-4 rounded-xl flex items-center justify-between group active:bg-white/10 transition-colors border border-white/5" onClick={closeMenu}>
                        <span className="text-xl font-bold text-white">ギャラリー (Gallery)</span>
                        <ChevronRight className="w-5 h-5 text-gx-cyan" />
                    </Link>

                    <div className="grid grid-cols-2 gap-3 w-full px-6">
                        {categories.map((cat) => (
                            <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center relative group active:bg-white/10 active:scale-[0.98] transition-all border border-white/5">
                                <span className="text-sm font-bold text-white leading-tight mb-1">{cat.name}</span>
                                <span className="text-[9px] text-slate-400 mb-2">{cat.en}</span>
                                <span className="text-[9px] text-gx-cyan opacity-60 font-mono">{getCategoryCount(cat.id)} assets</span>
                                <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20 group-active:text-gx-cyan group-active:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>

                    <div className="w-full px-6 flex flex-col gap-3 mt-2">
                        <Link href="/tags" className="bg-white/5 p-4 rounded-xl flex items-center justify-between group active:bg-white/10 transition-colors border border-white/5" onClick={closeMenu}>
                            <span className="text-lg font-bold text-slate-300">タグ一覧 (Tags)</span>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-active:text-gx-cyan" />
                        </Link>
                        <Link href="/contact" className="bg-white/5 p-4 rounded-xl flex items-center justify-between group active:bg-white/10 transition-colors border border-white/5" onClick={closeMenu}>
                            <span className="text-lg font-bold text-slate-300">お問い合わせ (Contact)</span>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-active:text-gx-cyan" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
