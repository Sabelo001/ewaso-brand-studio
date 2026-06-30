/** Centralized Ewaso Digital brand tokens */
export const BRAND = {
  colors: {
    primaryTeal: '#1B4D3E',
    primaryTealLight: '#2A6B57',
    goldLight: '#C9A84C',
    goldDark: '#C47E1A',
    cream: '#FAF6EE',
    ivory: '#FFFDF8',
    sand: '#E6DCC7',
    sandLight: '#F5EDD8',
    ink: '#1A1A1A',
    muted: '#7A7265',
    white: '#FFFFFF',
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"DM Sans", sans-serif',
  },
  logo: {
    name: 'EWASO DIGITAL',
    tagline: 'Brand Studio System',
  },
  signature: {
    label: 'EWASO DIGITAL',
    defaultWebsite: 'ewasodigital.co.ke',
    defaultPhone: '+254 711 940 174',
    defaultEmail: 'hello@ewasodigital.co.ke',
    defaultWhatsapp: '+254 711 940 174',
  },
  spacing: {
    canvasPadding: 24,
    borderDefault: 12,
    sectionGap: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 24,
    xl: 24,
    full: 9999,
  },
  shadows: {
    canvas: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    card: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    brand: '0 10px 15px -3px rgba(27, 77, 62, 0.2)',
  },
};

export const EXPORT_WIDTH = 1080;

export function getExportHeight(aspectRatio) {
  if (aspectRatio === '9:16') return 1920;
  if (aspectRatio === '4:5') return 1350;
  return 1080;
}

export function getPreviewMaxWidth(aspectRatio) {
  if (aspectRatio === '9:16') return '380px';
  if (aspectRatio === '4:5') return '460px';
  return '520px';
}

export function getAspectRatioCss(aspectRatio) {
  if (aspectRatio === '9:16') return '9/16';
  if (aspectRatio === '4:5') return '4/5';
  return '1/1';
}
