export const metadata = {
    title: '当サイトについて | GX Prime Visuals',
    description: 'GX Prime Visualsのミッションとビジョンについて。',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gx-cyan to-gx-emerald">
                    GX Prime Visualsについて
                </h1>

                {/* English Summary Section */}
                <div className="mb-16 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl">
                    <h2 className="text-xs font-bold text-gx-cyan uppercase tracking-widest mb-4">[About This Site]</h2>
                    <p className="text-slate-300 text-base leading-relaxed font-medium">
                        This site provides high-quality, AI-generated futuristic architectural assets for creators worldwide. All resources are available for free to support your creative projects.
                    </p>
                </div>

                <section className="mb-20 space-y-8">
                    <h2 className="text-2xl font-bold text-white border-l-4 border-gx-cyan pl-4">
                        ミッション
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        GX Prime Visualsは、脱炭素社会の実現に向けた企業の取り組みを、最先端のAI技術によって「可視化」し、加速させることを使命としています。
                        <br /><br />
                        複雑で目に見えにくいエネルギー技術や環境ソリューションを、美しく、直感的なビジュアルアセットとして提供することで、投資家、ステークホルダー、そして一般消費者への訴求力を最大化します。
                    </p>
                </section>

                <section className="mb-20 space-y-8">
                    <h2 className="text-2xl font-bold text-white border-l-4 border-gx-emerald pl-4">
                        品質へのこだわり
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        当サイトのアセットはすべて、独自の「Anti-Gravity Pipeline」によって生成・選別されています。
                        構図、ライティング、そして科学的な整合性を考慮した厳格なスコアリングシステム（GX Score）を通過した画像のみが公開されます。
                        これにより、プレゼンテーション資料、ウェブサイト、IR資料など、あらゆるビジネスシーンで即戦力となる高いクオリティを保証します。
                    </p>
                </section>

                <section className="space-y-8">
                    <h2 className="text-2xl font-bold text-white border-l-4 border-white pl-4">
                        ご利用について
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        掲載されている画像は、GX推進を目的とする限りにおいて、商用・非商用を問わず幅広くご利用いただけます。
                        <br />
                        高解像度データの提供や、特定のテーマに基づいたカスタム生成のご依頼については、お問い合わせフォームよりご相談ください。
                    </p>
                </section>
            </div>
        </div>
    );
}
