import { useCallback, useRef } from 'react';
import { readStorage, writeStorage, STORAGE_KEYS } from '../storage/localStorage';

const LEGACY_KEY = 'ewaso-brand-studio-state';
const DEBOUNCE_MS = 500;

/** Fields persisted to localStorage */
export const PERSISTED_FIELDS = [
  'layoutId',
  'aspectRatio',
  'bgColorTheme',
  'heroType',
  'footerStyle',
  'decoration',
  'imageSrc',
  'zoom',
  'panX',
  'panY',
  'imgOpacity',
  'metaText',
  'headlineText',
  'bodyText1',
  'bodyText2',
  'ctaText',
  'website',
  'phone',
  'email',
  'whatsapp',
  'headerColor',
  'headlineColor',
  'bodyColor',
  'borderWidth',
  'borderColor',
];

function migrateLegacyState() {
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return null;
    const parsed = JSON.parse(legacy);
    writeStorage(STORAGE_KEYS.studioState, parsed);
    localStorage.removeItem(LEGACY_KEY);
    return parsed;
  } catch {
    return null;
  }
}

export function loadSavedState() {
  try {
    const stored = readStorage(STORAGE_KEYS.studioState, null);
    if (stored) return stored;
    return migrateLegacyState();
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    const payload = {};
    for (const key of PERSISTED_FIELDS) {
      if (state[key] !== undefined) payload[key] = state[key];
    }
    writeStorage(STORAGE_KEYS.studioState, payload);
  } catch {
    // Quota exceeded or private browsing — fail silently
  }
}

export function useAutosave() {
  const timerRef = useRef(null);

  const scheduleSave = useCallback((state) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveState(state), DEBOUNCE_MS);
  }, []);

  return { scheduleSave, loadSavedState };
}
