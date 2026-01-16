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
                            1. 権利の所在とライセンス
                        </h2>
                        <div className="space-y-4">
                            <p>
                                本素材はAI（人工知能）によって生成されており、運営者は本素材を本規約に基づきユーザーに提供する<strong className="text-white">正当な権限</strong>を有しています。
                            </p>
                            <p>
                                ユーザーに対し、素材の<strong className="text-gx-cyan">非独占的かつ永続的な利用権</strong>を付与します。
                            </p>
                        </div>
                        <ul className="list-disc ml-6 mt-6 space-y-2">
                            <li><strong className="text-gx-cyan">商用利用可能</strong>：サイト、広告、制作物等に自由にご利用いただけます。</li>
                            <li><strong className="text-gx-cyan">クレジット表示不要</strong>：利用にあたっての著作権表示は任意です。</li>
                            <li><strong className="text-gx-cyan">加工自由</strong>：色調整、合成等の改変が可能です。</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            2. 禁止事項
                        </h2>
                        <p>
                            以下の行為は固く禁じております。
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>素材自体の<strong className="text-pink-500">再配布、転売、貸与</strong>（無加工・加工後を問わず）。</li>
                            <li><strong className="text-white">反社会的勢力</strong>に関連する利用。</li>
                            <li>本素材を<strong className="text-white">生成AIサービスの学習データ</strong>として再利用（クローリング等）すること。</li>
                            <li>誹謗中傷、違法行為、公序良俗に反する目的での利用。</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            3. 免責事項（重要）
                        </h2>
                        <ul className="space-y-4">
                            <li className="p-4 bg-white/5 rounded-xl border border-white/10 text-slate-400 text-sm italic">
                                運営者は、本素材が<strong className="text-slate-200">第三者の知的財産権を侵害していないことを明示的にも黙示的にも保証しません</strong>。
                            </li>
                            <li>
                                利用により生じた直接的・間接的な損害、および<strong className="text-white">第三者との紛争</strong>について、運営者は一切の責任を負わないものとします。
                            </li>
                            <li>
                                本素材はAIによる生成物であり、その正確性や妥当性を保証するものではありません。
                            </li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/10 text-right">
                        <p className="text-sm text-slate-500">
                            最終更新日：2026年1月16日
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
