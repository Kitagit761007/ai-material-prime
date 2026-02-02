/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. GitHub Pages用にHTMLとして書き出す設定
  output: 'export',
  
  // 2. GitHub Pagesで画像を表示させるための設定
  images: {
    unoptimized: true,
  },
  
  // 3. リンク（/category/GXなど）を正常に動かすための設定
  trailingSlash: true,
};

export default nextConfig;
