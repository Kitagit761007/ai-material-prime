"use client";

import Link from "next/link";

export default function AboutPage() {
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
          当サイトについて
        </h1>

        {/* Summary */}
        <div className="mb-10 p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
          <p className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-3">
            Summary
          </p>
          <div className="grid gap-3 text-sm text-slate-300 leading-relaxed">
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>
                AI Material Prime（GX Prime Visuals）は、未来・次世代テクノロジー領域の世界観をテーマにした
                AI生成画像素材を提供するサイトです。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>
                商用・非商用で利用可能（クレジット表記は任意）です。詳細は
                <Link href="/terms/" className="text-white underline decoration-white/30 hover:decoration-white ml-1">
                  利用規約
                </Link>
                をご確認ください。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>
                ご連絡は
                <Link href="/contact/" className="text-white underline decoration-white/30 hover:decoration-white ml-1">
                  お問い合わせフォーム
                </Link>
                よりお願いいたします（返信目安：3営業日以内）。
              </span>
            </div>
          </div>
        </div>

        <section className="space-y-10 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              サイトの目的
            </h2>
            <p className="text-slate-400">
              当サイトは、プレゼン資料・Webサイト・動画・広告・SNS投稿などに使いやすい
              「未来感のあるビジュアル素材」を、誰でも扱える形で提供することを目的としています。
              素材の利用条件は明確にし、安心して使える運用を心がけています。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              運営者情報
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-white/10 pl-4">
              <li>サイト名：AI Material Prime（GX Prime Visuals）</li>
              <li>運営：GX Prime Visuals（運営）</li>
              <li>所在地：Japan</li>
              <li>
                連絡先：
                <Link href="/contact/" className="text-white underline decoration-white/30 hover:decoration-white ml-1">
                  お問い合わせフォーム
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              広告掲載について
            </h2>
            <p className="text-slate-400">
              当サイトでは、運営継続のために広告配信サービス（例：Google AdSense）を利用する場合があります。
              広告の配信にあたってはCookie等が使用されることがあります。詳細は
              <Link href="/privacy/" className="text-white underline decoration-white/30 hover:decoration-white ml-1">
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              免責事項
            </h2>
            <p className="text-slate-400">
              当サイトの掲載内容・素材の利用により生じた損害等について、運営者は一切の責任を負いません。
              各素材の利用可否は、利用者ご自身の責任においてご判断ください。規約・ポリシーは必要に応じて
              予告なく更新される場合があります。
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 text-xs text-slate-500">
            最終更新：2026年2月6日
          </div>
        </section>
      </div>
    </main>
  );
}
