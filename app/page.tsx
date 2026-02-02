// ... (前略：import文)
import { Menu, Heart, MessageSquare, Tag as TagIcon, LayoutGrid } from "lucide-react";

export default function Home() {
    // ... (中略：assetsのfetchなど)

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
            <header className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                            <span className="text-slate-950 font-black text-xs">AI</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            AI Material <span className="text-cyan-400 not-italic">Prime</span>
                        </span>
                    </Link>

                    {/* フルメニューの実装 */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/" className="text-[11px] font-bold text-white hover:text-cyan-400 transition-colors">ホーム</Link>
                        <Link href="/category" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><LayoutGrid className="w-3 h-3" />カテゴリー</Link>
                        <Link href="/tags" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><TagIcon className="w-3 h-3" />タグ一覧</Link>
                        <Link href="/favorites" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Heart className="w-3 h-3" />保存済み</Link>
                        <Link href="/contact" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"><MessageSquare className="w-3 h-3" />お問い合わせ</Link>
                    </nav>

                    <button className="lg:hidden text-white"><Menu /></button>
                </div>
            </header>
            {/* ...以下、メインコンテンツ */}
