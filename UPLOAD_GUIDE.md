# 逕ｻ蜒上い繝・・繝ｭ繝ｼ繝峨ぎ繧､繝・

縺薙・繧ｬ繧､繝峨〒縺ｯ縲・㍾隍・､懃衍繝輔ぅ繝ｫ繧ｿ繧貞ｙ縺医◆繧ｹ繝槭・繝医い繝・・繝ｭ繝ｼ繝繝ｼ縺ｮ菴ｿ逕ｨ譁ｹ豕輔ｒ隱ｬ譏弱＠縺ｾ縺吶・

## 讎りｦ・

縺薙・繧｢繝・・繝ｭ繝ｼ繝繝ｼ縺ｯ縲ヾHA-256繝上ャ繧ｷ繝･蛟､繧剃ｽｿ逕ｨ縺励※逕ｻ蜒上・驥崎､・ｒ閾ｪ蜍墓､懃衍縺励∫┌鬧・↑繧｢繝・・繝ｭ繝ｼ繝峨ｒ髦ｲ縺弱∪縺吶・

## 讖溯・

笨・**SHA-256繝上ャ繧ｷ繝･險育ｮ・*: 繧｢繝・・繝ｭ繝ｼ繝牙燕縺ｫ逕ｻ蜒上・繝上ャ繧ｷ繝･蛟､繧定ｨ育ｮ・ 
笨・**驥崎､・､懃衍**: 譌｢蟄倡判蜒上→豈碑ｼ・＠縲・㍾隍・ｒ閾ｪ蜍墓､懷・  
笨・**繧ｹ繧ｭ繝・・騾夂衍**: 驥崎､・凾縺ｯ譏守｢ｺ縺ｪ繝｡繝・そ繝ｼ繧ｸ縺ｧ騾夂衍  
笨・**閾ｪ蜍墓峩譁ｰ**: `assets.json`繧定・蜍慕噪縺ｫ譖ｴ譁ｰ  
笨・**GitHub邨ｱ蜷・*: PAT隱崎ｨｼ縺ｧGitHub API縺ｫ逶ｴ謗･繧｢繝・・繝ｭ繝ｼ繝・

## 菴ｿ逕ｨ譁ｹ豕・

### 蝓ｺ譛ｬ逧・↑菴ｿ縺・婿

```bash
node scripts/upload-image.js <逕ｻ蜒上ヱ繧ｹ> --title "繧ｿ繧､繝医Ν" --category "繧ｫ繝・ざ繝ｪ"
```

### 繧ｪ繝励す繝ｧ繝ｳ

| 繧ｪ繝励す繝ｧ繝ｳ | 隱ｬ譏・| 蠢・・|
|-----------|------|------|
| `<逕ｻ蜒上ヱ繧ｹ>` | 繧｢繝・・繝ｭ繝ｼ繝峨☆繧狗判蜒上ヵ繧｡繧､繝ｫ縺ｮ繝代せ | 笨・|
| `--title` | 逕ｻ蜒上・繧ｿ繧､繝医Ν | 箝・|
| `--description` | 逕ｻ蜒上・隱ｬ譏取枚 | 笶・|
| `--category` | 繧ｫ繝・ざ繝ｪ (Energy, Mobility, Smart City遲・ | 箝・|
| `--tags` | 繧ｿ繧ｰ・医き繝ｳ繝槫玄蛻・ｊ・・| 笶・|

### 菴ｿ逕ｨ萓・

#### 萓・: 蝓ｺ譛ｬ逧・↑繧｢繝・・繝ｭ繝ｼ繝・

```bash
node scripts/upload-image.js ./new-image.jpg --title "豌ｴ邏辯・侭髮ｻ豎" --category "Energy"
```

#### 萓・: 隧ｳ邏ｰ諠・ｱ繧貞性繧繧｢繝・・繝ｭ繝ｼ繝・

```bash
node scripts/upload-image.js ./smart-city.png \
  --title "谺｡荳紋ｻ｣繧ｹ繝槭・繝医す繝・ぅ" \
  --description "AI蛻ｶ蠕｡縺ｫ繧医ｋ譛驕ｩ蛹悶＆繧後◆驛ｽ蟶ゅう繝ｳ繝輔Λ" \
  --category "Smart City" \
  --tags "#AI,#IoT,#繧ｹ繝槭・繝医す繝・ぅ,#蝠・畑蛻ｩ逕ｨ蜿ｯ"
```

## 蜍穂ｽ懊ヵ繝ｭ繝ｼ

```
1. 刀 逕ｻ蜒上ヵ繧｡繧､繝ｫ繧定ｪｭ縺ｿ霎ｼ縺ｿ
   竊・
2. 柏 SHA-256繝上ャ繧ｷ繝･繧定ｨ育ｮ・
   竊・
3. 剥 譌｢蟄倡判蜒上・繝上ャ繧ｷ繝･縺ｨ豈碑ｼ・
   竊・
4. 笶・驥崎､・メ繧ｧ繝・け
   笏懌楳 驥崎､・≠繧・竊・笞・・ 繧ｹ繧ｭ繝・・騾夂衍
   笏披楳 驥崎､・↑縺・竊・豆 GitHub API縺ｸ繧｢繝・・繝ｭ繝ｼ繝・
                  竊・
                 統 assets.json譖ｴ譁ｰ
                  竊・
                 脂 螳御ｺ・
```

## 蜃ｺ蜉帑ｾ・

### 驥崎､・′讀懃衍縺輔ｌ縺溷ｴ蜷・

```
噫 Smart Image Uploader with Duplicate Detection

刀 Image: ./duplicate-image.jpg
統 Title: 繝・せ繝育判蜒・
唐 Category: Energy

柏 Calculating SHA-256 hash...
   Hash: a1b2c3d4e5f6...

剥 Checking for duplicates...
投 Scanning 33 existing images...

笞・・ 笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊・
笞・・ 驥崎､・ｒ讀懃衍縺励◆縺溘ａ繧ｹ繧ｭ繝・・縺励∪縺励◆
笞・・ 笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊・

   譌｢蟄倥ヵ繧｡繧､繝ｫ: public/assets/images/energy/existing-image.jpg
   繝上ャ繧ｷ繝･蛟､: a1b2c3d4e5f6...

庁 縺薙・逕ｻ蜒上・譌｢縺ｫ繝ｪ繝昴ず繝医Μ縺ｫ蟄伜惠縺励∪縺吶・
   繧｢繝・・繝ｭ繝ｼ繝峨ｒ荳ｭ豁｢縺励∪縺励◆縲・
```

### 豁｣蟶ｸ縺ｫ繧｢繝・・繝ｭ繝ｼ繝峨＆繧後◆蝣ｴ蜷・

```
噫 Smart Image Uploader with Duplicate Detection

刀 Image: ./new-image.jpg
統 Title: 譁ｰ縺励＞逕ｻ蜒・
唐 Category: Energy

柏 Calculating SHA-256 hash...
   Hash: x9y8z7w6v5u4...

剥 Checking for duplicates...
投 Scanning 33 existing images...
笨・No duplicates found - proceeding with upload

豆 Uploading to GitHub...
笨・Uploaded to: public/assets/images/energy/new-image.jpg

統 Updating assets.json...
笨・assets.json updated successfully

脂 笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊・
脂 Upload completed successfully!
脂 笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊絶武笊・

   Image: new-image.jpg
   Hash: x9y8z7w6v5u4...
   Path: public/assets/images/energy/new-image.jpg
```

## 迺ｰ蠅・､画焚

繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡後☆繧句燕縺ｫ縲；itHub Personal Access Token (PAT) 繧堤腸蠅・､画焚縺ｨ縺励※險ｭ螳壹＠縺ｦ縺上□縺輔＞・・

### Windows (PowerShell)
```powershell
$env:GITHUB_TOKEN="your_github_pat_here"
```

### Windows (Command Prompt)
```cmd
set GITHUB_TOKEN=your_github_pat_here
```

### Linux / macOS
```bash
export GITHUB_TOKEN=your_github_pat_here
```

> **驥崎ｦ・*: PAT縺ｯ `repo` 讓ｩ髯舌′蠢・ｦ√〒縺吶・GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) 縺ｧ菴懈・縺ｧ縺阪∪縺吶・

## 繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### 繧ｨ繝ｩ繝ｼ: File not found

```bash
笶・Error: File not found: ./image.jpg
```

**隗｣豎ｺ遲・*: 逕ｻ蜒上ヵ繧｡繧､繝ｫ縺ｮ繝代せ縺梧ｭ｣縺励＞縺狗｢ｺ隱阪＠縺ｦ縺上□縺輔＞縲・

### 繧ｨ繝ｩ繝ｼ: GitHub API error

```bash
笶・GitHub API error: 401 - Unauthorized
```

**隗｣豎ｺ遲・*: PAT縺梧ｭ｣縺励＞縺九∵ｨｩ髯舌′驕ｩ蛻・°遒ｺ隱阪＠縺ｦ縺上□縺輔＞縲・

### 繧ｨ繝ｩ繝ｼ: Cannot find module

```bash
Error: Cannot find module './hash-utils'
```

**隗｣豎ｺ遲・*: `scripts/`繝・ぅ繝ｬ繧ｯ繝医Μ縺九ｉ螳溯｡後＠縺ｦ縺・ｋ縺狗｢ｺ隱阪＠縺ｦ縺上□縺輔＞縲・

## 繧ｻ繧ｭ繝･繝ｪ繝・ぅ

- 笨・SHA-256繝上ャ繧ｷ繝･縺ｫ繧医ｋ遒ｺ螳溘↑驥崎､・､懃衍
- 笨・GitHub PAT隱崎ｨｼ縺ｫ繧医ｋ螳牙・縺ｪ繧｢繝・・繝ｭ繝ｼ繝・
- 笨・繝ｭ繝ｼ繧ｫ繝ｫ縺ｧ縺ｮ繝上ャ繧ｷ繝･險育ｮ暦ｼ医・繝ｩ繧､繝舌す繝ｼ菫晁ｭｷ・・

## 蛻ｶ髯蝉ｺ矩・

- 逕ｻ蜒上ヵ繧｡繧､繝ｫ縺ｮ縺ｿ繧ｵ繝昴・繝・(jpg, jpeg, png, webp, gif)
- 繝輔ぃ繧､繝ｫ繧ｵ繧､繧ｺ蛻ｶ髯・ GitHub API縺ｮ蛻ｶ髯舌↓貅匁侠・磯壼ｸｸ100MB・・
- 蜷梧凾繧｢繝・・繝ｭ繝ｼ繝・ 1繝輔ぃ繧､繝ｫ縺壹▽蜃ｦ逅・



## ローカル画像処理（incoming → processed）

GitHub_TOKEN不要で、ローカルでWebP変換とサムネ生成、JSON更新を行う場合は
以下のルールに従ってください。

### 運用ルール

- `public/assets/incoming/` は原本の置き場です（削除・上書きは手動で管理）。
- `public/assets/processed/` と `public/data/processed-assets.json` は **自動生成** です。
  **手編集は禁止** してください。
- `incoming` が空の場合は `processed-assets.json` を上書きせず、既存が無ければ `[]` を作成します。

### 実行コマンド

```bash
npm run process:images
```
## 逕ｻ蜒城・菫｡繝輔か繝ｼ繝槭ャ繝医↓縺､縺・※

蠖薙し繧､繝医〒縺ｯ縲∬｡ｨ遉ｺ騾溷ｺｦ縺ｮ譛驕ｩ蛹悶・縺溘ａ縲√Θ繝ｼ繧ｶ繝ｼ縺ｮ繝悶Λ繧ｦ繧ｶ縺ｫ縺ｯ閾ｪ蜍慕噪縺ｫ **WebP** 繝輔か繝ｼ繝槭ャ繝医〒逕ｻ蜒上′驟堺ｿ｡縺輔ｌ繧九ｈ縺・↓險ｭ螳壹＆繧後※縺・∪縺吶・

- **繝励Ξ繝薙Η繝ｼ陦ｨ遉ｺ**: WebP・郁ｻｽ驥上・鬮倬滂ｼ・
- **繝繧ｦ繝ｳ繝ｭ繝ｼ繝・*: 蜈・・繧｢繝・・繝ｭ繝ｼ繝牙ｽ｢蠑・(PNG/JPG)

### 繧｢繝・・繝ｭ繝ｼ繝牙ｾ後・蜃ｦ逅・
迴ｾ蝨ｨ縺ｯ謇句虚縺ｾ縺溘・荳諡ｬ繧ｹ繧ｯ繝ｪ繝励ヨ縺ｧWebP逕滓・繧定｡後▲縺ｦ縺・∪縺吶よ眠隕上↓螟ｧ驥上・逕ｻ蜒上ｒ霑ｽ蜉縺励◆蝣ｴ蜷医・縲∽ｻ･荳九・螟画鋤繧ｳ繝槭Φ繝会ｼ・fmpeg謗ｨ螂ｨ・峨ｒ螳溯｡後＠縺ｦ縺上□縺輔＞縲・

```powershell
# PowerShell縺ｧ縺ｮ荳諡ｬ螟画鋤萓・
Get-ChildItem -Path public/images -Recurse -Include *.png, *.jpg | ForEach-Object {
    $webp = $_.FullName -replace '\.(png|jpg)$', '.webp'
    if (-not (Test-Path $webp)) { ffmpeg -i $_.FullName -c:v libwebp -q:v 80 $webp }
}
```

## 莉雁ｾ後・諡｡蠑ｵ莠亥ｮ・

- [ ] 繝舌ャ繝√い繝・・繝ｭ繝ｼ繝画ｩ溯・
- [ ] 逕ｻ蜒上Μ繧ｵ繧､繧ｺ讖溯・
- [x] WebP閾ｪ蜍募､画鋤 (螳溯｣・ｸ医∩)
- [ ] 繝｡繧ｿ繝・・繧ｿ閾ｪ蜍墓歓蜃ｺ・・XIF諠・ｱ・・
