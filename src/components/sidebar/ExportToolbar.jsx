import { DownloadIcon } from '../icons';
import { Button, ProgressBar, SectionLabel } from '../ui';

export function ExportToolbar({
  onExport,
  exporting,
  progress,
  filename,
  setFilename,
  error,
  settings,
}) {
  const formats = [
    { id: 'png', label: 'PNG' },
    { id: 'jpg', label: 'JPG' },
    { id: 'png-transparent', label: 'Transparent' },
  ];

  const handleExport = (format) => {
    onExport({
      format: format === 'png-transparent' ? 'png' : format,
      transparent: format === 'png-transparent',
      scale: settings?.exportScale ?? 1,
      quality: settings?.exportQuality ?? 0.92,
      filename,
    });
  };

  return (
    <div className="mt-auto space-y-3 pt-4 border-t border-[var(--panel-border)]">
      <SectionLabel>Export</SectionLabel>

      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="Filename"
        aria-label="Export filename"
        className="w-full bg-[var(--input-bg)] border border-[var(--panel-border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none font-mono"
      />

      {exporting && <ProgressBar progress={progress} label="Exporting…" />}
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}

      <Button onClick={() => handleExport(settings?.defaultExportFormat ?? 'png')} disabled={exporting} className="w-full">
        <DownloadIcon />
        Export {settings?.exportScale > 1 ? `${settings.exportScale}× ` : ''}
        {(settings?.defaultExportFormat ?? 'png').toUpperCase()}
      </Button>

      <div className="grid grid-cols-3 gap-2">
        {formats.map((f) => (
          <Button
            key={f.id}
            variant="secondary"
            size="sm"
            disabled={exporting}
            onClick={() => handleExport(f.id)}
            className="w-full"
          >
            {f.label}
          </Button>
        ))}
      </div>

      <p className="text-[9px] text-[var(--text-muted)] text-center">
        Shortcut: Ctrl+S · Scale in Settings
      </p>
    </div>
  );
}
