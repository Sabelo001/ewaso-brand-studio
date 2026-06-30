import { useRef, useCallback } from 'react';
import { useStudioState } from './hooks/useStudioState';
import { exportDesign } from './utils/exportEngine';
import { Sidebar } from './components/sidebar/Sidebar';
import { CanvasWorkspace } from './components/canvas/CanvasWorkspace';

export default function EwasoBrandStudio() {
  const studio = useStudioState();
  const previewContainerRef = useRef(null);

  const handleExportPng = useCallback(() => {
    exportDesign(studio.exportState, previewContainerRef, 'png');
  }, [studio.exportState]);

  const handleExportJpg = useCallback(() => {
    exportDesign(studio.exportState, previewContainerRef, 'jpg');
  }, [studio.exportState]);

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#ECE9E4] font-sans flex flex-col xl:flex-row">
      <Sidebar studio={studio} onExportPng={handleExportPng} onExportJpg={handleExportJpg} />
      <CanvasWorkspace
        state={studio.exportState}
        imagePan={studio.imagePan}
        previewContainerRef={previewContainerRef}
      />
    </div>
  );
}
