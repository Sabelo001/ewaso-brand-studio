import { memo } from 'react';

export const HeroImageModule = memo(function HeroImageModule({
  imageSrc,
  heroType,
  zoom,
  panX,
  panY,
  imgOpacity,
  heightClass,
  roundedClass,
  filter,
}) {
  if (!imageSrc || heroType !== 'image') return null;

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden ${roundedClass}`}>
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
          opacity: imgOpacity,
          filter: filter ?? undefined,
        }}
      />
    </div>
  );
});
