"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import FavoriteButton from "@/components/FavoriteButton";

interface Asset {
  id: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  width?: number;
  height?: number;
  size?: string; // "228 kB" 等
  aspectRatio?: string; // "2:3" 等
  url?: string; // "/assets/images/g/g-1.jpg" 等（あなたのjsonにある）
}

export default function MaterialDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);

  const [pageUrl, setPageUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const getImageUrl = (item: Asset) => {
    if (!item) return "";
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

  useEffect(() => {
    // 詳細ページのURL（共有/コピー用）
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    fetch("/data/assets.json")
      .then((res) => res.json())
      .then((data: Asset[]) => {
        const found = data.find((item) => item.id === slug);
        if (found) {
          setAsset(found);
        } else {
          router.push("/404");
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        router.push("/404");
      });
  }, [slug, router]);

  const imageUrl = useMemo(() => (asset ? getImageUrl(asset) : ""), [asset]);

  const fileExt = useMemo(() => {
    const u = asset?.url || imageUrl;
    const m = u?.match(/\.([a-zA-Z0-9]+)$/);
    return m ? m[1].toLowerCase() : "";
  }, [asset?.url, imageUrl]);

  const dimensions = useMemo(() => {
    if (!asset?.width || !asset?.height) return "";
    return `${asset.width} × ${asset.height}px`;
  }, [asset?.width, asset?.height]);

  const shareLinks = useMemo(() => {
    const url = pageUrl || "";
    const text = asset?.title ? encodeURIComponent(asset.title) : "";
    const encUrl = encodeURIComponent(url);

    return {
      x: url ? `https://twitter.com/intent/tweet?url=${encUrl}&text=${text}` : "",
      linkedin: url
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`
        : "",
      line: url
        ? `https://social-plugins.line.me/lineit/share?url=${encUrl}`
        : "",
    };
  }, [pageUrl, asset?.title]);

  const handleCopy = async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // クリップボード権限NG等：何もしない（誤情報を出さない）
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gx-cyan" />
      </div>
    );
  }

  if (!asset) return null;
  const tags = Array.isArray(asset.tags) ? asset.tags : [];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-gx-cyan transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          トップページへ戻る
        </Link>

        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10">
  <div className="flex flex-col lg:flex-row">
    {/* 左：画像（PCは左50%） */}
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

    {/* 右：情報（PCは右50%） */}
    <div className="w-full lg:w-1/2 p-8">
      {/* タイトル */}
      <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
        {asset.title}
      </h1>

      {/* DL（最優先） */}
      <div className="mt-5 bg-white/5 rounded-2xl border border-white/10 p-4">
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
            <Link href="/guide" className="text-cyan-400 hover:underline">
              利用ガイドを見る →
            </Link>
          </p>
        </div>
      </div>

      {/* メタデータ */}
      <div className="mt-4 bg-white/5 rounded-2xl border border-white/10 p-4">
        <p className="text-xs text-slate-400 mb-3 font-bold">メタデータ</p>

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
            <span className="text-slate-400">アスペクト比</span>
            <span className="font-medium">{asset.aspectRatio || "—"}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">ファイルサイズ</span>
            <span className="font-medium">{asset.size || "—"}</span>
          </div>
        </div>

        {/* カテゴリ・タグ */}
        <div className="mt-4 pt-4 border-t border-white/10">
          {asset.category && (
            <div className="mb-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                <Grid className="w-4 h-4" />
                <span>カテゴリー</span>
              </div>
              <Link
                href={`/category/${encodeURIComponent(asset.category)}`}
                className="inline-block px-4 py-2 bg-slate-800 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium text-sm"
              >
                {asset.category}
              </Link>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                <TagIcon className="w-4 h-4" />
                <span>タグ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/search?q=${encodeURIComponent(tag.replace("#", ""))}`}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs hover:bg-gx-cyan hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 説明 */}
      <div className="mt-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-slate-200 text-sm leading-relaxed">
        {asset.description ? (
          asset.description
        ) : (
          <span className="text-slate-400">
            説明文が未設定です。利用条件とメタデータをご確認ください。
          </span>
        )}
      </div>

      {/* SNS（右カラムに配置） */}
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


        {/* ①で置換した「素材情報」ブロックは、いったん残してOK（ただし重複が気になるなら後で削除） */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-black text-white mb-4">素材情報</h2>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              {asset.description ? (
                <p>{asset.description}</p>
              ) : (
                <p>
                  タイトル・カテゴリ・タグなどの情報から検索できる素材ページです。
                  ダウンロード前に利用条件と仕様をご確認ください。
                </p>
              )}

              <div className="bg-slate-800/40 p-4 rounded-xl text-sm text-slate-300">
                <p className="font-bold text-white mb-2">利用条件（要点）</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>商用利用：可</li>
                  <li>クレジット：任意</li>
                  <li>加工・編集：可</li>
                  <li>
                    再配布：不可（素材の再アップロード／素材集化／再販売を含む）
                  </li>
                </ul>
                <p className="mt-3">
                  <Link href="/guide" className="text-cyan-400 hover:underline">
                    詳細は利用ガイド →
                  </Link>
                </p>
              </div>

              <div className="text-sm text-slate-400">
                {asset.category && (
                  <p>
                    カテゴリ：{" "}
                    <Link
                      href={`/category/${encodeURIComponent(asset.category)}`}
                      className="text-cyan-400 hover:underline"
                    >
                      {asset.category}
                    </Link>
                  </p>
                )}

                {tags.length > 0 && (
                  <p className="mt-1">
                    タグ：{" "}
                    {tags.map((t, i) => (
                      <span key={t}>
                        <Link
                          href={`/search?q=${encodeURIComponent(t.replace("#", ""))}`}
                          className="text-cyan-400 hover:underline"
                        >
                          {t}
                        </Link>
                       {i < tags.length - 1 ? " / " : ""}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ここまで */}
      </div>
    </div>
  );
}
