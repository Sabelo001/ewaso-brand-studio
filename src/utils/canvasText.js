/**
 * Draw wrapped text on canvas — matches DOM preview line breaks.
 * Returns the Y position after the last line.
 */
export function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, font, color, align, letterSpace = '0px') {
  if (!text) return y;

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  ctx.letterSpacing = letterSpace;

  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = `${line}${words[i]} `;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = `${words[i]} `;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line.trim(), x, currentY);
  ctx.letterSpacing = '0px';
  return currentY + lineHeight;
}
