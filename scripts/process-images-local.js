#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const REPO_ROOT = path.join(__dirname, '..');
const INCOMING_DIR = path.join(REPO_ROOT, 'public', 'assets', 'incoming');
const PROCESSED_DIR = path.join(REPO_ROOT, 'public', 'assets', 'processed');
const WEBP_DIR = path.join(PROCESSED_DIR, 'webp');
const THUMB_DIR = path.join(PROCESSED_DIR, 'thumb');
const OUTPUT_JSON = path.join(REPO_ROOT, 'public', 'data', 'processed-assets.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff']);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readIncomingFiles() {
  if (!fs.existsSync(INCOMING_DIR)) {
    return [];
  }

  return fs
    .readdirSync(INCOMING_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
}

function writeEmptyJsonIfNeeded() {
  if (fs.existsSync(OUTPUT_JSON)) {
    console.log('ℹ️ Incoming is empty. Keeping existing processed-assets.json.');
    return;
  }

  ensureDir(path.dirname(OUTPUT_JSON));
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify([], null, 2), 'utf8');
  console.log('✅ Incoming is empty. Created processed-assets.json with [].');
}

async function processImage(fileName) {
  const inputPath = path.join(INCOMING_DIR, fileName);
  const baseName = path.parse(fileName).name;
  const webpFileName = `${baseName}.webp`;
  const thumbFileName = `${baseName}-thumb.webp`;
  const webpOutputPath = path.join(WEBP_DIR, webpFileName);
  const thumbOutputPath = path.join(THUMB_DIR, thumbFileName);

  await sharp(inputPath).webp({ quality: 80 }).toFile(webpOutputPath);
  await sharp(inputPath)
    .resize({ width: 512, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbOutputPath);

  return {
    originalFile: fileName,
    webpUrl: `/assets/processed/webp/${webpFileName}`,
    thumbnailUrl: `/assets/processed/thumb/${thumbFileName}`,
  };
}

async function main() {
  ensureDir(INCOMING_DIR);
  ensureDir(WEBP_DIR);
  ensureDir(THUMB_DIR);

  const incomingFiles = readIncomingFiles();

  if (incomingFiles.length === 0) {
    writeEmptyJsonIfNeeded();
    return;
  }

  console.log(`🖼️ Processing ${incomingFiles.length} incoming image(s)...`);
  const processed = [];

  for (const fileName of incomingFiles) {
    console.log(`➡️  ${fileName}`);
    processed.push(await processImage(fileName));
  }

  ensureDir(path.dirname(OUTPUT_JSON));
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(processed, null, 2), 'utf8');
  console.log(`✅ Wrote ${processed.length} entries to ${OUTPUT_JSON}`);
}

main().catch((error) => {
  console.error('❌ Failed to process images:', error);
  process.exit(1);
});
