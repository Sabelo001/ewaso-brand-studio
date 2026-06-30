import { useCallback, useRef } from 'react';

const MAX_HISTORY = 50;

/**
 * Undo/redo-ready history stack.
 * Push snapshots before discrete user actions (presets, uploads).
 */
export function useHistory(initialState) {
  const pastRef = useRef([]);
  const futureRef = useRef([]);
  const currentRef = useRef(initialState);

  const pushSnapshot = useCallback((snapshot) => {
    pastRef.current = [...pastRef.current.slice(-MAX_HISTORY + 1), currentRef.current];
    futureRef.current = [];
    currentRef.current = snapshot;
  }, []);

  const canUndo = pastRef.current.length > 0;
  const canRedo = futureRef.current.length > 0;

  const undo = useCallback(() => {
    if (pastRef.current.length === 0) return null;
    const previous = pastRef.current[pastRef.current.length - 1];
    pastRef.current = pastRef.current.slice(0, -1);
    futureRef.current = [currentRef.current, ...futureRef.current];
    currentRef.current = previous;
    return previous;
  }, []);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return null;
    const next = futureRef.current[0];
    futureRef.current = futureRef.current.slice(1);
    pastRef.current = [...pastRef.current, currentRef.current];
    currentRef.current = next;
    return next;
  }, []);

  return { pushSnapshot, undo, redo, canUndo, canRedo };
}
