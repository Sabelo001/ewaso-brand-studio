import { useCallback, useState } from 'react';

const SNAP_THRESHOLD = 12;

function snapValue(value, targets, threshold = SNAP_THRESHOLD) {
  for (const target of targets) {
    if (Math.abs(value - target) < threshold) return target;
  }
  return value;
}

/** Image pan/zoom drag engine for canvas preview with snap guides */
export function useImagePan() {
  const [zoom, setZoom] = useState(1.1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleStartDrag = useCallback(
    (clientX, clientY) => {
      setIsDragging(true);
      setDragStart({ x: clientX - panX, y: clientY - panY });
    },
    [panX, panY]
  );

  const handleDragMove = useCallback(
    (clientX, clientY) => {
      if (isDragging) {
        const rawX = clientX - dragStart.x;
        const rawY = clientY - dragStart.y;
        setPanX(snapValue(rawX, [0]));
        setPanY(snapValue(rawY, [0]));
      }
    },
    [isDragging, dragStart]
  );

  const handleEndDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetPan = useCallback(() => {
    setZoom(1.0);
    setPanX(0);
    setPanY(0);
  }, []);

  const patchFromSaved = useCallback((saved) => {
    if (saved.zoom != null) setZoom(saved.zoom);
    if (saved.panX != null) setPanX(saved.panX);
    if (saved.panY != null) setPanY(saved.panY);
    if (saved.imgOpacity != null) setImgOpacity(saved.imgOpacity);
  }, []);

  return {
    zoom,
    setZoom,
    panX,
    setPanX,
    panY,
    setPanY,
    imgOpacity,
    setImgOpacity,
    isDragging,
    handleStartDrag,
    handleDragMove,
    handleEndDrag,
    resetPan,
    patchFromSaved,
    panState: { zoom, panX, panY, imgOpacity },
  };
}
