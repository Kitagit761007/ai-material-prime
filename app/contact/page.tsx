"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formspree.io/f/xpwzzpqp", { // Placeholder for hakuto1024@gmail.com
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("success");
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            console.error(error);
            alert("送信に失敗しました。時間をおいて再度お試しください。");
            setStatus("idle");
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
                        お問い合わせを受け付けました。3営業日以内に返信いたしますので、今しばらくお待ちください。
                    </p>
                    <Link href="/">
                        <button
                            className="px-8 py-3 bg-gx-cyan hover:bg-gx-cyan/90 text-white font-bold rounded-full transition-all shadow-lg shadow-gx-cyan/20"
                        >
                            トップページに戻る
                        </button>
                    </Link>
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300 ml-1">お名前</label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600"
                                    placeholder="山田 太郎"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300 ml-1">貴社名（任意）</label>
                                <input
                                    name="company"
                                    type="text"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600"
                                    placeholder="株式会社GX"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 ml-1">メールアドレス</label>
                            <input
                                required
                                name="email"
                                type="email"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 ml-1">お問い合わせ内容</label>
                            <textarea
                                required
                                name="message"
                                rows={6}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600 resize-none"
                                placeholder="商用利用ライセンスの詳細について、高解像度データの特注制作のご希望など"
                            />
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
