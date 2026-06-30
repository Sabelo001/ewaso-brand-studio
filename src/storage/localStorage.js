const PREFIX = 'ewaso-designer';

export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(`${PREFIX}:${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(`${PREFIX}:${key}`);
    return true;
  } catch {
    return false;
  }
}

export const STORAGE_KEYS = {
  studioState: 'studio-state',
  settings: 'settings',
  templates: 'templates',
  assets: 'assets',
  assetMeta: 'asset-meta',
};
