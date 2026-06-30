import { memo } from 'react';

export const SnapGuides = memo(function SnapGuides({ show, width, height }) {
  if (!show) return null;

  const centerX = width / 2;
  const centerY = height / 2;
  const thirdX = width / 3;
  const thirdY = height / 3;

  const lines = [
    { x1: centerX, y1: 0, x2: centerX, y2: height, stroke: 'var(--accent-gold)', opacity: 0.35 },
    { x1: 0, y1: centerY, x2: width, y2: centerY, stroke: 'var(--accent-gold)', opacity: 0.35 },
    { x1: thirdX, y1: 0, x2: thirdX, y2: height, stroke: 'var(--text-muted)', opacity: 0.15 },
    { x1: thirdX * 2, y1: 0, x2: thirdX * 2, y2: height, stroke: 'var(--text-muted)', opacity: 0.15 },
    { x1: 0, y1: thirdY, x2: width, y2: thirdY, stroke: 'var(--text-muted)', opacity: 0.15 },
    { x1: 0, y1: thirdY * 2, x2: width, y2: thirdY * 2, stroke: 'var(--text-muted)', opacity: 0.15 },
  ];

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-40"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {lines.map((line, i) => (
        <line
          key={i}
          x1={`${(line.x1 / width) * 100}%`}
          y1={`${(line.y1 / height) * 100}%`}
          x2={`${(line.x2 / width) * 100}%`}
          y2={`${(line.y2 / height) * 100}%`}
          stroke={line.stroke}
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity={line.opacity}
        />
      ))}
    </svg>
  );
});

export const CanvasGrid = memo(function CanvasGrid({ show }) {
  if (!show) return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none z-30 opacity-[0.06]"
      style={{
        backgroundImage:
          'linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden="true"
    />
  );
});
