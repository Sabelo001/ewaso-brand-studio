import { useCallback, useEffect, useMemo, useState } from 'react';
import { BRAND } from '../theme';
import { getPresetPatch } from '../layouts/presets';
import { createPlaceholderImage } from '../utils/imageUtils';
import { useBrandFonts } from './useBrandFonts';
import { useImagePan } from './useImagePan';
import { useAutosave, loadSavedState, PERSISTED_FIELDS } from './useAutosave';

function buildInitialState() {
  const saved = loadSavedState();
  const defaults = {
    layoutId: 'editorial',
    aspectRatio: '9:16',
    bgColorTheme: BRAND.colors.primaryTeal,
    heroType: 'image',
    footerStyle: 'full',
    decoration: 'none',
    imageSrc: null,
    metaText: 'LAKE NAKURU NATIONAL PARK',
    headlineText: 'The Silent Giant',
    bodyText1: 'Roaming undisturbed in one of Kenya\u2019s greatest sanctuaries.',
    bodyText2: 'Captured during golden hour in the wilderness.',
    ctaText: 'Discover the Safari',
    website: BRAND.signature.defaultWebsite,
    phone: BRAND.signature.defaultPhone,
    email: BRAND.signature.defaultEmail,
    whatsapp: BRAND.signature.defaultWhatsapp,
    headerColor: BRAND.colors.goldLight,
    headlineColor: BRAND.colors.white,
    bodyColor: BRAND.colors.cream,
    borderWidth: BRAND.spacing.borderDefault,
    borderColor: BRAND.colors.goldLight,
  };

  if (!saved) return defaults;
  return { ...defaults, ...saved };
}

/** Central studio state — single source of truth for the editor */
export function useStudioState() {
  useBrandFonts();

  const initial = useMemo(() => buildInitialState(), []);
  const imagePan = useImagePan();
  const { scheduleSave } = useAutosave();

  const [layoutId, setLayoutId] = useState(initial.layoutId);
  const [aspectRatio, setAspectRatio] = useState(initial.aspectRatio);
  const [bgColorTheme, setBgColorTheme] = useState(initial.bgColorTheme);
  const [heroType, setHeroType] = useState(initial.heroType);
  const [footerStyle, setFooterStyle] = useState(initial.footerStyle);
  const [decoration, setDecoration] = useState(initial.decoration);

  const [imageSrc, setImageSrc] = useState(initial.imageSrc);
  const [metaText, setMetaText] = useState(initial.metaText);
  const [headlineText, setHeadlineText] = useState(initial.headlineText);
  const [bodyText1, setBodyText1] = useState(initial.bodyText1);
  const [bodyText2, setBodyText2] = useState(initial.bodyText2);
  const [ctaText, setCtaText] = useState(initial.ctaText);

  const [website, setWebsite] = useState(initial.website);
  const [phone, setPhone] = useState(initial.phone);
  const [email, setEmail] = useState(initial.email);
  const [whatsapp, setWhatsapp] = useState(initial.whatsapp);

  const [headerColor, setHeaderColor] = useState(initial.headerColor);
  const [headlineColor, setHeadlineColor] = useState(initial.headlineColor);
  const [bodyColor, setBodyColor] = useState(initial.bodyColor);
  const [borderWidth, setBorderWidth] = useState(initial.borderWidth);
  const [borderColor, setBorderColor] = useState(initial.borderColor);

  // Restore pan/zoom from saved state
  useEffect(() => {
    const saved = loadSavedState();
    if (saved) {
      imagePan.patchFromSaved(saved);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Default placeholder image if none saved
  useEffect(() => {
    if (!imageSrc) {
      setImageSrc(createPlaceholderImage());
    }
  }, [imageSrc]);

  const applyPreset = useCallback((preset) => {
    const patch = getPresetPatch(preset);
    if (!patch) return;
    if (patch.layoutId) setLayoutId(patch.layoutId);
    if (patch.heroType) setHeroType(patch.heroType);
    if (patch.bgColorTheme) setBgColorTheme(patch.bgColorTheme);
    if (patch.headerColor) setHeaderColor(patch.headerColor);
    if (patch.headlineColor) setHeadlineColor(patch.headlineColor);
    if (patch.bodyColor) setBodyColor(patch.bodyColor);
  }, []);

  const fullState = useMemo(
    () => ({
      layoutId,
      aspectRatio,
      bgColorTheme,
      heroType,
      footerStyle,
      decoration,
      imageSrc,
      ...imagePan.panState,
      metaText,
      headlineText,
      bodyText1,
      bodyText2,
      ctaText,
      website,
      phone,
      email,
      whatsapp,
      headerColor,
      headlineColor,
      bodyColor,
      borderWidth,
      borderColor,
    }),
    [
      layoutId,
      aspectRatio,
      bgColorTheme,
      heroType,
      footerStyle,
      decoration,
      imageSrc,
      imagePan.panState,
      metaText,
      headlineText,
      bodyText1,
      bodyText2,
      ctaText,
      website,
      phone,
      email,
      whatsapp,
      headerColor,
      headlineColor,
      bodyColor,
      borderWidth,
      borderColor,
    ]
  );

  useEffect(() => {
    scheduleSave(fullState);
  }, [fullState, scheduleSave]);

  return {
    layoutId,
    setLayoutId,
    aspectRatio,
    setAspectRatio,
    bgColorTheme,
    setBgColorTheme,
    heroType,
    setHeroType,
    footerStyle,
    setFooterStyle,
    decoration,
    setDecoration,
    imageSrc,
    setImageSrc,
    metaText,
    setMetaText,
    headlineText,
    setHeadlineText,
    bodyText1,
    setBodyText1,
    bodyText2,
    setBodyText2,
    ctaText,
    setCtaText,
    website,
    setWebsite,
    phone,
    setPhone,
    email,
    setEmail,
    whatsapp,
    setWhatsapp,
    headerColor,
    setHeaderColor,
    headlineColor,
    setHeadlineColor,
    bodyColor,
    setBodyColor,
    borderWidth,
    setBorderWidth,
    borderColor,
    setBorderColor,
    applyPreset,
    imagePan,
    exportState: fullState,
  };
}

export { PERSISTED_FIELDS };
