/**
 * Resolves the optimized WebP source for an image.
 * If the source is local (starts with /images), it returns the .webp version.
 * Otherwise returns the original source.
 */
export function getDisplaySrc(src: string): string {
    if (!src) return src;

    // Normalize path to rooted for proper resolution in subpages
    // Converts ./assets/images/... to /assets/images/...
    let normalized = src;
    if (normalized.startsWith('./')) {
        normalized = normalized.substring(1);
    }
    if (!normalized.startsWith('/')) {
        normalized = '/' + normalized;
    }

    // For local images, we've pre-converted them to WebP
    // EXCEPTION: Specific images like gx_mobility_0x don't have WebP versions yet
    if (normalized.includes('/images/') && !normalized.includes('gx_')) {
        // Remove version query if exists for extension replacement
        const baseSrc = normalized.split('?')[0];
        const ext = baseSrc.split('.').pop();
        if (ext && ['png', 'jpg', 'jpeg'].includes(ext.toLowerCase())) {
            return baseSrc.replace(`.${ext}`, '.webp');
        }
    }

    return normalized;
}
