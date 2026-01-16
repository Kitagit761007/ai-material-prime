"use client";

import { useState, useEffect } from "react";
import { X, Smartphone, Home } from "lucide-react";

export default function InstallBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        // Check if already installed or dismissed
        const isDismissed = localStorage.getItem("pwa-banner-dismissed");
        if (isDismissed) return;

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show banner after a slight delay
            setTimeout(() => setIsVisible(true), 3000);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("User accepted the PWA install");
        }

        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("pwa-banner-dismissed", "true");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:right-6 md:w-96 animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-gx-cyan/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gx-cyan/5 to-transparent opacity-50" />

                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 p-1 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex gap-4 items-start relative z-10">
                    <div className="w-12 h-12 bg-gx-cyan/10 rounded-xl flex items-center justify-center shrink-0 border border-gx-cyan/20">
                        <Smartphone className="w-6 h-6 text-gx-cyan" />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                            アプリとして利用
                            <span className="px-1.5 py-0.5 bg-gx-cyan/20 text-gx-cyan text-[10px] rounded uppercase tracking-wider">Recommended</span>
                        </h4>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            ホーム画面に追加して、プロ仕様のGX素材ライブラリをより快適に利用できます。
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={handleInstall}
                                className="px-4 py-2 bg-gx-cyan text-white text-xs font-bold rounded-lg hover:bg-gx-cyan/90 transition-all shadow-lg shadow-gx-cyan/20 flex items-center gap-2"
                            >
                                <Home className="w-3.5 h-3.5" />
                                ホーム画面に追加
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-4 py-2 bg-white/5 text-slate-400 text-xs font-bold rounded-lg hover:bg-white/10 transition-all"
                            >
                                あとで
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
