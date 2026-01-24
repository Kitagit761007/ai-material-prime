# 画像アップロードガイド

このガイドでは、重複検知フィルタを備えたスマートアップローダーの使用方法を説明します。

## 概要

このアップローダーは、SHA-256ハッシュ値を使用して画像の重複を自動検知し、無駄なアップロードを防ぎます。

## 機能

✅ **SHA-256ハッシュ計算**: アップロード前に画像のハッシュ値を計算  
✅ **重複検知**: 既存画像と比較し、重複を自動検出  
✅ **スキップ通知**: 重複時は明確なメッセージで通知  
✅ **自動更新**: `assets.json`を自動的に更新  
✅ **GitHub統合**: PAT認証でGitHub APIに直接アップロード

## 使用方法

### 基本的な使い方

```bash
node scripts/upload-image.js <画像パス> --title "タイトル" --category "カテゴリ"
```

### オプション

| オプション | 説明 | 必須 |
|-----------|------|------|
| `<画像パス>` | アップロードする画像ファイルのパス | ✅ |
| `--title` | 画像のタイトル | ⭕ |
| `--description` | 画像の説明文 | ❌ |
| `--category` | カテゴリ (Energy, Mobility, Smart City等) | ⭕ |
| `--tags` | タグ（カンマ区切り） | ❌ |

### 使用例

#### 例1: 基本的なアップロード

```bash
node scripts/upload-image.js ./new-image.jpg --title "水素燃料電池" --category "Energy"
```

#### 例2: 詳細情報を含むアップロード

```bash
node scripts/upload-image.js ./smart-city.png \
  --title "次世代スマートシティ" \
  --description "AI制御による最適化された都市インフラ" \
  --category "Smart City" \
  --tags "#AI,#IoT,#スマートシティ,#商用利用可"
```

## 動作フロー

```
1. 📁 画像ファイルを読み込み
   ↓
2. 🔐 SHA-256ハッシュを計算
   ↓
3. 🔍 既存画像のハッシュと比較
   ↓
4. ❓ 重複チェック
   ├─ 重複あり → ⚠️  スキップ通知
   └─ 重複なし → 📤 GitHub APIへアップロード
                  ↓
                 📝 assets.json更新
                  ↓
                 🎉 完了
```

## 出力例

### 重複が検知された場合

```
🚀 Smart Image Uploader with Duplicate Detection

📁 Image: ./duplicate-image.jpg
📝 Title: テスト画像
📂 Category: Energy

🔐 Calculating SHA-256 hash...
   Hash: a1b2c3d4e5f6...

🔍 Checking for duplicates...
📊 Scanning 33 existing images...

⚠️  ═══════════════════════════════════════════════════════
⚠️  重複を検知したためスキップしました
⚠️  ═══════════════════════════════════════════════════════

   既存ファイル: public/images/energy/existing-image.jpg
   ハッシュ値: a1b2c3d4e5f6...

💡 この画像は既にリポジトリに存在します。
   アップロードを中止しました。
```

### 正常にアップロードされた場合

```
🚀 Smart Image Uploader with Duplicate Detection

📁 Image: ./new-image.jpg
📝 Title: 新しい画像
📂 Category: Energy

🔐 Calculating SHA-256 hash...
   Hash: x9y8z7w6v5u4...

🔍 Checking for duplicates...
📊 Scanning 33 existing images...
✅ No duplicates found - proceeding with upload

📤 Uploading to GitHub...
✅ Uploaded to: public/images/energy/new-image.jpg

📝 Updating assets.json...
✅ assets.json updated successfully

🎉 ═══════════════════════════════════════════════════════
🎉 Upload completed successfully!
🎉 ═══════════════════════════════════════════════════════

   Image: new-image.jpg
   Hash: x9y8z7w6v5u4...
   Path: public/images/energy/new-image.jpg
```

## 環境変数

スクリプトを実行する前に、GitHub Personal Access Token (PAT) を環境変数として設定してください：

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

> **重要**: PATは `repo` 権限が必要です。[GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) で作成できます。

## トラブルシューティング

### エラー: File not found

```bash
❌ Error: File not found: ./image.jpg
```

**解決策**: 画像ファイルのパスが正しいか確認してください。

### エラー: GitHub API error

```bash
❌ GitHub API error: 401 - Unauthorized
```

**解決策**: PATが正しいか、権限が適切か確認してください。

### エラー: Cannot find module

```bash
Error: Cannot find module './hash-utils'
```

**解決策**: `scripts/`ディレクトリから実行しているか確認してください。

## セキュリティ

- ✅ SHA-256ハッシュによる確実な重複検知
- ✅ GitHub PAT認証による安全なアップロード
- ✅ ローカルでのハッシュ計算（プライバシー保護）

## 制限事項

- 画像ファイルのみサポート (jpg, jpeg, png, webp, gif)
- ファイルサイズ制限: GitHub APIの制限に準拠（通常100MB）
- 同時アップロード: 1ファイルずつ処理

## 画像配信フォーマットについて

当サイトでは、表示速度の最適化のため、ユーザーのブラウザには自動的に **WebP** フォーマットで画像が配信されるように設定されています。

- **プレビュー表示**: WebP（軽量・高速）
- **ダウンロード**: 元のアップロード形式 (PNG/JPG)

### アップロード後の処理
現在は手動または一括スクリプトでWebP生成を行っています。新規に大量の画像を追加した場合は、以下の変換コマンド（ffmpeg推奨）を実行してください。

```powershell
# PowerShellでの一括変換例
Get-ChildItem -Path public/images -Recurse -Include *.png, *.jpg | ForEach-Object {
    $webp = $_.FullName -replace '\.(png|jpg)$', '.webp'
    if (-not (Test-Path $webp)) { ffmpeg -i $_.FullName -c:v libwebp -q:v 80 $webp }
}
```

## 今後の拡張予定

- [ ] バッチアップロード機能
- [ ] 画像リサイズ機能
- [x] WebP自動変換 (実装済み)
- [ ] メタデータ自動抽出（EXIF情報）
