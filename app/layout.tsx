import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'
import PwaHandler from '@/components/PwaHandler'
import InstallBanner from '@/components/InstallBanner'

import { FavoritesProvider } from '@/context/FavoritesContext'
import { SearchProvider } from '@/context/SearchContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://ai-material-prime.com'),
    title: {
        default: 'GX Prime Visuals | 未来を描くAI生成画像素材サイト',
        template: '%s | GX Prime Visuals'
    },
    description: '水素エネルギーやスマートシティなど、次世代のテクノロジーをテーマにした高品質なAI生成画像素材を無料で提供しています。商用利用可・クレジット表記不要。',
    keywords: ['AI生成画像', '水素エネルギー', 'スマートシティ', 'GX', '未来都市', 'フリー素材'],
    manifest: '/manifest.json',
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    openGraph: {
        type: 'website',
        locale: 'ja_JP',
        url: 'https://ai-material-prime.com',
        siteName: 'GX Prime Visuals',
        title: 'GX Prime Visuals | 未来を描くAI生成画像素材サイト',
        description: '次世代テクノロジーをテーマにした高品質なAI生成画像素材サイト。',
        images: [
            {
                url: '/assets/images/hydrogen_bus_future_city.png',
                width: 1200,
                height: 630,
                alt: 'AI Material Prime featured visual',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GX Prime Visuals | 未来を描くAI生成画像素材サイト',
        description: '次世代テクノロジーをテーマにした高品質なAI生成画像素材サイト。',
        images: ['/assets/images/hydrogen_bus_future_city.png'],
    },
    alternates: {
        canonical: '/',
    },
}

export const viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <head>
                {process.env.NEXT_PUBLIC_GTM_ID && (
                    <Script
                        id="gtm-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
                            `,
                        }}
                    />
                )}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-J0S6KYW409"
                />
                <Script
                    id="ga-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-J0S6KYW409', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={inter.className}>
                <SearchProvider>
                    <FavoritesProvider>
                        {process.env.NEXT_PUBLIC_GTM_ID && (
                            <noscript>
                                <iframe
                                    src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                                    height="0"
                                    width="0"
                                    style={{ display: 'none', visibility: 'hidden' }}
                                />
                            </noscript>
                        )}
                        <PwaHandler />
                        <Header />
                        <main className="min-h-screen pt-20">
                            {children}
                        </main>
                        <InstallBanner />
                        <Footer />
                        <MobileNav />
                    </FavoritesProvider>
                </SearchProvider>
            </body>
        </html >
    )
}
