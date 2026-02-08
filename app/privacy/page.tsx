import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "GX Prime Visuals（AI Material Prime）のプライバシーポリシーです。お問い合わせ対応のための情報取得、Cookie等の利用、広告配信（Google AdSense等）について説明します。",
  alternates: {
    canonical: "/privacy/",
  },
  openGraph: {
    title: "プライバシーポリシー | GX Prime Visuals",
    description:
      "GX Prime Visuals（AI Material Prime）のプライバシーポリシーです。お問い合わせ対応のための情報取得、Cookie等の利用、広告配信（Google AdSense等）について説明します。",
    url: "https://ai-material-prime.com/privacy/",
    siteName: "GX Prime Visuals",
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "プライバシーポリシー | GX Prime Visuals",
    description:
      "GX Prime Visuals（AI Material Prime）のプライバシーポリシー。情報取得、Cookie、広告配信（Google AdSense等）について。",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 py-20 px-6">
      <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Back */}
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

        {/* Key points */}
        <div className="mb-10 p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
          <p className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-3">
            Key Points
          </p>
          <div className="grid gap-3 text-sm text-slate-300">
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>
                当サイトは、
                <Link
                  href="/contact/"
                  className="text-white underline decoration-white/20 hover:decoration-white/60 mx-1"
                >
                  お問い合わせ
                </Link>
                対応のために送信情報（氏名・メール・本文等）を取得します。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>アクセス解析や広告配信にCookie等を利用する場合があります。</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gx-cyan">✓</span>
              <span>取得した情報は目的の範囲でのみ利用し、適切に管理します。</span>
            </div>
          </div>
        </div>

        <section className="space-y-10 text-sm md:text-base leading-relaxed">
          {/* IMPORTANT: License belongs to Terms */}
          <div className="p-6 bg-gx-cyan/5 border border-gx-cyan/20 rounded-2xl">
            <p className="text-sm text-slate-300 leading-relaxed">
              <span className="text-gx-cyan font-bold">【素材の利用条件について】</span>
              <br />
              当サイトで配布している画像素材の利用条件（商用利用の可否、クレジット表記の要否、再配布・転売の禁止、AI学習への利用禁止等）は、
              プライバシーポリシーではなく
              <Link
                href="/terms/"
                className="text-white underline decoration-white/20 hover:decoration-white/60 ml-1"
              >
                利用規約
              </Link>
              に定めています。詳細は利用規約をご確認ください。
              <br />
              <span className="text-slate-500">
                [About Asset License] The license terms for the assets are defined in the Terms of Service. Please refer to the Terms for details.
              </span>
            </p>
          </div>

          {/* 1 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              1. 取得する情報
            </h2>
            <p className="text-slate-400 mb-3 border-l-2 border-white/10 pl-4">
              当サイトでは、以下の情報を取得する場合があります。
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-white/10 pl-4">
              <li>
                お問い合わせフォーム送信時：お名前、メールアドレス、会社名（任意）、お問い合わせ内容
              </li>
              <li>
                アクセス情報：閲覧ページ、参照元、IPアドレス、ユーザーエージェント、Cookie等（取得される場合）
              </li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              2. 利用目的
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-white/10 pl-4">
              <li>お問い合わせへの回答、連絡、必要な対応のため</li>
              <li>サイト品質の改善、利用状況の把握のため</li>
              <li>不正利用・スパム等の防止、セキュリティ確保のため</li>
              <li>広告配信・効果測定のため（広告を掲載する場合）</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              3. Cookie等の利用について
            </h2>
            <p className="text-slate-400 border-l-2 border-white/10 pl-4">
              当サイトでは、利便性向上やアクセス解析、広告配信のためにCookie等の技術を利用する場合があります。
              Cookieにより個人を特定する情報（氏名・住所等）が当サイト運営者に自動的に提供されることはありません。
              ブラウザの設定によりCookieを無効にすることも可能ですが、一部機能が利用できなくなる場合があります。
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              4. 広告配信（Google AdSense等）について
            </h2>
            <p className="text-slate-400 border-l-2 border-white/10 pl-4">
              当サイトは、第三者配信の広告サービス（例：Google AdSense）を利用する場合があります。
              これらの広告配信事業者は、ユーザーの興味に応じた広告（パーソナライズ広告）を表示するためにCookie等を使用することがあります。
            </p>

            <div className="mt-4 p-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
              <p className="text-sm text-slate-400 leading-relaxed">
                パーソナライズ広告は、広告設定で無効にできる場合があります。Googleの広告およびCookieの取り扱いについては、
                Googleが提供する案内をご確認ください（外部ページ）。
              </p>
            </div>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              5. 第三者提供について
            </h2>
            <p className="text-slate-400 border-l-2 border-white/10 pl-4">
              当サイトは、法令に基づく場合を除き、取得した個人情報を本人の同意なく第三者に提供しません。
              ただし、お問い合わせ対応のために外部サービス（フォーム送信・メール配信等）を利用する場合があります。
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              6. 安全管理
            </h2>
            <p className="text-slate-400 border-l-2 border-white/10 pl-4">
              取得した情報は、不正アクセス・漏えい・改ざん等が起きないよう、合理的な範囲で安全管理に努めます。
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              7. お問い合わせ窓口
            </h2>
            <p className="text-slate-400 border-l-2 border-white/10 pl-4">
              本ポリシーに関するお問い合わせは
              <Link
                href="/contact/"
                className="text-white underline decoration-white/20 hover:decoration-white/60 ml-1"
              >
                お問い合わせフォーム
              </Link>
              よりお願いいたします。
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gx-cyan rounded-full"></span>
              8. 改定
            </h2>
            <p className="text-slate-400 border-l-2 border-white/10 pl-4">
              本ポリシーは、法令変更や運営方針の見直し等により、予告なく改定される場合があります。
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
