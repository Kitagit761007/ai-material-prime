"use client";

import { useSearchParams, useRouter } from "next/navigation";
import MaterialGallery from "@/components/MaterialGallery";
import { ChevronLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useEffect, useRef } from "react";
import TagSlider from "@/components/TagSlider";

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("q") || "";
    const [inputValue, setInputValue] = useState(query);
    const [resultCount, setResultCount] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync input value with URL when navigating
    useEffect(() => {
        setInputValue(query);
    }, [query]);

    // Auto-focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed) {
            router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        } else {
            router.push('/search');
        }
    };

    const clearInput = () => {
        setInputValue("");
        inputRef.current?.focus();
    };

    return (
        <div className="flex flex-col min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="mb-10">
                    <form onSubmit={handleSearch} className="relative group max-w-2xl">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className={`w-5 h-5 transition-colors ${inputValue ? "text-gx-cyan" : "text-slate-500"}`} />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="キーワードを入力（例：水素、スマートシティ）"
                            className="w-full bg-slate-900/50 border-2 border-white/5 focus:border-gx-cyan/50 text-white placeholder-slate-500 rounded-2xl py-4 pl-14 pr-12 outline-none transition-all shadow-xl backdrop-blur-md text-lg"
                            autoComplete="off"
                        />
                        {inputValue && (
                            <button
                                type="button"
                                onClick={clearInput}
                                className="absolute inset-y-0 right-4 flex items-center px-1 text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </form>
                </div>

                <div className="mb-8">
                    {query ? (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                「{query}」の検索結果
                            </h1>
                            {resultCount !== null && (
                                <p className="text-slate-400 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                                    該当する素材が <span className="text-gx-cyan font-bold text-base">{resultCount}</span> 件見つかりました
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight opacity-40">
                                素材を探す
                            </h1>
                            <p className="text-slate-500 text-sm">気になるキーワードで高品質なAI素材を検索できます</p>
                        </div>
                    )}
                </div>

                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-2 mb-2" />
                <TagSlider currentTag={query} />
            </div>

            <main className="mt-8">
                <MaterialGallery searchQuery={query} onResultCount={setResultCount} />
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gx-cyan" />
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
