"use client";

import React from "react";

type Props = {
  title: string;
  url: string;
  className?: string;
};

/**
 * 4ボタン固定：
 * - X
 * - LinkedIn
 * - LINE
 * - 共有（スマホ向け / Web Share API）
 */
export default function ShareButtons({ title, url, className }: Props) {
  const shareUrl = url?.trim() || "";
  const shareTitle = title?.trim() || "";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareTitle);

  const xShare = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const lineShare = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;

  const handleNativeShare = async () => {
    // Web Share API（スマホで有効なことが多い）
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (navigator as any).share({
          title: shareTitle,
          text: shareTitle,
          url: shareUrl,
        });
        return;
      }

      // 使えない場合はURLコピーで代替
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        alert("URLをコピーしました。");
      } else {
        prompt("このURLをコピーしてください。", shareUrl);
      }
    } catch {
      // ユーザーが共有をキャンセルしてもエラー扱いになることがあるので握りつぶし
    }
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition active:scale-[0.98] border border-white/10";
  const wrap = `grid grid-cols-2 md:grid-cols-4 gap-3 ${className ?? ""}`;

  return (
    <div className={wrap}>
      {/* X */}
      <a
        href={xShare}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-black text-white hover:opacity-90`}
        aria-label="Xでシェア"
        title="Xでシェア"
      >
        <span className="text-base leading-none">X</span>
        <span className="text-white/90">Xでシェア</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInShare}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-[#0A66C2] text-white hover:opacity-90`}
        aria-label="LinkedInでシェア"
        title="LinkedInでシェア"
      >
        <span className="text-base leading-none">in</span>
        <span className="text-white/90">LinkedIn</span>
      </a>

      {/* LINE */}
      <a
        href={lineShare}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-[#06C755] text-white hover:opacity-90`}
        aria-label="LINEでシェア"
        title="LINEでシェア"
      >
        <span className="text-base leading-none">LINE</span>
        <span className="text-white/90">LINE</span>
      </a>

      {/* 共有（スマホ向け） */}
      <button
        type="button"
        onClick={handleNativeShare}
        className={`${base} bg-white/10 text-white hover:bg-white/15`}
        aria-label="共有（スマホ向け）"
        title="共有（スマホ向け）"
      >
        <span className="text-base leading-none">⇪</span>
        <span className="text-white/90">共有（スマホ向け）</span>
      </button>
    </div>
  );
import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";

interface ShareButtonsProps {
    title: string;
    url: string;
    imageUrl?: string;
}

export default function ShareButtons({ title, url, imageUrl }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    // Get full URL for sharing
    const fullUrl = typeof window !== "undefined"
        ? `${window.location.origin}${url}`
        : url;

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const shareToTwitter = () => {
        const text = encodeURIComponent(title);
        const shareUrl = encodeURIComponent(fullUrl);
        window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
            "_blank",
            "width=550,height=420"
        );
    };

    const shareToFacebook = () => {
        const shareUrl = encodeURIComponent(fullUrl);
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            "_blank",
            "width=550,height=420"
        );
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Share2 className="w-4 h-4" />
                <span>シェア:</span>
            </div>

            <div className="flex items-center gap-2">
                {/* Twitter/X */}
                <button
                    onClick={shareToTwitter}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    aria-label="Xでシェア"
                    title="Xでシェア"
                >
                    <FaXTwitter className="w-5 h-5" />
                </button>

                {/* Facebook */}
                <button
                    onClick={shareToFacebook}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    aria-label="Facebookでシェア"
                    title="Facebookでシェア"
                >
                    <FaFacebook className="w-5 h-5" />
                </button>

                {/* Copy URL */}
                <button
                    onClick={handleCopyUrl}
                    className={`p-2 rounded-lg transition-all ${copied
                            ? "bg-green-500 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-white"
                        }`}
                    aria-label="URLをコピー"
                    title="URLをコピー"
                >
                    {copied ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <Copy className="w-5 h-5" />
                    )}
                </button>
            </div>

            {copied && (
                <span className="text-sm text-green-400 animate-fade-in">
                    コピーしました！
                </span>
            )}
        </div>
    );
}
