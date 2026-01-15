"use client";

import { Search } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-20 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gx-cyan/20 rounded-full blur-[120px] -z-10" />

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gx-cyan via-white to-gx-emerald">
                    GX Prime Visuals
                </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12">
                次世代のGX戦略を可視化する、高品質AI生成アセット。
                <br />
                持続可能な未来を、最高峰の視覚資産で描き出す。
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-xl group">
                <input
                    type="text"
                    placeholder="エネルギー記号を検索..."
                    className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-gx-cyan focus:ring-1 focus:ring-gx-cyan transition-all duration-300 shadow-2xl"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gx-cyan transition-colors" />
            </div>

            {/* Floating Chips */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
                {["#水素エネルギー", "#スマートシティ", "#風力発電", "#環境技術"].map((tag, i) => (
                    <span
                        key={tag}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 text-gx-cyan cursor-pointer transition-all animate-float"
                        style={{ animationDelay: `${i * 0.5}s` }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </section>
    );
}
