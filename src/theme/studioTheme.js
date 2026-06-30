import { BRAND } from './brand';

/** Studio chrome / shell UI tokens (sidebar, workspace) — mirrors CSS variables */
export const STUDIO_THEME = {
  shell: {
    bg: '#0E0E11',
    text: '#ECE9E4',
  },
  sidebar: {
    bg: '#141419',
    border: '#26262B',
    width: '480px',
  },
  panel: {
    bg: '#1C1C24',
    border: '#2B2B33',
    hoverBorder: '#40404A',
    inputBg: '#15151A',
  },
  accent: {
    gold: BRAND.colors.goldLight,
    teal: BRAND.colors.primaryTeal,
    goldOnDark: '#141419',
  },
  label: {
    gold: BRAND.colors.goldLight,
    muted: '#9CA3AF',
  },
  shadows: {
    panel: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    canvas: BRAND.shadows.canvas,
  },
  animation: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
};
