import { DownloadIcon } from '../icons';

export function ExportToolbar({ onExportPng, onExportJpg }) {
  return (
    <div className="mt-auto space-y-2">
      <button
        type="button"
        onClick={onExportPng}
        className="w-full py-4 bg-[#C9A84C] text-[#141419] hover:bg-white font-bold tracking-widest uppercase rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
      >
        <DownloadIcon />
        <span>Export PNG</span>
      </button>
      <button
        type="button"
        onClick={onExportJpg}
        className="w-full py-3 bg-[#1C1C24] text-[#C9A84C] hover:bg-[#2B2B33] font-bold tracking-widest uppercase rounded-xl border border-[#2B2B33] transition-all flex items-center justify-center space-x-2"
      >
        <DownloadIcon />
        <span>Export JPG</span>
      </button>
    </div>
  );
}
