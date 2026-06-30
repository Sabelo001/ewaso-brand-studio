import { LAYOUTS } from '../../layouts';

export function LayoutPicker({ layoutId, onSelect }) {
  return (
    <div className="mb-8">
      <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase mb-3">
        1. Layout Engine
      </label>
      <div className="grid grid-cols-2 gap-2">
        {LAYOUTS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => onSelect(l.id)}
            className={`p-3 rounded-xl text-left transition border ${
              layoutId === l.id
                ? 'bg-[#1B4D3E] border-[#C9A84C]'
                : 'bg-[#1C1C24] border-[#2B2B33] hover:border-[#40404A]'
            }`}
          >
            <div className="text-xs font-bold text-white mb-1">{l.label}</div>
            <div className="text-[9px] text-neutral-400 leading-snug">{l.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
