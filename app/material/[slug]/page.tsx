import type { Metadata } from "next";
import { Suspense } from "react";
import fs from "fs";
import path from "path";
import { generateDescription } from "@/lib/description";
import MaterialDetailClient from "./MaterialDetailClient";

interface Asset {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
}

// Generate static params for all assets
export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), "public", "data", "assets.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const assets: Asset[] = JSON.parse(fileContents);

    return assets.map((asset) => ({
        slug: asset.id,
    }));
}

// Generate metadata for each page
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const filePath = path.join(process.cwd(), "public", "data", "assets.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const assets: Asset[] = JSON.parse(fileContents);
    const asset = assets.find((item) => item.id === params.slug);

    if (!asset) {
        return {
            title: "素材が見つかりません",
            description: "お探しの素材は見つかりませんでした。",
        };
    }

    const description = generateDescription(asset);

    const folder = asset.id.startsWith("mid-")
        ? "mid"
        : asset.id.startsWith("niji-")
            ? "niji"
            : asset.id.startsWith("gpt-")
                ? "GPT"
                : asset.id.startsWith("nano-")
                    ? "nano"
                    : "grok";
    const imageUrl = `/assets/images/${folder}/${asset.id}${folder === "GPT" ? ".png" : ".jpg"
        }`;

    return {
        title: `${asset.title} | GX Prime Visuals`,
        description: description,
        openGraph: {
            title: asset.title,
            description: description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: asset.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: asset.title,
            description: description,
            images: [imageUrl],
        },
    };
}

export default function MaterialDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    return (
        <Suspense fallback={null}>
            <MaterialDetailClient slug={params.slug} />
        </Suspense>
    );

}
