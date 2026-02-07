"use client";

import Link from "next/link";
import Image from "next/image";

type Asset = {
  id: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
  image?: string;
  url?: string;
  src?: string;
  thumbnail?: string;
  thumb?: string;
};
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ChevronRight } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

export function DetailModal({
  image,
  url,
  onClose,
}: {
  image: any;
  url: string;
  onClose: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

type Props = {
  title: string;
  description?: string;
  images: Asset[];
};

function pickImageSrc(item: any): string {
  return (
<<<<<<< HEAD
    item?.image ||
    item?.url ||
    item?.src ||
    item?.thumbnail ||
    item?.thumb ||
    ""
  );
}

export default function CategorySection({ title, description, images }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <section className="px-6 max-w-7xl mx-auto mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {title}
          </h3>
          {description ? (
            <p className="mt-2 text-slate-300 leading-relaxed">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {images.map((item) => {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[120] p-2 bg-black/60 text-white rounded-full"
        >
          <X />
        </button>

        <div className="relative w-full lg:flex-1 h-[40vh] bg-black flex items-center justify-center p-4">
          <img
            src={url}
            alt={image.title}
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={toggleFavorite}
            className={`absolute bottom-6 right-6 p-4 rounded-full border transition-all ${
              isFavorite
                ? "bg-pink-500 text-white border-pink-400"
                : "bg-black/50 text-white border-white/20"
            }`}
          >
            <Heart className={isFavorite ? "fill-current" : ""} />
          </button>
        </div>

        <div className="w-full lg:w-[400px] p-8 text-left bg-slate-900">
          <h2 className="text-2xl font-black text-white italic uppercase mb-4 tracking-tighter">
            {image.title}
          </h2>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6 text-slate-300 text-sm">
            高品質AIビジュアル素材。商用利用可能。
          </div>
          <a
            href={url}
            download
            className="flex items-center justify-center gap-2 w-full bg-cyan-500 text-white font-bold py-4 rounded-2xl mb-8"
          >
            無料ダウンロード
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CategorySection({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: any[];
}) {
  const getUrl = (item: any) => {
    const f = item.id.startsWith("mid-")
      ? "mid"
      : item.id.startsWith("niji-")
      ? "niji"
      : item.id.startsWith("gpt-")
      ? "GPT"
      : item.id.startsWith("nano-")
      ? "nano"
      : "grok";

    return (
      "/assets/images/" + f + "/" + item.id + (f === "GPT" ? ".png" : ".jpg")
    );
  };

  return (
    // ✅ 変更：py-20 → pt-10 pb-16（上を詰めて、下は適度に残す）
    <section className="pt-10 pb-16 px-6 max-w-7xl mx-auto">
      {/* ✅ 変更：mb-10 → mb-8 */}
      <div className="flex items-end justify-between mb-8 text-left">
        <div>
          <h2 className="text-4xl font-black text-white italic uppercase mb-2 tracking-tighter">
            {title}
          </h2>
          <p className="text-slate-400">{description}</p>
        </div>

        <Link
          href={`/category/${title}`}
          className="text-cyan-400 font-bold flex items-center gap-2"
        >
          VIEW ALL <ChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
          >
            <Link href={`/material/${img.id}`} className="block w-full h-full">
              <Image
                src={getUrl(img)}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </Link>

            {/* ❤️ お気に入りボタン */}
            <div
              className="absolute top-3 right-3 z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <FavoriteButton assetId={img.id} />
            </div>
          </div>
        ))}
>>>>>>> main
      </div>
    </section>
  );
}
