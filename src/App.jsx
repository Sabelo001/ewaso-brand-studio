import { useRef, useCallback, useMemo } from 'react';
import { useStudioState } from './hooks/useStudioState';
import { useStudioSettings } from './hooks/useStudioSettings';
import { useTemplates } from './hooks/useTemplates';
import { useAssetLibrary } from './hooks/useAssetLibrary';
import { useCanvasView } from './hooks/useCanvasView';
import { useExport } from './hooks/useExport';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Sidebar } from './components/sidebar/Sidebar';
import { CanvasWorkspace } from './components/canvas/CanvasWorkspace';

export default function EwasoBrandStudio() {
  const settings = useStudioSettings();
  const studio = useStudioState(settings.settings);
  const templates = useTemplates();
  const assetLibrary = useAssetLibrary();
  const canvasView = useCanvasView();
  const previewContainerRef = useRef(null);
  const exportControls = useExport(previewContainerRef);

  const handleExport = useCallback(
    (options) => {
      exportControls.runExport(studio.exportState, options);
    },
    [exportControls, studio.exportState]
  );

  const shortcutHandlers = useMemo(
    () => ({
      onExport: () =>
        handleExport({
          format: settings.settings.defaultExportFormat === 'png-transparent' ? 'png' : settings.settings.defaultExportFormat,
          transparent: settings.settings.defaultExportFormat === 'png-transparent',
          scale: settings.settings.exportScale,
          quality: settings.settings.exportQuality,
          filename: exportControls.filename,
        }),
      onUndo: studio.undo,
      onRedo: studio.redo,
      onDuplicate: studio.duplicateDesign,
      onDelete: studio.clearHeroImage,
      onResetView: () => {
        canvasView.resetView();
        studio.imagePan.resetPan();
      },
      onFitToScreen: canvasView.fitToScreen,
      onZoomIn: canvasView.zoomIn,
      onZoomOut: canvasView.zoomOut,
    }),
    [handleExport, settings.settings, exportControls.filename, studio, canvasView]
  );

  useKeyboardShortcuts(shortcutHandlers);

  return (
    <div className="min-h-screen bg-[var(--shell-bg)] text-[var(--text-primary)] font-sans flex flex-col xl:flex-row">
      <Sidebar
        studio={studio}
        settings={settings}
        exportControls={{
          onExport: handleExport,
          exporting: exportControls.exporting,
          progress: exportControls.progress,
          filename: exportControls.filename,
          setFilename: exportControls.setFilename,
          error: exportControls.error,
        }}
        templates={templates}
        assetLibrary={assetLibrary}
      />
      <CanvasWorkspace
        state={studio.exportState}
        imagePan={studio.imagePan}
        previewContainerRef={previewContainerRef}
        canvasView={canvasView}
        settings={settings.settings}
        onDuplicate={studio.duplicateDesign}
        onDelete={studio.clearHeroImage}
      />
    </div>
  );
}
