import { memo } from 'react';

export const CanvasToolbar = memo(function CanvasToolbar({
  viewScale,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onResetView,
  onDuplicate,
  onDelete,
}) {
  const tools = [
    { label: 'Zoom out', action: onZoomOut, icon: '−' },
    { label: 'Zoom in', action: onZoomIn, icon: '+' },
    { label: 'Fit to screen', action: onFitToScreen, icon: '⤢' },
    { label: 'Reset view', action: onResetView, icon: '↺' },
    { label: 'Duplicate', action: onDuplicate, icon: '⧉' },
    { label: 'Delete image', action: onDelete, icon: '⌫' },
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
      {tools.map((tool) => (
        <button
          key={tool.label}
          type="button"
          onClick={tool.action}
          title={tool.label}
          aria-label={tool.label}
          className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:bg-[var(--panel-bg)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
});
