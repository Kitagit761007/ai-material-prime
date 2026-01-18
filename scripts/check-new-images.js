const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Image paths
const images = [
    {
        path: 'C:/Users/hakut/.gemini/antigravity/brain/f119d78f-6ba4-4203-8545-a53ffe7ecd77/uploaded_image_0_1768710263947.jpg',
        title: '量子通信タワー',
        description: 'ホログラフィック通信リングを纏う次世代通信タワー。量子暗号技術により超高速・超安全な通信を実現する未来都市の中枢インフラ。',
        category: 'Smart City',
        tags: ['#量子通信', '#未来都市', '#5G/6G', '#商用利用可']
    },
    {
        path: 'C:/Users/hakut/.gemini/antigravity/brain/f119d78f-6ba4-4203-8545-a53ffe7ecd77/uploaded_image_1_1768710263947.jpg',
        title: 'スマートシティ中央タワー',
        description: 'AI制御による都市管理システムの中枢。ドローンネットワークと連携し、エネルギー・交通・セキュリティを統合管理する次世代インフラ。',
        category: 'Smart City',
        tags: ['#AI都市管理', '#ドローン', '#スマートインフラ', '#商用利用可']
    },
    {
        path: 'C:/Users/hakut/.gemini/antigravity/brain/f119d78f-6ba4-4203-8545-a53ffe7ecd77/uploaded_image_2_1768710263947.jpg',
        title: 'バイオフィリック集合住宅',
        description: '自然と建築が融合した有機的デザインの集合住宅。屋上緑化とソーラーパネルを統合し、カーボンニュートラルを実現する持続可能な居住空間。',
        category: 'Architecture',
        tags: ['#バイオフィリック', '#グリーンビルディング', '#持続可能建築', '#商用利用可']
    },
    {
        path: 'C:/Users/hakut/.gemini/antigravity/brain/f119d78f-6ba4-4203-8545-a53ffe7ecd77/uploaded_image_3_1768710263947.jpg',
        title: 'オーガニック・レジデンス',
        description: '流線型の有機的フォルムと垂直庭園が調和した未来型住宅。自然光と緑を最大限に取り入れ、居住者の健康とウェルビーイングを追求。',
        category: 'Architecture',
        tags: ['#オーガニック建築', '#垂直庭園', '#ウェルビーイング', '#商用利用可']
    },
    {
        path: 'C:/Users/hakut/.gemini/antigravity/brain/f119d78f-6ba4-4203-8545-a53ffe7ecd77/uploaded_image_4_1768710263947.jpg',
        title: '空中交通ネットワーク',
        description: '自動運転ポッドが縦横無尽に移動する3次元交通システム。渋滞ゼロの未来都市を実現する革新的モビリティインフラ。',
        category: 'Mobility',
        tags: ['#空中交通', '#自動運転', '#3D交通網', '#商用利用可']
    }
];

async function calculateHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}

async function main() {
    console.log('🔐 Calculating SHA-256 hashes for uploaded images...\n');

    for (const img of images) {
        try {
            const hash = await calculateHash(img.path);
            const fileName = path.basename(img.path);
            console.log(`📁 ${fileName}`);
            console.log(`   Title: ${img.title}`);
            console.log(`   Hash: ${hash}`);
            console.log(`   Category: ${img.category}`);
            console.log('');
        } catch (error) {
            console.error(`❌ Error processing ${img.path}:`, error.message);
        }
    }
}

main();
