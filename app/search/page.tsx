"use client";

import { useSearchParams } from "next/navigation";
import ImageGrid from "@/components/ImageGrid";
import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [resultCount, setResultCount] = useState<number | null>(null);

    return (
        <div className="flex flex-col min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 w-full mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    トップページへ戻る
                </Link>

                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gx-cyan/10 rounded-2xl border border-gx-cyan/20">
                        <Search className="w-8 h-8 text-gx-cyan" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            「{query}」の検索結果
                        </h1>
                        {resultCount !== null && (
                            <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gx-cyan rounded-full animate-pulse" />
                                該当する素材が <span className="text-gx-cyan font-bold text-base">{resultCount}</span> 件見つかりました
                            </p>
                        )}
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gx-cyan/50 via-white/5 to-transparent mt-10" />
            </div>

            <ImageGrid searchQuery={query} onResultCount={setResultCount} />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gx-cyan" />
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
