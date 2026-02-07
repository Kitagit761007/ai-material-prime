"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

import Link from "next/link";
import Image from "next/image";
import assetsData from "@/public/data/assets.json";

type Asset = {
  id: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
  // データによって image/url/src 等がある可能性があるので any で拾う
  image?: string;
  url?: string;
  src?: string;
  thumbnail?: string;
  thumb?: string;
};

type Props = {
  searchQuery?: string;
};

function pickImageSrc(item: any): string {
  return (
    item?.image ||
    item?.url ||
    item?.src ||
    item?.thumbnail ||
    item?.thumb ||
    ""
  );
}

function normalize(s: string) {
  return (s ?? "").toLowerCase().trim();
}

export default function MaterialGallery({ searchQuery }: Props) {
  const assets = assetsData as Asset[];
  const q = normalize(searchQuery ?? "");

  const filtered = q
    ? assets.filter((a) => {
        const hay = [
          a.id,
          a.title,
          a.category,
          a.description ?? "",
          ...(a.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
    : assets;

  if (!filtered || filtered.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
        該当する素材が見つかりませんでした。キーワードを変えて再検索してください。
  initialIds?: string[];
  onResultCount?: (count: number) => void;
}

export default function MaterialGallery({
  filterCategory,
  searchQuery,
  initialIds,
  onResultCount,
}: MaterialGalleryProps) {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 初期IDの有無を明確化（undefined と [] を区別）
  const hasInitialIds = useMemo(() => Array.isArray(initialIds), [initialIds]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch("/data/assets.json")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;

        let filtered = data;

        // ✅ initialIds が渡された場合はそれを最優先（空配列なら0件でOK）
        if (hasInitialIds) {
          const ids = (initialIds || []) as string[];

          // ID集合で高速化
          const idSet = new Set(ids);

          // まず該当IDだけ抽出
          const matched = data.filter((item: any) => idSet.has(item.id));

          // さらに保存順に並べ替え（localStorageの順序に追従）
          const orderMap = new Map(ids.map((id, idx) => [id, idx]));
          matched.sort((a: any, b: any) => {
            const ai = orderMap.get(a.id) ?? 999999;
            const bi = orderMap.get(b.id) ?? 999999;
            return ai - bi;
          });

          filtered = matched;
        } else if (filterCategory) {
          filtered = data.filter((item: any) => item.category === filterCategory);
        } else if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = data.filter((item: any) =>
            (item.title || "").toLowerCase().includes(q)
          );
        }

        setAssets(filtered);
        onResultCount?.(filtered.length);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filterCategory, searchQuery, initialIds, hasInitialIds, onResultCount]);

  const getUrl = (item: any) => {
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

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 font-bold uppercase">
        Loading...
      </div>
    );
  }

  // ✅ 空状態（お気に入り0件など）を明確に出せるようにする
  if (!loading && assets.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        <p className="font-bold">表示できる素材がありません</p>
        <p className="text-sm mt-2 text-slate-600">
          条件を変えて再度お試しください。
        </p>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map((item: any) => {
        const href = `/assets/${item.id}/`;
        const src = pickImageSrc(item);

        return (
          <Link
            key={item.id}
            href={href}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer block"
          >
            {src ? (
              <Image
                src={src}
                alt={item.title ?? item.id}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                no image
              </div>
            )}

            {/* うっすら情報（任意） */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-white font-semibold text-sm line-clamp-1">
                {item.title ?? item.id}
              </div>
              <div className="text-white/70 text-xs line-clamp-1">
                {item.category ?? ""}
              </div>
            </div>
          </Link>
        );
      })}
=======
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map((item) => (
        <div key={item.id} className="relative group">
          <Link
            href={`/material/${item.id}`}
            className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer hover:border-gx-cyan/50 transition-all block"
          >
            <Image
              src={getUrl(item)}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </Link>

          <div className="absolute top-2 right-2 z-10">
            {/* ✅ FavoriteButton 側のpropsが assetId 仕様の前提で統一 */}
            <FavoriteButton assetId={item.id} size="md" />
          </div>
        </div>
      ))}
>>>>>>> main
    </div>
  );
}
