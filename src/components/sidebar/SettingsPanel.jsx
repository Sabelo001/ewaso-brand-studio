import { SectionLabel, Panel } from '../ui';

const ASPECT_RATIOS = ['9:16', '4:5', '1:1'];
const EXPORT_FORMATS = [
  { id: 'png', label: 'PNG' },
  { id: 'jpg', label: 'JPG' },
  { id: 'png-transparent', label: 'Transparent PNG' },
];
const EXPORT_SCALES = [
  { id: 1, label: '1×' },
  { id: 2, label: '2×' },
  { id: 4, label: '4×' },
];

export function SettingsPanel({ settings, updateSetting, resetSettings }) {
  return (
    <div className="space-y-4">
      <SectionLabel>Studio Settings</SectionLabel>

      <Panel className="space-y-4">
        <div>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">Appearance</p>
          <div className="flex gap-2">
            {['dark', 'light'].map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => updateSetting('theme', theme)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition ${
                  settings.theme === theme
                    ? 'bg-[var(--accent-gold)] text-[var(--accent-on-gold)]'
                    : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--panel-border)]'
                }`}
              >
                {theme} mode
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">Canvas Preferences</p>
          <label className="flex items-center justify-between py-2 text-xs text-[var(--text-primary)]">
            <span>Show snap guides</span>
            <input
              type="checkbox"
              checked={settings.snapGuides}
              onChange={(e) => updateSetting('snapGuides', e.target.checked)}
              className="accent-[var(--accent-gold)]"
            />
          </label>
          <label className="flex items-center justify-between py-2 text-xs text-[var(--text-primary)]">
            <span>Show alignment guides</span>
            <input
              type="checkbox"
              checked={settings.showAlignmentGuides}
              onChange={(e) => updateSetting('showAlignmentGuides', e.target.checked)}
              className="accent-[var(--accent-gold)]"
            />
          </label>
          <label className="flex items-center justify-between py-2 text-xs text-[var(--text-primary)]">
            <span>Canvas grid overlay</span>
            <input
              type="checkbox"
              checked={settings.canvasGrid}
              onChange={(e) => updateSetting('canvasGrid', e.target.checked)}
              className="accent-[var(--accent-gold)]"
            />
          </label>
        </div>

        <div>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">Default Export</p>
          <div className="flex gap-2 mb-3 flex-wrap">
            {EXPORT_FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => updateSetting('defaultExportFormat', f.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${
                  settings.defaultExportFormat === f.id
                    ? 'bg-[var(--accent-teal)] text-white'
                    : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--panel-border)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-3">
            {EXPORT_SCALES.map((scale) => (
              <button
                key={scale.id}
                type="button"
                onClick={() => updateSetting('exportScale', scale.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${
                  settings.exportScale === scale.id
                    ? 'bg-[var(--accent-gold)] text-[var(--accent-on-gold)]'
                    : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--panel-border)]'
                }`}
              >
                {scale.label}
              </button>
            ))}
          </div>
          <label className="block text-[10px] text-[var(--text-muted)] mb-1">Export quality</label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={settings.exportQuality}
            onChange={(e) => updateSetting('exportQuality', parseFloat(e.target.value))}
            className="w-full accent-[var(--accent-gold)]"
          />
        </div>

        <div>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">Default Aspect Ratio</p>
          <div className="flex gap-2">
            {ASPECT_RATIOS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => updateSetting('defaultAspectRatio', r)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${
                  settings.defaultAspectRatio === r
                    ? 'bg-[var(--accent-teal)] text-white'
                    : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--panel-border)]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="w-full py-2 text-xs text-[var(--text-muted)] hover:text-red-300 transition"
        >
          Reset to defaults
        </button>
      </Panel>
    </div>
  );
}
