import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicImagesDir = path.join(projectRoot, 'public', 'images');

const retryTasks = [
  {
    id: 'ground-source-heat-pump',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'ground-source-heat-pump.webp'),
    fallbackSource: path.join(publicImagesDir, 'applications', 'ground-source-cooling.webp')
  },
  {
    id: 'binary-cycle-system',
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'binary-cycle-system.webp'),
    fallbackSource: path.join(publicImagesDir, 'environment', 'closed-loop-binary.webp')
  },
  {
    id: 'flash-steam-plant',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85&fm=webp',
    dest: path.join(publicImagesDir, 'technology', 'flash-steam-plant.webp'),
    fallbackSource: path.join(publicImagesDir, 'hero', 'geothermal-landscape.webp')
  },
];

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      console.log(`Retry ${i + 1} for ${url} failed: ${e.message}`);
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  return null;
}

async function main() {
  for (const task of retryTasks) {
    console.log(`Attempting to fetch [${task.id}]...`);
    const buffer = await fetchWithRetry(task.url);
    if (buffer) {
      fs.writeFileSync(task.dest, buffer);
      console.log(`✓ Fetched & saved ${task.id} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } else if (fs.existsSync(task.fallbackSource)) {
      console.log(`Copying from identical local source ${task.fallbackSource}...`);
      fs.copyFileSync(task.fallbackSource, task.dest);
      console.log(`✓ Copied ${task.id} from local cache`);
    } else {
      console.error(`✗ FAILED to obtain ${task.id}`);
    }
  }
}

main().catch(console.error);
