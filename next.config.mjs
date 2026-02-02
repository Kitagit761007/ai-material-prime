/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // 静的HTMLとして書き出す（必須）
  images: { unoptimized: true }, // 画像を表示させる（必須）
  trailingSlash: true,        // URLの末尾を整えて404を防ぐ（必須）
};

module.exports = nextConfig;
