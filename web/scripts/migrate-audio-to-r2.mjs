import fs from 'fs';
import https from 'https';
import path from 'path';
import { execSync } from 'child_process';

const tracks = JSON.parse(fs.readFileSync('src/data/tracks.json', 'utf8'));
const supabaseBase = 'https://ishoimsrjsjiwczchflf.supabase.co/storage/v1/object/public/audio/';
const tempAudioDir = path.resolve('temp_audio');

if (!fs.existsSync(tempAudioDir)) {
  fs.mkdirSync(tempAudioDir, { recursive: true });
}

function downloadTrack(filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(tempAudioDir, filename);
    if (fs.existsSync(dest)) {
      return resolve(dest);
    }

    const encoded = encodeURIComponent(filename);
    const url = `${supabaseBase}${encoded}`;
    const file = fs.createWriteStream(dest);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${filename} (Status ${res.statusCode})`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function migrateTracks() {
  console.log(`🎵 Starting migration of ${tracks.length} tracks to Cloudflare R2 bucket 'soemedia'...`);

  for (const track of tracks) {
    const filename = track.audioFile;
    try {
      console.log(`⬇️ Downloading: ${filename}...`);
      const localFile = await downloadTrack(filename);

      console.log(`⬆️ Uploading to remote R2 soemedia/audio/${filename}...`);
      const r2Key = `audio/${filename}`;
      execSync(`npx wrangler r2 object put "soemedia/${r2Key}" --file="${localFile}" --content-type="audio/mpeg" --remote`, {
        stdio: 'inherit'
      });
      console.log(`✅ Migrated: ${filename}`);
    } catch (err) {
      console.error(`❌ Error migrating ${filename}:`, err.message);
    }
  }

  // Cleanup temp folder
  try {
    fs.rmSync(tempAudioDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary audio cache.');
  } catch (e) {}

  console.log('🎉 All 19 album tracks migrated to Cloudflare R2 Remote Storage!');
}

migrateTracks();
