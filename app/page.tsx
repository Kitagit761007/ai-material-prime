<nav className="hidden lg:flex items-center gap-6">
    <Link href="/" className="text-[11px] font-bold text-white hover:text-cyan-400 transition-colors">ホーム</Link>
    
    {/* 本物の独立ページへ飛ばす */}
    <Link href="/gallery" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
        <ImageIcon className="w-3 h-3" />ギャラリー
    </Link>
    
    <Link href="/category" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
        <LayoutGrid className="w-3 h-3" />カテゴリー
    </Link>
    
    <Link href="/tags" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
        <TagIcon className="w-3 h-3" />タグ一覧
    </Link>

    <Link href="/favorites" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
        <Heart className="w-3 h-3" />お気に入り
    </Link>
    
    <Link href="/contact" className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
        <MessageSquare className="w-3 h-3" />お問い合わせ
    </Link>
</nav>
