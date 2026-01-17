"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
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
                    プライバシーポリシー
                </h1>

                <section className="space-y-8 text-sm md:text-base leading-relaxed">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            個人情報の保護について
                        </h2>
                        <p>
                            GX Prime Visuals（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本ポリシーは、当サイトにおける情報の取り扱いについて説明するものです。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            アクセス解析ツールについて
                        </h2>
                        <p className="mb-4">
                            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています（測定ID: G-J0S6KYW409）。
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-white/10 pl-4">
                            <li>Googleアナリティクスはデータの収集のためにクッキー（Cookie）を使用しています。</li>
                            <li>このデータは匿名で収集されており、個人を特定するものではありません。</li>
                            <li>この機能はクッキーを無効にすることで収集を拒否することが可能です。お使いのブラウザの設定をご確認ください。</li>
                        </ul>
                        <p className="mt-4 text-xs text-slate-500">
                            ※詳細については Google アナリティクス利用規約や Google のポリシーと規約をご覧ください。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
                            お問い合わせ
                        </h2>
                        <p>
                            プライバシーポリシーに関するお問い合わせは、当サイトの運営者までお願いいたします。
                        </p>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-xs text-slate-500">
                        策定日：2026年1月18日
                    </div>
                </section>
            </div>
        </main>
    );
}
