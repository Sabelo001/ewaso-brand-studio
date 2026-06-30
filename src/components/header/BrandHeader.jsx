import { BRAND } from '../../theme';
import { ShieldLogoIcon } from '../icons';

export function BrandHeader() {
  return (
    <header className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--sidebar-border)]">
      <div
        className="p-3 rounded-xl shrink-0"
        style={{
          backgroundColor: BRAND.colors.primaryTeal,
          color: BRAND.colors.goldLight,
          boxShadow: BRAND.shadows.brand,
        }}
        aria-hidden="true"
      >
        <ShieldLogoIcon width={24} height={24} />
      </div>
      <div>
        <h1 className="text-lg font-bold tracking-wider text-[var(--text-primary)] font-serif">
          Ewaso Designer
        </h1>
        <p className="text-[10px] font-mono tracking-widest uppercase mt-0.5 text-[var(--label-gold)]">
          {BRAND.logo.tagline}
        </p>
      </div>
    </header>
  );
}
