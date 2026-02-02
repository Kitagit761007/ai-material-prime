import json
import os

json_path = os.path.join(os.getcwd(), 'public/data/assets.json')

try:
    with open(json_path, 'r', encoding='utf-8') as f:
        content = f.read()
        json.loads(content)
        print("JSON is valid")
except json.JSONDecodeError as e:
    print(f"JSON is invalid at line {e.lineno}, column {e.colno} (char {e.pos})")
    print("Error:", e.msg)
    start = max(0, e.pos - 50)
    end = min(len(content), e.pos + 50)
    print("--- Context around error ---")
    print(content[start:e.pos] + " [[ERROR HERE]] " + content[e.pos:end])
except Exception as e:
    print("Error:", e)
