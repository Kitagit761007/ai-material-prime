import type { Metadata } from "next";
import Link from "next/link";
import assetsData from "@/public/data/assets.json";

type Asset = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  url?: string; // /assets/images/xxx.jpg のような想定
};

function getAssetById(id: string): Asset | undefined {
  return (assetsData as Asset[]).find((a) => a.id === id);
}

function absoluteUrl(path: string) {
  // ローカルではOGPの絶対URLは正確に作れないので、環境変数があれば使う
  // 本番で NEXT_PUBLIC_SITE_URL を設定するとOGPが安定します
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return path;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const asset = getAssetById(params.id);

  if (!asset) {
    return {
      title: "Not Found | AI Material Prime",
      description: "Asset not found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${asset.title} | AI Material Prime`;
  const description =
    asset.description ??
    "高品質AIビジュアル素材。商用利用可能。用途に合わせてご活用ください。";

  const pageUrl = absoluteUrl(`/assets/${asset.id}/`);
  const imageUrl = asset.url ? absoluteUrl(asset.url) : undefined;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const asset = getAssetById(params.id);

  if (!asset) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 p-10">
        <h1 className="text-2xl font-bold mb-6">404 - Page Not Found</h1>
        <Link className="text-cyan-400 underline" href="/">
          Back to Home
        </Link>
      </div>
    );
  }

  const title = asset.title;
  const description =
    asset.description ??
    "高品質AIビジュアル素材。商用利用可能。用途に合わせてご活用ください。";
  const url = asset.url ?? "";
  const tags = asset.tags ?? [];

  // 共有URL（ブラウザのURLを使うのでクライアント側で生成）
  // 静的書き出しでも動くように、クリック時に location.href を使います
  const shareText = `${title}｜AI Material Prime`;
  const shareHashtags =
    tags
      .map((t) => t.replace(/^#/, ""))
      .filter(Boolean)
      .slice(0, 6)
      .join(",") || "AIMaterial,AI素材";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      {/* シンプルなヘッダー（既存Headerを使いたいなら差し替えてOK） */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <Link href="/" className="text-white font-black italic tracking-tight">
          AI MATERIAL PRIME
        </Link>
        <Link href="/" className="text-slate-300 hover:text-white">
          Back
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 画像 */}
          <div className="bg-black/40 rounded-3xl p-6 border border-white/10">
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
              />
            ) : (
              <div className="text-slate-300">画像URLが見つかりません</div>
            )}
          </div>

          {/* 情報 */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-white/10">
            <h1 className="text-3xl md:text-4xl font-black italic tracking-tight mb-5">
              {title}
            </h1>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-slate-200 leading-relaxed">
              {description}
            </div>

            {/* ダウンロード */}
            <div className="mt-8">
              {url ? (
                <a
                  href={url}
                  download
                  className="block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-5 rounded-2xl transition"
                >
                  無料ダウンロード
                </a>
              ) : (
                <div className="text-slate-300">ダウンロードURLがありません</div>
              )}
            </div>

            {/* SNSボタン 4つ */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* X */}
              <button
                onClick={() => {
                  const pageUrl = encodeURIComponent(location.href);
                  const text = encodeURIComponent(shareText);
                  const hashtags = encodeURIComponent(shareHashtags);
                  const shareUrl = `https://x.com/intent/tweet?text=${text}&url=${pageUrl}&hashtags=${hashtags}`;
                  window.open(shareUrl, "_blank", "noopener,noreferrer");
                }}
                className="w-full rounded-xl border border-white/10 bg-black/30 hover:bg-black/40 px-4 py-3 font-bold"
              >
                X
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => {
                  const pageUrl = encodeURIComponent(location.href);
                  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                  window.open(shareUrl, "_blank", "noopener,noreferrer");
                }}
                className="w-full rounded-xl border border-white/10 bg-[#0A66C2] hover:opacity-90 px-4 py-3 font-bold"
              >
                LinkedIn
              </button>

              {/* LINE */}
              <button
                onClick={() => {
                  const pageUrl = encodeURIComponent(location.href);
                  const text = encodeURIComponent(`${shareText}\n${location.href}`);
                  const shareUrl = `https://social-plugins.line.me/lineit/share?url=${pageUrl}&text=${text}`;
                  window.open(shareUrl, "_blank", "noopener,noreferrer");
                }}
                className="w-full rounded-xl border border-white/10 bg-[#06C755] hover:opacity-90 px-4 py-3 font-bold text-black"
              >
                LINE
              </button>

              {/* 共有（スマホ向け） */}
              <button
                onClick={async () => {
                  const data = { title: shareText, text: description, url: location.href };
                  // Web Share API 対応端末のみ動きます。非対応はコピーにフォールバック。
                  // @ts-ignore
                  if (navigator.share) {
                    try {
                      // @ts-ignore
                      await navigator.share(data);
                      return;
                    } catch {
                      // ユーザーキャンセル等は無視
                    }
                  }
                  await navigator.clipboard.writeText(location.href);
                  alert("リンクをコピーしました");
                }}
                className="w-full rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-4 py-3 font-bold"
              >
                共有（スマホ）
              </button>
            </div>

            {/* タグ */}
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.slice(0, 12).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
