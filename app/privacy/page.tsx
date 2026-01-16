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
                            2. 第三者への開示・提供の禁止
                        </h2>
                        <p>
                            お客様よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>お客様の同意がある場合</li>
                            <li>法令に基づき開示が必要な場合</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gx-emerald rounded-full"></span>
                            3. お問い合わせ先
                        </h2>
                        <p>
                            当サイトの個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
                        </p>
                        <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10 inline-block">
                            <p className="text-sm text-slate-400 mb-1">Email</p>
                            <p className="text-gx-cyan font-mono text-xl">hakuto1024@gmail.com</p>
                        </div>
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
