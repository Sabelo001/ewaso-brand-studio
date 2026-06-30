import { memo } from 'react';
import { BRAND } from '../theme';
import { getBaseLayoutId } from './registry';
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

export const StatisticsLayout = memo(function StatisticsLayout({ state, imagePan }) {
  return (
    <div className="flex flex-col h-full p-6">
      <PreviewHeader metaText={state.metaText} color={state.headerColor} />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div
          className="text-5xl sm:text-6xl font-black font-serif mb-4 tracking-tight"
          style={{ color: state.headlineColor }}
        >
          {state.headlineText}
        </div>
        <div className="w-24 h-1 rounded-full mb-6" style={{ backgroundColor: state.headerColor }} />
        <PreviewBody
          bodyText1={state.bodyText1}
          bodyText2={state.bodyText2}
          bodyColor={state.bodyColor}
          headerColor={state.headerColor}
        />
        <PreviewCta ctaText={state.ctaText} />
      </div>
      {state.heroType === 'image' && (
        <HeroImageModule
          imageSrc={state.imageSrc}
          heroType={state.heroType}
          {...imagePan.panState}
          heightClass="h-[25%]"
          roundedClass="rounded-[16px]"
        />
      )}
      <PreviewFooter
        footerStyle={state.footerStyle}
        website={state.website}
        whatsapp={state.whatsapp}
        phone={state.phone}
        email={state.email}
        isDark
      />
    </div>
  );
});

export const BeforeAfterLayout = memo(function BeforeAfterLayout({ state, imagePan }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 text-center">
        <PreviewHeader metaText={state.metaText} color={state.headerColor} />
        <PreviewHeadline headlineText={state.headlineText} color={state.headlineColor} />
      </div>
      <div className="flex-1 flex min-h-0">
        <div className="w-1/2 relative border-r border-[var(--panel-border)]">
          <span className="absolute top-2 left-2 z-10 text-[9px] font-bold uppercase bg-black/50 text-white px-2 py-0.5 rounded">
            Before
          </span>
          <HeroImageModule
            imageSrc={state.imageSrc}
            heroType={state.heroType}
            {...imagePan.panState}
            heightClass="h-full"
            roundedClass="rounded-none"
            filter="grayscale(40%)"
          />
        </div>
        <div className="w-1/2 relative">
          <span className="absolute top-2 left-2 z-10 text-[9px] font-bold uppercase bg-[var(--accent-teal)] text-white px-2 py-0.5 rounded">
            After
          </span>
          <HeroImageModule
            imageSrc={state.imageSrc}
            heroType={state.heroType}
            zoom={imagePan.panState.zoom * 1.05}
            panX={imagePan.panState.panX + 10}
            panY={imagePan.panState.panY}
            imgOpacity={imagePan.panState.imgOpacity}
            heightClass="h-full"
            roundedClass="rounded-none"
          />
        </div>
      </div>
      <div className="p-4 text-center">
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

const LAYOUT_COMPONENTS = {
  editorial: EditorialLayout,
  split: SplitLayout,
  feature: FeatureLayout,
  quote: QuoteLayout,
  statistics: StatisticsLayout,
  beforeAfter: BeforeAfterLayout,
};

export function LayoutRenderer({ layoutId, state, imagePan }) {
  const base = getBaseLayoutId(layoutId);
  const Component = LAYOUT_COMPONENTS[base] ?? EditorialLayout;
  return <Component state={state} imagePan={imagePan} />;
}
