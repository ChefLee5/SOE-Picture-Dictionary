/**
 * Resolves public assets from either the local Vite base path or a hosted asset
 * origin. Set VITE_ASSET_HOST to a CDN/blob bucket that mirrors web/public.
 *
 * Example:
 *   VITE_ASSET_HOST=https://cdn.example.com/soe
 *   assetPath('/assets/marketing/quest-collage.webp')
 *   -> https://cdn.example.com/soe/assets/marketing/quest-collage.webp
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const assetHost = (import.meta.env.VITE_ASSET_HOST || '').replace(/\/+$/, '');

const normalizePath = (path) => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  return path.startsWith('/') ? path : `/${path}`;
};

export const assetPath = (path) => {
  const normalized = normalizePath(path);
  if (!normalized || /^(https?:)?\/\//.test(normalized) || normalized.startsWith('data:') || normalized.startsWith('blob:')) {
    return normalized;
  }
  return `${assetHost || base}${normalized}`;
};

export const assetCssUrl = (path) => `url('${assetPath(path).replace(/'/g, "\\'")}')`;
