import { SectionLabel } from '../ui';

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
    'w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-lg px-3 py-2 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)] transition';

  return (
    <div className="mb-8 space-y-3">
      <SectionLabel step="3">Typography</SectionLabel>
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
        className="w-full bg-[var(--accent-teal)]/30 border border-[var(--accent-teal)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none font-bold"
      />
    </div>
  );
}
