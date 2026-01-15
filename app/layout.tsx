import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GX Prime Visuals',
    description: 'AI生成の高品質なGXビジュアル素材。',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <Header />
                <main className="min-h-screen pt-20">
                    {children}
                </main>
            </body>
        </html>
    )
}
