import json
import os
import re

json_path = 'public/data/assets.json'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

space_keywords = ['宇宙', 'Space', 'Galaxy', '銀河', '恒星', '惑星', '星']

def get_base_id(id_str):
    return id_str.split('-')[0]

for item in data:
    # 1. URL Rewrite
    id_str = item.get('id', '')
    prefix = get_base_id(id_str)
    
    # Absolute path unification
    item['url'] = f"/assets/images/{prefix}/{id_str}.jpg"
    
    # 2. Category Normalization & Space Mapping
    category = item.get('category', '').strip()
    
    # Check if it should be in "宇宙"
    search_text = (item.get('title', '') + ' ' + item.get('description', '') + ' ' + ' '.join(item.get('tags', []))).lower()
    
    is_space = any(kw.lower() in search_text for kw in space_keywords)
    
    if is_space:
        item['category'] = '宇宙'
    else:
        # Just trim and normalize
        item['category'] = category

# Final check: Normalize all categories to match UI labels if they are slightly off
# (Optional, but good for robustness)
mapping = {
    'GX': 'GX',
    '未来都市': '未来都市',
    'モビリティ': 'モビリティ',
    'テクノロジー': 'テクノロジー',
    '宇宙': '宇宙',
    '水中': '水中',
    '資源・バイオ': '資源・バイオ',
    'エコ・ライフ': 'エコ・ライフ'
}
# We don't have a strict mapping here but those are the target ones.

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Processed {len(data)} items.")
