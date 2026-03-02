import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ISSUE_NUMBER = process.env.ISSUE_NUMBER;

/* ── Size mapping for DALL-E 3 ── */
const SIZE_MAP = {
    'Square (1:1)': '1024x1024',
    'Landscape (16:9)': '1792x1024',
    'Portrait (9:16)': '1024x1792',
};

/**
 * Parse the GitHub Issue form body into variation fields.
 */
function parseIssueBody(body) {
    const sections = {};
    let currentKey = null;

    for (const line of body.split('\n')) {
        const headerMatch = line.match(/^### (.+)/);
        if (headerMatch) {
            currentKey = headerMatch[1].trim();
            sections[currentKey] = '';
        } else if (currentKey) {
            sections[currentKey] += (sections[currentKey] ? '\n' : '') + line;
        }
    }

    for (const key of Object.keys(sections)) {
        sections[key] = sections[key].trim();
    }

    return {
        heroName: sections['Hero'] || '',
        scene: sections['Scene / Pose Description'] || '',
        mood: sections['Mood'] || 'Joyful & Energetic',
        aspectRatio: sections['Aspect Ratio'] || 'Square (1:1)',
    };
}

/**
 * Look up a hero's full data from heroes.json.
 */
function getHeroData(heroName) {
    const heroesPath = path.resolve(__dirname, '../src/data/heroes.json');
    const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
    return heroes.find(h => h.name.toLowerCase() === heroName.toLowerCase());
}

/**
 * Build a rich prompt combining hero identity + requested scene.
 */
function buildPrompt(hero, scene, mood) {
    return [
        `A high-quality 3D Disney/Pixar style illustration of "${hero.name}", ${hero.title}.`,
        `${hero.name} is from ${hero.land}, where the focus is on ${hero.focus}.`,
        `Their personality: ${hero.traits.join(', ')}.`,
        ``,
        `Scene: ${scene}`,
        `Mood: ${mood}`,
        ``,
        `The character should look consistent with a children's educational music show called "The Sound of Essentials: Rhythm Quest".`,
        `Vibrant colors, warm lighting, age-appropriate, highly detailed 3D render.`,
    ].join('\n');
}

/**
 * Generate the variation image via DALL-E 3.
 */
async function generateVariation(hero, scene, mood, aspectRatio) {
    if (!OPENAI_API_KEY) {
        console.error('❌ OPENAI_API_KEY is required for image generation.');
        process.exit(1);
    }

    const prompt = buildPrompt(hero, scene, mood);
    const size = SIZE_MAP[aspectRatio] || '1024x1024';

    // Prepare output directory
    const slug = hero.name.toLowerCase().replace(/\s+/g, '-');
    const galleryDir = path.resolve(__dirname, `../public/assets/gallery/${slug}`);
    if (!fs.existsSync(galleryDir)) {
        fs.mkdirSync(galleryDir, { recursive: true });
    }

    const timestamp = Date.now();
    const filename = `${slug}_${timestamp}.png`;
    const outputPath = path.resolve(galleryDir, filename);

    console.log(`🎨 Generating variation for ${hero.name}...`);
    console.log(`📐 Size: ${size}`);
    console.log(`💭 Prompt:\n${prompt}\n`);

    const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        { model: 'dall-e-3', prompt, n: 1, size, quality: 'hd' },
        { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );

    const imageUrl = response.data.data[0].url;
    const imageData = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(outputPath, Buffer.from(imageData.data));

    console.log(`✅ Saved: ${outputPath}`);
    return { filename, slug };
}

/**
 * Update the gallery index with the new variation.
 */
function updateGalleryIndex(hero, scene, mood, aspectRatio, filename, slug) {
    const galleryPath = path.resolve(__dirname, '../src/data/gallery.json');
    const gallery = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

    gallery.push({
        hero: hero.name,
        land: hero.land,
        scene,
        mood,
        aspectRatio,
        img: `/assets/gallery/${slug}/${filename}`,
        createdAt: new Date().toISOString(),
    });

    fs.writeFileSync(galleryPath, JSON.stringify(gallery, null, 4));
    console.log(`📝 Gallery index updated.`);
}

/**
 * Main: read the issue, generate the variation, update the gallery.
 */
async function main() {
    console.log('🚀 Starting Hero Variation Generator...');

    if (!GITHUB_TOKEN || !ISSUE_NUMBER) {
        console.error('❌ Missing GITHUB_TOKEN or ISSUE_NUMBER.');
        process.exit(1);
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
    if (!owner || !repo) {
        console.error('❌ GITHUB_REPOSITORY not set.');
        process.exit(1);
    }

    // 1. Fetch the issue
    const { data: issue } = await octokit.issues.get({
        owner, repo,
        issue_number: Number(ISSUE_NUMBER),
    });

    console.log(`📦 Issue #${issue.number}: ${issue.title}`);

    // 2. Parse fields
    const { heroName, scene, mood, aspectRatio } = parseIssueBody(issue.body || '');
    if (!heroName || !scene) {
        console.error('❌ Missing hero name or scene description.');
        process.exit(1);
    }

    // 3. Look up hero data
    const hero = getHeroData(heroName);
    if (!hero) {
        console.error(`❌ Hero "${heroName}" not found in heroes.json.`);
        process.exit(1);
    }

    console.log(`✨ ${hero.name} — ${hero.title} (${hero.land})`);

    // 4. Generate the variation
    const { filename, slug } = await generateVariation(hero, scene, mood, aspectRatio);

    // 5. Update gallery index
    updateGalleryIndex(hero, scene, mood, aspectRatio, filename, slug);

    console.log('🏆 Variation complete!');
}

main();
