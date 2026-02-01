import json
import os
import re

def repair_and_sync_assets(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            # If load fails, try content cleanup (from previous script)
            f.seek(0)
            content = f.read()
            content = re.sub(r'\},\\s*,+\\s*\{', '}, {', content)
            content = re.sub(r',(\\s*[\\]}])', r'\\1', content)
            data = json.loads(content)

    for item in data:
        # ID and URL Sync
        item_id = item.get('id', '')
        # Remove any existing extension and force .jpg
        clean_id = item_id.split('.')[0]
        
        # Determine prefix for folder structure
        # Use first part of id if it has a dash, e.g., 'g-1' -> 'g'
        parts = item_id.split('-')
        if len(parts) > 1:
            prefix = parts[0].strip().split(' ')[0].lower()
        else:
            prefix = 'grok' # Default or based on ID string
            if item_id.startswith('mid'): prefix = 'mid'
            if item_id.startswith('niji'): prefix = 'niji'
        
        # Ensure URL starts with /assets/images/ and ends with .jpg
        # Encoded ID for URL safely
        encoded_id = item_id.replace(' ', '%20').replace('(', '%28').replace(')', '%29')
        # If it's already an ID without extension, add .jpg
        if '.' not in encoded_id:
            encoded_id += ".jpg"
        else:
            # Replace extension with .jpg
            encoded_id = re.sub(r'\.[a-zA-Z0-9]+$', '.jpg', encoded_id)
            
        item['url'] = f"/assets/images/{prefix}/{encoded_id}"
        
        # Tags cleanup - ensure no empty strings and trimmed
        if 'tags' in item:
            item['tags'] = [tag.strip() for tag in item['tags'] if tag.strip()]

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    assets_path = "public/data/assets.json"
    if os.path.exists(assets_path):
        repair_and_sync_assets(assets_path)
        print(f"Successfully repaired and synced {assets_path}")
    else:
        print(f"Error: {assets_path} not found")
