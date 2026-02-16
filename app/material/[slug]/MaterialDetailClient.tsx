"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import {
    ChevronLeft,
    Download,
    Tag as TagIcon,
    Grid,
    Copy,
    Linkedin,
} from "lucide-react";
import { generateDescription } from "@/lib/description";
import FavoriteButton from "@/components/FavoriteButton";

/**
 * 説明文の「連続重複（同じ行が続く）」を除去して正規化する（表示側だけで吸収）
 * - 改行を揃える
 * - 空行・空白を整理
 * - 直前と同じ行は1回に畳む
 */
const normalizeDescription = (text: string) => {
    const lines = (text || "")
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

    const out: string[] = [];
    for (const line of lines) {
        if (out.length === 0 || out[out.length - 1] !== line) out.push(line);
    }
    return out.join("\n");
};

interface Asset {
    id: string;
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
    width?: number;
    height?: number;
    size?: string; // "228 kB" など
    aspectRatio?: string; // "2:3" など
    url?: string; // "/assets/images/..." など（あれば）
}

export default function MaterialDetailClient({ slug }: { slug: string }) {
    const [asset, setAsset] = useState<Asset | null>(null);
    const [loading, setLoading] = useState(true);

    const [pageUrl, setPageUrl] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const [descOpen, setDescOpen] = useState(false);
    const searchParams = useSearchParams();

    const backHref = useMemo(() => {
        const v = searchParams.get("from");
        if (!v || !v.startsWith("/")) return "/";
        return v;
    }, [searchParams]);

    // 画像URL生成（assets.json の url があれば最優先）
    const getImageUrl = (item: Asset) => {
        // ✅ assets.json に url が入っている素材は、それを最優先で使う
        if (item?.url && typeof item.url === "string") {
            return item.url.startsWith("/") ? item.url : `/${item.url}`;
        }

        // ✅ url が無い（または空）場合だけ、従来ルールで生成
        const f = item.id.startsWith("mid-")
            ? "mid"
            : item.id.startsWith("niji-")
                ? "niji"
                : item.id.startsWith("gpt-")
                    ? "GPT"
                    : item.id.startsWith("nano-")
                        ? "nano"
                        : "grok";

        return `/assets/images/${f}/${item.id}${f === "GPT" ? ".png" : ".jpg"}`;
    };

    // ページURL（共有/コピー用）
    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageUrl(window.location.href);
        }
    }, []);

    // データ取得（404遷移はしない＝落ちない）
    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetch("/data/assets.json")
            .then((res) => res.json())
            .then((data: Asset[]) => {
                if (cancelled) return;
                const found = data.find((item) => item.id === slug);
                setAsset(found ?? null);
                setLoading(false);
            })
            .catch(() => {
                if (cancelled) return;
                setAsset(null);
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    const imageUrl = useMemo(() => {
        if (!asset) return "";
        const u = String(asset.url || "").trim();
        // assets.json に url がある場合はそれを優先（例外対応）
        if (u) return u.startsWith("/") ? u : `/${u}`;
        // url が無ければ従来ロジック
        return getImageUrl(asset);
    }, [asset]);

    // tags を必ず配列にする（TypeScript/実行時ともに安全）
    const tags = useMemo(() => {
        if (!asset) return [];
        return Array.isArray(asset.tags) ? asset.tags : [];
    }, [asset]);

    const fileExt = useMemo(() => {
        if (!asset) return "";
        const u = asset.url || imageUrl;
        const m = u.match(/\.([a-zA-Z0-9]+)$/);
        return m ? m[1].toLowerCase() : "";
    }, [asset, imageUrl]);

    const dimensions = useMemo(() => {
        if (!asset?.width || !asset?.height) return "";
        return `${asset.width} × ${asset.height}px`;
    }, [asset?.width, asset?.height]);

    // ✅ 説明文（短い場合だけ自動補完）
    const descriptionText = useMemo(() => {
        if (!asset) return "";
        return generateDescription(asset);
    }, [asset]);

    const shareLinks = useMemo(() => {
        const url = pageUrl || "";
        const text = asset?.title ? encodeURIComponent(asset.title) : "";
        const encUrl = encodeURIComponent(url);

        return {
            x: url
                ? `https://twitter.com/intent/tweet?url=${encUrl}&text=${text}`
                : "",
            linkedin: url
                ? `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`
                : "",
            line: url
                ? `https://social-plugins.line.me/lineit/share?url=${encUrl}`
                : "",
        };
    }, [pageUrl, asset?.title]);
    const shareBtn =
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-sm h-10";


    const handleCopy = async () => {
        if (!pageUrl) return;
        try {
            await navigator.clipboard.writeText(pageUrl);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
        } catch {
            // 権限NG等は何もしない（誤情報を出さない）
        }
    };

    // ローディング
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gx-cyan" />
            </div>
        );
    }

    // 見つからない（落ちない表示）
    if (!asset) {
        return (
            <div className="min-h-screen bg-slate-950 pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 text-slate-200">
                        <p className="font-bold text-white">素材が見つかりませんでした</p>
                        <p className="text-sm text-slate-400 mt-2">
                            URLが間違っているか、data/assets.json に存在しないIDです。
                        </p>
                        <div className="mt-4">
                            <Link href="/" className="text-cyan-400 hover:underline">
                                トップへ戻る →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    前のページに戻る
                </Link>

                {/* 2カラム：左=画像 / 右=情報（スマホは縦） */}
                <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10">
                    <div className="flex flex-col lg:flex-row">
                        {/* 左：画像 */}
                        <div className="relative w-full lg:w-1/2 bg-black flex items-center justify-center p-6">
                            <div className="relative w-full aspect-square max-w-3xl">
                                <Image
                                    src={imageUrl}
                                    alt={asset.title}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>

                            <div className="absolute bottom-6 right-6">
                                <FavoriteButton assetId={asset.id} size="lg" />
                            </div>
                        </div>

                        {/* 右：情報 */}
                        <div className="w-full lg:w-1/2 p-8">
                            {/* タイトル */}
                            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                                {asset.title}
                            </h1>

                            {/* DL + メタ（統合） */}
                            <div className="mt-5 bg-white/5 rounded-2xl border border-white/10 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* 左：DL＋条件 */}
                                    <div>
                                        <a
                                            href={imageUrl}
                                            download
                                            className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-2xl transition-colors"
                                        >
                                            <Download className="w-5 h-5" />
                                            無料ダウンロード
                                        </a>

                                        <div className="mt-3 text-xs text-slate-400 space-y-1">
                                            <p>✓ 商用利用可能</p>
                                            <p>✓ クレジット表記不要</p>
                                            <p>✓ 加工・編集OK</p>
                                            <p className="pt-2">
                                                <Link
                                                    href="/guide"
                                                    className="text-cyan-400 hover:underline"
                                                >
                                                    利用ガイドを見る →
                                                </Link>
                                            </p>
                                        </div>
                                    </div>

                                    {/* 右：メタ（空きを埋める） */}
                                    <div className="bg-black/10 rounded-2xl border border-white/10 p-4">
                                        <p className="text-xs text-slate-400 mb-3 font-bold">
                                            メタデータ
                                        </p>

                                        <div className="text-sm text-slate-200 space-y-2">
                                            <div className="flex justify-between gap-4">
                                                <span className="text-slate-400">形式</span>
                                                <span className="font-medium">
                                                    {fileExt ? fileExt.toUpperCase() : "—"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-slate-400">ピクセル</span>
                                                <span className="font-medium">{dimensions || "—"}</span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-slate-400">比率</span>
                                                <span className="font-medium">
                                                    {asset.aspectRatio || "—"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-slate-400">サイズ</span>
                                                <span className="font-medium">{asset.size || "—"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* カテゴリ + タグ（横並び） */}
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* カテゴリ */}
                                <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                                        <Grid className="w-4 h-4" />
                                        <span>カテゴリー</span>
                                    </div>

                                    {asset.category ? (
                                        <Link
                                            href={`/category/${encodeURIComponent(asset.category)}`}
                                            className="inline-block px-4 py-2 bg-slate-800 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium text-sm"
                                        >
                                            {asset.category}
                                        </Link>
                                    ) : (
                                        <p className="text-sm text-slate-500">—</p>
                                    )}
                                </div>

                                {/* タグ */}
                                <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                                        <TagIcon className="w-4 h-4" />
                                        <span>タグ</span>
                                    </div>

                                    {tags.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, index) => (
                                                <Link
                                                    key={`${tag}-${index}`}
                                                    href={`/search?q=${encodeURIComponent(
                                                        tag.replace("#", "")
                                                    )}`}
                                                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs hover:bg-gx-cyan hover:text-white transition-colors"
                                                >
                                                    {tag}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500">—</p>
                                    )}
                                </div>
                            </div>

                            {/* 説明（40文字以上の場合は折りたたみ） */}
                            <div className="mt-4 bg-white/5 p-5 rounded-2xl border border-white/10 text-slate-200 text-base leading-relaxed">
                                {(() => {
                                    // 1) 表示側で重複を吸収
                                    const t = normalizeDescription(
                                        String(descriptionText || "")
                                    ).trim();

                                    const threshold = 40;
                                    const isLong = t.length > threshold;

                                    if (!isLong) {
                                        return (
                                            <p className="text-slate-200 whitespace-pre-line">
                                                {t}
                                            </p>
                                        );
                                    }

                                    // 40文字以上の場合の処理
                                    const summary = t.slice(0, threshold) + "...";

                                    return (
                                        <>
                                            <p className="text-slate-200 whitespace-pre-line">
                                                {descOpen ? t : summary}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => setDescOpen((v) => !v)}
                                                className="mt-3 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                                                aria-expanded={descOpen}
                                            >
                                                {descOpen ? "詳細を閉じる" : "詳細を読む"}
                                            </button>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* 共有（右カラムに配置） */}
                            <div className="mt-4">
                                <p className="text-xs text-slate-400 mb-2 font-bold">共有</p>

                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={shareLinks.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-sm"
                                    >
                                        X
                                    </a>

                                    <a
                                        href={shareLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-sm"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn
                                    </a>

                                    <a
                                        href={shareLinks.line}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-sm"
                                    >
                                        LINE
                                    </a>

                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-sm"
                                    >
                                        <Copy className="w-4 h-4" />
                                        {copied ? "コピーしました" : "URLコピー"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 下部の素材情報セクションは削除（重複排除） */}
            </div>
        </div>
    );
}
