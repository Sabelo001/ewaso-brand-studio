import { BRAND } from './brand';

/** Swatch options for color pickers — derived from brand tokens */
export const COLOR_OPTIONS = [
  {
    name: 'Teal',
    value: BRAND.colors.primaryTeal,
    bgClass: 'bg-[#1B4D3E]',
    textClass: 'text-white',
  },
  {
    name: 'Gold',
    value: BRAND.colors.goldLight,
    bgClass: 'bg-[#C9A84C]',
    textClass: 'text-black',
  },
  {
    name: 'Cream',
    value: BRAND.colors.cream,
    bgClass: 'bg-[#FAF6EE]',
    textClass: 'text-black',
  },
  {
    name: 'White',
    value: BRAND.colors.white,
    bgClass: 'bg-white',
    textClass: 'text-black',
  },
  {
    name: 'Ink',
    value: BRAND.colors.ink,
    bgClass: 'bg-[#1A1A1A]',
    textClass: 'text-white',
  },
];
