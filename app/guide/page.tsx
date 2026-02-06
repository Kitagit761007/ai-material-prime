import CreditCopyBox from "@/components/CreditCopyBox";
import Header from "@/components/Header";
import Link from "next/link";
import { BookOpen, Download, Shield, AlertCircle, Scale, ExternalLink } from "lucide-react";

export const metadata = {
  title: "利用ガイド | GX Prime Visuals",
  description: "画像の使い方、商用利用、クレジット表記、禁止事項について説明します。",
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">
            Guide
          </p>
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            利用ガイド
          </h1>
          <div className="h-1 w-20 bg-cyan-500 mb-6" />
          <p className="text-slate-400 text-lg">
            GX Prime Visualsの画像素材を安心してご利用いただくためのガイドです。
          </p>

          {/* 要点まとめ */}
          <section className="mt-8 bg-slate-900 rounded-2xl p-8 border border-white/10">
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase italic mb-2">
              Summary
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
              <p className="text-red-400 font-bold">
                ✕ AI学習目的での大規模収集・データセット化：禁止
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mt-2">
                ※自動取得（スクレイピング）などによる大量ダウンロード・再配布目的の収集も禁止です。
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-12">
          {/* ダウンロード方法 */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Download className="w-6 h-6 text-cyan-500" />
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
                ※ ダウンロードにはアカウント登録は不要です。すべて無料でご利用いただけます。
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

          {/* 権利・免責（AdSense的に強い） */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <Scale className="w-6 h-6 text-slate-200" />
              </div>
              <h2 className="text-2xl font-black text-white">AI生成画像と権利について</h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                当サイトの画像はAIにより生成されたもので、実在の人物・場所・企業・製品を意図的に描写するものではありません。
                ただし、偶然の一致により、ロゴ・商標・デザイン等が第三者の権利に抵触する可能性があります。
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                ご利用前に、ロゴ・商標・人物の特定につながる要素が含まれていないか、利用者の責任で最終確認をお願いします。
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                権利者からの申し立て（削除依頼等）があった場合は、速やかに調査・対応します。
                お手数ですが <a className="text-cyan-400 hover:text-cyan-300 underline" href="/contact">お問い合わせ</a> よりご連絡ください。
              </p>
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
                <li>画像素材そのものを再配布・販売すること（素材集/ストック用途を含む）</li>
                <li>素材サイトやストックフォトサービスで配布・販売すること</li>
                <li>公序良俗に反する用途での使用</li>
                <li>第三者の権利を侵害する使用（商標・ロゴ・人物など）</li>
                <li>AIモデルの学習目的での大規模収集・データセット化</li>
                <li>自動取得（スクレイピング）等による大量ダウンロード</li>
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
                  A. いいえ、制限はありません。ただし自動取得や再配布目的の大量収集は禁止です。
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

          {/* Policy links（AdSense的に強い導線） */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-black text-white mb-4">関連ポリシー</h2>
            <p className="text-slate-400 text-sm mb-4">
              本ガイドは概要です。詳細な条件・免責は以下をご確認ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-xl transition-colors"
              >
                利用規約 <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-xl transition-colors"
              >
                プライバシーポリシー <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors"
          >
            その他のご質問はこちら
          </Link>
        </div>
      </main>
    </div>
  );
}
