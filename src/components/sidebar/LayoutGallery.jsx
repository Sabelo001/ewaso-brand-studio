import { useMemo, useState } from 'react';
import { searchLayouts, LAYOUT_CATEGORIES } from '../../layouts';
import { LayoutPreviewThumb } from '../../layouts/LayoutPreviewThumb';
import { SearchInput, SectionLabel, EmptyState } from '../ui';

export function LayoutGallery({ layoutId, onSelect }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => searchLayouts(query, category), [query, category]);

  return (
    <div className="mb-6">
      <SectionLabel step="1">Layout Gallery</SectionLabel>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search layouts…"
        className="mb-3"
      />

      <div
        className="flex gap-1.5 overflow-x-auto pb-2 mb-3 custom-scrollbar"
        role="tablist"
        aria-label="Layout categories"
      >
        {LAYOUT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={category === cat.id}
            onClick={() => setCategory(cat.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
              category === cat.id
                ? 'bg-[var(--accent-teal)] text-white'
                : 'bg-[var(--panel-bg)] text-[var(--text-muted)] border border-[var(--panel-border)] hover:border-[var(--panel-hover-border)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No layouts found"
          description="Try a different search term or category."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className="text-xs text-[var(--accent-gold)] hover:underline"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
          {filtered.map((layout) => {
            const isActive = layoutId === layout.id;
            return (
              <button
                key={layout.id}
                type="button"
                onClick={() => onSelect(layout.id)}
                className={`group text-left p-2.5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                  isActive
                    ? 'bg-[var(--accent-teal)] border-[var(--accent-gold)]'
                    : 'bg-[var(--panel-bg)] border-[var(--panel-border)] hover:border-[var(--panel-hover-border)] hover:bg-[var(--panel-bg-hover)]'
                }`}
              >
                <LayoutPreviewThumb layout={layout} isActive={isActive} />
                <div className="mt-2">
                  <div className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">{layout.label}</div>
                  <div className="text-[9px] text-[var(--text-muted)] leading-snug mt-0.5 line-clamp-2">
                    {layout.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
