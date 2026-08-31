import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Cloudflare R2 Zero-Egress Media Sync Script
 * 
 * Setup instructions:
 * 1. Create a Bucket in Cloudflare Dashboard -> R2 -> Create Bucket (e.g. 'soe-media')
 * 2. Manage R2 API Tokens -> Create API Token with Object Read & Write permissions
 * 3. Add to your .env file:
 *    R2_ACCOUNT_ID=your_cloudflare_account_id
 *    R2_ACCESS_KEY_ID=your_access_key_id
 *    R2_SECRET_ACCESS_KEY=your_secret_access_key
 *    R2_BUCKET_NAME=soe-media
 *    R2_PUBLIC_URL=https://media.soundofessentials.com (or your r2.dev domain)
 */

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
} = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.log('⚠️  Cloudflare R2 credentials not fully set in .env. Skipping upload.');
  console.log('👉 Please configure R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME in web/.env');
  process.exit(0);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function uploadFile(filePath, key) {
  const fileStream = fs.createReadStream(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';

  const uploadParams = {
    Bucket: R2_BUCKET_NAME,
    Key: key.replace(/\\/g, '/'),
    Body: fileStream,
    ContentType: contentType,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`✅ Uploaded: ${key}`);
  } catch (err) {
    console.error(`❌ Failed to upload ${key}:`, err.message);
  }
}

async function syncDir(dirPath, baseDir) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      await syncDir(fullPath, baseDir);
    } else {
      const relPath = path.relative(baseDir, fullPath);
      await uploadFile(fullPath, relPath);
    }
  }
}

async function main() {
  const publicDir = path.resolve('public/assets');
  console.log(`🚀 Starting Cloudflare R2 sync from ${publicDir}...`);
  if (fs.existsSync(publicDir)) {
    await syncDir(publicDir, path.resolve('public'));
    console.log('✨ Cloudflare R2 Zero-Egress sync completed successfully!');
  } else {
    console.warn(`Directory not found: ${publicDir}`);
  }
}

main();
