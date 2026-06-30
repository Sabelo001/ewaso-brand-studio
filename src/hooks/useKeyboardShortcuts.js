import { useEffect } from 'react';

/**
 * Global keyboard shortcuts for the studio.
 * @param {Object} handlers
 * @param {() => void} [handlers.onExport]
 * @param {() => void} [handlers.onUndo]
 * @param {() => void} [handlers.onRedo]
 * @param {() => void} [handlers.onDuplicate]
 * @param {() => void} [handlers.onDelete]
 * @param {() => void} [handlers.onResetView]
 * @param {() => void} [handlers.onFitToScreen]
 * @param {() => void} [handlers.onZoomIn]
 * @param {() => void} [handlers.onZoomOut]
 */
export function useKeyboardShortcuts(handlers) {
  useEffect(() => {
    const onKeyDown = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      const target = e.target;
      const isInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (isInput) return;

      if (mod && e.key === 's') {
        e.preventDefault();
        handlers.onExport?.();
        return;
      }
      if (mod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handlers.onUndo?.();
        return;
      }
      if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handlers.onRedo?.();
        return;
      }
      if (mod && e.key === 'd') {
        e.preventDefault();
        handlers.onDuplicate?.();
        return;
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handlers.onDelete?.();
        return;
      }
      if (e.key === '0') {
        handlers.onResetView?.();
        return;
      }
      if (e.key === 'f' || e.key === 'F') {
        handlers.onFitToScreen?.();
        return;
      }
      if (e.key === '+' || e.key === '=') {
        handlers.onZoomIn?.();
        return;
      }
      if (e.key === '-') {
        handlers.onZoomOut?.();
        return;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlers]);
}
