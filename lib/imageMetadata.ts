import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import mime from "mime-types";

export interface ImageMetadata {
    fileSize: string;
    dimensions: string;
    aspectRatio: string;
    extension: string;
    width: number;
    height: number;
    fileSizeBytes: number;
}

export function getImageMetadata(imagePath: string): ImageMetadata | null {
    try {
        // Get absolute path
        const absolutePath = path.isAbsolute(imagePath)
            ? imagePath
            : path.join(process.cwd(), "public", imagePath);

        // Check if file exists
        if (!fs.existsSync(absolutePath)) {
            console.error(`Image not found: ${absolutePath}`);
            return null;
        }

        // Get file stats
        const stats = fs.statSync(absolutePath);
        const fileSizeBytes = stats.size;

        // Format file size
        let fileSize: string;
        if (fileSizeBytes < 1024 * 1024) {
            fileSize = `${(fileSizeBytes / 1024).toFixed(1)} KB`;
        } else {
            fileSize = `${(fileSizeBytes / (1024 * 1024)).toFixed(2)} MB`;
        }

        // Get image dimensions
        const dimensions = sizeOf(fs.readFileSync(absolutePath));
        const width = dimensions.width || 0;
        const height = dimensions.height || 0;

        // Calculate aspect ratio
        const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(width, height);
        const aspectRatio = `${width / divisor}:${height / divisor}`;

        // Get file extension
        const extension = path.extname(absolutePath).slice(1).toLowerCase();

        return {
            fileSize,
            dimensions: `${width} × ${height}`,
            aspectRatio,
            extension,
            width,
            height,
            fileSizeBytes,
        };
    } catch (error) {
        console.error("Error getting image metadata:", error);
        return null;
    }
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
}
