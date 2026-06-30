import { useRef } from 'react';
import { readImageFile } from '../../utils/imageUtils';
import { Panel, SectionLabel } from '../ui';

const ASPECT_RATIOS = ['9:16', '4:5', '1:1'];

export function FormatControls({
  aspectRatio,
  setAspectRatio,
  heroType,
  zoom,
  setZoom,
  imgOpacity,
  setImgOpacity,
  onImageUpload,
  onResetPan,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readImageFile(file);
        onImageUpload(dataUrl);
      } catch {
        // Invalid file — silently ignore
      }
    }
  };

  return (
    <Panel className="mb-6 space-y-5">
      <div>
        <SectionLabel step="2">Canvas Format</SectionLabel>
        <div className="flex gap-2" role="group" aria-label="Aspect ratio">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setAspectRatio(r)}
              aria-pressed={aspectRatio === r}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                aspectRatio === r
                  ? 'bg-[var(--accent-gold)] text-[var(--accent-on-gold)]'
                  : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--panel-border)] hover:border-[var(--panel-hover-border)]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {heroType !== 'quote' && (
        <div>
          <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">
            Hero Image
          </label>
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            className="border border-dashed border-[var(--panel-hover-border)] hover:border-[var(--accent-gold)] rounded-lg p-4 text-center cursor-pointer bg-[var(--input-bg)] transition"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              aria-label="Upload hero image"
            />
            <span className="text-xs text-[var(--text-primary)] font-bold">Replace Primary Asset</span>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1">
              <label className="text-[9px] text-[var(--text-muted)]" htmlFor="zoom-range">
                Zoom
              </label>
              <input
                id="zoom-range"
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent-gold)] bg-[var(--panel-border)] h-1 rounded-lg appearance-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-[9px] text-[var(--text-muted)]" htmlFor="opacity-range">
                Opacity
              </label>
              <input
                id="opacity-range"
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={imgOpacity}
                onChange={(e) => setImgOpacity(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent-gold)] bg-[var(--panel-border)] h-1 rounded-lg appearance-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={onResetPan}
            className="mt-2 text-[10px] text-[var(--accent-gold)] hover:underline"
          >
            Reset image position
          </button>
        </div>
      )}
    </Panel>
  );
}
