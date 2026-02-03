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
}
