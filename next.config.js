/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的サイトとして書き出しを強制する
  output: 'export',
  // 画像の最適化をオフにする（GitHub Pagesでは必須）
  images: {
    unoptimized: true,
  },
  // URLの末尾にスラッシュを付けてリンク切れを防ぐ
  trailingSlash: true,
};

module.exports = nextConfig;
