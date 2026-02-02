"use client";
import { useState } from "react";
import Image from "next/image";

export default function CategorySection({ title, description, images }: any) {
    if (!images || images.length === 0) return null;

    return (
        <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
                <p className="text-slate-400 max-w-2xl">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {images.map((img: any) => (
                    <ImageCard key={img.id} img={img} />
                ))}
            </div>
        </section>
    );
}

// 画像の個別カード（エラー時に自分自身を消す魔法付き）
function ImageCard({ img }: any) {
    const [hasError, setHasError] = useState(false);
    
    // エラーが出た（画像がなかった）場合は、何も表示しない
    if (hasError) return null;

    // フォルダと拡張子の判定
    let folder = "grok";
    let ext = ".jpg";
    if (img.id.startsWith("mid-")) folder = "mid";
    if (img.id.startsWith("niji-")) folder = "niji";
    if (img.id.startsWith("gpt-")) { folder = "GPT"; ext = ".png"; } // ✅ GPTはPNG固定
    if (img.id.startsWith("nano-")) folder = "nano";
    if (img.id.startsWith("g-")) folder = "grok";

    const finalUrl = `/assets/images/${folder}/${img.id}${ext}`;

    return (
        <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
            <Image
                src={finalUrl} 
                alt={img.title || "AI Asset"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized 
                onError={() => setHasError(true)} // ✅ 画像がない、または拡張子違いなら消える
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold truncate">{img.title || img.id}</h3>
            </div>
        </div>
    );
}
