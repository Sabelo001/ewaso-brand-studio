/**
 * Asset library — local brand assets with cloud-ready sync hook.
 */

const ASSET_CATEGORIES = ['logos', 'backgrounds', 'patterns', 'icons', 'photography'];

function svgDataUrl(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const BRAND_LOGO_SVG = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="24" fill="#1B4D3E"/>
  <path d="M100 40 L160 160 H120 L100 120 L80 160 H40 Z" fill="#C9A84C"/>
  <text x="100" y="185" text-anchor="middle" fill="#FAF6EE" font-family="serif" font-size="14" font-weight="bold">EWASO</text>
</svg>`);

const TEAL_GRADIENT = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#1B4D3E"/><stop offset="100%" stop-color="#2A6B57"/>
  </linearGradient></defs>
  <rect width="400" height="400" fill="url(#g)"/>
</svg>`);

const GOLD_PATTERN = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
  <rect width="80" height="80" fill="#FAF6EE"/>
  <circle cx="40" cy="40" r="20" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.3"/>
  <circle cx="0" cy="0" r="20" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.3"/>
  <circle cx="80" cy="80" r="20" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.3"/>
</svg>`);

const GLOBE_ICON = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <circle cx="32" cy="32" r="28" stroke="#C9A84C" stroke-width="3"/>
  <ellipse cx="32" cy="32" rx="12" ry="28" stroke="#1B4D3E" stroke-width="2"/>
  <line x1="4" y1="32" x2="60" y2="32" stroke="#1B4D3E" stroke-width="2"/>
</svg>`);

const SAFARI_PHOTO = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#2A6B57"/>
  <circle cx="320" cy="60" r="40" fill="#C9A84C" opacity="0.8"/>
  <path d="M0 200 Q100 150 200 200 T400 180 V300 H0 Z" fill="#1B4D3E"/>
  <path d="M80 180 Q120 120 160 180" fill="none" stroke="#FAF6EE" stroke-width="3" opacity="0.5"/>
</svg>`);

const BUILTIN_ASSETS = {
  logos: [
    { id: 'logo-primary', name: 'Ewaso Shield', src: BRAND_LOGO_SVG, userUploaded: false },
  ],
  backgrounds: [
    { id: 'bg-teal-gradient', name: 'Teal Gradient', src: TEAL_GRADIENT, userUploaded: false },
  ],
  patterns: [
    { id: 'pattern-gold-circles', name: 'Gold Circles', src: GOLD_PATTERN, userUploaded: false },
  ],
  icons: [
    { id: 'icon-globe', name: 'Globe', src: GLOBE_ICON, userUploaded: false },
  ],
  photography: [
    { id: 'photo-safari', name: 'Safari Landscape', src: SAFARI_PHOTO, userUploaded: false },
  ],
};

let customAssets = {};

export function registerAsset(category, asset) {
  if (!ASSET_CATEGORIES.includes(category)) {
    throw new Error(`Unknown asset category: ${category}`);
  }
  customAssets = {
    ...customAssets,
    [category]: [...(customAssets[category] ?? []), { ...asset, category }],
  };
}

export function getAssetsByCategory(category) {
  return BUILTIN_ASSETS[category] ?? [];
}

export function getAllAssets() {
  return ASSET_CATEGORIES.flatMap((cat) =>
    getAssetsByCategory(cat).map((a) => ({ ...a, category: cat }))
  );
}

export function getAssetCategories() {
  return ASSET_CATEGORIES;
}

export async function syncAssetsFromCloud(_providerConfig) {
  return getAllAssets();
}
