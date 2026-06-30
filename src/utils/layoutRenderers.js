import { BRAND } from '../theme';
import { drawWrappedText, drawImageElement } from './exportCanvasHelpers';

export function renderEditorialLayout(ctx, w, h, img, state, drawFooter, helpers) {
  const { metaText, headlineText, bodyText1, bodyText2, headerColor, headlineColor, bodyColor, heroType, imageSrc, bgColorTheme } = state;
  const { zoom, panX, panY, imgOpacity, previewWidth, previewHeight } = helpers;

  drawWrappedText(ctx, metaText.toUpperCase(), w / 2, h * 0.08, w * 0.8, 30, `700 18px ${BRAND.fonts.body}`, headerColor, 'center', '6px');

  if (heroType === 'image' && imageSrc) {
    drawImageElement(ctx, img, w * 0.08, h * 0.15, w * 0.84, h * 0.4, zoom, panX, panY, imgOpacity, previewWidth, previewHeight, 24);
  }

  const textStartY = h * 0.6;
  let y = drawWrappedText(ctx, headlineText, w / 2, textStartY, w * 0.85, 80, `900 72px ${BRAND.fonts.heading}`, headlineColor, 'center');
  y = drawWrappedText(ctx, bodyText1, w / 2, y + 20, w * 0.75, 36, `400 24px ${BRAND.fonts.body}`, bodyColor, 'center');
  drawWrappedText(ctx, bodyText2, w / 2, y + 10, w * 0.75, 36, `italic 400 22px ${BRAND.fonts.heading}`, headerColor, 'center');

  drawFooter(h * 0.88, bgColorTheme === BRAND.colors.primaryTeal);
}

export function renderSplitLayout(ctx, w, h, img, state, drawFooter, helpers) {
  const { metaText, headlineText, bodyText1, bodyText2, headerColor, headlineColor, bodyColor, imageSrc } = state;
  const { zoom, panX, panY, imgOpacity, previewWidth, previewHeight } = helpers;

  if (imageSrc) {
    drawImageElement(ctx, img, 0, 0, w, h * 0.5, zoom, panX, panY, imgOpacity, previewWidth, previewHeight);
  }

  ctx.fillStyle = BRAND.colors.ivory;
  ctx.fillRect(0, h * 0.5, w, h * 0.5);
  ctx.strokeStyle = BRAND.colors.sand;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.5);
  ctx.lineTo(w, h * 0.5);
  ctx.stroke();

  let y = h * 0.55;
  drawWrappedText(ctx, metaText.toUpperCase(), w / 2, y, w * 0.8, 30, `700 18px ${BRAND.fonts.body}`, headerColor, 'center', '6px');
  y = drawWrappedText(ctx, headlineText, w / 2, y + 50, w * 0.85, 70, `900 64px ${BRAND.fonts.heading}`, headlineColor, 'center');
  y = drawWrappedText(ctx, bodyText1, w / 2, y + 30, w * 0.75, 36, `400 24px ${BRAND.fonts.body}`, bodyColor, 'center');
  drawWrappedText(ctx, bodyText2, w / 2, y + 10, w * 0.75, 36, `italic 400 22px ${BRAND.fonts.heading}`, BRAND.colors.primaryTeal, 'center');

  drawFooter(h * 0.86, false);
}

export function renderFeatureLayout(ctx, w, h, img, state, drawFooter, helpers) {
  const { metaText, headlineText, bodyText1, headerColor, headlineColor, bodyColor, imageSrc } = state;
  const { zoom, panX, panY, imgOpacity, previewWidth, previewHeight } = helpers;

  if (imageSrc) {
    drawImageElement(ctx, img, 0, 0, w, h, zoom, panX, panY, imgOpacity, previewWidth, previewHeight);
  }

  const grad = ctx.createLinearGradient(0, h * 0.5, 0, h);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(27,77,62,0.9)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, h * 0.5, w, h * 0.5);

  const cardH = h * 0.35;
  const cardY = h - cardH - 40;
  ctx.fillStyle = BRAND.colors.ivory;
  ctx.beginPath();
  ctx.roundRect(40, cardY, w - 80, cardH, 24);
  ctx.fill();

  let y = cardY + 50;
  drawWrappedText(ctx, metaText.toUpperCase(), w / 2, y, w * 0.7, 30, `700 16px ${BRAND.fonts.body}`, headerColor, 'center', '6px');
  y = drawWrappedText(ctx, headlineText, w / 2, y + 40, w * 0.75, 64, `900 56px ${BRAND.fonts.heading}`, headlineColor, 'center');
  drawWrappedText(ctx, bodyText1, w / 2, y + 20, w * 0.7, 32, `400 22px ${BRAND.fonts.body}`, bodyColor, 'center');

  drawFooter(cardY + cardH - 100, false);
}

export function renderQuoteLayout(ctx, w, h, _img, state, drawFooter) {
  const { metaText, headlineText, headerColor, headlineColor, bodyColor, bgColorTheme } = state;

  let y = h * 0.35;
  ctx.fillStyle = headerColor;
  ctx.globalAlpha = 0.2;
  ctx.font = `900 180px ${BRAND.fonts.heading}`;
  ctx.textAlign = 'center';
  ctx.fillText('\u201C', w / 2, y - 60);
  ctx.globalAlpha = 1.0;

  y = drawWrappedText(ctx, headlineText, w / 2, y, w * 0.8, 80, `italic 700 64px ${BRAND.fonts.heading}`, headlineColor, 'center');
  ctx.fillStyle = headerColor;
  ctx.fillRect(w / 2 - 40, y + 40, 80, 2);
  drawWrappedText(ctx, metaText.toUpperCase(), w / 2, y + 80, w * 0.8, 30, `700 18px ${BRAND.fonts.body}`, bodyColor, 'center', '4px');

  drawFooter(h * 0.88, bgColorTheme === BRAND.colors.primaryTeal);
}

const LAYOUT_RENDERERS = {
  editorial: renderEditorialLayout,
  split: renderSplitLayout,
  feature: renderFeatureLayout,
  quote: renderQuoteLayout,
};

export function renderLayoutToCanvas(ctx, w, h, img, state, drawFooter, helpers) {
  const renderer = LAYOUT_RENDERERS[state.layoutId];
  if (renderer) {
    renderer(ctx, w, h, img, state, drawFooter, helpers);
  }
}

export { LAYOUT_RENDERERS };
