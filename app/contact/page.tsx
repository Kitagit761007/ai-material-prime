"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertTriangle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykdgvpo";

/**
 * 戦略意図：
 * - 法人受注に必要な情報を最小追加で回収（用途/媒体/納期/予算/決裁/利用範囲）
 * - 問い合わせの種類を明確化（11枚パック/特注/相談）
 * - Formspreeのメール通知が止まりにくい「FormData送信」を採用
 * - 受信側で見やすい：_subject / _replyto / message先頭に要点ブロック
 */
export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // フォーム入力（controlledにしすぎず、必要な箇所だけ state 管理）
  const [inquiryType, setInquiryType] = useState<
    "business_pack" | "custom" | "consult" | "license" | "other"
  >("consult");

  const [budgetRange, setBudgetRange] = useState<
    "under_50k" | "50k_100k" | "100k_300k" | "300k_plus" | "unknown"
  >("unknown");

  const [deadline, setDeadline] = useState<
    "asap" | "within_1w" | "within_2w" | "within_1m" | "flexible" | "unknown"
  >("unknown");

  const [useCases, setUseCases] = useState<Record<string, boolean>>({
    proposal: false,
    website: false,
    sns: false,
    ads: false,
    video: false,
    print: false,
    other: false,
  });

  const [paymentPref, setPaymentPref] = useState<
    "card" | "bank" | "invoice" | "undecided"
  >("undecided");

  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const selectedUseCasesLabel = useMemo(() => {
    const map: Record<string, string> = {
      proposal: "提案書/スライド",
      website: "Web/LP",
      sns: "SNS",
      ads: "広告",
      video: "動画",
      print: "印刷物",
      other: "その他",
    };
    const keys = Object.keys(useCases).filter((k) => useCases[k]);
    if (!keys.length) return "未選択";
    return keys.map((k) => map[k] ?? k).join(", ");
  }, [useCases]);

  const inquiryTypeLabel = useMemo(() => {
    switch (inquiryType) {
      case "business_pack":
        return "法人向け：11枚パック";
      case "custom":
        return "法人向け：特注生成（カスタム制作）";
      case "consult":
        return "法人向け：相談して決めたい";
      case "license":
        return "ライセンス/利用規約の確認";
      default:
        return "その他";
    }
  }, [inquiryType]);

  const budgetLabel = useMemo(() => {
    switch (budgetRange) {
      case "under_50k":
        return "〜5万円";
      case "50k_100k":
        return "5万〜10万円";
      case "100k_300k":
        return "10万〜30万円";
      case "300k_plus":
        return "30万円〜";
      default:
        return "未定/相談";
    }
  }, [budgetRange]);

  const deadlineLabel = useMemo(() => {
    switch (deadline) {
      case "asap":
        return "至急";
      case "within_1w":
        return "1週間以内";
      case "within_2w":
        return "2週間以内";
      case "within_1m":
        return "1ヶ月以内";
      case "flexible":
        return "柔軟（相談）";
      default:
        return "未定/相談";
    }
  }, [deadline]);

  const paymentLabel = useMemo(() => {
    switch (paymentPref) {
      case "card":
        return "カード";
      case "bank":
        return "銀行振込";
      case "invoice":
        return "請求書（要相談）";
      default:
        return "未定/相談";
    }
  }, [paymentPref]);

  const handleToggleUseCase = (key: string) => {
    setUseCases((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetStates = () => {
    setInquiryType("consult");
    setBudgetRange("unknown");
    setDeadline("unknown");
    setUseCases({
      proposal: false,
      website: false,
      sns: false,
      ads: false,
      video: false,
      print: false,
      other: false,
    });
    setPaymentPref("undecided");
    setAgreeTerms(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    // 必須同意（Terms + Privacy）
    if (!agreeTerms) {
      setStatus("error");
      setErrorMsg("利用規約とプライバシーポリシーへの同意が必要です。");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // ✅ Formspree推奨ハニーポット（ここが埋まってたらbot）
    const gotcha = String(formData.get("_gotcha") ?? "").trim();
    if (gotcha) {
      setStatus("success");
      formEl.reset();
      resetStates();
      return;
    }

    // ✅ 受信側で見やすい件名（Formspreeは _subject を使用）
    const subject = `[GX Prime Visuals] ${inquiryTypeLabel} / ${budgetLabel} / ${deadlineLabel} / ${selectedUseCasesLabel}`;
    formData.set("_subject", subject);

    // ✅ Reply-To（返信を押すと相手に返るように）
    const email = String(formData.get("email") ?? "").trim();
    if (email) formData.set("_replyto", email);

    // ✅ “要点ブロック” を本文先頭に差し込む（メールで最重要）
    const summary = [
      `【種別】${inquiryTypeLabel}`,
      `【用途】${selectedUseCasesLabel}`,
      `【納期】${deadlineLabel}`,
      `【予算】${budgetLabel}`,
      `【支払い】${paymentLabel}`,
    ].join("\n");

    const originalMessage = String(formData.get("message") ?? "");
    formData.set("message", `${summary}\n\n${originalMessage}`);

    // ✅ Formspreeの一覧（Submissions）で見やすくするための項目
    formData.set("inquiry_type", inquiryType);
    formData.set("inquiry_type_label", inquiryTypeLabel);
    formData.set("use_cases", selectedUseCasesLabel);
    formData.set("budget_range", budgetRange);
    formData.set("budget_label", budgetLabel);
    formData.set("desired_deadline", deadline);
    formData.set("deadline_label", deadlineLabel);
    formData.set("payment_preference", paymentPref);
    formData.set("payment_label", paymentLabel);

    // ✅ 付加情報
    formData.set("_page", pageUrl || "unknown");
    formData.set("_ua", typeof navigator !== "undefined" ? navigator.userAgent : "unknown");
    formData.set("_timestamp", new Date().toISOString());

    try {
      // ✅ JSONではなく FormData で送る（メール通知が安定しやすい）
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Content-Type は付けない（ブラウザが multipart/form-data を自動で付与）
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        formEl.reset();
        resetStates();
      } else {
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
            原則として<strong className="text-white">3営業日以内</strong>に返信いたします。
          </p>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/business/"
              className="inline-flex items-center justify-center px-8 py-3 bg-gx-cyan/20 hover:bg-gx-cyan/30 text-white font-bold rounded-full transition-all border border-gx-cyan/25"
            >
              法人向けページへ戻る
            </Link>

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
            Contact
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            法人向け（11枚パック／特注生成）・ライセンス確認・その他のご相談を受け付けています。
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="mb-8 pb-6 border-b border-white/10">
            <p className="text-sm text-slate-300 flex items-start gap-3 leading-relaxed">
              <span className="shrink-0 text-gx-cyan font-bold font-mono tracking-widest text-[10px] mt-1 bg-gx-cyan/10 px-2 py-0.5 rounded border border-gx-cyan/20">
                [B2B Ready]
              </span>
              <span>
                日本語・英語どちらでもOKです。
                <br className="hidden md:block" />
                <span className="text-slate-500">
                  （用途・媒体・納期が分かる範囲で十分です。見積・提案時に条件を個別合意します）
                </span>
              </span>
            </p>
          </div>

          {status === "error" && (
            <div className="mb-6 p-4 rounded-2xl border border-red-500/25 bg-red-500/10 text-slate-200 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-300 mt-0.5" />
              <div className="text-sm">
                <div className="font-bold text-white mb-1">送信エラー</div>
                <div className="text-slate-300">{errorMsg}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* ✅ Formspree推奨 honeypot */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* 0) 問い合わせ種別 */}
            <div className="space-y-3">
              <div className="flex items-end justify-between gap-4">
                <label className="text-sm font-bold text-slate-300 ml-1">
                  ご用件（最優先）
                </label>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: "business_pack", title: "11枚パック（法人向け）", desc: "用途別に構成・選定して提供" },
                  { key: "custom", title: "特注生成（カスタム制作）", desc: "要件に合わせて制作" },
                  { key: "consult", title: "相談して決めたい", desc: "最適な提案が欲しい" },
                  { key: "license", title: "ライセンス/規約の確認", desc: "利用可否・条件の確認" },
                  { key: "other", title: "その他", desc: "上記以外の内容" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setInquiryType(opt.key as any)}
                    className={[
                      "text-left rounded-2xl border p-4 transition-all",
                      inquiryType === (opt.key as any)
                        ? "border-gx-cyan/40 bg-gx-cyan/10"
                        : "border-white/10 bg-black/30 hover:bg-white/5",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-white font-bold">{opt.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                      </div>
                      <div
                        className={[
                          "h-4 w-4 rounded-full border",
                          inquiryType === (opt.key as any)
                            ? "border-gx-cyan bg-gx-cyan"
                            : "border-white/20",
                        ].join(" ")}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* hidden: state値も送る（FormDataに入る） */}
              <input type="hidden" name="inquiry_type" value={inquiryType} />
            </div>

            {/* 1) 基本情報 */}
            <div className="space-y-6">
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
            </div>

            {/* 2) 要件（任意） */}
            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-white font-bold">要件（任意だが、あるほど早い）</div>
                  <div className="text-xs text-slate-500 mt-1">
                    「相談して決めたい」でもOK。分かる範囲で選択してください。
                  </div>
                </div>
                <Link
                  href="/business/"
                  className="text-[10px] font-mono uppercase tracking-widest text-gx-cyan hover:text-white underline underline-offset-4"
                >
                  Business
                </Link>
              </div>

              {/* 用途 */}
              <div className="space-y-2">
                <div className="text-sm font-bold text-slate-300 ml-1">用途（複数可）</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "proposal", label: "提案書/スライド" },
                    { key: "website", label: "Web/LP" },
                    { key: "sns", label: "SNS" },
                    { key: "ads", label: "広告" },
                    { key: "video", label: "動画" },
                    { key: "print", label: "印刷物" },
                    { key: "other", label: "その他" },
                  ].map((x) => (
                    <label
                      key={x.key}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={useCases[x.key]}
                        onChange={() => handleToggleUseCase(x.key)}
                      />
                      {x.label}
                    </label>
                  ))}
                </div>
                <input type="hidden" name="use_cases" value={selectedUseCasesLabel} />
              </div>

              {/* 納期 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">希望納期</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "asap", label: "至急" },
                    { key: "within_1w", label: "1週間以内" },
                    { key: "within_2w", label: "2週間以内" },
                    { key: "within_1m", label: "1ヶ月以内" },
                    { key: "flexible", label: "柔軟（相談）" },
                    { key: "unknown", label: "未定" },
                  ].map((x) => (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => setDeadline(x.key as any)}
                      className={[
                        "rounded-xl border px-3 py-2 text-sm text-left transition-colors",
                        deadline === (x.key as any)
                          ? "border-gx-cyan/40 bg-gx-cyan/10 text-white"
                          : "border-white/10 bg-black/30 text-slate-300 hover:bg-white/5",
                      ].join(" ")}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="desired_deadline" value={deadline} />
              </div>

              {/* 予算 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">予算レンジ（任意）</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "under_50k", label: "〜5万円" },
                    { key: "50k_100k", label: "5万〜10万円" },
                    { key: "100k_300k", label: "10万〜30万円" },
                    { key: "300k_plus", label: "30万円〜" },
                    { key: "unknown", label: "未定/相談" },
                  ].map((x) => (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => setBudgetRange(x.key as any)}
                      className={[
                        "rounded-xl border px-3 py-2 text-sm text-left transition-colors",
                        budgetRange === (x.key as any)
                          ? "border-gx-emerald/40 bg-gx-emerald/10 text-white"
                          : "border-white/10 bg-black/30 text-slate-300 hover:bg-white/5",
                      ].join(" ")}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="budget_range" value={budgetRange} />
              </div>

              {/* 支払い希望 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">
                  支払い希望（任意・将来の決済導入の参考）
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: "card", label: "カード" },
                    { key: "bank", label: "銀行振込" },
                    { key: "invoice", label: "請求書（要相談）" },
                    { key: "undecided", label: "未定/相談" },
                  ].map((x) => (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => setPaymentPref(x.key as any)}
                      className={[
                        "rounded-xl border px-3 py-2 text-sm text-left transition-colors",
                        paymentPref === (x.key as any)
                          ? "border-white/25 bg-white/10 text-white"
                          : "border-white/10 bg-black/30 text-slate-300 hover:bg-white/5",
                      ].join(" ")}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="payment_preference" value={paymentPref} />
              </div>

              {/* 参照URL */}
              <div className="space-y-2">
                <label htmlFor="reference" className="text-sm font-bold text-slate-300 ml-1">
                  参考URL（任意）
                </label>
                <input
                  id="reference"
                  name="reference"
                  type="url"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600"
                  placeholder="例：https://example.com（資料/LP/競合/参考イメージ等）"
                />
              </div>
            </div>

            {/* 3) 本文 */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-slate-300 ml-1">
                お問い合わせ内容
              </label>
              <textarea
                id="message"
                required
                name="message"
                rows={7}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gx-cyan/50 transition-all placeholder:text-slate-600 resize-none"
                placeholder={
                  inquiryType === "business_pack"
                    ? "例：11枚パック希望。用途は提案書＋Web。テーマはGX未来都市。納期は2週間以内。"
                    : inquiryType === "custom"
                      ? "例：特注希望。サービスの訴求軸（例：再エネ×都市OS）に合わせて世界観を作りたい。"
                      : "例：用途・媒体・納期が分かる範囲でご記入ください。"
                }
              />
              <p className="text-xs text-slate-500 ml-1">
                ※ 機密情報は送らず、概要レベルでOKです（詳細は後ほど確認します）。
              </p>
            </div>

            {/* 4) 同意 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 bg-white/5">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                  className="mt-1"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label htmlFor="agree" className="text-sm text-slate-300 leading-relaxed">
                  <span className="text-white font-bold">利用規約</span> と{" "}
                  <span className="text-white font-bold">プライバシーポリシー</span>
                  に同意の上、送信します。{" "}
                  <span className="block mt-2 text-xs text-slate-400">
                    <Link
                      href="/terms/"
                      className="text-gx-cyan hover:text-white underline underline-offset-4 mr-3"
                    >
                      利用規約
                    </Link>
                    <Link
                      href="/privacy/"
                      className="text-gx-cyan hover:text-white underline underline-offset-4"
                    >
                      プライバシーポリシー
                    </Link>
                  </span>
                </label>
              </div>
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
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Response Time
            </p>
            <p className="text-white">原則 3営業日以内に返信</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Business
            </p>
            <p className="text-white">11枚パック / 特注生成</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Location
            </p>
            <p className="text-white font-mono">Japan</p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-600">
          参考：{" "}
          <Link
            href="/business/"
            className="text-gx-cyan hover:text-white underline underline-offset-4"
          >
            法人向けページ
          </Link>{" "}
          /{" "}
          <Link
            href="/terms/"
            className="text-gx-cyan hover:text-white underline underline-offset-4"
          >
            利用規約
          </Link>
        </div>
      </div>
    </div>
  );
}
