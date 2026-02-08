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
          利用規約
        </h1>

        {/* ✅ Key Points (JP) */}
        <div className="mb-8 p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
          <p className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-3">
            Key Points
          </p>

          <div className="grid gap-3 text-sm text-slate-300">
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>商用・非商用で利用できます（個人・法人問わず）。</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>
                加工・編集は<strong className="text-white">可能</strong>です。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>
                クレジット表記は<strong className="text-white">不要（任意）</strong>です。
              </span>
            </div>

            <div className="h-px bg-white/10 my-1" />

            <div className="flex gap-2">
              <span className="text-red-400">✕</span>
              <span>
                <strong className="text-white">自作発言（作者を偽る行為）</strong>は禁止です。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-red-400">✕</span>
              <span>
                <strong className="text-white">
                  再配布・転売（素材としての再公開、素材サイト配布、ストックフォト配布、NFT化 等）
                </strong>
                は禁止です。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-red-400">✕</span>
              <span>
                <strong className="text-white">AIモデルの学習データとしての利用</strong>は禁止です。
              </span>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400 leading-relaxed">
            例：SNS投稿、ブログ、広告、プレゼン資料、動画、印刷物などでの利用はOK（素材そのものの再配布はNG）
          </div>
        </div>

        {/* English Summary Section */}
        <div className="mb-12 p-6 bg-gx-cyan/5 border border-gx-cyan/20 rounded-2xl">
          <h2 className="text-xs font-bold text-gx-cyan uppercase tracking-widest mb-3">
            [English Summary]
          </h2>
          <ul className="text-sm text-slate-300 space-y-2 list-none">
            <li className="flex gap-2">
              <span className="text-gx-cyan">•</span>
              <span>All assets are free for commercial and personal use.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gx-cyan">•</span>
              <span>Editing and modification are allowed.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gx-cyan">•</span>
              <span>No attribution or credit required (optional).</span>
            </li>
            <li className="flex gap-2 text-gx-emerald">
              <span className="text-gx-emerald">•</span>
              <span>
                Redistribution or selling the images as standalone assets is prohibited.
              </span>
            </li>
            <li className="flex gap-2 text-red-300">
              <span className="text-red-300">•</span>
              <span>Using the assets for AI training datasets is prohibited.</span>
            </li>
          </ul>
        </div>

        <section className="space-y-8 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              1. はじめに（適用範囲）
            </h2>
            <p className="leading-relaxed">
              GX Prime Visuals（以下「当サイト」）をご利用いただきありがとうございます。
              本規約は、当サイトが提供する画像・文章・デザイン等のコンテンツ（以下「コンテンツ」）の利用条件を定めるものです。
              ユーザーが当サイトを閲覧・ダウンロード・利用した時点で、本規約に同意したものとみなします。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              2. 権利帰属
            </h2>
            <p className="leading-relaxed">
              当サイトに掲載されるコンテンツに関する権利は、当サイト運営者または正当な権利者に帰属します。
              ユーザーには、本規約で明示的に許諾された範囲に限り、コンテンツの利用が許可されます。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              3. AI生成素材について（注意事項）
            </h2>
            <p className="leading-relaxed">
              当サイトの画像はAI技術を用いて生成されたアセットです。
              AI生成の特性上、細部の不自然さ、事実・科学的整合性の揺れ、既存表現との偶然の類似が生じる可能性があります。
              当サイトは、特定目的への適合性、正確性、完全性、権利非侵害を保証しません。
            </p>

            <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 text-sm leading-relaxed">
              <strong className="text-white">第三者の権利について：</strong>
              AI生成コンテンツの性質上、意図せず第三者の著作権・商標権・肖像権その他の権利を侵害する表現が含まれる可能性があります。
              ユーザーは自己の責任で利用可否を判断し、必要に応じて権利処理等を行うものとします。
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              4. 利用許諾（できること）
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-white/10 pl-4">
              <li>個人・法人を問わず、商用・非商用を問わず利用できます。</li>
              <li>Web・SNS・ブログ・広告・プレゼン資料・動画・印刷物など、制作物への組み込み用途で利用できます。</li>
              <li>トリミング、文字入れ、色調補正などの加工・改変は可能です。</li>
              <li>利用報告は不要です。</li>
              <li>クレジット表記は不要（任意）です。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              5. 禁止事項（してはいけないこと）
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-gx-emerald/30 pl-4">
              <li>
                素材そのものを<strong className="text-white">再配布・転売・貸与</strong>する行為
                （素材サイト・ストックフォト・テンプレ配布・壁紙集配布・NFT化を含む）。
              </li>
              <li>
                当サイト素材を「主な価値」として提供する形での配布・販売
                （例：素材集、テンプレ集、ダウンロードパック等）。
              </li>
              <li>
                当サイトの画像を<strong className="text-white">自作発言</strong>する行為、作者・出所を偽る行為。
              </li>
              <li>犯罪行為、または公序良俗に反する目的での利用。</li>
              <li>第三者の権利を侵害する利用、または侵害を助長する利用。</li>
              <li>
                <strong className="text-white">AIモデルの学習データ</strong>として使用すること（収集・スクレイピング・再学習等を含む）。
              </li>
              <li>当サイトと提携・公式であるかのように誤認させる表示・利用。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              6. 違反時の対応
            </h2>
            <p className="leading-relaxed">
              ユーザーが本規約に違反した場合、当サイト運営者は、事前の通知なく当該ユーザーの利用停止、
              アクセス制限、コンテンツの削除要請、その他必要な措置を行うことができます。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              7. 免責事項
            </h2>
            <p className="leading-relaxed">
              当サイトのコンテンツを利用したことによって生じたトラブル、損害、損失について、当サイト運営者は一切の責任を負いません。
              ユーザーは自己の責任においてご利用ください。
              また、当サイトは予告なく内容の変更、追加、削除、提供の停止を行う場合があります。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              8. 規約の変更
            </h2>
            <p className="leading-relaxed">
              当サイト運営者は、必要に応じて本規約を変更できるものとします。
              変更後の規約は当サイト上に掲示した時点から効力を生じ、ユーザーが変更後に当サイトを利用した場合、
              変更内容に同意したものとみなします。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              9. 準拠法・管轄
            </h2>
            <p className="leading-relaxed">
              本規約は日本法に準拠します。本規約または当サイトの利用に関して紛争が生じた場合、
              当サイト運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              10. お問い合わせ
            </h2>
            <p className="leading-relaxed">
              本規約に関するお問い合わせは、お問い合わせページよりご連絡ください。
            </p>
            <div className="mt-4">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gx-cyan/20 hover:bg-gx-cyan/30 text-white font-bold rounded-xl transition-colors"
              >
                お問い合わせページへ
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-xs text-slate-500">
            最終改定：2026年2月6日
          </div>
        </section>
      </div>
    </main>
  );
}
