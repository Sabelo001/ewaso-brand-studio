import { useRef, useState } from 'react';
import { readImageFile } from '../../utils/imageUtils';
import { Button, EmptyState, SearchInput, SectionLabel } from '../ui';

const CATEGORY_LABELS = {
  logos: 'Logos',
  backgrounds: 'Backgrounds',
  patterns: 'Patterns',
  icons: 'Icons',
  photography: 'Photography',
};

export function AssetLibraryPanel({ assetLibrary, onSelectAsset, onReplaceHero }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [view, setView] = useState('all');
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const source =
    view === 'favorites'
      ? assetLibrary.favorites
      : view === 'recent'
        ? assetLibrary.recent
        : assetLibrary.searchAssets(query, category);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readImageFile(file);
    const cat = category === 'all' ? 'photography' : category;
    assetLibrary.addAsset(cat, { name: file.name.replace(/\.[^.]+$/, ''), src: dataUrl });
    e.target.value = '';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const dataUrl = await readImageFile(file);
    assetLibrary.addAsset('photography', { name: file.name.replace(/\.[^.]+$/, ''), src: dataUrl });
  };

  return (
    <div className="space-y-4">
      <SectionLabel>Asset Library</SectionLabel>

      <div className="flex gap-1.5 flex-wrap">
        {['all', 'recent', 'favorites'].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
              view === v ? 'bg-[var(--accent-gold)] text-[var(--accent-on-gold)]' : 'bg-[var(--panel-bg)] text-[var(--text-muted)] border border-[var(--panel-border)]'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <SearchInput value={query} onChange={setQuery} placeholder="Search assets…" />

      <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1">
        {['all', ...assetLibrary.categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-2 py-1 rounded text-[9px] font-bold uppercase ${
              category === cat ? 'text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'
            }`}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border border-dashed border-[var(--panel-hover-border)] rounded-xl p-4 text-center hover:border-[var(--accent-gold)] transition"
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        <p className="text-xs text-[var(--text-muted)] mb-2">Drag & drop or upload images</p>
        <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
          Upload Asset
        </Button>
      </div>

      {source.length === 0 ? (
        <EmptyState
          title="No assets yet"
          description="Upload logos, backgrounds, patterns, icons, or photography."
        />
      ) : (
        <div className="grid grid-cols-3 gap-2 max-h-[360px] overflow-y-auto custom-scrollbar">
          {source.map((asset) => (
            <div
              key={asset.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-[var(--panel-border)] hover:border-[var(--accent-gold)] transition"
            >
              <button
                type="button"
                className="absolute inset-0 w-full h-full"
                onClick={() => setPreview(asset)}
                aria-label={`Preview ${asset.name}`}
              >
                <img src={asset.src} alt={asset.name} className="w-full h-full object-cover" loading="lazy" />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5 opacity-0 group-hover:opacity-100 transition">
                <p className="text-[8px] text-white truncate">{asset.name}</p>
              </div>
              <button
                type="button"
                onClick={() => assetLibrary.toggleFavorite(asset.id)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-[10px]"
                aria-label={assetLibrary.isFavorite(asset.id) ? 'Remove favorite' : 'Add favorite'}
              >
                {assetLibrary.isFavorite(asset.id) ? '★' : '☆'}
              </button>
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="bg-[var(--sidebar-bg)] rounded-2xl border border-[var(--panel-border)] max-w-md w-full p-4">
            <img src={preview.src} alt={preview.name} className="w-full rounded-lg mb-3 max-h-64 object-contain bg-black/20" />
            <p className="text-sm font-bold text-[var(--text-primary)] mb-3">{preview.name}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => {
                  onSelectAsset?.(preview.src);
                  assetLibrary.markRecent(preview.id);
                  setPreview(null);
                }}
              >
                Use Asset
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  onReplaceHero?.(preview.src);
                  assetLibrary.markRecent(preview.id);
                  setPreview(null);
                }}
              >
                Replace Hero
              </Button>
              {preview.userUploaded && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    assetLibrary.deleteAsset(preview.id);
                    setPreview(null);
                  }}
                >
                  Delete
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => setPreview(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
