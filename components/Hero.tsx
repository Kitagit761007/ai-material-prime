import { useRouter } from "next/navigation";
import { Search, Briefcase, CheckCircle, MonitorCheck } from "lucide-react";
import assets from "@/data/assets.json";

const knownTags = new Set(
    assets.flatMap(a => [
        a.category.toLowerCase(),
        ...a.tags.map(t => t.toLowerCase().replace("#", ""))
    ])
);

interface HeroProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function Hero({ searchQuery, setSearchQuery }: HeroProps) {
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const term = searchQuery.trim().replace("#", "");
        if (!term) return;

        if (knownTags.has(term.toLowerCase())) {
            router.push(`/tags/${encodeURIComponent(term)}`);
        } else {
            router.push(`/search?q=${encodeURIComponent(term)}`);
        }
    };

    const handleTagClick = (tag: string) => {
        const term = tag.startsWith("#") ? tag.substring(1) : tag;
        if (knownTags.has(term.toLowerCase())) {
            router.push(`/tags/${encodeURIComponent(term)}`);
        } else {
            router.push(`/search?q=${encodeURIComponent(term)}`);
        }
    };

    return (
        <section className="relative pt-24 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gx-cyan/20 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gx-cyan via-white to-gx-emerald">
                        GXの未来を、あなたの資料に。
                    </span>
                </h1>
            </div>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
                商用利用・クレジット不要。<br className="hidden md:block" />
                プロ仕様の次世代素材がプレゼンを加速させる。
            </p>

            {/* Benefit Badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
                <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <Briefcase className="w-4 h-4 text-gx-cyan" />
                    <span className="text-sm font-bold">商用利用OK</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <CheckCircle className="w-4 h-4 text-gx-emerald" />
                    <span className="text-sm font-bold">クレジット不要</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <MonitorCheck className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold">高解像度AI生成</span>
                </div>
            </div>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="relative w-full max-w-xl group flex items-center gap-2"
            >
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="キーワードを入力..."
                        className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-gx-cyan focus:ring-1 focus:ring-gx-cyan transition-all duration-300 shadow-2xl"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gx-cyan transition-colors" />
                </div>
                <button
                    type="submit"
                    className="shrink-0 bg-gx-cyan hover:bg-gx-cyan/90 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-gx-cyan/20 active:scale-95"
                >
                    検索
                </button>
            </form>

            {/* Floating Chips */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
                {["#水素エネルギー", "#スマートシティ", "#風力発電", "#環境技術"].map((tag, i) => {
                    const cleanTag = tag.startsWith("#") ? tag.substring(1) : tag;
                    const isActive = searchQuery === cleanTag;
                    return (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all animate-float border ${isActive
                                ? "bg-gx-cyan border-gx-cyan text-white shadow-lg shadow-gx-cyan/20"
                                : "bg-white/5 border-white/10 text-gx-cyan hover:bg-white/10"
                                }`}
                            style={{ animationDelay: `${i * 0.5}s` }}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
