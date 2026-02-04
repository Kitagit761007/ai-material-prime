"use client";

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
