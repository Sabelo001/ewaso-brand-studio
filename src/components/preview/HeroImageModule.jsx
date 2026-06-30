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
}) {
  if (!imageSrc || heroType !== 'image') return null;

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden ${roundedClass}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
          opacity: imgOpacity,
        }}
      />
    </div>
  );
});
