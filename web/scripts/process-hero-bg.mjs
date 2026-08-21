import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, resolve } from 'path';

const SRC = 'C:\\Users\\ldmur\\.gemini\\antigravity-ide\\brain\\a508540c-584e-4e6e-8eb9-a3bee362aab5\\.user_uploaded\\media_1787298381471.jpg';
const OUT_SCENES = resolve('.', 'public', 'assets', 'scenes');
const OUT_MARKETING = resolve('.', 'public', 'assets', 'marketing');

async function processImage() {
  await mkdir(OUT_SCENES, { recursive: true });
  await mkdir(OUT_MARKETING, { recursive: true });

  // 1. High-resolution background for desktop/retina hero (1920 width, WebP quality 88)
  await sharp(SRC)
    .resize({ width: 1920, height: 1080, fit: 'cover', position: 'center' })
    .webp({ quality: 88, effort: 6 })
    .toFile(join(OUT_SCENES, 'seriphia-seven-lands-path.webp'));

  // 2. Full artwork square / uncropped version
  await sharp(SRC)
    .resize({ width: 1400, height: 1400, fit: 'contain', background: { r: 255, g: 248, b: 240, alpha: 1 } })
    .webp({ quality: 90, effort: 6 })
    .toFile(join(OUT_MARKETING, 'seriphia-seven-lands-square.webp'));

  // 3. Ultra-optimized backdrop version with soft warm luminance
  await sharp(SRC)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(join(OUT_SCENES, 'summer-stretch-hero-bg.webp'));

  console.log('✓ Successfully processed and optimized Seriphia 7 Lands background image!');
}

processImage();
