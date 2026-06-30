import { useEffect } from 'react';

const FONT_LINK_ID = 'ewaso-brand-fonts';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap';

export function loadBrandFonts() {
  if (document.getElementById(FONT_LINK_ID)) return;
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.href = FONT_HREF;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export function useBrandFonts() {
  useEffect(() => {
    loadBrandFonts();
  }, []);
}
