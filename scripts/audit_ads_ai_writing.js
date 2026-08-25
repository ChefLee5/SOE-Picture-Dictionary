import { ADS_DATA } from '../web/src/data/adsData.js';

const EM_DASH_REGEX = /[—]|--/g;
const HOLLOW_INTENSIFIERS = /\b(actually|genuinely|genuine|truly|real|quite frankly|to be honest|let's be clear)\b/gi;
const TIER_1A = /\b(delve|landscape|tapestry|realm|realms|paradigm|embark|beacon|testament to|robust|comprehensive|cutting-edge|leverage|pivotal|underscores|meticulous|meticulously|seamless|seamlessly|game-changer|game-changing|hits? differently?|watershed moment|nestled|vibrant|thriving|showcasing|deep dive|dive into|unpack|unpacking|bustling|intricate|intricacies|complexities|ever-evolving|enduring|daunting|holistic|actionable|impactful|learnings|thought leader|thought leadership|best practices|at its core|synergy|synergies|interplay|keen|symphony|embrace|load-bearing)\b/gi;
const TIER_1B = /\b(utilize|in order to|due to the fact that|serves as|features|boasts|presents|commence|ascertain|endeavor)\b/gi;
const TIER_2 = /\b(harness|navigate|foster|elevate|unleash|streamline|empower|bolster|spearhead|resonate|revolutionize|facilitate|underpin|nuanced|crucial|multifaceted|ecosystem|myriad|plethora|encompass|catalyze|reimagine|galvanize|augment|cultivate|illuminate|elucidate|juxtapose|transformative|transformation|cornerstone|paramount|poised|burgeoning|nascent|quintessential|overarching|quietly|deeply)\b/gi;

let totalEmDashes = 0;
let totalTier1A = 0;
let totalTier1B = 0;
let totalTier2 = 0;
let totalHollow = 0;
const detailedFlags = [];

console.log('==============================================');
console.log('🔍 AVOID-AI-WRITING COMPREHENSIVE AUDIT REPORT');
console.log('==============================================\n');

ADS_DATA.forEach(ad => {
  const text = `${ad.primaryText} ${ad.headline} ${ad.description}`;
  const emDashes = (text.match(EM_DASH_REGEX) || []).length;
  const t1a = (text.match(TIER_1A) || []);
  const t1b = (text.match(TIER_1B) || []);
  const t2 = (text.match(TIER_2) || []);
  const hollow = (text.match(HOLLOW_INTENSIFIERS) || []);

  totalEmDashes += emDashes;
  totalTier1A += t1a.length;
  totalTier1B += t1b.length;
  totalTier2 += t2.length;
  totalHollow += hollow.length;

  const flags = [];
  if (emDashes > 0) flags.push(`${emDashes} em-dash(es)`);
  if (t1a.length > 0) flags.push(`Tier 1A: [${[...new Set(t1a.map(w => w.toLowerCase()))].join(', ')}]`);
  if (t1b.length > 0) flags.push(`Tier 1B: [${[...new Set(t1b.map(w => w.toLowerCase()))].join(', ')}]`);
  if (t2.length > 0) flags.push(`Tier 2: [${[...new Set(t2.map(w => w.toLowerCase()))].join(', ')}]`);
  if (hollow.length > 0) flags.push(`Hollow intensifiers: [${[...new Set(hollow.map(w => w.toLowerCase()))].join(', ')}]`);

  console.log(`[${ad.id.toUpperCase()}] ${ad.name}`);
  console.log(`  Archetype: ${ad.archetype} | Delta: ${ad.delta}`);
  if (flags.length > 0) {
    console.log(`  ⚠️ Flags (${flags.length}): ${flags.join(' | ')}`);
    detailedFlags.push({ id: ad.id, name: ad.name, flags });
  } else {
    console.log(`  ✅ Clean! No AI tells found.`);
  }
  console.log('');
});

console.log('----------------------------------------------');
console.log('TOTALS SUMMARY ACROSS 30 ADS:');
console.log(`  Em Dashes (Target: 0): ${totalEmDashes}`);
console.log(`  Tier 1A AI Markers:   ${totalTier1A}`);
console.log(`  Tier 1B Clarity Hits: ${totalTier1B}`);
console.log(`  Tier 2 Cluster Words: ${totalTier2}`);
console.log(`  Hollow Intensifiers:  ${totalHollow}`);
console.log(`  Total Ads with Flags: ${detailedFlags.length} / ${ADS_DATA.length}`);
console.log('==============================================');
