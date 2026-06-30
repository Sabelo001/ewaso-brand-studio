import { BrandHeader } from '../header/BrandHeader';
import { LayoutPicker } from './LayoutPicker';
import { FormatControls } from './FormatControls';
import { TypographyControls } from './TypographyControls';
import { BrandColorControls } from './BrandColorControls';
import { FooterControls } from './FooterControls';
import { ExportToolbar } from './ExportToolbar';

export function Sidebar({ studio, onExportPng, onExportJpg }) {
  const { imagePan } = studio;

  const handleImageUpload = (dataUrl) => {
    studio.setImageSrc(dataUrl);
    imagePan.resetPan();
  };

  return (
    <div className="w-full xl:w-[480px] bg-[#141419] p-6 flex flex-col border-b xl:border-b-0 xl:border-r border-[#26262B] overflow-y-auto max-h-screen custom-scrollbar">
      <BrandHeader />

      <LayoutPicker layoutId={studio.layoutId} onSelect={studio.applyPreset} />

      <FormatControls
        aspectRatio={studio.aspectRatio}
        setAspectRatio={studio.setAspectRatio}
        layoutId={studio.layoutId}
        zoom={imagePan.zoom}
        setZoom={imagePan.setZoom}
        imgOpacity={imagePan.imgOpacity}
        setImgOpacity={imagePan.setImgOpacity}
        onImageUpload={handleImageUpload}
      />

      <TypographyControls
        metaText={studio.metaText}
        setMetaText={studio.setMetaText}
        headlineText={studio.headlineText}
        setHeadlineText={studio.setHeadlineText}
        bodyText1={studio.bodyText1}
        setBodyText1={studio.setBodyText1}
        bodyText2={studio.bodyText2}
        setBodyText2={studio.setBodyText2}
        ctaText={studio.ctaText}
        setCtaText={studio.setCtaText}
      />

      <BrandColorControls
        bgColorTheme={studio.bgColorTheme}
        setBgColorTheme={studio.setBgColorTheme}
        headlineColor={studio.headlineColor}
        setHeadlineColor={studio.setHeadlineColor}
        headerColor={studio.headerColor}
        setHeaderColor={studio.setHeaderColor}
        setBorderColor={studio.setBorderColor}
        bodyColor={studio.bodyColor}
        setBodyColor={studio.setBodyColor}
      />

      <FooterControls
        footerStyle={studio.footerStyle}
        setFooterStyle={studio.setFooterStyle}
        website={studio.website}
        setWebsite={studio.setWebsite}
        whatsapp={studio.whatsapp}
        setWhatsapp={studio.setWhatsapp}
        phone={studio.phone}
        setPhone={studio.setPhone}
        email={studio.email}
        setEmail={studio.setEmail}
        borderWidth={studio.borderWidth}
        setBorderWidth={studio.setBorderWidth}
      />

      <ExportToolbar onExportPng={onExportPng} onExportJpg={onExportJpg} />
    </div>
  );
}
