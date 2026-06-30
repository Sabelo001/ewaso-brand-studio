import { BrandHeader } from '../header/BrandHeader';
import { LayoutGallery } from './LayoutGallery';
import { FormatControls } from './FormatControls';
import { TypographyControls } from './TypographyControls';
import { BrandColorControls } from './BrandColorControls';
import { FooterControls } from './FooterControls';
import { ExportToolbar } from './ExportToolbar';
import { AssetLibraryPanel } from './AssetLibraryPanel';
import { TemplatePanel } from './TemplatePanel';
import { SettingsPanel } from './SettingsPanel';
import { StudioTabs, useStudioTab } from './StudioTabs';
import { AISidebar } from '../../ai/AISidebar';

export function Sidebar({
  studio,
  settings,
  exportControls,
  templates,
  assetLibrary,
}) {
  const { activeTab, setActiveTab } = useStudioTab('design');
  const { imagePan } = studio;

  const handleImageUpload = (dataUrl) => {
    studio.setImageSrc(dataUrl);
    imagePan.resetPan();
  };

  const handleReplaceHero = (src) => {
    studio.setImageSrc(src);
    imagePan.resetPan();
  };

  return (
    <aside
      className="w-full xl:w-[var(--sidebar-width)] bg-[var(--sidebar-bg)] p-6 flex flex-col border-b xl:border-b-0 xl:border-r border-[var(--sidebar-border)] overflow-hidden max-h-screen xl:max-h-none xl:h-screen"
      aria-label="Design controls"
    >
      <BrandHeader />

      <StudioTabs activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'design' && (
          <>
            <LayoutGallery layoutId={studio.layoutId} onSelect={studio.applyPreset} />
            <FormatControls
              aspectRatio={studio.aspectRatio}
              setAspectRatio={studio.setAspectRatio}
              heroType={studio.heroType}
              zoom={imagePan.zoom}
              setZoom={imagePan.setZoom}
              imgOpacity={imagePan.imgOpacity}
              setImgOpacity={imagePan.setImgOpacity}
              onImageUpload={handleImageUpload}
              onResetPan={imagePan.resetPan}
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
            <ExportToolbar {...exportControls} settings={settings.settings} />
          </>
        )}

        {activeTab === 'assets' && (
          <AssetLibraryPanel
            assetLibrary={assetLibrary}
            onSelectAsset={handleReplaceHero}
            onReplaceHero={handleReplaceHero}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatePanel
            templates={templates}
            onSave={(name) => templates.saveTemplate(name, studio.getSnapshot())}
            onLoad={(id) => {
              const state = templates.loadTemplate(id);
              if (state) studio.loadState(state);
            }}
            onRename={templates.renameTemplate}
            onDuplicate={templates.duplicateTemplate}
            onDelete={templates.deleteTemplate}
          />
        )}

        {activeTab === 'ai' && <AISidebar studio={studio} />}

        {activeTab === 'settings' && (
          <SettingsPanel
            settings={settings.settings}
            updateSetting={settings.updateSetting}
            resetSettings={settings.resetSettings}
          />
        )}
      </StudioTabs>
    </aside>
  );
}
