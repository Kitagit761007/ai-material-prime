"use client";

import { useSearch } from "@/context/SearchContext";
import { useRouter } from "next/navigation";

const POPULAR_TAGS = ["GX", "未来都市", "脱炭素", "テクノロジー", "モビリティ", "水中", "宇宙"];

interface TagSliderProps {
    currentTag?: string;
}

export default function TagSlider({ currentTag = "" }: TagSliderProps) {
    const { setSearchQuery } = useSearch();
    const router = useRouter();

    const handleTagClick = (tag: string) => {
        const term = tag.startsWith("#") ? tag.substring(1) : tag;
        setSearchQuery(term);

        // If not on search page or home page, go to home
        const gallery = document.getElementById("gallery-section");
        if (!gallery) {
            router.push("/#gallery-section");
        } else {
            gallery.scrollIntoView({ behavior: "smooth" });
        }
    };

    const cleanCurrent = currentTag.replace("#", "").toLowerCase();

    return (
        <div className="w-full relative py-4">
            <div className="flex flex-nowrap overflow-x-auto gap-3 no-scrollbar scroll-smooth px-6 mask-fade-right">
                {POPULAR_TAGS.map((tag) => {
                    const cleanTag = tag.replace("#", "").toLowerCase();
                    const isActive = cleanCurrent === cleanTag;

                    return (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`shrink-0 h-11 px-6 rounded-full text-sm font-bold transition-all border flex items-center justify-center ${isActive
                                ? "bg-gx-cyan border-gx-cyan text-slate-950 shadow-lg shadow-gx-cyan/40 scale-105"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-gx-cyan/50 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {tag}
                        </button>
                    );
                })}
                {/* Spacer for end of scroll */}
                <div className="shrink-0 w-6 h-11" />
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .mask-fade-right {
                    mask-image: linear-gradient(to right, black 85%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
                }
            `}</style>
        </div>
    );
}
