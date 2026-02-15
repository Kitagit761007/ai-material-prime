// ai-material-prime/app/business/page.tsx

export const metadata = {
  title: "法人向け | 11枚パック & 特注生成 | GX Prime Visuals",
  description:
    "GX・脱炭素・サステナビリティ領域のビジュアルを、法人向けに「11枚パック」または「特注生成」で提供。利用規約に準拠し、見積・相談から導入までを明確化します。",
};

function CTA({ label = "見積・相談する（フォームへ）" }: { label?: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href="/contact?source=business"
        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        {label}
      </a>
      <a
        href="/"
        className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:opacity-80"
      >
        素材を見る
      </a>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm opacity-80">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function BusinessPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {/* HERO */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge>法人向け</Badge>
          <Badge>11枚パック</Badge>
          <Badge>特注生成（カスタム制作）</Badge>
          <Badge>利用規約に準拠</Badge>
        </div>

        <h1 className="text-2xl font-bold leading-tight">
          GX・脱炭素領域のビジュアルを
          <br />
          「11枚パック」または「特注生成」で提供します
        </h1>

        <p className="text-base leading-7">
          提案書・スライド・Web・SNSなど、GX／サステナビリティの文脈を「一瞬で伝わる」ビジュアルで補強します。
          法人利用で止まりやすい権利面（利用範囲・再配布・ロゴ化等）は、
          <a className="underline" href="/terms/">
            利用規約
          </a>
          に準拠した形で整理し、導入判断を前に進めます。
        </p>

        <CTA />
        <p className="text-sm leading-6 opacity-80">
          ※本ページは「素材の再配布・転売」を目的としたものではなく、法人の制作運用を前提にした提案・制作（役務）として提供します。
          詳細条件は見積・提案時に個別合意します。
        </p>
      </div>

      {/* PROBLEMS */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">法人でよくある課題</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>GX／脱炭素の説明が抽象的で、資料の説得力が弱い</li>
          <li>権利表記が曖昧な画像は使えず、社内チェックで止まる</li>
          <li>複数媒体（資料・LP・SNS）でトーンが揃わずブランドが崩れる</li>
          <li>素材探し・選定・整形に時間がかかり、制作運用コストが増える</li>
        </ul>
      </section>

      {/* OFFER */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">提供メニュー</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Card
            title="11枚パック（法人向け）"
            subtitle="用途要件に合わせて構成・選定し、必要に応じて新規生成も含めて提供します。"
          >
            <ul className="list-disc space-y-2 pl-5">
              <li>用途別（提案書／LP／SNSなど）に「使える状態」で構成</li>
              <li>統一トーン（色・世界観・情報密度）を優先</li>
              <li>必要に応じて新規生成・差し替えを提案（範囲は事前合意）</li>
              <li>提供方法：担当者向けの専用共有（アクセス制御）で提供（要件により決定）</li>
            </ul>

            <div className="mt-4 rounded-md border p-4">
              <p className="text-sm font-semibold">フォームに書いてほしい最小情報</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>用途（提案書 / LP / SNS / 広告 / その他）</li>
                <li>テーマ（未来都市 / 再エネ / サステナ / 脱炭素 など）</li>
                <li>希望納期（目安でOK）</li>
              </ul>
            </div>

            <CTA label="11枚パックを相談する" />
          </Card>

          <Card
            title="特注生成（カスタム制作）"
            subtitle="既存素材では満たせない要件に合わせて制作します。"
          >
            <ul className="list-disc space-y-2 pl-5">
              <li>自社サービス文脈・訴求軸に合わせたビジュアル設計</li>
              <li>シリーズ展開（同一世界観で複数枚）</li>
              <li>媒体別最適化（資料向け／LP向け／SNS向け）</li>
              <li>修正・差し替えは要件により範囲を決定（事前に合意）</li>
            </ul>

            <div className="mt-4 rounded-md border p-4">
              <p className="text-sm font-semibold">フォームに書いてほしい最小情報</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>利用目的（誰に何を伝えるか）</li>
                <li>利用媒体（資料/LP/SNS/広告など）</li>
                <li>必要枚数（目安でOK）</li>
                <li>制約（NG表現、社内規定があれば）</li>
              </ul>
            </div>

            <CTA label="特注生成を相談する" />
          </Card>
        </div>
      </section>

      {/* FREE vs BUSINESS */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">無料公開素材と法人向け提供の違い</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Card
            title="無料公開素材（サイト掲載分）"
            subtitle="利用条件は利用規約に準拠します。"
          >
            <ul className="list-disc space-y-2 pl-5 text-sm">
              <li>
                利用条件は{" "}
                <a className="underline" href="/terms/">
                  利用規約
                </a>{" "}
                に準拠
              </li>
              <li>必要な素材を自社で選定して利用</li>
              <li>用途別最適化や統一トーンの担保は自社運用</li>
            </ul>
          </Card>

          <Card
            title="法人向け（11枚パック／特注生成）"
            subtitle="制作運用を前提に、要件に合わせて提案・制作（役務）として提供します。"
          >
            <ul className="list-disc space-y-2 pl-5 text-sm">
              <li>用途要件に合わせた構成・選定・設計</li>
              <li>統一トーンを担保して社内外での見え方を揃える</li>
              <li>必要に応じて新規生成・差し替えを提案（範囲は事前合意）</li>
              <li>提供方法は要件により決定（担当者向け専用共有など）</li>
            </ul>
          </Card>
        </div>

        <p className="mt-4 text-sm leading-6 opacity-80">
          ※無料公開素材の利用条件は{" "}
          <a className="underline" href="/terms/">
            利用規約
          </a>{" "}
          に準拠します。法人向けは「素材の再配布」を目的とせず、要件に基づく提案・制作として提供します。
        </p>
      </section>

      {/* PROCESS */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">導入の流れ</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>フォーム送信（11枚パック／特注生成、用途、希望納期など）</li>
          <li>内容確認 → 提案（構成・提供方法・金額・スケジュール）</li>
          <li>決済 → 提供（合意した方法で提供）</li>
        </ol>

        <div className="mt-6 rounded-lg border p-5">
          <h3 className="text-base font-semibold">支払い方法（仮）</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            <li>クレジットカード決済（例：Stripe）</li>
            <li>銀行振込</li>
            <li>請求書払い（要相談）</li>
          </ul>
          <p className="mt-2 text-sm opacity-80">
            ※上記は予定です。実際の可否は見積・提案時に確定します。
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-5 space-y-4">
          <div className="rounded-lg border p-5">
            <p className="font-semibold">Q. まずは相談だけでも大丈夫ですか？</p>
            <p className="mt-2 text-sm leading-6">
              A. 可能です。用途（資料/LP/SNS/広告など）と希望納期が分かる範囲でOKです。
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <p className="font-semibold">Q. 利用条件はどこを見ればいいですか？</p>
            <p className="mt-2 text-sm leading-6">
              A. 無料公開素材の条件は{" "}
              <a className="underline" href="/terms/">
                利用規約
              </a>{" "}
              に準拠します。法人向けの具体条件は見積・提案時に個別合意します。
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <p className="font-semibold">Q. 提供方法（納品形態）は？</p>
            <p className="mt-2 text-sm leading-6">
              A. 要件により決定します（担当者向け専用共有など）。素材の再配布を目的としない形で提供します。
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mt-12 rounded-lg border p-6">
        <h2 className="text-lg font-semibold">見積・相談（フォーム）</h2>
        <p className="mt-2 text-sm leading-6 opacity-80">
          「11枚パック」か「特注生成」か迷っていてもOKです。用途と媒体が分かる範囲で十分です。
        </p>
        <CTA />
      </section>
    </main>
  );
}
