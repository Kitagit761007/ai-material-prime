"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Download, Tag as TagIcon, Grid } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import FavoriteButton from "@/components/FavoriteButton";

interface Asset {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export default function MaterialDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);

  const getUrl = (item: Asset) => {
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
    fetch("/data/assets.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item: Asset) => item.id === slug);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gx-cyan" />
      </div>
    );
  }

  if (!asset) return null;

  const imageUrl = getUrl(asset);

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

        <div className="flex flex-col lg:flex-row gap-8 bg-slate-900 rounded-3xl overflow-hidden border border-white/10">
          {/* Image Section */}
          <div className="relative w-full lg:flex-1 bg-black flex items-center justify-center p-8">
            <div className="relative w-full aspect-square max-w-2xl">
              <Image
                src={imageUrl}
                alt={asset.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* ✅ お気に入りボタンは全サイトでFavoriteButtonに統一 */}
            <div className="absolute bottom-6 right-6">
              <FavoriteButton assetId={asset.id} size="lg" />
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full lg:w-[450px] p-8 text-left">
            <h1 className="text-3xl font-black text-white italic uppercase mb-4 tracking-tighter">
              {asset.title}
            </h1>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6 text-slate-300 text-sm leading-relaxed">
              {asset.description || "高品質AIビジュアル素材。商用利用可能。"}
            </div>

            {/* Category */}
            {asset.category && (
              <div className="mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <Grid className="w-4 h-4" />
                  <span>カテゴリー</span>
                </div>
                <Link
                  href={`/category/${encodeURIComponent(asset.category)}`}
                  className="inline-block px-4 py-2 bg-slate-800 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium"
                >
                  {asset.category}
                </Link>
              </div>
            )}

            {/* Tags */}
            {asset.tags && asset.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <TagIcon className="w-4 h-4" />
                  <span>タグ</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {asset.tags.map((tag, index) => (
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

            {/* Share Buttons */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <ShareButtons
                title={asset.title}
                url={`/material/${asset.id}`}
                imageUrl={imageUrl}
              />
            </div>

            {/* Download Button */}
            <a
              href={imageUrl}
              download
              className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-2xl transition-colors mb-4"
            >
              <Download className="w-5 h-5" />
              無料ダウンロード
            </a>

            {/* Usage Info */}
            <div className="bg-slate-800/50 p-4 rounded-xl text-xs text-slate-400 space-y-1">
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
        </div>

        {/* ✅ ①：AIテンプレ臭の強い文章を撤去し、事実ベースの情報ブロックへ置換 */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-black text-white mb-4">素材情報</h2>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              {/* 補足（descriptionがある場合はそのまま表示） */}
              {asset.description ? (
                <p>{asset.description}</p>
              ) : (
                <p>
                  タイトル・カテゴリ・タグなどの情報から検索できる素材ページです。
                  ダウンロード前に利用条件と仕様をご確認ください。
                </p>
              )}

              {/* 利用条件（要点） */}
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

              {/* カテゴリ・タグ（事実情報） */}
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

                {asset.tags?.length > 0 && (
                  <p className="mt-1">
                    タグ：{" "}
                    {asset.tags.map((t, i) => (
                      <span key={t}>
                        <Link
                          href={`/search?q=${encodeURIComponent(t.replace("#", ""))}`}
                          className="text-cyan-400 hover:underline"
                        >
                          {t}
                        </Link>
                        {i < asset.tags.length - 1 ? " / " : ""}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ✅ ①ここまで */}
      </div>
    </div>
  );
}
