/**
 * Asset library — local brand assets with future-ready cloud storage hook.
 */

const ASSET_CATEGORIES = ['logos', 'backgrounds', 'patterns', 'icons', 'photography'];

const BUILTIN_ASSETS = {
  logos: [],
  backgrounds: [],
  patterns: [],
  icons: [],
  photography: [],
};

let customAssets = { ...BUILTIN_ASSETS };

export function registerAsset(category, asset) {
  if (!ASSET_CATEGORIES.includes(category)) {
    throw new Error(`Unknown asset category: ${category}`);
  }
  customAssets = {
    ...customAssets,
    [category]: [...customAssets[category], { ...asset, category }],
  };
}

export function getAssetsByCategory(category) {
  return customAssets[category] ?? [];
}

export function getAllAssets() {
  return ASSET_CATEGORIES.flatMap((cat) =>
    customAssets[cat].map((a) => ({ ...a, category: cat }))
  );
}

export function getAssetCategories() {
  return ASSET_CATEGORIES;
}

export async function syncAssetsFromCloud(_providerConfig) {
  return getAllAssets();
}
