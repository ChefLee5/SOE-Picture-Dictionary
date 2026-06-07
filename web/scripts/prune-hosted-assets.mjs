import { readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

if (!process.env.VITE_ASSET_HOST) {
  throw new Error('Set VITE_ASSET_HOST before pruning hosted assets.');
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distAssets = path.join(root, 'dist', 'assets');

const hostedMediaDirs = [
  'allies',
  'backgrounds',
  'book',
  'characters',
  'coloring-book',
  'dictionary',
  'duos',
  'heroes',
  'lands',
  'le-cheval',
  'marketing',
  'media',
  'pages',
  'scenes',
  'shapes',
  'track-art',
];

const hostedRootExtensions = new Set([
  '.avif',
  '.gif',
  '.jpg',
  '.jpeg',
  '.png',
  '.svg',
  '.webp',
]);

await Promise.all(
  hostedMediaDirs.map((dir) => rm(path.join(distAssets, dir), { recursive: true, force: true }))
);

const entries = await readdir(distAssets, { withFileTypes: true });
await Promise.all(
  entries
    .filter((entry) => entry.isFile() && hostedRootExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => rm(path.join(distAssets, entry.name), { force: true }))
);

console.log('Pruned hosted media from dist/assets. Fonts and built JS/CSS were left in place.');
