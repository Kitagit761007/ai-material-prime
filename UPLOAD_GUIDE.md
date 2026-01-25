# 画像アチE�EロードガイチE

こ�Eガイドでは、E��褁E��知フィルタを備えたスマ�EトアチE�Eローダーの使用方法を説明します、E

## 概要E

こ�EアチE�Eローダーは、SHA-256ハッシュ値を使用して画像�E重褁E��自動検知し、無駁E��アチE�Eロードを防ぎます、E

## 機�E

✁E**SHA-256ハッシュ計箁E*: アチE�Eロード前に画像�Eハッシュ値を計箁E 
✁E**重褁E��知**: 既存画像と比輁E��、E��褁E��自動検�E  
✁E**スキチE�E通知**: 重褁E��は明確なメチE��ージで通知  
✁E**自動更新**: `assets.json`を�E動的に更新  
✁E**GitHub統吁E*: PAT認証でGitHub APIに直接アチE�EローチE

## 使用方況E

### 基本皁E��使ぁE��

```bash
node scripts/upload-image.js <画像パス> --title "タイトル" --category "カチE��リ"
```

### オプション

| オプション | 説昁E| 忁E��E|
|-----------|------|------|
| `<画像パス>` | アチE�Eロードする画像ファイルのパス | ✁E|
| `--title` | 画像�Eタイトル | ⭁E|
| `--description` | 画像�E説明文 | ❁E|
| `--category` | カチE��リ (Energy, Mobility, Smart City筁E | ⭁E|
| `--tags` | タグ�E�カンマ区刁E���E�E| ❁E|

### 使用侁E

#### 侁E: 基本皁E��アチE�EローチE

```bash
node scripts/upload-image.js ./new-image.jpg --title "水素燁E��電池" --category "Energy"
```

#### 侁E: 詳細惁E��を含むアチE�EローチE

```bash
node scripts/upload-image.js ./smart-city.png \
  --title "次世代スマ�EトシチE��" \
  --description "AI制御による最適化された都市インフラ" \
  --category "Smart City" \
  --tags "#AI,#IoT,#スマ�EトシチE��,#啁E��利用可"
```

## 動作フロー

```
1. 📁 画像ファイルを読み込み
   ↁE
2. 🔐 SHA-256ハッシュを計箁E
   ↁE
3. 🔍 既存画像�Eハッシュと比輁E
   ↁE
4. ❁E重褁E��ェチE��
   ├─ 重褁E��めEↁE⚠�E�E スキチE�E通知
   └─ 重褁E��ぁEↁE📤 GitHub APIへアチE�EローチE
                  ↁE
                 📝 assets.json更新
                  ↁE
                 🎉 完亁E
```

## 出力侁E

### 重褁E��検知された場吁E

```
🚀 Smart Image Uploader with Duplicate Detection

📁 Image: ./duplicate-image.jpg
📝 Title: チE��ト画僁E
📂 Category: Energy

🔐 Calculating SHA-256 hash...
   Hash: a1b2c3d4e5f6...

🔍 Checking for duplicates...
📊 Scanning 33 existing images...

⚠�E�E ══════════════════════════════════════════════════════╁E
⚠�E�E 重褁E��検知したためスキチE�Eしました
⚠�E�E ══════════════════════════════════════════════════════╁E

   既存ファイル: public/assets/images/energy/existing-image.jpg
   ハッシュ値: a1b2c3d4e5f6...

💡 こ�E画像�E既にリポジトリに存在します、E
   アチE�Eロードを中止しました、E
```

### 正常にアチE�Eロードされた場吁E

```
🚀 Smart Image Uploader with Duplicate Detection

📁 Image: ./new-image.jpg
📝 Title: 新しい画僁E
📂 Category: Energy

🔐 Calculating SHA-256 hash...
   Hash: x9y8z7w6v5u4...

🔍 Checking for duplicates...
📊 Scanning 33 existing images...
✁ENo duplicates found - proceeding with upload

📤 Uploading to GitHub...
✁EUploaded to: public/assets/images/energy/new-image.jpg

📝 Updating assets.json...
✁Eassets.json updated successfully

🎉 ══════════════════════════════════════════════════════╁E
🎉 Upload completed successfully!
🎉 ══════════════════════════════════════════════════════╁E

   Image: new-image.jpg
   Hash: x9y8z7w6v5u4...
   Path: public/assets/images/energy/new-image.jpg
```

## 環墁E��数

スクリプトを実行する前に、GitHub Personal Access Token (PAT) を環墁E��数として設定してください�E�E

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

> **重要E*: PATは `repo` 権限が忁E��です、EGitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) で作�Eできます、E

## トラブルシューチE��ング

### エラー: File not found

```bash
❁EError: File not found: ./image.jpg
```

**解決筁E*: 画像ファイルのパスが正しいか確認してください、E

### エラー: GitHub API error

```bash
❁EGitHub API error: 401 - Unauthorized
```

**解決筁E*: PATが正しいか、権限が適刁E��確認してください、E

### エラー: Cannot find module

```bash
Error: Cannot find module './hash-utils'
```

**解決筁E*: `scripts/`チE��レクトリから実行してぁE��か確認してください、E

## セキュリチE��

- ✁ESHA-256ハッシュによる確実な重褁E��知
- ✁EGitHub PAT認証による安�EなアチE�EローチE
- ✁Eローカルでのハッシュ計算（�Eライバシー保護�E�E

## 制限事頁E

- 画像ファイルのみサポ�EチE(jpg, jpeg, png, webp, gif)
- ファイルサイズ制陁E GitHub APIの制限に準拠�E�通常100MB�E�E
- 同時アチE�EローチE 1ファイルずつ処琁E

## 画像�E信フォーマットにつぁE��

当サイトでは、表示速度の最適化�Eため、ユーザーのブラウザには自動的に **WebP** フォーマットで画像が配信されるよぁE��設定されてぁE��す、E

- **プレビュー表示**: WebP�E�軽量�E高速！E
- **ダウンローチE*: 允E�EアチE�Eロード形弁E(PNG/JPG)

### アチE�Eロード後�E処琁E
現在は手動また�E一括スクリプトでWebP生�Eを行ってぁE��す。新規に大量�E画像を追加した場合�E、以下�E変換コマンド！Efmpeg推奨�E�を実行してください、E

```powershell
# PowerShellでの一括変換侁E
Get-ChildItem -Path public/images -Recurse -Include *.png, *.jpg | ForEach-Object {
    $webp = $_.FullName -replace '\.(png|jpg)$', '.webp'
    if (-not (Test-Path $webp)) { ffmpeg -i $_.FullName -c:v libwebp -q:v 80 $webp }
}
```

## 今後�E拡張予宁E

- [ ] バッチアチE�Eロード機�E
- [ ] 画像リサイズ機�E
- [x] WebP自動変換 (実裁E��み)
- [ ] メタチE�Eタ自動抽出�E�EXIF惁E���E�E
