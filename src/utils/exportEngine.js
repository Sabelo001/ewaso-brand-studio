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
 * Supports PNG and JPG; architecture ready for PDF extension.
 */
export async function exportDesign(state, previewContainerRef, format = 'png') {
  const w = EXPORT_WIDTH;
  const h = getExportHeight(state.aspectRatio);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const previewWidth = previewContainerRef.current?.offsetWidth || 1;
  const previewHeight = previewContainerRef.current?.offsetHeight || 1;

  const helpers = {
    zoom: state.zoom,
    panX: state.panX,
    panY: state.panY,
    imgOpacity: state.imgOpacity,
    previewWidth,
    previewHeight,
  };

  const drawFooter = createFooterDrawer(ctx, w, state);

  const renderCanvas = (img) => {
    ctx.fillStyle = state.bgColorTheme;
    ctx.fillRect(0, 0, w, h);
    drawDecorations(ctx, state.decoration, w, h);

    renderLayoutToCanvas(ctx, w, h, img, state, drawFooter, helpers);
    drawBorderFrame(ctx, w, h, state.borderWidth, state.borderColor);

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpg' ? 0.92 : undefined;
    const ext = format === 'jpg' ? 'jpg' : 'png';
    const dataUrl = canvas.toDataURL(mimeType, quality);
    downloadDataUrl(dataUrl, `Ewaso_Brand_Studio_${state.layoutId}.${ext}`);
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
