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
