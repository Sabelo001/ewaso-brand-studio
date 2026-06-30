import { memo } from 'react';
import { getPreviewMaxWidth, getAspectRatioCss } from '../../theme';
import { LayoutRenderer } from '../../layouts/LayoutRenderer';

/** Canvas preview with ref exposed for export engine */
export const CanvasWorkspace = memo(function CanvasWorkspace({ state, imagePan, previewContainerRef }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0E0E11] relative">
      <div className="absolute top-8 left-0 right-0 text-center">
        <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase bg-[#141419] px-4 py-1.5 rounded-full border border-neutral-800">
          Design Canvas Preview
        </span>
      </div>

      <div
        ref={previewContainerRef}
        className="relative overflow-hidden shadow-2xl border border-neutral-800 select-none cursor-grab active:cursor-grabbing transition-colors duration-300"
        style={{
          width: '100%',
          maxWidth: getPreviewMaxWidth(state.aspectRatio),
          aspectRatio: getAspectRatioCss(state.aspectRatio),
          backgroundColor: state.bgColorTheme,
          padding: `${state.borderWidth}px`,
        }}
        onMouseDown={(e) => imagePan.handleStartDrag(e.clientX, e.clientY)}
        onMouseMove={(e) => imagePan.handleDragMove(e.clientX, e.clientY)}
        onMouseUp={imagePan.handleEndDrag}
        onMouseLeave={imagePan.handleEndDrag}
      >
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
  );
});
