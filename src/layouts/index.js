/** Layout registry — add new layouts here without modifying existing ones */
export const LAYOUTS = [
  {
    id: 'editorial',
    label: 'Editorial Hero',
    desc: 'Large image focus with structured typography below.',
    category: 'editorial',
  },
  {
    id: 'split',
    label: 'Signature Split',
    desc: 'Half image, half solid brand card with borders.',
    category: 'promotion',
  },
  {
    id: 'feature',
    label: 'Property Feature',
    desc: 'Full bleed background image with a floating content card.',
    category: 'property',
  },
  {
    id: 'quote',
    label: 'Quote Card',
    desc: 'Typography-first layout focusing on a central statement.',
    category: 'quote',
  },
];

export function getLayoutById(id) {
  return LAYOUTS.find((l) => l.id === id) ?? LAYOUTS[0];
}

export function getLayoutIds() {
  return LAYOUTS.map((l) => l.id);
}
