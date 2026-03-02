/**
 * Resolves a public asset path using Vite's BASE_URL.
 * Usage: assetPath('/assets/soe-cover.png')
 *   → '/The-Sound-of-Essentials-Eco-System/assets/soe-cover.png' (prod)
 *   → '/assets/soe-cover.png' (dev)
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const assetPath = (path) => `${base}${path.startsWith('/') ? path : '/' + path}`;
