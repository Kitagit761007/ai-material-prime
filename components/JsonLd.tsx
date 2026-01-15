export default function JsonLd({ images }: { images: any[] }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "images": images.map((img) => ({
            "@type": "ImageObject",
            "contentUrl": img.src,
            "license": "https://ai-material-prime.com/terms",
            "acquireLicensePage": "https://ai-material-prime.com/contact",
            "creditText": "AI Material Prime",
            "creator": {
                "@type": "Person",
                "name": "Hakut AI"
            },
            "copyrightNotice": "Free for Commercial Use",
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
