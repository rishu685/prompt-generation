import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SectionLayout } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'sections.json');

// In-memory cache fallback
let inMemorySections: Map<string, SectionLayout> = new Map();

function ensureStorageFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('[Storage] Warning initializing storage file, using in-memory mode:', err);
  }
}

export function saveSection(section: SectionLayout): SectionLayout {
  section.updatedAt = new Date().toISOString();
  inMemorySections.set(section.id, section);

  try {
    ensureStorageFile();
    const existing = listSections();
    const index = existing.findIndex((s) => s.id === section.id);
    if (index >= 0) {
      existing[index] = section;
    } else {
      existing.unshift(section);
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage] Error saving to file, persisted in memory:', err);
  }

  return section;
}

export function getSection(id: string): SectionLayout | null {
  if (inMemorySections.has(id)) {
    return inMemorySections.get(id)!;
  }
  const all = listSections();
  const found = all.find((s) => s.id === id);
  if (found) {
    inMemorySections.set(id, found);
    return found;
  }
  return null;
}

export function listSections(): SectionLayout[] {
  try {
    ensureStorageFile();
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content || '[]') as SectionLayout[];
      parsed.forEach((s) => inMemorySections.set(s.id, s));
      return parsed;
    }
  } catch (err) {
    console.warn('[Storage] Error reading file, returning in-memory:', err);
  }
  return Array.from(inMemorySections.values());
}

export function deleteSection(id: string): boolean {
  inMemorySections.delete(id);
  try {
    ensureStorageFile();
    const all = listSections().filter((s) => s.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Storage] Error deleting section:', err);
    return false;
  }
}
