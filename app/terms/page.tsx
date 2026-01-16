"use client";

import Link from "next/link";
import { ChevronLeft, Scale } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center text-slate-400 hover:text-gx-cyan transition-colors mb-8 group"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        トップページに戻る
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gx-cyan/10 rounded-xl border border-gx-cyan/20">
                            <Scale className="w-8 h-8 text-gx-cyan" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">利用規約</h1>
                    </div>
                    <p className="text-slate-400">
                        GX Prime Visuals（以下「当サイト」）の提供する素材の利用規約です。
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12 text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            1. ライセンスについて
                        </h2>
                        <p>
                            当サイトで提供されるすべての素材は、以下の条件において自由にご利用いただけます。
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li><strong className="text-gx-cyan">商用利用可能</strong>：商用目的のWebサイト、広告、資料等にご利用いただけます。</li>
                            <li><strong className="text-gx-cyan">クレジット表示不要</strong>：利用にあたっての著作権表示やリンクの掲載は任意です。</li>
                            <li><strong className="text-gx-cyan">加工自由</strong>：必要に応じて色調整、トリミング、合成等の加工が可能です。</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            2. 禁止事項
                        </h2>
                        <p>
                            以下の行為は固く禁じております。違反した場合は法的措置を講じる場合があります。
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>素材自体の<strong className="text-pink-500">再配布、転売、貸与</strong>（未加工・加工後を問わず）。</li>
                            <li>素材をそのままメインコンテンツとする販売物の作成。</li>
                            <li>公序良俗に反する目的や、誹謗中傷、違法行為に関わる利用。</li>
                            <li>当サイトまたは第三者の権利を侵害する形態での利用。</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            3. 免責事項
                        </h2>
                        <ul className="space-y-4">
                            <li>
                                当サイトの素材はAI（人工知能）によって生成されています。生成物の物理的な正確性や法的権利の完全性を保証するものではありません。
                            </li>
                            <li>
                                素材の利用によって生じたいかなる損害（直接的・間接的を問わず）についても、運営者は一切の責任を負いません。
                            </li>
                            <li>
                                当サイトのサービスは予告なく停止、変更される場合があります。
                            </li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <p className="text-sm text-slate-500">
                            制定日：2026年1月16日
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
