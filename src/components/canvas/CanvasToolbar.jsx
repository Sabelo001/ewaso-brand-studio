import { memo } from 'react';

export const CanvasToolbar = memo(function CanvasToolbar({
  viewScale,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onResetView,
  onDuplicate,
  onDelete,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) {
  const tools = [
    { label: 'Undo (Ctrl+Z)', action: onUndo, icon: '↶', disabled: !canUndo },
    { label: 'Redo (Ctrl+Shift+Z)', action: onRedo, icon: '↷', disabled: !canRedo },
    { label: 'divider' },
    { label: 'Zoom out (−)', action: onZoomOut, icon: '−' },
    { label: 'Zoom in (+)', action: onZoomIn, icon: '+' },
    { label: 'Fit to screen (F)', action: onFitToScreen, icon: '⤢' },
    { label: 'Reset view (0)', action: onResetView, icon: '↺' },
    { label: 'divider' },
    { label: 'Save as template (Ctrl+D)', action: onDuplicate, icon: '⧉' },
    { label: 'Clear image (Delete)', action: onDelete, icon: '⌫' },
  ];

  return (
    <div
      className="flex items-center gap-1 bg-[var(--sidebar-bg)]/90 backdrop-blur-md border border-[var(--panel-border)] rounded-full px-2 py-1 shadow-lg"
      role="toolbar"
      aria-label="Canvas controls"
    >
      <span className="text-[10px] font-mono text-[var(--text-muted)] px-2 min-w-[3rem] text-center">
        {Math.round(viewScale * 100)}%
      </span>
      {tools.map((tool, index) =>
        tool.label === 'divider' ? (
          <span key={`divider-${index}`} className="w-px h-5 bg-[var(--panel-border)] mx-0.5" aria-hidden="true" />
        ) : (
          <button
            key={tool.label}
            type="button"
            onClick={tool.action}
            disabled={tool.disabled}
            title={tool.label}
            aria-label={tool.label}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:bg-[var(--panel-bg)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[var(--text-muted)] disabled:hover:bg-transparent"
          >
            {tool.icon}
          </button>
        )
      )}
    </div>
  );
});
