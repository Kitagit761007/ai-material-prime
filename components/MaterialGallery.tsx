"use client";

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
      </div>
    );
  }

  return (
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
    </div>
  );
}
