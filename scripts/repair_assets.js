const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/data/assets.json');
let content = fs.readFileSync(filePath, 'utf8');

console.log("Original file size:", content.length);

// 1. Fix double commas
// Replace "}, , {" or "},, {" with "}, {"
content = content.replace(/},\s*,+\s*{/g, '}, {');

let data;
try {
    data = JSON.parse(content);
} catch (e) {
    console.log("Parse error, attempting more cleanup:", e.message);
    // Remove potential trailing commas before closing brackets
    content = content.replace(/,(\s*[\]}])/g, '$1');
    try {
        data = JSON.parse(content);
    } catch (e2) {
        console.error("Critical parse error:", e2.message);
        process.exit(1);
    }
}

const allowedCategories = ["GX", "未来都市", "モビリティ", "テクノロジー", "宇宙", "水中", "資源・バイオ", "エコ・ライフ"];

const categoryMap = {
    "スマートシティ": "未来都市",
};

data = data.map(item => {
    // 2. Image Path Sync
    const id = item.id;
    // Encode space and brackets: space -> %20, ( -> %28, ) -> %29
    const encodedId = id.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');

    // Folder naming convention based on prefix
    let prefix = id.split('-')[0].split(' ')[0].toLowerCase();

    // Especial case for id like "g-10 (2)" -> prefix is "g"
    item.url = `/assets/images/${prefix}/${encodedId}.jpg`;

    // 3. Category Normalization
    if (categoryMap[item.category]) {
        item.category = categoryMap[item.category];
    }

    if (!allowedCategories.includes(item.category)) {
        if (item.category.includes("都市")) item.category = "未来都市";
        else if (item.category.includes("エネ") || item.category.includes("GX")) item.category = "GX";
        else if (item.category.includes("水中") || item.category.includes("海")) item.category = "水中";
        else if (item.category.includes("宇宙")) item.category = "宇宙";
        else if (item.category.includes("車") || item.category.includes("交通") || item.category.includes("モビリティ")) item.category = "モビリティ";
        else if (item.category.includes("バイオ") || item.category.includes("資源")) item.category = "資源・バイオ";
        else if (item.category.includes("ライフ") || item.category.includes("エコ")) item.category = "エコ・ライフ";
        else item.category = "テクノロジー";
    }

    return item;
});

const output = JSON.stringify(data, null, 2);
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully repaired assets.json");
console.log("Total items:", data.length);
