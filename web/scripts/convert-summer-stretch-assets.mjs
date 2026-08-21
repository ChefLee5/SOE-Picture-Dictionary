import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, resolve } from 'path';

const SRC = 'C:\\Users\\ldmur\\Downloads\\The Sound of Essentials Image Assets';
const OUT_DIR_WORKBOOK = resolve('.', 'public', 'assets', 'workbook');
const OUT_DIR_MARKETING = resolve('.', 'public', 'assets', 'marketing');

async function convert() {
  await mkdir(OUT_DIR_WORKBOOK, { recursive: true });
  await mkdir(OUT_DIR_MARKETING, { recursive: true });

  const coverSrc = join(SRC, 'Summer Stretch Draft Cover.png');
  const backCoverSrc = join(SRC, 'Summer Stretch Draft back cover.png');

  // Convert Cover
  await sharp(coverSrc)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(join(OUT_DIR_WORKBOOK, 'soe-summer-stretch-cover.webp'));

  await sharp(coverSrc)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(join(OUT_DIR_MARKETING, 'summer-stretch-cover.webp'));

  // Convert Back Cover
  await sharp(backCoverSrc)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(join(OUT_DIR_WORKBOOK, 'soe-summer-stretch-back-cover.webp'));

  console.log('✓ Summer Stretch covers converted successfully!');
}

convert();
