"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = {
  siteName?: string;
  href?: string; // トップへのリンク（必要なら差し替え可能）
};

export default function CreditCopyBox({
  siteName = "GX Prime Visuals",
  href = "/",
}: Props) {
  const creditText = useMemo(() => `画像提供：${siteName}`, [siteName]);

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    setError(null);

    try {
      // 近年ブラウザはこれでOK
      await navigator.clipboard.writeText(creditText);
      setCopied(true);
      return;
    } catch {
      // フォールバック（古い環境向け）
      try {
        const ta = document.createElement("textarea");
        ta.value = creditText;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);

        if (!ok) throw new Error("copy_failed");
        setCopied(true);
      } catch {
        setError("コピーできませんでした。テキストを選択してコピーしてください。");
      }
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-slate-200">{`画像提供：`}</span>
          <Link href={href} className="text-cyan-400 hover:underline">
            {siteName}
          </Link>
        </div>

        <button
          type="button"
          onClick={copy}
          className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-md
                     bg-slate-700 hover:bg-slate-600 border border-white/10
                     text-slate-100 transition-colors"
          aria-label="クレジット表記をコピー"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              コピーしました
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              コピー
            </>
          )}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
