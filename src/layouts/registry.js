import { BRAND } from '../theme';

/** Base layout component keys used by LayoutRenderer and export engine */
export const BASE_LAYOUTS = {
  editorial: 'editorial',
  split: 'split',
  feature: 'feature',
  quote: 'quote',
  statistics: 'statistics',
  beforeAfter: 'beforeAfter',
};

/** Legacy layout ID aliases for backwards compatibility */
export const LAYOUT_ALIASES = {
  split: 'promotion',
  feature: 'property-feature',
};

/**
 * Full layout registry — single source of truth for the gallery.
 * Each layout maps to a base renderer with unique preset defaults.
 */
export const LAYOUTS = [
  {
    id: 'editorial',
    label: 'Editorial Hero',
    desc: 'Large image focus with structured typography below.',
    category: 'editorial',
    baseLayout: 'editorial',
    keywords: ['hero', 'editorial', 'story', 'feature'],
    preview: { top: BRAND.colors.primaryTeal, accent: BRAND.colors.goldLight },
  },
  {
    id: 'promotion',
    label: 'Promotion',
    desc: 'Half image, half brand card — ideal for offers and campaigns.',
    category: 'promotion',
    baseLayout: 'split',
    keywords: ['promo', 'sale', 'offer', 'campaign'],
    preview: { top: BRAND.colors.sandLight, accent: BRAND.colors.goldDark },
  },
  {
    id: 'quote',
    label: 'Quote',
    desc: 'Typography-first layout for statements and pull quotes.',
    category: 'quote',
    baseLayout: 'quote',
    keywords: ['quote', 'testimonial', 'statement'],
    preview: { top: BRAND.colors.cream, accent: BRAND.colors.primaryTeal },
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    desc: 'Warm full-bleed imagery with floating brand card.',
    category: 'property',
    baseLayout: 'feature',
    keywords: ['hotel', 'resort', 'hospitality', 'stay'],
    preview: { top: BRAND.colors.primaryTealLight, accent: BRAND.colors.ivory },
  },
  {
    id: 'property-feature',
    label: 'Property Feature',
    desc: 'Showcase listings with a premium floating content card.',
    category: 'property',
    baseLayout: 'feature',
    keywords: ['property', 'real estate', 'listing', 'home'],
    preview: { top: BRAND.colors.ink, accent: BRAND.colors.goldLight },
  },
  {
    id: 'airbnb-listing',
    label: 'Airbnb Listing',
    desc: 'Split layout optimized for short-stay rental promotions.',
    category: 'property',
    baseLayout: 'split',
    keywords: ['airbnb', 'rental', 'vacation', 'stay'],
    preview: { top: BRAND.colors.sand, accent: BRAND.colors.primaryTeal },
  },
  {
    id: 'travel-package',
    label: 'Travel Package',
    desc: 'Editorial hero for safaris, tours, and travel packages.',
    category: 'travel',
    baseLayout: 'editorial',
    keywords: ['travel', 'safari', 'tour', 'package'],
    preview: { top: BRAND.colors.primaryTeal, accent: BRAND.colors.sandLight },
  },
  {
    id: 'restaurant-promotion',
    label: 'Restaurant Promotion',
    desc: 'Feature card over rich food photography.',
    category: 'promotion',
    baseLayout: 'feature',
    keywords: ['restaurant', 'food', 'dining', 'menu'],
    preview: { top: BRAND.colors.goldDark, accent: BRAND.colors.ivory },
  },
  {
    id: 'google-business',
    label: 'Google Business Update',
    desc: 'Clean editorial format for local business posts.',
    category: 'business',
    baseLayout: 'editorial',
    keywords: ['google', 'business', 'local', 'update'],
    preview: { top: BRAND.colors.ivory, accent: BRAND.colors.primaryTeal },
  },
  {
    id: 'linkedin-announcement',
    label: 'LinkedIn Announcement',
    desc: 'Professional quote-style announcement layout.',
    category: 'business',
    baseLayout: 'quote',
    keywords: ['linkedin', 'announcement', 'professional', 'corporate'],
    preview: { top: BRAND.colors.primaryTeal, accent: BRAND.colors.white },
  },
  {
    id: 'event-flyer',
    label: 'Event Flyer',
    desc: 'Bold editorial hero for events and launches.',
    category: 'events',
    baseLayout: 'editorial',
    keywords: ['event', 'flyer', 'launch', 'invite'],
    preview: { top: BRAND.colors.goldDark, accent: BRAND.colors.cream },
  },
  {
    id: 'statistics',
    label: 'Statistics',
    desc: 'Data-forward layout highlighting key metrics.',
    category: 'business',
    baseLayout: 'statistics',
    keywords: ['stats', 'data', 'metrics', 'numbers'],
    preview: { top: BRAND.colors.primaryTeal, accent: BRAND.colors.goldLight },
  },
  {
    id: 'before-after',
    label: 'Before & After',
    desc: 'Side-by-side comparison for transformations.',
    category: 'promotion',
    baseLayout: 'beforeAfter',
    keywords: ['before', 'after', 'comparison', 'transform'],
    preview: { top: BRAND.colors.sandLight, accent: BRAND.colors.primaryTeal },
  },
  {
    id: 'service-spotlight',
    label: 'Service Spotlight',
    desc: 'Highlight a service with full-bleed imagery.',
    category: 'business',
    baseLayout: 'feature',
    keywords: ['service', 'spotlight', 'offering'],
    preview: { top: BRAND.colors.primaryTealLight, accent: BRAND.colors.goldLight },
  },
  {
    id: 'testimonial',
    label: 'Testimonial',
    desc: 'Client quote with attribution and brand footer.',
    category: 'team',
    baseLayout: 'quote',
    keywords: ['testimonial', 'review', 'client', 'feedback'],
    preview: { top: BRAND.colors.cream, accent: BRAND.colors.goldDark },
  },
  {
    id: 'team-member',
    label: 'Team Member',
    desc: 'Portrait editorial for team introductions.',
    category: 'team',
    baseLayout: 'editorial',
    keywords: ['team', 'member', 'staff', 'profile'],
    preview: { top: BRAND.colors.ivory, accent: BRAND.colors.primaryTeal },
  },
  {
    id: 'breaking-news',
    label: 'Breaking News',
    desc: 'Urgent editorial layout for time-sensitive updates.',
    category: 'events',
    baseLayout: 'editorial',
    keywords: ['news', 'breaking', 'alert', 'update'],
    preview: { top: BRAND.colors.ink, accent: BRAND.colors.goldLight },
  },
  {
    id: 'destination-highlight',
    label: 'Destination Highlight',
    desc: 'Immersive destination feature with gradient overlay.',
    category: 'travel',
    baseLayout: 'feature',
    keywords: ['destination', 'travel', 'highlight', 'place'],
    preview: { top: BRAND.colors.primaryTeal, accent: BRAND.colors.sand },
  },
];

export function resolveLayoutId(id) {
  return LAYOUT_ALIASES[id] ?? id;
}

export function getLayoutById(id) {
  const resolved = resolveLayoutId(id);
  return LAYOUTS.find((l) => l.id === resolved) ?? LAYOUTS[0];
}

export function getLayoutIds() {
  return LAYOUTS.map((l) => l.id);
}

export function getBaseLayoutId(layoutId) {
  const layout = getLayoutById(layoutId);
  return layout.baseLayout;
}

export function searchLayouts(query, category = 'all') {
  const q = query.trim().toLowerCase();
  return LAYOUTS.filter((layout) => {
    if (category !== 'all' && layout.category !== category) return false;
    if (!q) return true;
    const haystack = [layout.label, layout.desc, layout.category, ...(layout.keywords ?? [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
