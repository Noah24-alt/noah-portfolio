/**
 * Utilities for responsive and optimized image loading.
 */

const DEFAULT_WIDTHS = [480, 800, 1200, 1600, 2000]

/**
 * Transforms a Cloudinary image URL to serve auto-format (AVIF/WebP),
 * optimized quality (75-85), and an optional constrained width.
 */
export function getOptimizedImageUrl(url: string, width?: number, quality = 80): string {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url
  }

  // Build transformation flags
  const transforms = [
    'f_auto',
    `q_${quality}`,
    width ? `w_${width}` : '',
    'c_limit', // Never upscale beyond original dimensions
  ].filter(Boolean).join(',')

  // Insert transformations after '/image/upload/'
  if (url.includes('/image/upload/')) {
    return url.replace('/image/upload/', `/image/upload/${transforms}/`)
  }

  return url
}

/**
 * Generates a responsive srcset string for Cloudinary images.
 */
export function getResponsiveSrcSet(
  url: string,
  widths: number[] = DEFAULT_WIDTHS,
  quality = 80,
): string | undefined {
  if (!url || !url.includes('res.cloudinary.com')) {
    return undefined
  }

  return widths
    .map((w) => `${getOptimizedImageUrl(url, w, quality)} ${w}w`)
    .join(', ')
}

/**
 * Standard sizes attribute for full-width project showcase illustrations.
 * - Mobile (<= 768px): fills full viewport width (100vw)
 * - Tablet (<= 1200px): takes ~75vw inside split layout
 * - Desktop: capped at 1100px inside content column
 */
export const PROJECT_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1100px'

export interface ImageDimensions {
  width: number
  height: number
  aspectRatio: string
}

export const PROJECT_IMAGE_METADATA: Record<string, ImageDimensions> = {
  'Alphy.webp': { width: 4128, height: 6450, aspectRatio: '4128 / 6450' },
  'Alphy_2.webp': { width: 4128, height: 10154, aspectRatio: '4128 / 10154' },
  'PWC.webp': { width: 4128, height: 5260, aspectRatio: '4128 / 5260' },
  'PWC_2.webp': { width: 4128, height: 9564, aspectRatio: '4128 / 9564' },
  'PWC_01.webp': { width: 2064, height: 5135, aspectRatio: '2064 / 5135' },
  'PWC_02.webp': { width: 2064, height: 5318, aspectRatio: '2064 / 5318' },
  'PWC_03.webp': { width: 2064, height: 4484, aspectRatio: '2064 / 4484' },
  'Alix.webp': { width: 2064, height: 4844, aspectRatio: '2064 / 4844' },
  'Alix_2.webp': { width: 2064, height: 3916, aspectRatio: '2064 / 3916' },
  'phone_Alphy.webp': { width: 2064, height: 1290, aspectRatio: '2064 / 1290' },
  'phone_PWC.webp': { width: 2064, height: 1290, aspectRatio: '2064 / 1290' },
  'phone_Alix.webp': { width: 2064, height: 1290, aspectRatio: '2064 / 1290' },
}

export function getImageDimensions(url: string): ImageDimensions | undefined {
  if (!url) return undefined
  const filename = url.split('/').pop()?.split('?')[0] || ''
  return PROJECT_IMAGE_METADATA[filename]
}

