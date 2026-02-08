import type { Metadata } from "next";
import Link from "next/link";
import CreditCopyBox from "@/components/CreditCopyBox";
import { BookOpen, Download, Shield, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "利用ガイド",
  description:
    "GX Prime Visuals（AI Material Prime）の画像素材の使い方、商用利用、クレジット表記、禁止事項（再配布・転売・AI学習用途）について詳しく説明します。",
  alternates: {
    canonical: "/guide/",
  },
  openGraph: {
    title: "利用ガイド | GX Prime Visuals",
    description:
      "GX Prime Visuals（AI Material Prime）の画像素材の使い方、商用利用、クレジット表記、禁止事項（再配布・転売・AI学習用途）について詳しく説明します。",
    url: "https://ai-material-prime.com/guide/",
    siteName: "GX Prime Visuals",
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "利用ガイド | GX Prime Visuals",
    description:
      "GX Prime Visuals（AI Material Prime）の画像素材の使い方、商用利用、クレジット表記、禁止事項（再配布・転売・AI学習用途）について。",
  },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gx-cyan hover:text-white transition-colors mb-10 group font-bold"
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

        {/* Hero */}
        <div className="mb-12">
          <p className="text-gx-cyan font-bold text-xs mb-2 tracking-widest uppercase italic">
            Guide
          </p>
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            利用ガイド
          </h1>
          <div className="h-1 w-20 bg-gx-cyan mb-6" />
          <p className="text-slate-400 text-lg">
            GX Prime Visualsの画像素材を安心してご利用いただくためのガイドです。
          </p>
        </div>

        {/* 要点まとめ */}
        <section className="bg-slate-900 rounded-2xl p-8 border border-white/10 mb-12">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase italic mb-2">
            Key Points
          </p>
          <h2 className="text-2xl font-black text-white mb-4">
            このサイトの画像素材について（要点）
          </h2>

          <div className="grid gap-3 text-slate-300">
            <p className="text-green-400 font-bold">✓ 商用利用：可能</p>
            <p className="text-green-400 font-bold">✓ 加工・編集：可能</p>
            <p className="text-blue-400 font-bold">✓ クレジット表記：不要（任意）</p>

            <div className="h-px bg-white/10 my-2" />

            <p className="text-red-400 font-bold">✕ 再配布・再販売：禁止</p>
            <p className="text-red-400 font-bold">✕ 自作発言：禁止（作者を偽る行為）</p>
            <p className="text-red-400 font-bold">✕ AI学習用途：禁止</p>
          </div>

          <div className="mt-5 text-xs text-slate-400">
            詳細なルールは{" "}
            <Link href="/terms/" className="text-white underline decoration-white/20 hover:decoration-white/60">
              利用規約
            </Link>{" "}
            をご確認ください。
          </div>
        </section>

        <div className="space-y-12">
          {/* ダウンロード方法 */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gx-cyan/10 rounded-lg">
                <Download className="w-6 h-6 text-gx-cyan" />
              </div>
              <h2 className="text-2xl font-black text-white">画像のダウンロード方法</h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                1. <strong className="text-white">画像を選ぶ</strong>：ギャラリーやカテゴリーから気に入った画像を探します
              </p>
              <p>
                2. <strong className="text-white">詳細ページへ</strong>：画像をクリックして詳細ページを開きます
              </p>
              <p>
                3. <strong className="text-white">ダウンロード</strong>：「無料ダウンロード」ボタンをクリックして保存します
              </p>
              <p className="text-sm text-slate-400 mt-4">
                ※ ダウンロードにアカウント登録は不要です。すべて無料でご利用いただけます。
              </p>
            </div>
          </section>

          {/* 商用利用について */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-white">商用利用について</h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p className="text-lg font-bold text-green-400">✓ 商用利用可能です</p>
              <p>
                当サイトの画像素材は、個人・法人を問わず、商用プロジェクトでご利用いただけます。
              </p>

              <div className="bg-slate-800 p-4 rounded-lg mt-4">
                <p className="font-bold text-white mb-2">利用可能な用途例：</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Webサイト・ブログの挿絵</li>
                  <li>広告・プロモーション素材</li>
                  <li>プレゼンテーション資料</li>
                  <li>SNS投稿</li>
                  <li>印刷物（パンフレット、ポスターなど）</li>
                  <li>動画コンテンツの素材</li>
                </ul>
              </div>
            </div>
          </section>

          {/* クレジット表記 */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-black text-white">クレジット表記について</h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p className="text-lg font-bold text-blue-400">クレジット表記は不要です</p>
              <p>
                当サイトの画像をご利用いただく際、クレジット表記（出典元の記載）は必須ではありません。
              </p>
              <p className="text-sm">
                ただし、表記いただける場合は以下のように記載していただけると幸いです：
              </p>
              <CreditCopyBox />
            </div>
          </section>

          {/* 補足（重要） */}
          <section
            aria-labelledby="license-notes"
            className="bg-slate-900 rounded-2xl p-8 border border-white/10"
          >
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase italic mb-2">
              Notes
            </p>
            <h2 id="license-notes" className="text-2xl font-black text-white mb-4">
              補足（重要）
            </h2>

            <div className="space-y-8 text-slate-300">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  再配布・再販売の具体例
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>✅ 許可：Webサイト/ブログ/動画/広告/資料/印刷物など「制作物の一部」として使用</li>
                  <li>✅ 許可：案件制作でクライアント成果物に組み込む（画像が埋め込まれた状態）</li>
                  <li>❌ 禁止：画像ファイルを素材として配布できる形で提供（素材集、テンプレ同梱、ZIP配布、ストック投稿、再アップロード等）</li>
                  <li>❌ 禁止：当サイト画像のURLをまとめて共有し、第三者が直接ダウンロードできる形で提供</li>
                </ul>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  AI学習用途の禁止範囲
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>❌ 禁止：モデル学習/追加学習（LoRA等）</li>
                  <li>❌ 禁止：データセット化（学習用フォルダへの保存目的の収集を含む）</li>
                  <li>❌ 禁止：スクレイピング等による自動収集</li>
                </ul>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <h3 className="text-lg font-bold text-white mb-2">免責</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>当サイトは、素材の正確性・完全性・特定目的適合性・権利非侵害を保証しません。</li>
                  <li>利用により生じたいかなる損害についても、法令で許される範囲で責任を負いません。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 禁止事項 */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-red-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-white">禁止事項</h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>以下の行為は禁止されています：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>画像素材そのものを再配布・販売すること</li>
                <li>画像を素材サイトやストックフォトサービスで配布すること</li>
                <li>公序良俗に反する用途での使用</li>
                <li>第三者の権利を侵害する使用</li>
                <li>AIモデルの学習データとして使用すること</li>
              </ul>
            </div>
          </section>

          {/* よくある質問 */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-black text-white mb-6">よくある質問</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-white mb-2">Q. 加工して使用してもいいですか？</h3>
                <p className="text-slate-300">
                  A. はい、トリミング、色調補正、テキスト追加など、自由に加工してご利用いただけます。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Q. ダウンロード数に制限はありますか？</h3>
                <p className="text-slate-300">
                  A. いいえ、制限はありません。必要な画像を自由にダウンロードしてください。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Q. 商用利用に事前申請は必要ですか？</h3>
                <p className="text-slate-300">
                  A. いいえ、事前申請や連絡は不要です。自由にご利用ください。
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gx-cyan hover:bg-gx-cyan/90 text-white font-bold rounded-xl transition-colors"
          >
            その他のご質問はこちら
          </Link>
        </div>

        <div className="pt-10 mt-12 border-t border-white/10 text-xs text-slate-500">
          最終更新：2026年2月8日
        </div>
      </div>
    </main>
  );
}
