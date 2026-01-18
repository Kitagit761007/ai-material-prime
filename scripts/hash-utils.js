const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * Calculate SHA-256 hash of a file
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - SHA-256 hash in hexadecimal format
 */
async function calculateFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (err) => reject(err));
    });
}

/**
 * Get all image files recursively from a directory
 * @param {string} dir - Directory path
 * @param {string[]} fileList - Accumulated file list
 * @returns {string[]} - List of image file paths
 */
function getImageFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getImageFiles(filePath, fileList);
        } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

/**
 * Calculate hashes for all existing images in the repository
 * @param {string} imagesDir - Path to images directory
 * @returns {Promise<Map<string, string>>} - Map of hash to file path
 */
async function getExistingImageHashes(imagesDir) {
    const hashMap = new Map();

    if (!fs.existsSync(imagesDir)) {
        console.warn(`⚠️  Images directory not found: ${imagesDir}`);
        return hashMap;
    }

    const imageFiles = getImageFiles(imagesDir);
    console.log(`📊 Scanning ${imageFiles.length} existing images...`);

    for (const filePath of imageFiles) {
        try {
            const hash = await calculateFileHash(filePath);
            hashMap.set(hash, filePath);
        } catch (error) {
            console.error(`❌ Error hashing ${filePath}:`, error.message);
        }
    }

    return hashMap;
}

/**
 * Check if a file is a duplicate based on its hash
 * @param {string} filePath - Path to the file to check
 * @param {Map<string, string>} existingHashes - Map of existing hashes
 * @returns {Promise<{isDuplicate: boolean, hash: string, duplicatePath?: string}>}
 */
async function checkDuplicate(filePath, existingHashes) {
    const hash = await calculateFileHash(filePath);
    const isDuplicate = existingHashes.has(hash);

    return {
        isDuplicate,
        hash,
        duplicatePath: isDuplicate ? existingHashes.get(hash) : undefined
    };
}

module.exports = {
    calculateFileHash,
    getImageFiles,
    getExistingImageHashes,
    checkDuplicate
};
