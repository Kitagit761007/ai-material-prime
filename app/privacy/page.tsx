"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
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
                        <div className="p-3 bg-gx-emerald/10 rounded-xl border border-gx-emerald/20">
                            <ShieldCheck className="w-8 h-8 text-gx-emerald" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">プライバシーポリシー</h1>
                    </div>
                    <p className="text-slate-400">
                        お客様の個人情報の取り扱いに関する方針を記載しています。
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12 text-slate-300 leading-relaxed text-lg">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-emerald rounded-full"></span>
                            1. 個人情報の収集・収集目的
                        </h2>
                        <p>
                            当サイトでは、お問い合わせフォームを通じて「お名前」「企業名」「メールアドレス」等の情報を収集する場合があります。
                        </p>
                        <p className="mt-4">
                            収集した情報は、<strong className="text-white">お問い合わせへの回答およびご本人確認</strong>にのみ利用し、それ以外の目的には使用いたしません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-emerald rounded-full"></span>
                            2. 安全管理措置
                        </h2>
                        <p>
                            取得した個人情報は、不正アクセスや漏洩を防止するため、<strong className="text-white font-mono">hakuto1024@gmail.com</strong> の管理下で適切なセキュリティ対策を講じて厳重に保管いたします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-emerald rounded-full"></span>
                            3. クッキー（Cookie）について
                        </h2>
                        <p>
                            当サイトでは利便性向上のため、Cookieを使用する場合があります。これにより得られる情報は匿名のものであり、<strong className="text-white">個人を特定する情報を取得することはありません</strong>。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-emerald rounded-full"></span>
                            4. お問い合わせ先
                        </h2>
                        <p>
                            個人情報の取り扱いに関するお問い合わせは、下記よりご連絡ください。
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gx-cyan/50 rounded-xl transition-all group"
                            >
                                <span className="text-gx-cyan font-bold mr-2 group-hover:translate-x-1 transition-transform">
                                    お問い合わせフォーム
                                </span>
                                <ChevronLeft className="w-4 h-4 text-slate-500 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
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
