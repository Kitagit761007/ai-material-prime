
// ai-material-prime/app/business/page.tsx

export const metadata = {
  title: "法人向け | GX Prime Visuals",
  description:
    "GX・脱炭素領域のビジュアル素材を、商用利用可能なライセンスで法人向けに提供します。",
};

export default function BusinessPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">
        GX・脱炭素領域のビジュアル素材（法人向け）
      </h1>

      <p className="mt-4 text-base leading-7">
        サステナブル／未来都市／エネルギー転換を伝える高品質画像を、商用利用可能なライセンスで提供します。
        社内資料・提案書・Web・SNSなど、用途に合わせてすぐ使える形で納品します。
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="/contact"
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:opacity-80"
        >
          見積・相談する
        </a>
        <a
          href="/"
          className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          素材を見る
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">この素材で解決できること</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>企画書や提案資料の「見た目が弱い」を改善したい</li>
          <li>GX／脱炭素の説明を、視覚的に一瞬で伝えたい</li>
          <li>トーンが合う素材がなく、統一感が出ない</li>
          <li>権利面を整理した上で安全に使いたい</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">提供内容</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>画像：11枚（セット）</li>
          <li>形式：JPG/PNG（いずれか）</li>
          <li>主用途：Web、SNS、スライド、社内資料</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">ライセンス</h2>

        <h3 className="mt-4 font-semibold">商用利用：OK（クレジット表記：任意）</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>自社Webサイト／ブログ／LP</li>
          <li>SNS投稿・広告クリエイティブ（静止画）</li>
          <li>プレゼン資料、ホワイトペーパー、社内資料</li>
          <li>動画（サムネイル／挿絵）への利用</li>
        </ul>

        <h3 className="mt-6 font-semibold">禁止事項</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>画像データそのものの再配布／転売（素材としての再提供を含む）</li>
          <li>素材サイトへの再投稿、ストックサイトへの登録</li>
          <li>商標登録・ロゴ化・権利主張</li>
          <li>違法・誤解を招く用途、公序良俗に反する用途</li>
        </ul>

        <p className="mt-4 text-sm leading-6 opacity-80">
          追加の利用可否が不明な場合は、事前にご相談ください。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">導入の流れ</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>見積・相談（またはパック購入）</li>
          <li>納品（ダウンロード／メール送付）</li>
          <li>利用開始</li>
        </ol>
      </section>
    </main>
  );
}
