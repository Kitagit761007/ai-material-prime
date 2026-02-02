/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ✅ 必須：静的サイト書き出しで画像を表示させる設定
  },
};

export default nextConfig;
