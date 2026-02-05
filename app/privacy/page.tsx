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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          ホームへ戻る
        </Link>

        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          プライバシーポリシー
        </h1>

        {/* ✅ Summary Section (JP) */}
        <div className="mb-8 p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
          <p className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-3">
            Summary（要点）
          </p>
          <div className="grid gap-3 text-sm text-slate-300">
            <div className="flex gap-2">
              <span className="text-gx-emerald">✓</span>
              <span>
                当サイトでは、サービス改善のために <strong className="text-white">Googleアナリティクス</strong> を利用します。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-emerald">✓</span>
              <span>
                収集されるデータは <strong className="text-white">匿名</strong> で、個人を特定する目的ではありません。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-emerald">✓</span>
              <span>
                取得データは <strong className="text-white">第三者へ販売しません</strong>。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>
                Cookieの無効化により、測定を拒否できます（ブラウザ設定をご確認ください）。
              </span>
            </div>
          </div>
        </div>

        {/* English Summary Section */}
        <div className="mb-12 p-6 bg-gx-emerald/5 border border-gx-emerald/20 rounded-2xl">
          <h2 className="text-xs font-bold text-gx-emerald uppercase tracking-widest mb-3">
            [English Summary]
          </h2>
          <ul className="text-sm text-slate-300 space-y-2 list-none">
            <li className="flex gap-2">
              <span className="text-gx-emerald">•</span>
              <span>We collect minimal data via Google Analytics to improve our service.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gx-emerald">•</span>
              <span>We do not sell your personal information to third parties.</span>
            </li>
          </ul>
        </div>

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
              <li>
                この機能はクッキーを無効にすることで収集を拒否することが可能です。お使いのブラウザの設定をご確認ください。
              </li>
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
            <p className="mb-4">
              プライバシーポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gx-cyan/20 hover:bg-gx-cyan/30 text-white font-bold rounded-xl transition-colors"
            >
              お問い合わせページへ
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 text-xs text-slate-500">
            策定日：2026年1月18日
          </div>
        </section>
      </div>
    </main>
  );
}
