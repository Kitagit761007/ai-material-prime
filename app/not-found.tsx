import Link from 'next/link';

export const metadata = {
    title: '404 - Page Not Found | GX Prime Visuals',
};

export const viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6 text-center">
            <h1 className="text-9xl font-black text-white/5 absolute -z-10">404</h1>
            <div className="space-y-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    ページが見つかりません
                </h2>
                <p className="text-slate-400 max-w-md mx-auto">
                    申し訳ありませんが、お探しのページは削除されたか、URLが変更された可能性があります。
                </p>
                <Link
                    href="/"
                    className="inline-flex py-4 px-10 bg-gx-cyan text-slate-950 font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-gx-cyan/20"
                >
                    トップページに戻る
                </Link>
            </div>
        </div>
    );
}
