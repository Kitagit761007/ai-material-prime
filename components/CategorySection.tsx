"use client";

import Image from "next/image";

interface CategorySectionProps {
    title: string;
    description: string;
    images: { src: string; title: string; score: number }[];
}

export default function CategorySection({ title, description, images }: CategorySectionProps) {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                    {title}
                </h2>
                <p className="text-slate-400 max-w-2xl">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((img, i) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5">
                        <div className="aspect-[4/5] relative">
                            <Image
                                src={img.src}
                                alt={img.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-white font-bold text-lg mb-1">{img.title}</h3>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-gx-cyan/20 text-gx-cyan text-xs font-bold rounded">
                                    Score: {img.score}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
