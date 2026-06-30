import { COLOR_OPTIONS } from '../../theme';

function ColorRow({ label, value, onChange, linkedSetter }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold text-neutral-400">{label}</span>
      <div className="flex space-x-1">
        {COLOR_OPTIONS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => (linkedSetter ? linkedSetter(c.value) : onChange(c.value))}
            className={`w-5 h-5 rounded-full border-2 ${
              value === c.value ? 'border-[#C9A84C]' : 'border-transparent'
            } ${c.bgClass}`}
            title={c.name}
          />
        ))}
      </div>
    </div>
  );
}

export function BrandColorControls({
  bgColorTheme,
  setBgColorTheme,
  headlineColor,
  setHeadlineColor,
  headerColor,
  setHeaderColor,
  setBorderColor,
  bodyColor,
  setBodyColor,
}) {
  return (
    <div className="mb-8 bg-[#1C1C24] p-4 rounded-xl border border-[#2B2B33] space-y-4">
      <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase border-b border-[#2B2B33] pb-2">
        3. Brand Colors
      </label>

      <ColorRow label="Background Theme:" value={bgColorTheme} onChange={setBgColorTheme} />
      <ColorRow label="Headline Color:" value={headlineColor} onChange={setHeadlineColor} />
      <ColorRow
        label="Accents (Meta/Border):"
        value={headerColor}
        linkedSetter={(v) => {
          setHeaderColor(v);
          setBorderColor(v);
        }}
      />
      <ColorRow label="Body Text:" value={bodyColor} onChange={setBodyColor} />
    </div>
  );
}
