import { memo } from 'react';
import { BRAND } from '../theme';
import { PreviewHeader, PreviewHeadline, PreviewBody, PreviewCta, PreviewCtaCompact } from '../components/preview/PreviewTypography';
import { PreviewFooter } from '../components/preview/PreviewFooter';
import { HeroImageModule } from '../components/preview/HeroImageModule';

export const EditorialLayout = memo(function EditorialLayout({ state, imagePan }) {
  const isDarkFooter =
    state.bgColorTheme === BRAND.colors.primaryTeal || state.bgColorTheme === BRAND.colors.ink;

  return (
    <div className="flex flex-col h-full items-center text-center p-6">
      <div className="mt-4">
        <PreviewHeader metaText={state.metaText} color={state.headerColor} />
      </div>
      <HeroImageModule
        imageSrc={state.imageSrc}
        heroType={state.heroType}
        {...imagePan.panState}
        heightClass="h-[40%] mt-4 mb-8"
        roundedClass="rounded-[24px]"
      />
      <div className="flex flex-col items-center justify-center flex-1">
        <PreviewHeadline headlineText={state.headlineText} color={state.headlineColor} />
        <PreviewBody
          bodyText1={state.bodyText1}
          bodyText2={state.bodyText2}
          bodyColor={state.bodyColor}
          headerColor={state.headerColor}
        />
        <PreviewCta ctaText={state.ctaText} />
      </div>
      <PreviewFooter
        footerStyle={state.footerStyle}
        website={state.website}
        whatsapp={state.whatsapp}
        phone={state.phone}
        email={state.email}
        isDark={isDarkFooter}
      />
    </div>
  );
});

export const SplitLayout = memo(function SplitLayout({ state, imagePan }) {
  return (
    <div className="flex flex-col h-full">
      <div className="h-[50%] relative">
        <HeroImageModule
          imageSrc={state.imageSrc}
          heroType={state.heroType}
          {...imagePan.panState}
          heightClass="h-full"
          roundedClass="rounded-none"
        />
      </div>
      <div
        className="h-[50%] bg-[#FFFDF8] flex flex-col items-center justify-center p-6 text-center border-t-2"
        style={{ borderColor: BRAND.colors.sand }}
      >
        <div className="mt-2">
          <PreviewHeader metaText={state.metaText} color={state.headerColor} />
        </div>
        <PreviewHeadline headlineText={state.headlineText} color={state.headlineColor} />
        <PreviewBody
          bodyText1={state.bodyText1}
          bodyText2={state.bodyText2}
          bodyColor={state.bodyColor}
          headerColor={state.headerColor}
        />
        <PreviewFooter
          footerStyle={state.footerStyle}
          website={state.website}
          whatsapp={state.whatsapp}
          phone={state.phone}
          email={state.email}
          isDark={false}
        />
      </div>
    </div>
  );
});

export const FeatureLayout = memo(function FeatureLayout({ state, imagePan }) {
  return (
    <div className="relative h-full w-full">
      <HeroImageModule
        imageSrc={state.imageSrc}
        heroType={state.heroType}
        {...imagePan.panState}
        heightClass="h-full absolute inset-0"
        roundedClass="rounded-none"
      />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1B4D3E]/95 to-transparent flex flex-col justify-end p-6 pb-8 text-center">
        <div className="bg-[#FFFDF8] rounded-[24px] p-6 shadow-2xl flex flex-col items-center border border-[#E6DCC7]">
          <PreviewHeader metaText={state.metaText} color={state.headerColor} />
          <PreviewHeadline headlineText={state.headlineText} color={state.headlineColor} />
          <PreviewBody
            bodyText1={state.bodyText1}
            bodyText2={state.bodyText2}
            bodyColor={state.bodyColor}
            headerColor={state.headerColor}
          />
          <PreviewCtaCompact ctaText={state.ctaText} />
          <div className="mt-4 w-full">
            <PreviewFooter
              footerStyle={state.footerStyle}
              website={state.website}
              whatsapp={state.whatsapp}
              phone={state.phone}
              email={state.email}
              isDark={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export const QuoteLayout = memo(function QuoteLayout({ state }) {
  const isDarkFooter =
    state.bgColorTheme === BRAND.colors.primaryTeal || state.bgColorTheme === BRAND.colors.ink;

  return (
    <div className="flex flex-col h-full items-center justify-center p-8 text-center">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-[120px] font-serif leading-none opacity-20" style={{ color: state.headerColor }}>
          &ldquo;
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold font-serif italic mb-6 -mt-8"
          style={{ color: state.headlineColor }}
        >
          {state.headlineText}
        </h2>
        <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: state.headerColor }} />
        <PreviewHeader metaText={state.metaText} color={state.bodyColor} />
      </div>
      <PreviewFooter
        footerStyle={state.footerStyle}
        website={state.website}
        whatsapp={state.whatsapp}
        phone={state.phone}
        email={state.email}
        isDark={isDarkFooter}
      />
    </div>
  );
});

const LAYOUT_COMPONENTS = {
  editorial: EditorialLayout,
  split: SplitLayout,
  feature: FeatureLayout,
  quote: QuoteLayout,
};

export function LayoutRenderer({ layoutId, state, imagePan }) {
  const Component = LAYOUT_COMPONENTS[layoutId] ?? EditorialLayout;
  return <Component state={state} imagePan={imagePan} />;
}
