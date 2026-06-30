import { BRAND } from '../../theme';
import { ShieldLogoIcon } from '../icons';

export function BrandHeader() {
  return (
    <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-[#26262B]">
      <div
        className="p-3 rounded-xl"
        style={{
          backgroundColor: BRAND.colors.primaryTeal,
          color: BRAND.colors.goldLight,
          boxShadow: BRAND.shadows.brand,
        }}
      >
        <ShieldLogoIcon width={24} height={24} />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-wider text-white">{BRAND.logo.name}</h1>
        <p className="text-[11px] font-mono tracking-widest uppercase mt-1" style={{ color: BRAND.colors.goldLight }}>
          {BRAND.logo.tagline}
        </p>
      </div>
    </div>
  );
}
