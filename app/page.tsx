import Hero from "@/components/Hero";
import ImageGrid from "@/components/ImageGrid";
import JsonLd from "@/components/JsonLd";

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
        </div>
    );
}
