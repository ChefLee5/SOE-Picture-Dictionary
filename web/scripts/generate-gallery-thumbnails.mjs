import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, resolve } from 'path';

const SRC_MAIN = 'C:\\Users\\ldmur\\Downloads\\The Sound of Essentials Image Assets';
const SRC_EBOOK = 'C:\\Users\\ldmur\\Downloads\\The-Sound-of-Essentials-Website\\ebook\\OEBPS\\images';
const OUT_DIR = resolve('.', 'public', 'assets', 'gallery');

const ITEMS = [
  // ── Top 9 Land & Story Scenes ──
  {
    src: join(SRC_MAIN, 'Call to Learn with stones Seriphia.png'),
    out: '01-seriphia-empyrea.webp',
  },
  {
    src: join(SRC_MAIN, 'Pond Aiko_Kenji.png'),
    out: '02-harmonia-awakening.webp',
  },
  {
    src: join(SRC_MAIN, 'Animals Terrasol.png'),
    out: '03-terrasol-expedition.webp',
  },
  {
    src: join(SRC_MAIN, 'Dance Harmonia Vitalis.png'),
    out: '04-vitalis-movement.webp',
  },
  {
    src: join(SRC_MAIN, 'Luminosity_Athena_Ezra.png'),
    out: '05-luminosity-wisdom.webp',
  },
  {
    src: join(SRC_MAIN, 'Kwame Counting.png'),
    out: '06-numeria-mountain.webp',
  },
  {
    src: join(SRC_MAIN, 'Celestia_Elias_Selene.png'),
    out: '07-celestia-constellations.webp',
  },
  {
    src: join(SRC_MAIN, 'Aquaria_Ronan_Nerissa.png'),
    out: '08-aquaria-ocean.webp',
  },
  {
    src: join(SRC_MAIN, 'Quest Collage.png'),
    out: '09-rhythm-collective.webp',
  },

  // ── Bottom 3 Clean Text & Curriculum Pages ──
  {
    src: join(SRC_EBOOK, 'back_asl_alphabet-asl-alphabet-am.png'),
    out: '10-asl-phonics-curriculum.webp',
  },
  {
    src: join(SRC_EBOOK, 'back_sight_words-essential-sight-words-group-a.png'),
    out: '11-sight-words-glossary.webp',
  },
  {
    src: join(SRC_EBOOK, 'back_parent_teacher-study-skills-learning-strategies.png'),
    out: '12-teacher-curriculum-framework.webp',
  },
];

async function generate() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log('Generating ultra-clean gallery thumbnails...');

  for (const item of ITEMS) {
    try {
      const outPath = join(OUT_DIR, item.out);
      await sharp(item.src)
        .resize({
          width: 1200,
          height: 800,
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 90, effort: 6 })
        .toFile(outPath);

      console.log(`✓ Created: ${item.out}`);
    } catch (err) {
      console.error(`✗ Failed for ${item.out}:`, err.message);
    }
  }
}

generate();
