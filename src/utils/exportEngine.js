import { BRAND, EXPORT_WIDTH, getExportHeight } from '../theme';
import { downloadDataUrl, loadImage } from './imageUtils';
import {
  drawDecorations,
  createFooterDrawer,
  drawBorderFrame,
} from './exportCanvasHelpers';
import { renderLayoutToCanvas } from './layoutRenderers';

/**
 * High-resolution canvas export engine.
 * Supports PNG, JPG, transparent PNG, 2×/4× scale; architecture ready for PDF.
 */
export async function exportDesign(state, previewContainerRef, options = {}) {
  const {
    format = 'png',
    scale = 1,
    quality = 0.92,
    filename = 'ewaso-design',
    transparent = false,
    onProgress,
  } = typeof options === 'string'
    ? { format: options }
    : options;

  onProgress?.(0.1);

  const baseW = EXPORT_WIDTH;
  const baseH = getExportHeight(state.aspectRatio);
  const w = Math.round(baseW * scale);
  const h = Math.round(baseH * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const previewWidth = previewContainerRef.current?.offsetWidth || 1;
  const previewHeight = previewContainerRef.current?.offsetHeight || 1;

  if (scale !== 1) {
    ctx.scale(scale, scale);
  }

  const helpers = {
    zoom: state.zoom,
    panX: state.panX,
    panY: state.panY,
    imgOpacity: state.imgOpacity,
    previewWidth,
    previewHeight,
  };

  const drawFooter = createFooterDrawer(ctx, baseW, state);

  onProgress?.(0.35);

  const renderCanvas = (img) => {
    if (!transparent) {
      ctx.fillStyle = state.bgColorTheme;
      ctx.fillRect(0, 0, baseW, baseH);
    } else {
      ctx.clearRect(0, 0, baseW, baseH);
    }

    drawDecorations(ctx, state.decoration, baseW, baseH);
    renderLayoutToCanvas(ctx, baseW, baseH, img, state, drawFooter, helpers);
    drawBorderFrame(ctx, baseW, baseH, state.borderWidth, state.borderColor);

    onProgress?.(0.85);

    const isJpg = format === 'jpg';
    const mimeType = isJpg ? 'image/jpeg' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, isJpg ? quality : undefined);
    const ext = isJpg ? 'jpg' : 'png';
    downloadDataUrl(dataUrl, `${filename}.${ext}`);

    onProgress?.(1);
  };

  if (state.imageSrc && state.heroType === 'image') {
    const img = await loadImage(state.imageSrc);
    renderCanvas(img);
  } else {
    renderCanvas(null);
  }
}

/** Future PDF export entry point */
export async function exportDesignPdf(_state, _previewContainerRef) {
  throw new Error('PDF export not yet implemented');
}

export { BRAND };
