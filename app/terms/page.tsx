"use client";

import Link from "next/link";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-[#050505] text-slate-300 py-20 px-6">
            <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 shadow-2xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gx-cyan hover:text-white transition-colors mb-8 group font-bold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6" /></svg>
                    ホームへ戻る
                </Link>

                <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    利用規約
                </h1>

                {/* English Summary Section */}
                <div className="mb-12 p-6 bg-gx-cyan/5 border border-gx-cyan/20 rounded-2xl">
                    <h2 className="text-xs font-bold text-gx-cyan uppercase tracking-widest mb-3">[English Summary]</h2>
                    <ul className="text-sm text-slate-300 space-y-2 list-none">
                        <li className="flex gap-2">
                            <span className="text-gx-cyan">•</span>
                            <span>All assets are free for commercial and personal use.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-gx-cyan">•</span>
                            <span>No attribution or credit required.</span>
                        </li>
                        <li className="flex gap-2 text-gx-emerald">
                            <span className="text-gx-emerald">•</span>
                            <span>Redistribution or selling the images as standalone assets is prohibited.</span>
                        </li>
                    </ul>
                </div>

                <section className="space-y-8 text-sm md:text-base leading-relaxed">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            はじめに
                        </h2>
                        <p>
                            GX Prime Visuals（以下「当サイト」）をご利用いただきありがとうございます。本規約は、当サイトが提供する素材の利用条件を定めるものです。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            AI生成素材について
                        </h2>
                        <p>
                            当サイトで提供している画像は、最新のAI技術を用いて生成されたアセットです。AI生成の特性上、細部に不自然な表現が含まれる場合がありますが、その独創性と未来的な世界観をお楽しみください。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            利用許諾の範囲
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-white/10 pl-4">
                            <li>個人、法人問わず、商用・非商用を問わず自由にご利用いただけます。</li>
                            <li>素材の加工・改変は自由です。</li>
                            <li>利用に関する報告やクレジット表記は不要です。</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            禁止事項
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-gx-emerald/30 pl-4">
                            <li>素材そのものを再配布、転売、貸与する行為（NFTとしての販売を含む）。</li>
                            <li>素材の販売権を独占的に主張する行為。</li>
                            <li>犯罪行為、公序良俗に反する目的での利用。</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            免責事項
                        </h2>
                        <p>
                            当サイトの素材を利用したことによって生じたトラブル、損害、損失について、運営者は一切の責任を負いません。自己の責任においてご利用ください。本規約の内容は予告なく変更される場合があります。
                        </p>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-xs text-slate-500">
                        最終改定：2026年1月18日
                    </div>
                </section>
            </div>
        </main>
    );
}
