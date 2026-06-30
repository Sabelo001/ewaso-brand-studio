import { useCallback, useState } from 'react';

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;
const STEP = 0.1;

/** Viewport zoom for canvas preview (distinct from hero image zoom) */
export function useCanvasView() {
  const [viewScale, setViewScale] = useState(1);

  const zoomIn = useCallback(() => {
    setViewScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setViewScale((s) => Math.max(MIN_SCALE, +(s - STEP).toFixed(2)));
  }, []);

  const fitToScreen = useCallback(() => {
    setViewScale(1);
  }, []);

  const resetView = useCallback(() => {
    setViewScale(1);
  }, []);

  return {
    viewScale,
    setViewScale,
    zoomIn,
    zoomOut,
    fitToScreen,
    resetView,
  };
}
