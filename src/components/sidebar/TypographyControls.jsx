export function TypographyControls({
  metaText,
  setMetaText,
  headlineText,
  setHeadlineText,
  bodyText1,
  setBodyText1,
  bodyText2,
  setBodyText2,
  ctaText,
  setCtaText,
}) {
  const inputClass =
    'w-full bg-[#1C1C24] border border-[#2B2B33] rounded-lg px-3 py-2 text-white focus:border-[#C9A84C] focus:outline-none';

  return (
    <div className="mb-8 space-y-3">
      <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase mb-1">
        2. Typography Block
      </label>
      <input
        type="text"
        value={metaText}
        onChange={(e) => setMetaText(e.target.value)}
        placeholder="Subtitle / Meta"
        className={`${inputClass} text-xs font-mono`}
      />
      <textarea
        value={headlineText}
        onChange={(e) => setHeadlineText(e.target.value)}
        placeholder="Hero Headline"
        rows={2}
        className={`${inputClass} text-sm font-serif font-bold`}
      />
      <input
        type="text"
        value={bodyText1}
        onChange={(e) => setBodyText1(e.target.value)}
        placeholder="Body Text Line 1"
        className={`${inputClass} text-xs`}
      />
      <input
        type="text"
        value={bodyText2}
        onChange={(e) => setBodyText2(e.target.value)}
        placeholder="Body Text Line 2 (Italic)"
        className={`${inputClass} text-xs font-serif italic`}
      />
      <input
        type="text"
        value={ctaText}
        onChange={(e) => setCtaText(e.target.value)}
        placeholder="Call to Action (Optional)"
        className="w-full bg-[#1B4D3E]/30 border border-[#1B4D3E] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A84C] focus:outline-none font-bold"
      />
    </div>
  );
}
