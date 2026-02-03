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

type Props = {
  title: string;
  description?: string;
  images: Asset[];
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
      </div>
    </section>
  );
}
