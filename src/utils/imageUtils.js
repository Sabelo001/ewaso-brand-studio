/** Create default gradient placeholder image as data URL */
export function createPlaceholderImage(width = 1080, height = 1080) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#11221A');
  grad.addColorStop(1, '#2A5345');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  return canvas.toDataURL();
}

/** Read uploaded file as data URL */
export function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Trigger browser download from canvas data URL */
export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/** Load image from src — returns Promise<HTMLImageElement> */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
