"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

interface MaterialGalleryProps {
  filterCategory?: string;
  searchQuery?: string;
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

  // ✅ 「直前ページ（現在地）」を from に入れるための状態
  // 初期値は安全側（/gallery）にしておく（初回描画時の一瞬用）
  const [currentFrom, setCurrentFrom] = useState<string>("/gallery");

  // 初期IDの有無を明確化（undefined と [] を区別）
  const hasInitialIds = useMemo(() => Array.isArray(initialIds), [initialIds]);

  // ✅ クライアントでのみ現在URLを取得（ルーター依存なし）
  useEffect(() => {
    if (typeof window === "undefined") return;
    const from = `${window.location.pathname}${window.location.search}`;
    setCurrentFrom(from || "/gallery");
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map((item) => (
        <div
          key={item.id}
          className="relative group w-full aspect-[4/3] overflow-hidden rounded-xl"
        >
          <Link
            className="absolute inset-0 block"
            href={{
              pathname: `/material/${item.id}`,
              query: { from: currentFrom },
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={getUrl(item)}
                alt={item.title || ""}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          </Link>

          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton assetId={item.id} size="md" />
          </div>
        </div>
      ))}
    </div>
  );
}
