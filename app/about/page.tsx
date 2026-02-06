export const metadata = {
  title: "当サイトについて | GX Prime Visuals",
  description: "GX Prime Visualsの目的・運営方針・利用条件（要約）について。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gx-cyan to-gx-emerald">
          GX Prime Visualsについて
        </h1>

        {/* Summary */}
        <div className="mb-10 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl">
          <h2 className="text-xs font-bold text-gx-cyan uppercase tracking-widest mb-4">
            [About This Site]
          </h2>
          <p className="text-slate-300 text-base leading-relaxed font-medium">
            GX Prime Visuals は、AIによって生成された未来都市・脱炭素・テクノロジー領域の
            高品質ビジュアル素材を提供するアセットライブラリです。プレゼン資料、Web、広告、
            企画書など、ビジネス用途を中心に幅広く使える画像を公開しています。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-4">
            ※掲載画像はAI生成です。実在の場所・施設・人物を示すものではありません。
          </p>
        </div>

        {/* Mission */}
        <section className="mb-14 space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-gx-cyan pl-4">
            ミッション
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            GX Prime Visualsは、脱炭素社会の実現に向けた企業の取り組みを、最先端のAI技術によって
            「可視化」し、コミュニケーションを加速させることを使命としています。
            <br /><br />
            複雑で目に見えにくいエネルギー技術や環境ソリューションを、美しく直感的なビジュアル素材として提供し、
            企画・プレゼン・広報・IRなどの場面で伝達力を高めることを目指します。
          </p>
        </section>

        {/* Quality */}
        <section className="mb-14 space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-gx-emerald pl-4">
            品質へのこだわり
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            当サイトのアセットは、独自の「Anti-Gravity Pipeline」によって生成・選別されています。
            構図、ライティング、視認性、そして世界観の一貫性を重視し、スコアリング（GX Score）を通過した画像のみを公開します。
            <br /><br />
            そのため、プレゼン資料、Webサイト、LP、IR資料など、ビジネスシーンで即戦力になる品質を目標に設計しています。
          </p>
        </section>

        {/* License Summary */}
        <section className="mb-14 space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-white pl-4">
            ご利用について（要約）
          </h2>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <ul className="text-slate-300 text-base leading-relaxed list-disc pl-5 space-y-2">
              <li>商用・非商用を問わず利用できます（クレジット表記は不要）。</li>
              <li>プレゼン資料、Web、動画、広告、印刷物などに利用可能です。</li>
              <li>
                禁止事項：画像そのものの再配布・販売（素材集としての転載は禁止利用）、
                誤認を招く利用（公式/提携を装う等）、権利侵害につながる用途。
              </li>
            </ul>
            <p className="text-slate-400 text-sm mt-4">
              詳細は <a className="text-cyan-400 hover:text-cyan-300 underline" href="/guide">利用ガイド</a> および{" "}
              <a className="text-cyan-400 hover:text-cyan-300 underline" href="/terms">利用規約</a> をご確認ください。
            </p>
          </div>
        </section>

        {/* Operator / Contact */}
        <section className="mb-14 space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-gx-cyan pl-4">
            運営・お問い合わせ
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            ご要望（追加してほしいカテゴリ・用途別素材など）や、企業向けの高解像度提供・カスタム生成のご相談は、
            お問い合わせフォームよりご連絡ください。
          </p>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-slate-300 text-sm leading-relaxed">
              運営：GX Prime Visuals（個人運営）<br />
              連絡：<a className="text-cyan-400 hover:text-cyan-300 underline" href="/contact">お問い合わせフォーム</a><br />
              ※権利者の申し立て・削除依頼がある場合も、フォームよりご連絡ください。
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-white pl-4">
            免責
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            当サイトの画像はAI生成であり、権利侵害の可能性が完全にゼロであることを保証するものではありません。
            ご利用にあたっては、利用者の責任において最終確認をお願いします。
            <br /><br />
            詳細は <a className="text-cyan-400 hover:text-cyan-300 underline" href="/privacy">プライバシーポリシー</a> および{" "}
            <a className="text-cyan-400 hover:text-cyan-300 underline" href="/terms">利用規約</a> をご参照ください。
          </p>
        </section>
      </div>
    </div>
  );
}
