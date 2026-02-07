"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertTriangle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykdgvpo";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // 現在ページURL（送信時の付加情報として使う）
  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 二重送信防止
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // ✅ ハニーポット（bot対策）
    // hiddenフィールドが埋まっていたら不正扱いで成功扱いにして静かに終了
    const honeypot = (formData.get("website") ?? "").toString().trim();
    if (honeypot) {
      setStatus("success");
      formEl.reset();
      return;
    }

    // ✅ 送信データ（Formspreeで見やすくするため、余計な空白除去）
    const data = Object.fromEntries(formData.entries());

    // ✅ 補助情報（管理側で確認しやすく）
    const payload = {
      ...data,
      _page: pageUrl || "unknown",
      _ua: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      _timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        formEl.reset();
      } else {
        // Formspreeはエラー時にJSONを返すことがある
        let msg = "送信に失敗しました。時間をおいて再度お試しください。";
        try {
          const j = await response.json();
          if (j?.errors?.length) {
            msg = j.errors.map((x: any) => x.message).join(" / ");
          }
        } catch {
          // ignore
        }
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("ネットワークエラーが発生しました。通信状況を確認して再度お試しください。");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-slate-950">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center">
            <div className="p-4 bg-gx-emerald/10 rounded-full border border-gx-emerald/20">
              <CheckCircle2 className="w-12 h-12 text-gx-emerald" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">お問い合わせありがとうございます</h1>
          <p className="text-slate-400">
            お問い合わせを受け付けました。<br />
            3営業日以内に返信いたしますので、今しばらくお待ちください。
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-gx-cyan hover:bg-gx-cyan/90 text-white font-bold rounded-full transition-all shadow-lg shadow-gx-cyan/20"
            >
              トップページに戻る
            </Link>
          </div>

          <div className="text-xs text-slate-500 pt-4">
            ※ 返信が届かない場合は迷惑メールフォルダをご確認ください。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gx-cyan via-white to-gx-emerald mb-4 font-mono tracking-tighter">
            Contact Us
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            商用利用のご相談、特注制作の依頼、その他ご不明な点など、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="mb-8 pb-6 border-b border-white/10">
            <p className="text-sm text-slate-300 flex items-start gap-3 leading-relaxed">
              <span className="shrink-0 text-gx-cyan font-bold font-mono tracking-widest text-[10px] mt-1 bg-gx-cyan/10 px-2 py-0.5 rounded border border-gx-cyan/20">
                [Inquiries]
              </span>
              <span>
                Please feel free to send your inquiries in English or Japanese.
                <br className="hidden md:block" />
                <span className="text-slate-500">（日本語または英語でお気軽にお問い合わせください）</span>
              </span>
            </p>
          </div>

          {/* ✅ エラー表示（alertに依存しない） */}
          {status === "error" && (
            <div className="mb-6 p-4 rounded-2xl border border-red-500/25 bg-red-500/10 text-slate-200 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-300 mt-0.5" />
              <div className="text-sm">
                <div className="font-bold text-white mb-1">送信エラー</div>
                <div className="text-slate-300">{errorMsg}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* ✅ ハニーポット（見えない入力） */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-300 ml-1">
                  お名前
                </label>
                <input
                  id="name"
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600"
                  placeholder="山田 太郎"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-bold text-slate-300 ml-1">
                  貴社名（任意）
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600"
                  placeholder="株式会社GX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-300 ml-1">
                メールアドレス
              </label>
              <input
                id="email"
                required
                name="email"
                type="email"
                autoComplete="email"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600"
                placeholder="name@example.com"
              />
              <p className="text-xs text-slate-500 ml-1">
                ※ 返信先として使用します。誤入力にご注意ください。
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-slate-300 ml-1">
                お問い合わせ内容
              </label>
              <textarea
                id="message"
                required
                name="message"
                rows={6}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600 resize-none"
                placeholder="商用利用ライセンスの詳細について、高解像度データの特注制作のご希望など"
              />
            </div>

            {/* ✅ プライバシー同意（AdSense/審査で印象が良い） */}
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 bg-white/5">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                required
                className="mt-1"
              />
              <label htmlFor="agree" className="text-sm text-slate-300 leading-relaxed">
                <span className="text-white font-bold">プライバシーポリシー</span>に同意の上、送信します。{" "}
                <Link href="/privacy" className="text-gx-cyan hover:text-white underline underline-offset-4">
                  プライバシーポリシーを見る
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 bg-gx-cyan hover:bg-gx-cyan/90 text-white font-bold rounded-xl shadow-lg shadow-gx-cyan/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  内容を確認して送信する
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-xs text-slate-500">
              送信がうまくいかない場合は、時間をおいて再度お試しください。
            </p>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Response Time</p>
            <p className="text-white">3営業日以内に返信</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Support</p>
            <p className="text-white">商用・特注対応可能</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Location</p>
            <p className="text-white font-mono">Kyoto, Japan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
