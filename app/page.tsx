import Hero from "@/components/Hero";
import ImageGrid from "@/components/ImageGrid";
import JsonLd from "@/components/JsonLd";
import CategorySection from "@/components/CategorySection";

// Duplicated data for server-side SEO rendering (in real app, fetch from DB)
const IMAGES = [
    { src: "https://placehold.co/600x800/111827/00D1FF/png?text=Hydrogen+Plant" },
    { src: "https://placehold.co/600x600/111827/00FF85/png?text=Wind+Turbines" },
    { src: "https://placehold.co/600x900/111827/FFFFFF/png?text=Solar+Grid" },
    { src: "https://placehold.co/600x700/111827/00D1FF/png?text=Smart+City" },
    { src: "https://placehold.co/600x500/111827/00FF85/png?text=Bio+Lab" },
    { src: "https://placehold.co/600x800/111827/FFFFFF/png?text=EV+Station" },
];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <JsonLd images={IMAGES} />
            <Hero />

            <ImageGrid />

            {/* Category Sections */}
            <CategorySection
                title="水素エネルギー / Hydrogen"
                description="次世代エネルギーの主役、水素プラントや供給チェーンのビジュアル。"
                images={[
                    { src: "https://placehold.co/600x800/111827/00D1FF/png?text=Hydrogen+Plant", title: "H2 Storage", score: 98 },
                    { src: "https://placehold.co/600x800/111827/00D1FF/png?text=Fuel+Cell", title: "Fuel Cell System", score: 95 },
                    { src: "https://placehold.co/600x800/111827/00D1FF/png?text=Transport", title: "H2 Transport", score: 92 },
                ]}
            />

            <CategorySection
                title="スマートシティ / Smart City"
                description="IOE技術と都市機能が融合した、未来の生活空間。"
                images={[
                    { src: "https://placehold.co/600x800/111827/00FF85/png?text=Smart+Grid", title: "Urban Grid", score: 97 },
                    { src: "https://placehold.co/600x800/111827/00FF85/png?text=IoT+Center", title: "Data Center", score: 94 },
                    { src: "https://placehold.co/600x800/111827/00FF85/png?text=Green+Build", title: "Eco Building", score: 96 },
                ]}
            />

            <CategorySection
                title="次世代インフラ / Infrastructure"
                description="強靭でサステナブルな社会基盤のイメージ。"
                images={[
                    { src: "https://placehold.co/600x800/111827/FFFFFF/png?text=EV+Station", title: "Super Charger", score: 99 },
                    { src: "https://placehold.co/600x800/111827/FFFFFF/png?text=Wind+Farm", title: "Offshore Wind", score: 93 },
                    { src: "https://placehold.co/600x800/111827/FFFFFF/png?text=Solar+Panel", title: "Mega Solar", score: 91 },
                ]}
            />
        </div>
    );
}
