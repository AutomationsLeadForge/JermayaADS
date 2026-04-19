#!/usr/bin/env node
/**
 * Downloads all assets from jermayads.nl into public/
 * Run: node scripts/download-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const assets = [
  // Profile + experience logos
  ['https://jermayads.nl/build/assets/jermayaleijen-7c0e0c16.png', 'images/jermayaleijen.png'],
  ['https://jermayads.nl/build/assets/Partout-Open-Digital-Agency-a55c9cfd.png', 'images/experience/Partout-Open-Digital-Agency.png'],
  ['https://jermayads.nl/build/assets/Max-ICT-BV-9a1a8cdc.png', 'images/experience/Max-ICT-BV.png'],
  ['https://jermayads.nl/build/assets/JermayADS-a4409723.png', 'images/experience/JermayADS.png'],
  ['https://jermayads.nl/build/assets/Searchresult-68b10348.png', 'images/experience/Searchresult.png'],
  ['https://jermayads.nl/build/assets/Shadow-B.V-23852736.png', 'images/experience/Shadow-B.V.png'],
  ['https://jermayads.nl/build/assets/overstappen.nl-cfceaf4d.png', 'images/experience/overstappen.png'],
  // PDF slider thumbnails
  ['https://jermayads.nl/build/assets/1-703bc40f.png', 'images/pdf/performance-max-updates-2023.png'],
  ['https://jermayads.nl/build/assets/MARGES-PER-PRODUCT-BEREKENEN-8afd1246.png', 'images/pdf/marges-per-product.png'],
  ['https://jermayads.nl/build/assets/DYNAMISCHE-DATA-OPSLAAN-IN-EEN-GOOGLE-5cb67603.png', 'images/pdf/dynamische-data-opslaan.png'],
  ['https://jermayads.nl/build/assets/DYNAMIC-PRICING-INSTELLEN-f6ff2ad2.png', 'images/pdf/dynamic-pricing-instellen.png'],
  // Contact icons
  ['https://jermayads.nl/build/assets/calendy-b0fcf810.png', 'images/contact/calendly.png'],
  ['https://jermayads.nl/build/assets/linkedin-20a80125.svg', 'images/contact/linkedin.svg'],
  ['https://jermayads.nl/build/assets/whatsapp-ff0cc4f4.svg', 'images/contact/whatsapp.svg'],
  // Portfolio slider
  ['https://jermayads.nl/build/assets/3-3b618d1f.png', 'images/portfolio/3.png'],
  ['https://jermayads.nl/build/assets/1-06da776d.png', 'images/portfolio/1.png'],
  ['https://jermayads.nl/build/assets/2-8226c3e6.png', 'images/portfolio/2.png'],
  ['https://jermayads.nl/build/assets/4-c095f870.png', 'images/portfolio/4.png'],
  ['https://jermayads.nl/build/assets/5-a438d49c.png', 'images/portfolio/5.png'],
  ['https://jermayads.nl/build/assets/6-714bada4.png', 'images/portfolio/6.png'],
  ['https://jermayads.nl/build/assets/7-739190e2.png', 'images/portfolio/7.png'],
  ['https://jermayads.nl/build/assets/8-1364feb3.png', 'images/portfolio/8.png'],
  ['https://jermayads.nl/build/assets/9-84f70212.png', 'images/portfolio/9.png'],
  ['https://jermayads.nl/build/assets/10-85a2ab78.png', 'images/portfolio/10.png'],
  ['https://jermayads.nl/build/assets/11-3f2b516b.png', 'images/portfolio/11.png'],
  ['https://jermayads.nl/build/assets/12-7ed17225.png', 'images/portfolio/12.png'],
  ['https://jermayads.nl/build/assets/13-48c02bb2.png', 'images/portfolio/13.png'],
  ['https://jermayads.nl/build/assets/14-dd540e4f.png', 'images/portfolio/14.png'],
  // Services (tool logos)
  ['https://jermayads.nl/build/assets/adchieve-logo-22f4ba20.svg', 'images/services/adchieve.svg'],
  ['https://jermayads.nl/build/assets/ahrefs-logo-d1194764.svg', 'images/services/ahrefs.svg'],
  ['https://jermayads.nl/build/assets/adcalls-115a5ccf.svg', 'images/services/adcalls.svg'],
  ['https://jermayads.nl/build/assets/Bing-b2e2ee99.svg', 'images/services/bing.svg'],
  ['https://jermayads.nl/build/assets/channable-logo-c6c1e68b.svg', 'images/services/channable.svg'],
  ['https://jermayads.nl/build/assets/g-ads-logo-aaf100ba.svg', 'images/services/g-ads.svg'],
  ['https://jermayads.nl/build/assets/g-console-cloud-logo-82efba10.svg', 'images/services/g-console-cloud.svg'],
  ['https://jermayads.nl/build/assets/g-analytics-logo-bd267bb3.svg', 'images/services/g-analytics.svg'],
  ['https://jermayads.nl/build/assets/g-search-console-logo-73acaed8.svg', 'images/services/g-search-console.svg'],
  ['https://jermayads.nl/build/assets/g-tag-manager-logo-62effc5a.svg', 'images/services/g-tag-manager.svg'],
  ['https://jermayads.nl/build/assets/Hotjar-bfd18a6e.svg', 'images/services/hotjar.svg'],
  ['https://jermayads.nl/build/assets/looker-studio-logo-e63bd668.svg', 'images/services/looker-studio.svg'],
  ['https://jermayads.nl/build/assets/matomo-logo-53847f5f.svg', 'images/services/matomo.svg'],
  ['https://jermayads.nl/build/assets/northbeam-logo-2a4d4c34.svg', 'images/services/northbeam.svg'],
  ['https://jermayads.nl/build/assets/producthero-logo-4bb8e0b4.svg', 'images/services/producthero.svg'],
  ['https://jermayads.nl/build/assets/productsup-logo-b2c3d1f3.svg', 'images/services/productsup.svg'],
  ['https://jermayads.nl/build/assets/profitmetrics-logo-3257a15a.svg', 'images/services/profitmetrics.svg'],
  ['https://jermayads.nl/build/assets/python-logo-5528dbf3.svg', 'images/services/python.svg'],
  ['https://jermayads.nl/build/assets/search-ads-360-logo-23a191b2.svg', 'images/services/search-ads-360.svg'],
  ['https://jermayads.nl/build/assets/sem-rush-logo-ffc224d8.svg', 'images/services/semrush.svg'],
  ['https://jermayads.nl/build/assets/true-clicks-logo-528cfb8e.svg', 'images/services/trueclicks.svg'],
  ['https://jermayads.nl/build/assets/verbolia-logo-9927c18a.svg', 'images/services/verbolia.svg'],
  ['https://jermayads.nl/build/assets/zapier-logo-2c8db320.svg', 'images/services/zapier.svg'],
  // Side hustles
  ['https://jermayads.nl/build/assets/bird-5ddbcb16.svg', 'images/hustles/bird.svg'],
  ['https://jermayads.nl/build/assets/planet-5901eb31.svg', 'images/hustles/planet.svg'],
  ['https://jermayads.nl/build/assets/tool-be81c7f3.svg', 'images/hustles/tool.svg'],
  // Backgrounds / decorations
  ['https://jermayads.nl/build/assets/bg-6c5e4dbe.svg', 'images/bg-pattern.svg'],
  ['https://jermayads.nl/build/assets/star-b178324b.svg', 'images/star.svg'],
  ['https://jermayads.nl/build/assets/rhombus-98d14348.svg', 'images/rhombus.svg'],
  // SEO
  ['https://jermayads.nl/favicon.png', 'seo/favicon.png'],
  ['https://jermayads.nl/build/assets/cover-img-95615724.png', 'seo/og-cover.png'],
];

async function download(url, dest) {
  const full = join(PUBLIC_DIR, dest);
  await mkdir(dirname(full), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(full, buf);
  return { url, dest, size: buf.length };
}

async function runBatched(items, batchSize = 4) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const settled = await Promise.allSettled(batch.map(([u, d]) => download(u, d)));
    settled.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        console.log(`✓ ${r.value.dest} (${r.value.size} bytes)`);
        results.push(r.value);
      } else {
        console.error(`✗ ${batch[idx][0]}: ${r.reason.message}`);
      }
    });
  }
  return results;
}

console.log(`Downloading ${assets.length} assets…`);
await runBatched(assets);
console.log('Done.');
