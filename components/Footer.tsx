"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [assets, setAssets] = useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { setSelectedCategory, clearFilters } = useSearch();

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const response = await fetch("/data/assets.json");
        const data = await response.json();
        setAssets(data);
      } catch (e) {
        console.error("Error loading assets:", e);
      }
    };
    loadAssets();
  }, []);

  const handleCategoryClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(id);
    if (pathname !== "/") {
      router.push("/");
    }
    setTimeout(() => {
      const gallery = document.getElementById("gallery-section");
      if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clearFilters();
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
    { name: "エコ・ライフ", id: "エコ・ライフ", en: "Eco Lifestyle" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-tighter text-gx-cyan"
              onClick={handleLogoClick}
            >
              GX Prime Visuals
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              ビジネス・プレゼンテーションのための
              <br />
              高解像度AI生成アセットライブラリ。
              <br />
              <span className="text-slate-500 block mt-2 leading-tight">
                All images are AI-generated and available for free commercial and
                personal use under a royalty-free license. See Terms for details.
              </span>
            </p>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                License
              </span>
              <span className="text-gx-emerald text-[10px] font-bold font-mono leading-tight">
                #CommercialUse #RoyaltyFree
                <br />
                Commercial Use OK / No Attribution Required
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/terms/"
                className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/guide/"
                className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                Guide
              </Link>
              <Link
                href="/business/"
                className="inline-flex items-center rounded-md border border-gx-cyan/30 bg-gx-cyan/10 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gx-cyan hover:bg-gx-cyan/20 transition-colors"
              >
                Business
              </Link>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              Categories
            </h3>

            <ul className="grid grid-cols-1 gap-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${encodeURIComponent(cat.id)}/`}
                    className="w-full text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-between group text-left"
                  >
                    <div className="flex flex-col">
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                        {cat.en}
                      </span>
                    </div>
                    <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-600 group-hover:text-gx-cyan transition-colors">
                      {getCategoryCount(cat.id)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                Quick Jump
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={(e) => handleCategoryClick(cat.id, e as any)}
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-slate-500 leading-relaxed">
                ホームのギャラリーへスクロールします（フィルター適用）。
              </p>
            </div>
          </div>

          {/* Column 3: Legal & Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Information
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/business/"
                  className="text-slate-400 hover:text-gx-cyan transition-colors text-sm font-bold"
                >
                  法人向け (Business)
                </Link>
                <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">
                  11枚パック・特注生成の相談窓口
                </p>
              </li>

              <li>
                <Link
                  href="/about/"
                  className="text-slate-400 hover:text-gx-cyan transition-colors text-sm"
                >
                  当サイトについて (About)
                </Link>
              </li>

              <li>
                <Link
                  href="/guide/"
                  className="text-slate-400 hover:text-gx-cyan transition-colors text-sm"
                >
                  利用ガイド (Guide)
                </Link>
              </li>

              <li>
                <Link
                  href="/contact/"
                  className="text-slate-400 hover:text-gx-cyan transition-colors text-sm font-bold"
                >
                  お問い合わせ (Contact)
                </Link>
              </li>

              <li className="pt-4 border-t border-white/5">
                <Link
                  href="/terms/"
                  className="block text-slate-500 hover:text-slate-300 transition-colors text-xs mb-2"
                >
                  利用規約 (Terms of Service)
                </Link>
                <Link
                  href="/privacy/"
                  className="block text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  プライバシーポリシー (Privacy Policy)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact/Action */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Support
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              アセットのリクエストや、
              <br />
              エンタープライズ利用に関するご相談は
              <br />
              フォームよりご連絡ください。
              <br />
              <span className="text-[10px] text-slate-400 block mt-1">
                Free Assets for All Creators
              </span>
            </p>

            <div className="space-y-3">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-sm font-bold rounded-lg transition-all"
              >
                お問い合わせフォーム
              </Link>

              <Link
                href="/business/"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-gx-cyan/15 border border-gx-cyan/25 hover:bg-gx-cyan/20 hover:border-gx-cyan/40 text-white text-sm font-bold rounded-lg transition-all"
              >
                法人向けの相談（11枚パック／特注）
              </Link>

              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  For Business
                </p>
                <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                  目的・媒体・納期が分かる範囲でOKです。
                  見積・提案時に、提供方法や条件を個別に合意します。
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/terms/"
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/privacy/"
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 space-y-4 md:space-y-0 text-slate-500">
          <p className="text-[10px] font-mono uppercase">
            © {currentYear} GX Prime Visuals. AI-generated assets. Commercial use
            OK / No attribution required. See /terms for details.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
            <Link
              href="/business/"
              className="text-slate-500 hover:text-gx-cyan transition-colors"
            >
              Business
            </Link>
            <Link
              href="/terms/"
              className="text-slate-500 hover:text-slate-200 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy/"
              className="text-slate-500 hover:text-slate-200 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact/"
              className="text-slate-500 hover:text-slate-200 transition-colors"
            >
              Contact
            </Link>
            <span className="hidden md:inline">•</span>
            <span>Built for Future</span>
            <span>•</span>
            <span>Japan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
