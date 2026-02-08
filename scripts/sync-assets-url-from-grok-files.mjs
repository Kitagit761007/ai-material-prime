// scripts/sync-assets-url-from-grok-files.mjs
// 目的：public/assets/images/grok の「実在ファイル名」を正として、public/data/assets.json の url を整合させる
// 方針：
// - まず "現状のurlが実在するか" をチェック（存在するならそのまま）
// - 存在しない場合のみ、ファイル名を正規化したキーで照合して候補を探す
// - 候補が一意に決まる場合だけ url を更新
// - 候補が複数/ゼロの場合はレポートに出して止める（推測で直さない）

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ASSETS_JSON = path.join(ROOT, "public", "data", "assets.json");
const GROK_DIR = path.join(ROOT, "public", "assets", "images", "grok");

function canonicalKey(filename) {
  return String(filename)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[()]/g, "")
    .replace(/[-_]/g, "")
    .replace(/\./g, "");
}

function fileExists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const files = fs
  .readdirSync(GROK_DIR)
  .filter((f) => fs.statSync(path.join(GROK_DIR, f)).isFile());

const index = new Map();
for (const f of files) {
  const key = canonicalKey(f);
  const arr = index.get(key) ?? [];
  arr.push(f);
  index.set(key, arr);
}

const assets = JSON.parse(fs.readFileSync(ASSETS_JSON, "utf8"));

let updatedCount = 0;
const missing = [];
const ambiguous = [];

for (const a of assets) {
  if (!a.url) continue;

  const basename = path.posix.basename(a.url);
  const expected = path.join(GROK_DIR, basename);

  if (fileExists(expected)) continue;

  const key = canonicalKey(basename);
  const candidates = index.get(key) ?? [];

  if (candidates.length === 1) {
    a.url = `/assets/images/grok/${candidates[0]}`;
    updatedCount++;
  } else if (candidates.length === 0) {
    missing.push({ id: a.id, url: a.url });
  } else {
    ambiguous.push({ id: a.id, url: a.url, candidates });
  }
}

fs.writeFileSync(
  ASSETS_JSON,
  JSON.stringify(assets, null, 2) + "\n",
  "utf8"
);

fs.writeFileSync(
  path.join(ROOT, "sync_report.json"),
  JSON.stringify({ updatedCount, missing, ambiguous }, null, 2) + "\n",
  "utf8"
);

console.log("DONE", { updatedCount, missing, ambiguous });
