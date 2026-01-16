"use client";

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-gx-cyan">
                            GX Prime Visuals
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            AIでGXの未来を可視化するアセットライブラリ。すべての素材は商用利用可能・クレジット不要。
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/gallery" className="text-slate-400 hover:text-gx-cyan transition-colors text-sm">
                                    ギャラリー
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-gx-cyan transition-colors text-sm">
                                    当サイトについて
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-400 hover:text-gx-cyan transition-colors text-sm">
                                    お問い合わせ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: License & Policy */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase">License & Policy</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/terms" className="text-slate-400 hover:text-gx-cyan transition-colors text-sm">
                                    利用規約
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-slate-400 hover:text-gx-cyan transition-colors text-sm">
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <span className="text-gx-emerald/80 text-xs font-bold font-mono">
                                    All Assets are Royalty-Free
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Operational Info */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-sm tracking-wider uppercase">Operational Info</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Base</p>
                                <p className="text-slate-300 text-sm font-mono">Kyoto, Japan</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Response Time</p>
                                <p className="text-slate-300 text-sm">3営業日以内に返信</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 space-y-4 md:space-y-0">
                    <p className="text-slate-500 text-xs font-mono">
                        © {currentYear} GX Prime Visuals. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {/* SNS links could go here in the future */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
