import { BRAND } from '../theme';
import { getLayoutById } from './registry';

const sharedTeal = {
  bgColorTheme: BRAND.colors.primaryTeal,
  headerColor: BRAND.colors.goldLight,
  headlineColor: BRAND.colors.white,
  bodyColor: BRAND.colors.sandLight,
};

const sharedCream = {
  bgColorTheme: BRAND.colors.cream,
  headerColor: BRAND.colors.primaryTeal,
  headlineColor: BRAND.colors.ink,
  bodyColor: BRAND.colors.muted,
};

const DEFAULT_COPY = {
  editorial: {
    metaText: 'LAKE NAKURU NATIONAL PARK',
    headlineText: 'The Silent Giant',
    bodyText1: 'Roaming undisturbed in one of Kenya\u2019s greatest sanctuaries.',
    bodyText2: 'Captured during golden hour in the wilderness.',
    ctaText: 'Discover the Safari',
  },
  promotion: {
    metaText: 'LIMITED OFFER',
    headlineText: '20% Off Your Next Campaign',
    bodyText1: 'Professional branded content, delivered fast.',
    bodyText2: 'Valid through end of month.',
    ctaText: 'Book a Consultation',
  },
  quote: {
    metaText: '— EWASO DIGITAL CLIENT',
    headlineText: 'They transformed our brand presence overnight.',
    bodyText1: '',
    bodyText2: '',
    ctaText: '',
  },
  hospitality: {
    metaText: 'LUXURY RETREAT',
    headlineText: 'Where Comfort Meets the Wild',
    bodyText1: 'Experience world-class hospitality in the heart of nature.',
    bodyText2: 'Seasonal packages available now.',
    ctaText: 'Reserve Your Stay',
  },
  'property-feature': {
    metaText: 'FEATURED LISTING',
    headlineText: 'Modern Villa with Ocean Views',
    bodyText1: '4 bed · 3 bath · Private pool · Smart home',
    bodyText2: 'Available for viewing this weekend.',
    ctaText: 'Schedule a Tour',
  },
  'airbnb-listing': {
    metaText: 'SUPERHOST LISTING',
    headlineText: 'Cozy Studio in the City Center',
    bodyText1: 'Self check-in · Fast WiFi · Rooftop access',
    bodyText2: 'Rated 4.9 by 120+ guests.',
    ctaText: 'Check Availability',
  },
  'travel-package': {
    metaText: '7-DAY SAFARI PACKAGE',
    headlineText: 'The Great Migration Experience',
    bodyText1: 'All-inclusive lodges, expert guides, and private transfers.',
    bodyText2: 'Departures every Monday.',
    ctaText: 'View Itinerary',
  },
  'restaurant-promotion': {
    metaText: 'CHEF\u2019S SPECIAL',
    headlineText: 'Farm-to-Table Tasting Menu',
    bodyText1: 'Five courses paired with local wines.',
    bodyText2: 'Friday & Saturday evenings only.',
    ctaText: 'Reserve a Table',
  },
  'google-business': {
    metaText: 'NOW OPEN',
    headlineText: 'Visit Our New Studio Location',
    bodyText1: 'Extended hours and free consultations this week.',
    bodyText2: 'Find us on Google Maps.',
    ctaText: 'Get Directions',
  },
  'linkedin-announcement': {
    metaText: 'EWASO DIGITAL',
    headlineText: 'We\u2019re expanding our creative team.',
    bodyText1: '',
    bodyText2: '',
    ctaText: 'Learn More',
  },
  'event-flyer': {
    metaText: 'JUNE 15 · NAIROBI',
    headlineText: 'Brand Studio Launch Night',
    bodyText1: 'Live demos, networking, and exclusive offers.',
    bodyText2: 'RSVP required — limited seats.',
    ctaText: 'Register Now',
  },
  statistics: {
    metaText: '2025 IMPACT REPORT',
    headlineText: '340+ Projects Delivered',
    bodyText1: '98% client satisfaction across East Africa.',
    bodyText2: 'Trusted by hospitality, travel, and property brands.',
    ctaText: 'Download Report',
  },
  'before-after': {
    metaText: 'TRANSFORMATION',
    headlineText: 'See the Difference',
    bodyText1: 'Professional branding elevates every touchpoint.',
    bodyText2: 'Before and after — same business, new impact.',
    ctaText: 'Start Your Rebrand',
  },
  'service-spotlight': {
    metaText: 'SERVICE SPOTLIGHT',
    headlineText: 'Social Media Content Systems',
    bodyText1: 'Templates, assets, and export-ready graphics on demand.',
    bodyText2: 'Built for speed without sacrificing quality.',
    ctaText: 'Explore Services',
  },
  testimonial: {
    metaText: '— HOSPITALITY PARTNER',
    headlineText: 'Ewaso Digital understands our brand like no one else.',
    bodyText1: '',
    bodyText2: '',
    ctaText: '',
  },
  'team-member': {
    metaText: 'MEET THE TEAM',
    headlineText: 'Sarah Mwangi',
    bodyText1: 'Creative Director · 10 years in brand design',
    bodyText2: 'Passionate about African storytelling.',
    ctaText: 'Connect on LinkedIn',
  },
  'breaking-news': {
    metaText: 'BREAKING',
    headlineText: 'Major Partnership Announced Today',
    bodyText1: 'Ewaso Digital joins forces with leading travel brands.',
    bodyText2: 'Full details at ewasodigital.co.ke',
    ctaText: 'Read More',
  },
  'destination-highlight': {
    metaText: 'DESTINATION',
    headlineText: 'Diani Beach Awaits',
    bodyText1: 'White sands, turquoise waters, unforgettable sunsets.',
    bodyText2: 'Plan your escape with Ewaso Travel.',
    ctaText: 'Explore Diani',
  },
};

const STYLE_PATCHES = {
  editorial: { layoutId: 'editorial', heroType: 'image', ...sharedTeal },
  promotion: {
    layoutId: 'promotion',
    heroType: 'image',
    bgColorTheme: BRAND.colors.ivory,
    headerColor: BRAND.colors.goldDark,
    headlineColor: BRAND.colors.primaryTeal,
    bodyColor: BRAND.colors.muted,
  },
  quote: { layoutId: 'quote', heroType: 'quote', ...sharedCream },
  hospitality: { layoutId: 'hospitality', heroType: 'image', ...sharedTeal },
  'property-feature': {
    layoutId: 'property-feature',
    heroType: 'image',
    bgColorTheme: BRAND.colors.primaryTeal,
    headerColor: BRAND.colors.goldDark,
    headlineColor: BRAND.colors.primaryTeal,
    bodyColor: BRAND.colors.muted,
  },
  'airbnb-listing': {
    layoutId: 'airbnb-listing',
    heroType: 'image',
    bgColorTheme: BRAND.colors.sandLight,
    headerColor: BRAND.colors.primaryTeal,
    headlineColor: BRAND.colors.ink,
    bodyColor: BRAND.colors.muted,
  },
  'travel-package': { layoutId: 'travel-package', heroType: 'image', ...sharedTeal },
  'restaurant-promotion': {
    layoutId: 'restaurant-promotion',
    heroType: 'image',
    bgColorTheme: BRAND.colors.ink,
    headerColor: BRAND.colors.goldLight,
    headlineColor: BRAND.colors.ivory,
    bodyColor: BRAND.colors.sandLight,
  },
  'google-business': {
    layoutId: 'google-business',
    heroType: 'image',
    bgColorTheme: BRAND.colors.ivory,
    headerColor: BRAND.colors.primaryTeal,
    headlineColor: BRAND.colors.ink,
    bodyColor: BRAND.colors.muted,
  },
  'linkedin-announcement': {
    layoutId: 'linkedin-announcement',
    heroType: 'quote',
    bgColorTheme: BRAND.colors.primaryTeal,
    headerColor: BRAND.colors.goldLight,
    headlineColor: BRAND.colors.white,
    bodyColor: BRAND.colors.sandLight,
  },
  'event-flyer': {
    layoutId: 'event-flyer',
    heroType: 'image',
    bgColorTheme: BRAND.colors.goldDark,
    headerColor: BRAND.colors.cream,
    headlineColor: BRAND.colors.white,
    bodyColor: BRAND.colors.sandLight,
  },
  statistics: {
    layoutId: 'statistics',
    heroType: 'image',
    bgColorTheme: BRAND.colors.primaryTeal,
    headerColor: BRAND.colors.goldLight,
    headlineColor: BRAND.colors.white,
    bodyColor: BRAND.colors.sandLight,
  },
  'before-after': {
    layoutId: 'before-after',
    heroType: 'image',
    bgColorTheme: BRAND.colors.sandLight,
    headerColor: BRAND.colors.primaryTeal,
    headlineColor: BRAND.colors.ink,
    bodyColor: BRAND.colors.muted,
  },
  'service-spotlight': { layoutId: 'service-spotlight', heroType: 'image', ...sharedTeal },
  testimonial: {
    layoutId: 'testimonial',
    heroType: 'quote',
    bgColorTheme: BRAND.colors.cream,
    headerColor: BRAND.colors.goldDark,
    headlineColor: BRAND.colors.ink,
    bodyColor: BRAND.colors.muted,
  },
  'team-member': {
    layoutId: 'team-member',
    heroType: 'image',
    bgColorTheme: BRAND.colors.ivory,
    headerColor: BRAND.colors.primaryTeal,
    headlineColor: BRAND.colors.ink,
    bodyColor: BRAND.colors.muted,
  },
  'breaking-news': {
    layoutId: 'breaking-news',
    heroType: 'image',
    bgColorTheme: BRAND.colors.ink,
    headerColor: BRAND.colors.goldLight,
    headlineColor: BRAND.colors.white,
    bodyColor: BRAND.colors.sandLight,
  },
  'destination-highlight': {
    layoutId: 'destination-highlight',
    heroType: 'image',
    bgColorTheme: BRAND.colors.primaryTeal,
    headerColor: BRAND.colors.goldLight,
    headlineColor: BRAND.colors.white,
    bodyColor: BRAND.colors.sandLight,
  },
  split: null,
  feature: null,
};

STYLE_PATCHES.split = STYLE_PATCHES.promotion;
STYLE_PATCHES.feature = STYLE_PATCHES['property-feature'];

export function getPresetPatch(layoutId) {
  const resolved = getLayoutById(layoutId).id;
  const style = STYLE_PATCHES[resolved] ?? STYLE_PATCHES.editorial;
  const copy = DEFAULT_COPY[resolved] ?? DEFAULT_COPY.editorial;
  return { ...style, ...copy };
}
