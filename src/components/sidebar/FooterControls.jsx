const FOOTER_STYLES = ['minimal', 'compact', 'full'];

export function FooterControls({
  footerStyle,
  setFooterStyle,
  website,
  setWebsite,
  whatsapp,
  setWhatsapp,
  phone,
  setPhone,
  email,
  setEmail,
  borderWidth,
  setBorderWidth,
}) {
  const inputClass =
    'bg-[#1C1C24] border border-[#2B2B33] rounded px-2 py-1.5 text-[10px] text-white focus:border-[#C9A84C] focus:outline-none';

  return (
    <div className="mb-8">
      <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase mb-3">
        4. Footer & Overlays
      </label>
      <div className="space-y-4">
        <div className="flex gap-2">
          {FOOTER_STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFooterStyle(s)}
              className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded border transition ${
                footerStyle === s
                  ? 'bg-[#1B4D3E] text-white border-[#C9A84C]'
                  : 'bg-[#1C1C24] border-[#2B2B33] text-neutral-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {footerStyle !== 'minimal' && (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className={inputClass}
              placeholder="Website"
            />
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className={inputClass}
              placeholder="WhatsApp"
            />
            {footerStyle === 'full' && (
              <>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="Phone"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="Email"
                />
              </>
            )}
          </div>
        )}

        <div className="pt-3 border-t border-[#26262B]">
          <div className="flex justify-between text-[10px] font-bold text-neutral-400 mb-1">
            <span>Outer Border Frame</span>
            <span>{borderWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="24"
            step="2"
            value={borderWidth}
            onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))}
            className="w-full accent-[#C9A84C] bg-[#22222D] h-1 rounded-lg appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
