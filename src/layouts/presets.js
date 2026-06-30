import { BRAND } from '../theme';

/**
 * Apply layout preset — updates layout + default color scheme.
 * Returns a partial state patch for the studio store.
 */
export function getPresetPatch(preset) {
  const patches = {
    editorial: {
      layoutId: 'editorial',
      heroType: 'image',
      bgColorTheme: BRAND.colors.primaryTeal,
      headerColor: BRAND.colors.goldLight,
      headlineColor: BRAND.colors.white,
      bodyColor: BRAND.colors.sandLight,
    },
    split: {
      layoutId: 'split',
      heroType: 'image',
      headerColor: BRAND.colors.goldDark,
      headlineColor: BRAND.colors.primaryTeal,
      bodyColor: BRAND.colors.muted,
    },
    feature: {
      layoutId: 'feature',
      heroType: 'image',
      bgColorTheme: BRAND.colors.primaryTeal,
      headerColor: BRAND.colors.goldDark,
      headlineColor: BRAND.colors.primaryTeal,
      bodyColor: BRAND.colors.muted,
    },
    quote: {
      layoutId: 'quote',
      heroType: 'quote',
      bgColorTheme: BRAND.colors.cream,
      headerColor: BRAND.colors.primaryTeal,
      headlineColor: BRAND.colors.ink,
      bodyColor: BRAND.colors.muted,
    },
  };

  return patches[preset] ?? null;
}
