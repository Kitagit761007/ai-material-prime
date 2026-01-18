#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { calculateFileHash, getExistingImageHashes, checkDuplicate } = require('./hash-utils');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'Kitagit761007';
const REPO_NAME = 'ai-material-prime';
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const ASSETS_JSON_PATH = path.join(__dirname, '..', 'data', 'assets.json');

if (!GITHUB_TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN environment variable is required');
    console.log('\nPlease set your GitHub Personal Access Token:');
    console.log('  export GITHUB_TOKEN=your_token_here');
    process.exit(1);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        imagePath: null,
        title: null,
        description: null,
        category: null,
        tags: []
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--title' && args[i + 1]) {
            options.title = args[++i];
        } else if (arg === '--description' && args[i + 1]) {
            options.description = args[++i];
        } else if (arg === '--category' && args[i + 1]) {
            options.category = args[++i];
        } else if (arg === '--tags' && args[i + 1]) {
            options.tags = args[++i].split(',').map(t => t.trim());
        } else if (!arg.startsWith('--')) {
            options.imagePath = arg;
        }
    }

    return options;
}

/**
 * Upload file to GitHub using GitHub API
 */
async function uploadToGitHub(localPath, remotePath, message) {
    return new Promise((resolve, reject) => {
        const content = fs.readFileSync(localPath).toString('base64');

        const data = JSON.stringify({
            message,
            content,
            branch: 'main'
        });

        const options = {
            hostname: 'api.github.com',
            path: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'Smart-Image-Uploader',
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 201) {
                    resolve(JSON.parse(body));
                } else {
                    reject(new Error(`GitHub API error: ${res.statusCode} - ${body}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

/**
 * Update assets.json with new image entry
 */
function updateAssetsJson(newEntry) {
    let assets = [];

    if (fs.existsSync(ASSETS_JSON_PATH)) {
        assets = JSON.parse(fs.readFileSync(ASSETS_JSON_PATH, 'utf8'));
    }

    assets.push(newEntry);
    fs.writeFileSync(ASSETS_JSON_PATH, JSON.stringify(assets, null, 4), 'utf8');

    console.log('✅ assets.json updated successfully');
}

/**
 * Main upload function
 */
async function main() {
    console.log('🚀 Smart Image Uploader with Duplicate Detection\n');

    const options = parseArgs();

    if (!options.imagePath) {
        console.error('❌ Error: Image path is required');
        console.log('\nUsage: node upload-image.js <image-path> --title "Title" --category "Category" --description "Description" --tags "tag1,tag2"');
        process.exit(1);
    }

    if (!fs.existsSync(options.imagePath)) {
        console.error(`❌ Error: File not found: ${options.imagePath}`);
        process.exit(1);
    }

    console.log(`📁 Image: ${options.imagePath}`);
    console.log(`📝 Title: ${options.title || 'Not specified'}`);
    console.log(`📂 Category: ${options.category || 'Not specified'}`);
    console.log('');

    // Step 1: Calculate hash of new image
    console.log('🔐 Calculating SHA-256 hash...');
    const newImageHash = await calculateFileHash(options.imagePath);
    console.log(`   Hash: ${newImageHash}`);
    console.log('');

    // Step 2: Get existing image hashes
    console.log('🔍 Checking for duplicates...');
    const existingHashes = await getExistingImageHashes(IMAGES_DIR);

    // Step 3: Check for duplicates
    const duplicateCheck = await checkDuplicate(options.imagePath, existingHashes);

    if (duplicateCheck.isDuplicate) {
        console.log('');
        console.log('⚠️  ═══════════════════════════════════════════════════════');
        console.log('⚠️  重複を検知したためスキップしました');
        console.log('⚠️  ═══════════════════════════════════════════════════════');
        console.log('');
        console.log(`   既存ファイル: ${duplicateCheck.duplicatePath}`);
        console.log(`   ハッシュ値: ${duplicateCheck.hash}`);
        console.log('');
        console.log('💡 この画像は既にリポジトリに存在します。');
        console.log('   アップロードを中止しました。');
        console.log('');
        process.exit(0);
    }

    console.log('✅ No duplicates found - proceeding with upload');
    console.log('');

    // Step 4: Prepare metadata
    const fileName = path.basename(options.imagePath);
    const category = options.category || 'General';
    const remotePath = `public/images/${category.toLowerCase()}/${fileName}`;

    const newEntry = {
        id: `img-${Date.now()}`,
        src: `/images/${category.toLowerCase()}/${fileName}`,
        title: options.title || fileName,
        description: options.description || '',
        category: category,
        score: 95,
        width: 1024,
        height: 576,
        size: `${Math.round(fs.statSync(options.imagePath).size / 1024)} KB`,
        aspectRatio: '16:9 (Widescreen)',
        tags: options.tags.length > 0 ? options.tags : ['#商用利用可'],
        hash: newImageHash
    };

    // Step 5: Upload to GitHub
    console.log('📤 Uploading to GitHub...');
    try {
        await uploadToGitHub(
            options.imagePath,
            remotePath,
            `feat: add new image ${fileName} (hash: ${newImageHash.substring(0, 8)})`
        );
        console.log(`✅ Uploaded to: ${remotePath}`);
    } catch (error) {
        console.error('❌ Upload failed:', error.message);
        process.exit(1);
    }

    // Step 6: Update assets.json
    console.log('');
    console.log('📝 Updating assets.json...');
    updateAssetsJson(newEntry);

    console.log('');
    console.log('🎉 ═══════════════════════════════════════════════════════');
    console.log('🎉 Upload completed successfully!');
    console.log('🎉 ═══════════════════════════════════════════════════════');
    console.log('');
    console.log(`   Image: ${fileName}`);
    console.log(`   Hash: ${newImageHash}`);
    console.log(`   Path: ${remotePath}`);
    console.log('');
}

// Run the script
main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
