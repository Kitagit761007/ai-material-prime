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
                {images.map((img: any) => {
                    // --- 🛠️ フォルダと拡張子の自動補正ロジック ---
                    let url = img.url;
                    
                    // 1. フォルダ名の補正
                    url = url.replace('/assets/images/g/', '/assets/images/grok/');
                    url = url.replace('/assets/images/gpt/', '/assets/images/GPT/');

                    // 2. GPTは本来PNGとのことなので、もしURLが.jpgなら.pngに置換してみる
                    if (img.id.startsWith('gpt-')) {
                        url = url.replace('.jpg', '.png');
                    }
                    
                    return (
                        <div key={img.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                            <Image
                                src={url} 
                                alt={img.title || "AI Asset"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                unoptimized 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-white font-bold truncate">{img.title || img.id}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
