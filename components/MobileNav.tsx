"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, Tag, Heart } from "lucide-react";

export default function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "ホーム", href: "/", icon: Home },
        { name: "カテゴリー", href: "/categories", icon: LayoutGrid },
        { name: "検索", href: "/search", icon: Search },
        { name: "タグ", href: "/tags", icon: Tag },
        { name: "保存済み", href: "/favorites", icon: Heart },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 px-6 pb-safe-area-inset-bottom">
            <div className="flex items-center justify-between h-16 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 transition-all ${isActive ? "text-gx-cyan" : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-gx-cyan/10" : "bg-transparent"}`}>
                                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                            </div>
                            <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
            {/* iOS safe area filler */}
            <div className="h-[env(safe-area-inset-bottom)] bg-transparent" />
        </nav>
    );
}
