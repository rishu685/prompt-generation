import fs from 'fs';
import path from 'path';
import { SectionLayout } from './types.js';

// Safe path resolution across Node.js runtime and Netlify serverless environment
const DATA_DIR = path.resolve(process.cwd(), 'server/data');
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
    // In serverless environments, file write may be read-only; in-memory cache handles storage
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
    if (fs.existsSync(DATA_DIR)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    }
  } catch (err) {
    // Persisted in memory
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
    // Fallback to in-memory
  }
  return Array.from(inMemorySections.values());
}

export function deleteSection(id: string): boolean {
  inMemorySections.delete(id);
  try {
    ensureStorageFile();
    const all = listSections().filter((s) => s.id !== id);
    if (fs.existsSync(DATA_DIR)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
    }
    return true;
  } catch (err) {
    return true;
  }
}
