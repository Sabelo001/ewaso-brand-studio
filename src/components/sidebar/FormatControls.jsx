import { useRef } from 'react';
import { readImageFile } from '../../utils/imageUtils';

const ASPECT_RATIOS = ['9:16', '4:5', '1:1'];

export function FormatControls({
  aspectRatio,
  setAspectRatio,
  layoutId,
  zoom,
  setZoom,
  imgOpacity,
  setImgOpacity,
  onImageUpload,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readImageFile(file);
      onImageUpload(dataUrl);
    }
  };

  return (
    <div className="mb-8 bg-[#1C1C24] p-4 rounded-xl border border-[#2B2B33] space-y-5">
      <div>
        <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Canvas Format</label>
        <div className="flex space-x-2">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setAspectRatio(r)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                aspectRatio === r
                  ? 'bg-[#C9A84C] text-[#141419]'
                  : 'bg-[#15151A] text-neutral-400 border border-[#2B2B33]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {layoutId !== 'quote' && (
        <div>
          <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Hero Image Asset</label>
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            className="border border-dashed border-[#40404A] hover:border-[#C9A84C] rounded-lg p-4 text-center cursor-pointer bg-[#15151A] transition"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <span className="text-xs text-white font-bold">📷 Replace Primary Asset</span>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1">
              <span className="text-[9px] text-neutral-500">Zoom Scale</span>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-[#C9A84C] bg-[#22222D] h-1 rounded-lg appearance-none"
              />
            </div>
            <div className="flex-1">
              <span className="text-[9px] text-neutral-500">Opacity</span>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={imgOpacity}
                onChange={(e) => setImgOpacity(parseFloat(e.target.value))}
                className="w-full accent-[#C9A84C] bg-[#22222D] h-1 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
