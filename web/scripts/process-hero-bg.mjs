import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, resolve } from 'path';

const SRC = 'C:\\Users\\ldmur\\.gemini\\antigravity-ide\\brain\\a508540c-584e-4e6e-8eb9-a3bee362aab5\\.user_uploaded\\media_1787298381471.jpg';
const OUT_SCENES = resolve('.', 'public', 'assets', 'scenes');
const OUT_MARKETING = resolve('.', 'public', 'assets', 'marketing');

async function processImage() {
  await mkdir(OUT_SCENES, { recursive: true });
  await mkdir(OUT_MARKETING, { recursive: true });

  // 1. FULL uncropped original artwork at pristine fidelity (1024x1024 WebP)
  await sharp(SRC)
    .webp({ quality: 92, effort: 6 })
    .toFile(join(OUT_SCENES, 'seriphia-seven-lands-path.webp'));

  // 2. High-res copy in marketing
  await sharp(SRC)
    .webp({ quality: 92, effort: 6 })
    .toFile(join(OUT_MARKETING, 'seriphia-seven-lands-path.webp'));

  // 3. Wide 1920x1080 extended panorama with full uncropped artwork centered-right
  // Matching sky: #A5D8F3, Matching meadow: #C8E6C9 / #FFF8F0
  const artworkBuffer = await sharp(SRC)
    .resize({ height: 1000, fit: 'contain' })
    .toBuffer();

  const backgroundSvg = Buffer.from(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#9AD7F5"/>
          <stop offset="35%" stop-color="#C5E8FA"/>
          <stop offset="60%" stop-color="#FFE8D0"/>
          <stop offset="85%" stop-color="#C8E6A5"/>
          <stop offset="100%" stop-color="#A5D685"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#skyGrad)"/>
    </svg>
  `);

  await sharp(backgroundSvg)
    .composite([
      {
        input: artworkBuffer,
        left: 460,
        top: 40,
      }
    ])
    .webp({ quality: 90, effort: 6 })
    .toFile(join(OUT_SCENES, 'seriphia-seven-lands-panorama.webp'));

  console.log('✓ Successfully created uncropped and wide panorama Seriphia backgrounds!');
}

processImage();
