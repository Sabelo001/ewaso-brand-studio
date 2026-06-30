export function sanitizeText(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value.slice(0, maxLength).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
}

export function sanitizeFilename(value) {
  const cleaned = (value || 'ewaso-design')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 80);
  return cleaned || 'ewaso-design';
}

export function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function isValidDataUrl(value) {
  return typeof value === 'string' && value.startsWith('data:image/');
}
