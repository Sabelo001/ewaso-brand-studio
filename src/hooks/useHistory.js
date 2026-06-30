import { useCallback, useRef, useState } from 'react';

const MAX_HISTORY = 50;

/**
 * Undo/redo history stack.
 * Push snapshots before discrete user actions (presets, uploads, edits).
 * `canUndo` / `canRedo` are reactive so UI controls update correctly.
 */
export function useHistory(initialState) {
  const pastRef = useRef([]);
  const futureRef = useRef([]);
  const currentRef = useRef(initialState);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const sync = useCallback(() => {
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, []);

  const pushSnapshot = useCallback(
    (snapshot) => {
      pastRef.current = [...pastRef.current.slice(-MAX_HISTORY + 1), currentRef.current];
      futureRef.current = [];
      currentRef.current = snapshot;
      sync();
    },
    [sync]
  );

  const undo = useCallback(() => {
    if (pastRef.current.length === 0) return null;
    const previous = pastRef.current[pastRef.current.length - 1];
    pastRef.current = pastRef.current.slice(0, -1);
    futureRef.current = [currentRef.current, ...futureRef.current];
    currentRef.current = previous;
    sync();
    return previous;
  }, [sync]);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return null;
    const next = futureRef.current[0];
    futureRef.current = futureRef.current.slice(1);
    pastRef.current = [...pastRef.current, currentRef.current];
    currentRef.current = next;
    sync();
    return next;
  }, [sync]);

  /** Capture the latest live snapshot without mutating the stacks. */
  const setCurrent = useCallback((snapshot) => {
    currentRef.current = snapshot;
  }, []);

  return { pushSnapshot, undo, redo, setCurrent, canUndo, canRedo };
}
