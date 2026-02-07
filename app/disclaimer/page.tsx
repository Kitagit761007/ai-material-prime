import Header from "@/components/Header";
import Link from "next/link";
import { Shield, AlertTriangle, FileText } from "lucide-react";

export const metadata = {
    title: "免責事項 | GX Prime Visuals",
    description: "著作権、AI生成物に関する注意事項、免責事項について",
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <Header />
            <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
                <div className="mb-12">
                    <p className="text-cyan-500 font-bold text-xs mb-2 tracking-widest uppercase italic">
                        Disclaimer
                    </p>
                    <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
                        免責事項
                    </h1>
                    <div className="h-1 w-20 bg-cyan-500 mb-6" />
                    <p className="text-slate-400 text-lg">
                        GX Prime Visualsをご利用いただく前に、必ずお読みください。
                    </p>
                </div>

                <div className="space-y-12">
                    {/* 著作権について */}
                    <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <Shield className="w-6 h-6 text-cyan-500" />
                            </div>
                            <h2 className="text-2xl font-black text-white">著作権について</h2>
                        </div>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                当サイトで提供するすべての画像素材の著作権は、GX Prime Visuals（運営者）に帰属します。
                            </p>
                            <p>
                                ただし、<Link href="/guide" className="text-cyan-400 hover:underline">利用ガイド</Link>に定める範囲内において、
                                ユーザーは無償で画像を利用する権利を有します。
                            </p>
                            <div className="bg-slate-800 p-4 rounded-lg mt-4">
                                <p className="font-bold text-white mb-2">著作権に関する重要事項：</p>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>画像の著作権は放棄されていません</li>
                                    <li>利用規約の範囲内で使用許諾を付与しています</li>
                                    <li>画像素材そのものの再配布・販売は禁止です</li>
                                    <li>加工後の画像についても同様の制限が適用されます</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* AI生成画像の特性 */}
                    <section className="bg-slate-900 rounded-2xl p-8 border border-yellow-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                            </div>
                            <h2 className="text-2xl font-black text-white">AI生成画像の特性と注意事項</h2>
                        </div>
                        <div className="space-y-4 text-slate-300">
                            <p className="font-bold text-yellow-400">
                                当サイトの画像はすべてAI（人工知能）によって生成されています
                            </p>
                            <p>
                                AI生成画像には以下の特性があることをご理解の上、ご利用ください：
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <strong className="text-white">実在しない風景・物体</strong>：
                                    画像に描かれている建物、風景、物体は実在しません
                                </li>
                                <li>
                                    <strong className="text-white">細部の不自然さ</strong>：
                                    拡大表示すると、細部に不自然な表現が含まれる場合があります
                                </li>
                                <li>
                                    <strong className="text-white">類似画像の可能性</strong>：
                                    他のAI生成サービスで類似の画像が生成される可能性があります
                                </li>
                                <li>
                                    <strong className="text-white">技術的制約</strong>：
                                    文字や記号が正確に表現されていない場合があります
                                </li>
                            </ul>
                            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mt-4">
                                <p className="text-sm">
                                    <strong>重要：</strong>
                                    AI生成画像を使用する際は、上記の特性を考慮し、用途に適しているかご自身で判断してください。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 免責事項 */}
                    <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <FileText className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-black text-white">免責事項</h2>
                        </div>
                        <div className="space-y-4 text-slate-300">
                            <h3 className="font-bold text-white">1. 画像の品質・正確性について</h3>
                            <p>
                                当サイトは画像の品質向上に努めていますが、すべての画像が完璧であることを保証するものではありません。
                                画像の使用によって生じたいかなる損害についても、運営者は責任を負いかねます。
                            </p>

                            <h3 className="font-bold text-white mt-6">2. 第三者の権利侵害について</h3>
                            <p>
                                当サイトの画像は独自に生成したものですが、意図せず第三者の権利を侵害する可能性を完全に排除することはできません。
                                万が一、権利侵害の可能性がある場合は、速やかに<Link href="/contact" className="text-cyan-400 hover:underline">お問い合わせ</Link>ください。
                            </p>

                            <h3 className="font-bold text-white mt-6">3. サービスの中断・変更について</h3>
                            <p>
                                運営者は、予告なく本サービスの内容を変更、または提供を中断・終了する場合があります。
                                これによって生じたいかなる損害についても、運営者は責任を負いかねます。
                            </p>

                            <h3 className="font-bold text-white mt-6">4. 外部リンクについて</h3>
                            <p>
                                当サイトから外部サイトへのリンクは、情報提供を目的としています。
                                リンク先のサイトの内容について、運営者は一切の責任を負いません。
                            </p>
                        </div>
                    </section>

                    {/* 利用者の責任 */}
                    <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-black text-white mb-4">利用者の責任</h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                画像素材をご利用いただく際は、以下の点についてご自身の責任において判断してください：
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>画像が利用目的に適しているか</li>
                                <li>第三者の権利を侵害していないか</li>
                                <li>公序良俗に反する使用になっていないか</li>
                                <li>法令に違反する使用になっていないか</li>
                            </ul>
                            <p className="text-sm text-slate-400 mt-4">
                                画像の使用によって生じたトラブルや損害について、運営者は一切の責任を負いません。
                            </p>
                        </div>
                    </section>

                    {/* 準拠法・管轄裁判所 */}
                    <section className="bg-slate-900 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-black text-white mb-4">準拠法・管轄裁判所</h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                本免責事項および当サイトの利用に関しては、日本法を準拠法とします。
                            </p>
                            <p>
                                当サイトの利用に関して紛争が生じた場合は、運営者の所在地を管轄する裁判所を専属的合意管轄裁判所とします。
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-12 p-6 bg-slate-900 rounded-xl border border-white/10 text-center">
                    <p className="text-slate-400 text-sm">
                        最終更新日：2026年2月4日
                    </p>
                    <p className="text-slate-400 text-sm mt-2">
                        ご不明な点がございましたら、
                        <Link href="/contact" className="text-cyan-400 hover:underline">お問い合わせ</Link>
                        ください。
                    </p>
                </div>
            </main>
        </div>
    );
}
