import { useCallback, useRef } from 'react';

const STORAGE_KEY = 'ewaso-brand-studio-state';
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

export function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Quota exceeded or private browsing — fail silently
  }
}

/**
 * Debounced autosave hook.
 * Call scheduleSave whenever studio state changes.
 */
export function useAutosave() {
  const timerRef = useRef(null);

  const scheduleSave = useCallback((state) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveState(state), DEBOUNCE_MS);
  }, []);

  return { scheduleSave, loadSavedState };
}
