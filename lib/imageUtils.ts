/**
 * Resolves the optimized WebP source for an image.
 */
export function getDisplaySrc(src: string): string {
    if (!src) return src;

    let normalized = src;
    if (normalized.startsWith('./')) {
        normalized = normalized.substring(1);
    }
    if (!normalized.startsWith('/')) {
        normalized = '/' + normalized;
    }

    if (normalized.includes('/images/') && !normalized.includes('gx_')) {
        const baseSrc = normalized.split('?')[0];
        const ext = baseSrc.split('.').pop();
        if (ext && ['png', 'jpg', 'jpeg'].includes(ext.toLowerCase())) {
            return baseSrc.replace(`.${ext}`, '.webp');
        }
    }

    return normalized;
}

/**
 * Force specific file download using Blob for better mobile support.
 * Ensures absolute path and correct filename.
 */
export async function downloadImage(src: string, filename: string): Promise<void> {
    try {
        // Construct absolute URL
        // Using window.location.origin to ensure it works on any deployed domain
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ai-material-prime.com';
        let absoluteUrl = src;

        if (src.startsWith('./')) {
            absoluteUrl = baseUrl + src.substring(1);
        } else if (src.startsWith('/')) {
            absoluteUrl = baseUrl + src;
        } else if (!src.startsWith('http')) {
            absoluteUrl = baseUrl + '/' + src;
        }

        // Fetch the image as a blob
        const response = await fetch(absoluteUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create temporary link
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || src.split('/').pop() || 'download';
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download failed:', error);
        // Fallback to simple link if fetch fails (e.g. CORS)
        const link = document.createElement('a');
        link.href = src;
        link.download = filename;
        link.target = '_blank';
        link.click();
    }
}
