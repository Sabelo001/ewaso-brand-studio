import { useCallback, useEffect, useMemo, useState } from 'react';
import { BRAND } from '../theme';
import { getPresetPatch } from '../layouts/presets';
import { resolveLayoutId } from '../layouts';
import { createPlaceholderImage } from '../utils/imageUtils';
import { sanitizeText } from '../utils/validation';
import { useBrandFonts } from './useBrandFonts';
import { useImagePan } from './useImagePan';
import { useAutosave, loadSavedState, PERSISTED_FIELDS } from './useAutosave';
import { useHistory } from './useHistory';

function buildInitialState(settings) {
  const saved = loadSavedState();
  const defaults = {
    layoutId: 'editorial',
    aspectRatio: settings?.defaultAspectRatio ?? '9:16',
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
  return {
    ...defaults,
    ...saved,
    layoutId: resolveLayoutId(saved.layoutId ?? defaults.layoutId),
  };
}

function applyPatch(setters, patch) {
  if (patch.layoutId) setters.setLayoutId(patch.layoutId);
  if (patch.aspectRatio) setters.setAspectRatio(patch.aspectRatio);
  if (patch.heroType) setters.setHeroType(patch.heroType);
  if (patch.bgColorTheme) setters.setBgColorTheme(patch.bgColorTheme);
  if (patch.footerStyle) setters.setFooterStyle(patch.footerStyle);
  if (patch.decoration) setters.setDecoration(patch.decoration);
  if (patch.headerColor) setters.setHeaderColor(patch.headerColor);
  if (patch.headlineColor) setters.setHeadlineColor(patch.headlineColor);
  if (patch.bodyColor) setters.setBodyColor(patch.bodyColor);
  if (patch.borderWidth != null) setters.setBorderWidth(patch.borderWidth);
  if (patch.borderColor) setters.setBorderColor(patch.borderColor);
  if (patch.metaText != null) setters.setMetaText(sanitizeText(patch.metaText, 200));
  if (patch.headlineText != null) setters.setHeadlineText(sanitizeText(patch.headlineText, 300));
  if (patch.bodyText1 != null) setters.setBodyText1(sanitizeText(patch.bodyText1, 400));
  if (patch.bodyText2 != null) setters.setBodyText2(sanitizeText(patch.bodyText2, 400));
  if (patch.ctaText != null) setters.setCtaText(sanitizeText(patch.ctaText, 120));
  if (patch.website != null) setters.setWebsite(sanitizeText(patch.website, 120));
  if (patch.phone != null) setters.setPhone(sanitizeText(patch.phone, 40));
  if (patch.email != null) setters.setEmail(sanitizeText(patch.email, 120));
  if (patch.whatsapp != null) setters.setWhatsapp(sanitizeText(patch.whatsapp, 40));
  if (patch.imageSrc) setters.setImageSrc(patch.imageSrc);
}

/** Central studio state — single source of truth for the editor */
export function useStudioState(settings) {
  useBrandFonts();

  const initial = useMemo(() => buildInitialState(settings), [settings]);
  const imagePan = useImagePan();
  const { scheduleSave } = useAutosave();
  const history = useHistory(initial);

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

  const setters = useMemo(
    () => ({
      setLayoutId,
      setAspectRatio,
      setBgColorTheme,
      setHeroType,
      setFooterStyle,
      setDecoration,
      setImageSrc,
      setMetaText,
      setHeadlineText,
      setBodyText1,
      setBodyText2,
      setCtaText,
      setWebsite,
      setPhone,
      setEmail,
      setWhatsapp,
      setHeaderColor,
      setHeadlineColor,
      setBodyColor,
      setBorderWidth,
      setBorderColor,
    }),
    []
  );

  useEffect(() => {
    const saved = loadSavedState();
    if (saved) {
      imagePan.patchFromSaved(saved);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!imageSrc) {
      setImageSrc(createPlaceholderImage());
    }
  }, [imageSrc]);

  const getSnapshot = useCallback(
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

  const applyPreset = useCallback(
    (presetId) => {
      history.pushSnapshot(getSnapshot());
      const patch = getPresetPatch(presetId);
      if (!patch) return;
      applyPatch(setters, patch);
      imagePan.resetPan();
    },
    [getSnapshot, history, setters, imagePan]
  );

  const loadState = useCallback(
    (state) => {
      history.pushSnapshot(getSnapshot());
      applyPatch(setters, state);
      if (state.zoom != null) imagePan.setZoom(state.zoom);
      if (state.panX != null) imagePan.setPanX(state.panX);
      if (state.panY != null) imagePan.setPanY(state.panY);
      if (state.imgOpacity != null) imagePan.setImgOpacity(state.imgOpacity);
    },
    [getSnapshot, history, setters, imagePan]
  );

  const duplicateDesign = useCallback(() => {
    history.pushSnapshot(getSnapshot());
  }, [getSnapshot, history]);

  const clearHeroImage = useCallback(() => {
    history.pushSnapshot(getSnapshot());
    setImageSrc(createPlaceholderImage());
    imagePan.resetPan();
  }, [getSnapshot, history, imagePan]);

  const undo = useCallback(() => {
    const prev = history.undo();
    if (prev) loadState(prev);
  }, [history, loadState]);

  const redo = useCallback(() => {
    const next = history.redo();
    if (next) loadState(next);
  }, [history, loadState]);

  const fullState = useMemo(() => getSnapshot(), [getSnapshot]);

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
    loadState,
    duplicateDesign,
    clearHeroImage,
    undo,
    redo,
    canUndo: history.canUndo,
    canRedo: history.canRedo,
    imagePan,
    exportState: fullState,
    getSnapshot,
  };
}

export { PERSISTED_FIELDS };
