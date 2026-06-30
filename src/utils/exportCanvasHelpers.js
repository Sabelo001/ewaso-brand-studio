import { BRAND } from '../theme';
import { drawWrappedText } from './canvasText';

export function drawImageElement(ctx, img, dx, dy, dw, dh, zoom, panX, panY, imgOpacity, previewWidth, previewHeight, radius = 0) {
  ctx.save();
  if (radius > 0) {
    ctx.beginPath();
    ctx.roundRect(dx, dy, dw, dh, radius);
    ctx.clip();
  } else {
    ctx.beginPath();
    ctx.rect(dx, dy, dw, dh);
    ctx.clip();
  }

  const scale = Math.max(dw / img.width, dh / img.height) * zoom;
  const finalW = img.width * scale;
  const finalH = img.height * scale;

  const pW = previewWidth || 1;
  const pH = previewHeight || 1;
  const mappedPanX = panX * (dw / pW);
  const mappedPanY = panY * (dh / pH);

  const ox = dx + (dw - finalW) / 2 + mappedPanX;
  const oy = dy + (dh - finalH) / 2 + mappedPanY;

  ctx.globalAlpha = imgOpacity;
  ctx.drawImage(img, ox, oy, finalW, finalH);
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

export function drawDecorations(ctx, decoration, w, h) {
  if (decoration === 'river') {
    ctx.strokeStyle = BRAND.colors.goldLight;
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 120;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.8);
    ctx.bezierCurveTo(w * 0.4, h * 0.6, w * 0.6, h * 0.9, w, h * 0.7);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
  }
}

export function createFooterDrawer(ctx, w, state) {
  const { website, whatsapp, phone, email, footerStyle } = state;

  return (yPos, themeIsDark) => {
    const textColor = themeIsDark ? BRAND.colors.white : BRAND.colors.ink;
    const iconColor = themeIsDark ? BRAND.colors.goldLight : BRAND.colors.goldDark;
    const lineY = yPos;

    ctx.fillStyle = iconColor;
    ctx.fillRect(w / 2 - 20, lineY, 40, 2);

    drawWrappedText(
      ctx,
      'EWASO DIGITAL',
      w / 2,
      lineY + 20,
      w,
      30,
      `700 16px ${BRAND.fonts.body}`,
      textColor,
      'center',
      '4px'
    );

    ctx.font = `500 16px ${BRAND.fonts.body}`;
    ctx.fillStyle = themeIsDark ? BRAND.colors.sandLight : BRAND.colors.muted;
    ctx.textAlign = 'center';

    let contactStr = `Web: ${website}`;
    if (footerStyle === 'compact') contactStr += `   |   WA: ${whatsapp}`;
    if (footerStyle === 'full') contactStr += `   |   Tel: ${phone}   |   Email: ${email}`;

    ctx.fillText(contactStr, w / 2, lineY + 50);
  };
}

export function drawBorderFrame(ctx, w, h, borderWidth, borderColor) {
  if (borderWidth > 0) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth * 2;
    ctx.strokeRect(borderWidth, borderWidth, w - borderWidth * 2, h - borderWidth * 2);
  }
}

export { drawWrappedText };
