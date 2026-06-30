import { memo, useRef, useState, useCallback } from 'react';
import { getPreviewMaxWidth, getAspectRatioCss } from '../../theme';
import { LayoutRenderer } from '../../layouts/LayoutRenderer';
import { CanvasToolbar } from './CanvasToolbar';
import { SnapGuides, CanvasGrid } from './SnapGuides';

/** Canvas preview with ref exposed for export engine */
export const CanvasWorkspace = memo(function CanvasWorkspace({
  state,
  imagePan,
  previewContainerRef,
  canvasView,
  settings,
  onDuplicate,
  onDelete,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) {
  const innerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const setRefs = useCallback(
    (node) => {
      previewContainerRef.current = node;
      innerRef.current = node;
      if (node) {
        setDimensions({ width: node.offsetWidth, height: node.offsetHeight });
      }
    },
    [previewContainerRef]
  );

  const showGuides = settings?.snapGuides || settings?.showAlignmentGuides;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-[var(--shell-bg)] relative min-h-[50vh] xl:min-h-0">
      <div className="absolute top-4 sm:top-8 left-0 right-0 flex justify-center z-20 px-4">
        <CanvasToolbar
          viewScale={canvasView.viewScale}
          onZoomIn={canvasView.zoomIn}
          onZoomOut={canvasView.zoomOut}
          onFitToScreen={canvasView.fitToScreen}
          onResetView={() => {
            canvasView.resetView();
            imagePan.resetPan();
          }}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>

      <div
        className="flex items-center justify-center w-full transition-transform duration-200 ease-out"
        style={{ transform: `scale(${canvasView.viewScale})` }}
      >
        <div
          ref={setRefs}
          className="relative overflow-hidden select-none cursor-grab active:cursor-grabbing transition-shadow duration-300 rounded-sm"
          style={{
            width: '100%',
            maxWidth: getPreviewMaxWidth(state.aspectRatio),
            aspectRatio: getAspectRatioCss(state.aspectRatio),
            backgroundColor: state.bgColorTheme,
            padding: `${state.borderWidth}px`,
            boxShadow: 'var(--canvas-shadow)',
          }}
          onMouseDown={(e) => imagePan.handleStartDrag(e.clientX, e.clientY)}
          onMouseMove={(e) => imagePan.handleDragMove(e.clientX, e.clientY)}
          onMouseUp={imagePan.handleEndDrag}
          onMouseLeave={imagePan.handleEndDrag}
          role="img"
          aria-label={`Design preview, ${state.layoutId} layout, ${state.aspectRatio} aspect ratio`}
        >
          <CanvasGrid show={settings?.canvasGrid} />
          <SnapGuides show={showGuides} width={dimensions.width} height={dimensions.height} />

          {state.borderWidth > 0 && (
            <div
              className="absolute inset-0 pointer-events-none z-50"
              style={{ border: `${state.borderWidth}px solid ${state.borderColor}` }}
            />
          )}

          <div className="w-full h-full relative flex flex-col pointer-events-none z-10">
            <LayoutRenderer layoutId={state.layoutId} state={state} imagePan={imagePan} />
          </div>
        </div>
      </div>

      <p className="mt-6 text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase">
        Design Canvas Preview
      </p>
    </main>
  );
});
