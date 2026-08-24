const fs = require('fs');

const file = fs.readFileSync('web/src/data/adsData.js', 'utf8');
const cleaned = file.replace('export const ADS_DATA =', 'const ADS_DATA =') + '; return ADS_DATA;';
const fn = new Function(cleaned);
const ads = fn();

console.log('Loaded ads:', ads.length);

const headers = [
  'Campaign Name',
  'Ad Set Name',
  'Ad Name',
  'Primary Text',
  'Headline',
  'Description',
  'Call To Action',
  'Link URL',
  'Media File Name'
];

const rows = [headers.join(',')];

for (const ad of ads) {
  const campaign = `"${'SOE - Acquisition (' + ad.wave + ')'}"`;
  const adset = `"${'AdSet - ' + ad.audience}"`;
  const adName = `"${'Ad ' + String(ad.number).padStart(2, '0') + ' - ' + ad.archetype}"`;
  const primary = `"${ad.primaryText.replace(/"/g, '""')}"`;
  const headline = `"${ad.headline.replace(/"/g, '""')}"`;
  const desc = `"${ad.description.replace(/"/g, '""')}"`;
  const cta = ad.cta;
  const url = ad.url;
  const media = ad.image.split('/').pop();

  rows.push([campaign, adset, adName, primary, headline, desc, cta, url, media].join(','));
}

fs.writeFileSync('docs/meta_ads_import_matrix.csv', rows.join('\n'), 'utf8');
console.log(`Successfully generated docs/meta_ads_import_matrix.csv with ${ads.length} ads!`);
