import { memo } from 'react';
import { getBaseLayoutId } from './registry';

function PreviewBlock({ color, height = '40%', rounded = true, split = false }) {
  if (split) {
    return (
      <div className="flex flex-col h-full w-full">
        <div style={{ backgroundColor: color, height: '50%' }} />
        <div className="h-[50%] bg-[var(--preview-card)] border-t border-[var(--preview-border)]" />
      </div>
    );
  }
  return (
    <div className="relative h-full w-full flex flex-col p-1.5 gap-1">
      <div
        className={`w-full ${rounded ? 'rounded-sm' : ''}`}
        style={{ backgroundColor: color, height }}
      />
      <div className="flex-1 flex flex-col gap-0.5 px-0.5">
        <div className="h-1 w-1/2 bg-[var(--preview-accent)] rounded-full opacity-80" />
        <div className="h-1.5 w-full bg-[var(--preview-line)] rounded-full opacity-60" />
        <div className="h-1 w-3/4 bg-[var(--preview-line)] rounded-full opacity-40" />
      </div>
    </div>
  );
}

export const LayoutPreviewThumb = memo(function LayoutPreviewThumb({ layout, isActive }) {
  const base = getBaseLayoutId(layout.id);
  const topColor = layout.preview?.top ?? '#1B4D3E';
  const accent = layout.preview?.accent ?? '#C9A84C';

  return (
    <div
      className={`relative aspect-[4/5] rounded-lg overflow-hidden border transition-all duration-200 ${
        isActive
          ? 'border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/30'
          : 'border-[var(--panel-border)] group-hover:border-[var(--panel-hover-border)]'
      }`}
      style={{
        '--preview-accent': accent,
        '--preview-card': '#FFFDF8',
        '--preview-border': '#E6DCC7',
        '--preview-line': accent,
        backgroundColor: layout.preview?.top ?? topColor,
      }}
    >
      {base === 'split' && <PreviewBlock color={topColor} split />}
      {base === 'feature' && (
        <div className="relative h-full">
          <div className="absolute inset-0" style={{ backgroundColor: topColor }} />
          <div className="absolute bottom-1 left-1 right-1 h-[35%] bg-[var(--preview-card)] rounded-sm border border-[var(--preview-border)]" />
        </div>
      )}
      {base === 'quote' && (
        <div className="h-full flex flex-col items-center justify-center p-2" style={{ backgroundColor: topColor }}>
          <div className="text-lg opacity-30 font-serif leading-none" style={{ color: accent }}>
            &ldquo;
          </div>
          <div className="h-1 w-2/3 rounded-full mt-1" style={{ backgroundColor: accent }} />
          <div className="h-0.5 w-1/2 rounded-full mt-1 opacity-50" style={{ backgroundColor: accent }} />
        </div>
      )}
      {base === 'statistics' && (
        <div className="h-full p-2 flex flex-col justify-center gap-1" style={{ backgroundColor: topColor }}>
          <div className="text-[8px] font-bold text-white/80">340+</div>
          <div className="h-1 w-full rounded-full" style={{ backgroundColor: accent, opacity: 0.6 }} />
          <div className="h-1 w-2/3 rounded-full bg-white/20" />
        </div>
      )}
      {base === 'beforeAfter' && (
        <div className="flex h-full">
          <div className="w-1/2 h-full opacity-60" style={{ backgroundColor: accent }} />
          <div className="w-1/2 h-full" style={{ backgroundColor: topColor }} />
        </div>
      )}
      {(base === 'editorial' || !['split', 'feature', 'quote', 'statistics', 'beforeAfter'].includes(base)) && (
        <PreviewBlock color={topColor} accent={accent} />
      )}
    </div>
  );
});
