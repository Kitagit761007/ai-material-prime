
const fs = require('fs');
const path = require('path');

const targetAbs = path.resolve(__dirname, '../data/assets.json');
console.log(`Processing: ${targetAbs}`);

try {
    const raw = fs.readFileSync(targetAbs, 'utf8');
    let data = JSON.parse(raw);

    // Mapping rules
    const map = {
        "Mobility": "モビリティ",
        "Energy": "エネルギー",
        "Tech": "テクノロジー",
        "Smart City": "スマートシティ",
        "SmartCity": "スマートシティ",
        "Resource": "資源・バイオ",
        "Hydrogen": "エネルギー",
        "Infrastructure": "スマートシティ",
        "Architecture": "スマートシティ",
        // Eco-Life maps to?
        "Eco-Life": "エコ・ライフスタイル",
        // Just in case
        "Eco Life": "エコ・ライフスタイル"
    };

    let count = 0;
    data = data.map(item => {
        if (map[item.category]) {
            item.category = map[item.category];
            count++;
        }
        return item;
    });

    fs.writeFileSync(targetAbs, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully updated ${count} items.`);

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
