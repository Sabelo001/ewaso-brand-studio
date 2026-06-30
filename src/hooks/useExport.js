import { useCallback, useState } from 'react';
import { exportDesign } from '../utils/exportEngine';
import { sanitizeFilename } from '../utils/validation';

export function useExport(previewContainerRef) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filename, setFilename] = useState('ewaso-design');
  const [error, setError] = useState(null);

  const runExport = useCallback(
    async (state, options = {}) => {
      setExporting(true);
      setProgress(0);
      setError(null);
      try {
        setProgress(0.2);
        await exportDesign(state, previewContainerRef, {
          format: options.format ?? 'png',
          scale: options.scale ?? 1,
          quality: options.quality ?? 0.92,
          filename: sanitizeFilename(options.filename ?? filename),
          transparent: options.transparent ?? false,
          onProgress: setProgress,
        });
        setProgress(1);
      } catch (err) {
        setError(err?.message ?? 'Export failed');
        setProgress(0);
      } finally {
        setTimeout(() => {
          setExporting(false);
          setProgress(0);
        }, 600);
      }
    },
    [previewContainerRef, filename]
  );

  return {
    exporting,
    progress,
    filename,
    setFilename,
    error,
    runExport,
  };
}
