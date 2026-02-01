import json
import re
import os

file_path = os.path.join(os.getcwd(), 'public/data/assets.json')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original file size: {len(content)}")

# 1. Fix double commas
# Replace "}, , {" or "},, {" with "}, {"
content = re.sub(r'},\s*,+\s*{', '}, {', content)

try:
    data = json.loads(content)
except json.JSONDecodeError as e:
    print(f"Parse error, attempting more cleanup: {e}")
    # Remove potential trailing commas before closing brackets
    content = re.sub(r',(\s*[\]}])', r'\1', content)
    try:
        data = json.loads(content)
    except json.JSONDecodeError as e2:
        print(f"Critical parse error: {e2}")
        exit(1)

allowed_categories = ["GX", "未来都市", "モビリティ", "テクノロジー", "宇宙", "水中", "資源・バイオ", "エコ・ライフ"]

category_map = {
    "スマートシティ": "未来都市",
}

for item in data:
    # 2. Image Path Sync
    item_id = item.get('id', '')
    # Encode space and brackets: space -> %20, ( -> %28, ) -> %29
    encoded_id = item_id.replace(' ', '%20').replace('(', '%28').replace(')', '%29')
    
    # Folder naming convention based on prefix (everything before the first dash)
    # Example: g-1 -> g, mid-1 -> mid
    parts = item_id.split('-')
    if len(parts) > 1:
        prefix = parts[0].strip().split(' ')[0].lower()
    else:
        prefix = item_id.lower()
    
    item['url'] = f"/assets/images/{prefix}/{encoded_id}.jpg"

    # 3. Category Normalization
    category = item.get('category', 'テクノロジー')
    if category in category_map:
        category = category_map[category]
    
    if category not in allowed_categories:
        if "都市" in category: category = "未来都市"
        elif "エネ" in category or "GX" in category: category = "GX"
        elif "水中" in category or "海" in category: category = "水中"
        elif "宇宙" in category: category = "宇宙"
        elif "車" in category or "交通" in category or "モビリティ" in category: category = "モビリティ"
        elif "バイオ" in category or "資源" in category: category = "資源・バイオ"
        elif "ライフ" in category or "エコ" in category: category = "エコ・ライフ"
        else: category = "テクノロジー"
    
    item['category'] = category

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully repaired assets.json")
print(f"Total items: {len(data)}")
