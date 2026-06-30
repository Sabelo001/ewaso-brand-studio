import { memo } from 'react';
import { BRAND } from '../../theme';
import { GlobeIcon, PhoneIcon, MailIcon, WhatsAppIcon } from '../icons';

export const PreviewFooter = memo(function PreviewFooter({
  footerStyle,
  website,
  whatsapp,
  phone,
  email,
  isDark,
}) {
  const txtColor = isDark ? 'text-white' : 'text-[#1A1A1A]';
  const subColor = isDark ? 'text-[#E6DCC7]' : 'text-[#7A7265]';
  const iconColor = isDark ? BRAND.colors.goldLight : BRAND.colors.goldDark;

  return (
    <div className="flex flex-col items-center mt-auto pt-6 pb-2 w-full">
      <div className="w-8 h-[2px] mb-3" style={{ backgroundColor: iconColor }} />
      <span className={`text-[10px] font-bold tracking-widest font-sans mb-3 ${txtColor}`}>
        {BRAND.signature.label}
      </span>
      <div className={`flex flex-wrap justify-center gap-3 text-[8px] font-medium font-sans ${subColor}`}>
        <div className="flex items-center gap-1">
          <GlobeIcon className="w-3 h-3" style={{ color: iconColor }} /> {website}
        </div>
        {(footerStyle === 'compact' || footerStyle === 'full') && (
          <div className="flex items-center gap-1">
            <WhatsAppIcon className="w-3 h-3" style={{ color: iconColor }} /> {whatsapp}
          </div>
        )}
        {footerStyle === 'full' && (
          <div className="flex items-center gap-1">
            <PhoneIcon className="w-3 h-3" style={{ color: iconColor }} /> {phone}
          </div>
        )}
        {footerStyle === 'full' && (
          <div className="flex items-center gap-1">
            <MailIcon className="w-3 h-3" style={{ color: iconColor }} /> {email}
          </div>
        )}
      </div>
    </div>
  );
});
