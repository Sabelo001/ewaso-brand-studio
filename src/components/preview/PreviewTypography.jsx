import { memo } from 'react';

export const PreviewHeader = memo(function PreviewHeader({ metaText, color }) {
  return (
    <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color }}>
      {metaText}
    </div>
  );
});

export const PreviewHeadline = memo(function PreviewHeadline({ headlineText, color }) {
  return (
    <h2 className="text-4xl font-bold leading-tight font-serif mb-4" style={{ color }}>
      {headlineText}
    </h2>
  );
});

export const PreviewBody = memo(function PreviewBody({ bodyText1, bodyText2, bodyColor, headerColor, align = 'center' }) {
  return (
    <div className={`flex flex-col items-${align} gap-2 opacity-90`}>
      <p className="text-xs font-sans leading-relaxed max-w-[85%] text-center" style={{ color: bodyColor }}>
        {bodyText1}
      </p>
      {bodyText2 && (
        <p className="text-xs font-serif italic text-center mt-1" style={{ color: headerColor }}>
          {bodyText2}
        </p>
      )}
    </div>
  );
});

export const PreviewCta = memo(function PreviewCta({ ctaText }) {
  if (!ctaText) return null;
  return (
    <div className="mt-6 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider bg-[#1B4D3E] text-white border border-[#C9A84C]">
      {ctaText}
    </div>
  );
});

export const PreviewCtaCompact = memo(function PreviewCtaCompact({ ctaText }) {
  if (!ctaText) return null;
  return (
    <div className="mt-5 px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider bg-[#1B4D3E] text-white">
      {ctaText}
    </div>
  );
});
