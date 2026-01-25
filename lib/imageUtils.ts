/**
 * Resolves the optimized WebP source for an image.
 * If the source is local (starts with /images), it returns the .webp version.
 * Otherwise returns the original source.
 */
export function getDisplaySrc(src: string): string {
    if (!src) return src;

    // For local images, we've pre-converted them to WebP
    // Support both old /images/ and new ./assets/images/ paths
    if (src.includes('/images/')) {
        // Remove version query if exists for extension replacement
        const baseSrc = src.split('?')[0];
        const ext = baseSrc.split('.').pop();
        if (ext && ['png', 'jpg', 'jpeg'].includes(ext.toLowerCase())) {
            return baseSrc.replace(`.${ext}`, '.webp');
        }
    }

    return src;
}
