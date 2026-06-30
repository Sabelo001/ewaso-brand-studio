/** Layout category definitions for the gallery */
export const LAYOUT_CATEGORIES = [
  { id: 'all', label: 'All Layouts' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'promotion', label: 'Promotion' },
  { id: 'quote', label: 'Quote & Social' },
  { id: 'property', label: 'Property & Hospitality' },
  { id: 'travel', label: 'Travel & Tourism' },
  { id: 'business', label: 'Business' },
  { id: 'events', label: 'Events & News' },
  { id: 'team', label: 'Team & Testimonials' },
];

export function getCategoryLabel(id) {
  return LAYOUT_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
