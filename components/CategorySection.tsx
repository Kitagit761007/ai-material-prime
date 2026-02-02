"use client";
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
                    <div key={img.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                        <Image
                            src={img.url} // ✅ JSONにある "/assets/images/..." をそのまま使う
                            alt={img.title || "Asset Image"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                            <h3 className="text-white font-bold truncate">{img.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
