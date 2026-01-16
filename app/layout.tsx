import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PwaHandler from '@/components/PwaHandler'
import InstallBanner from '@/components/InstallBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GX Prime Visuals',
    description: 'AI生成の高品質なGXビジュアル素材。',
    manifest: '/manifest.json',
    themeColor: '#00f2fe',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <PwaHandler />
                <Header />
                <main className="min-h-screen pt-20">
                    {children}
                </main>
                <InstallBanner />
                <Footer />
            </body>
        </html>
    )
}
