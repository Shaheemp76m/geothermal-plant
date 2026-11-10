import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicImagesDir = path.join(projectRoot, 'public', 'images');

const imageTasks = [
  // -------------------------------------------------------------
  // HERO
  // -------------------------------------------------------------
  {
    id: 'hero-main-1920',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'hero', 'geothermal-hero-1920.webp'),
  },
  {
    id: 'hero-main-1280',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'hero', 'geothermal-hero-1280.webp'),
  },
  {
    id: 'hero-main-768',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=768&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'hero', 'geothermal-hero-768.webp'),
  },
  {
    id: 'hero-main-480',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'hero', 'geothermal-hero-480.webp'),
  },
  {
    id: 'hero-main',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'hero', 'geothermal-hero.webp'),
  },
  {
    id: 'hero-landscape-content',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'hero', 'geothermal-landscape.webp'),
  },

  // -------------------------------------------------------------
  // GEOTHERMAL SYSTEMS & FOUNDATIONS
  // -------------------------------------------------------------
  {
    id: 'volcanic-crust',
    url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'geothermal-systems', 'volcanic-crust.webp'),
  },
  {
    id: 'thermal-reservoir',
    url: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1000&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'geothermal-systems', 'thermal-reservoir.webp'),
  },
  {
    id: 'tectonic-boundary',
    url: 'https://images.unsplash.com/photo-1516655855035-d5215bcb5604?auto=format&fit=crop&w=1000&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'geothermal-systems', 'tectonic-boundary.webp'),
  },
  {
    id: 'reinjection-facility',
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'geothermal-systems', 'reinjection-facility.webp'),
  },
  {
    id: 'hellisheidi-station',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'geothermal-systems', 'hellisheidi-station.webp'),
  },

  // -------------------------------------------------------------
  // TECHNOLOGY EXPLORER & HOW IT WORKS PHASES
  // -------------------------------------------------------------
  {
    id: 'phase-subterranean-heat',
    url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'phase-subterranean-heat.webp'),
  },
  {
    id: 'phase-extraction-wellhead',
    url: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'phase-extraction-wellhead.webp'),
  },
  {
    id: 'phase-turbine-conversion',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'phase-turbine-conversion.webp'),
  },
  {
    id: 'phase-reinjection-loop',
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'phase-reinjection-loop.webp'),
  },
  {
    id: 'ground-source-heat-pump',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'ground-source-heat-pump.webp'),
  },
  {
    id: 'binary-cycle-system',
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'binary-cycle-system.webp'),
  },
  {
    id: 'flash-steam-plant',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'flash-steam-plant.webp'),
  },
  {
    id: 'dry-steam-turbine',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'dry-steam-turbine.webp'),
  },

  // -------------------------------------------------------------
  // APPLICATIONS
  // -------------------------------------------------------------
  {
    id: 'electricity-generation',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'applications', 'electricity-generation.webp'),
  },
  {
    id: 'district-heating',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'applications', 'district-heating.webp'),
  },
  {
    id: 'ground-source-cooling',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'applications', 'ground-source-cooling.webp'),
  },
  {
    id: 'geothermal-agriculture',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'applications', 'geothermal-agriculture.webp'),
  },

  // -------------------------------------------------------------
  // ENVIRONMENT
  // -------------------------------------------------------------
  {
    id: 'closed-loop-binary',
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'environment', 'closed-loop-binary.webp'),
  },
  {
    id: 'surface-footprint-coexistence',
    url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'environment', 'surface-footprint-coexistence.webp'),
  },
  {
    id: 'advanced-drilling-rig',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80&fm=webp',
    dest: path.join(publicImagesDir, 'environment', 'advanced-drilling-rig.webp'),
  },

  // -------------------------------------------------------------
  // MISC
  // -------------------------------------------------------------
  {
    id: 'future-geothermal-frontier',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'misc', 'future-geothermal-frontier.webp'),
  },
];

async function main() {
  console.log(`Starting download of ${imageTasks.length} image assets into ${publicImagesDir}...`);

  // Ensure subdirectories exist
  const subdirs = ['hero', 'technology', 'applications', 'environment', 'geothermal-systems', 'misc'];
  for (const sub of subdirs) {
    fs.mkdirSync(path.join(publicImagesDir, sub), { recursive: true });
  }

  let successCount = 0;
  let totalBytes = 0;

  for (const task of imageTasks) {
    try {
      console.log(`Fetching [${task.id}]...`);
      const res = await fetch(task.url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(task.dest, buffer);
      const sizeKb = (buffer.length / 1024).toFixed(1);
      totalBytes += buffer.length;
      console.log(`✓ Saved ${path.relative(projectRoot, task.dest)} (${sizeKb} KB)`);
      successCount++;
    } catch (err) {
      console.error(`✗ FAILED [${task.id}] from ${task.url}:`, err.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`Successfully downloaded: ${successCount} / ${imageTasks.length} assets`);
  console.log(`Total local storage: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`========================================`);
}

main().catch(console.error);
