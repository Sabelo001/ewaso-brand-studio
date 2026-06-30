import { AI_CAPABILITIES } from './types';

/**
 * Local mock AI provider.
 * Generates real, usable copy offline so the studio is fully functional
 * with no API key. Real providers (OpenAI, Gemini, Claude) plug into the
 * same interface in a future release.
 */

const HEADLINES = [
  'The Silent Giant',
  'Where the Wild Meets Luxury',
  'A Journey Beyond the Ordinary',
  'Northern Kenya, Reimagined',
  'Untamed Beauty Awaits',
  'Your Story Starts Here',
  'Crafted for the Curious Traveler',
  'Moments That Stay With You',
];

const CTAS = [
  'Discover the Safari',
  'Reserve Your Stay',
  'Plan Your Escape',
  'Book a Consultation',
  'Explore the Experience',
  'Start Your Journey',
  'View Availability',
  'Learn More',
];

const HASHTAG_POOL = [
  '#NorthernKenya',
  '#EwasoDigital',
  '#SafariLife',
  '#VisitKenya',
  '#LuxuryTravel',
  '#HospitalityKE',
  '#MagicalKenya',
  '#TravelAfrica',
  '#WildAndFree',
  '#BrandStudio',
];

const LAYOUT_SUGGESTIONS = {
  quote: ['Quote', 'Testimonial', 'LinkedIn Announcement'],
  editorial: ['Editorial Hero', 'Travel Package', 'Breaking News'],
  feature: ['Hospitality', 'Destination Highlight', 'Service Spotlight'],
  split: ['Promotion', 'Airbnb Listing'],
  statistics: ['Statistics'],
  beforeAfter: ['Before & After'],
};

/** Deterministic-ish picker so repeated clicks rotate through options */
let counter = 0;
function pick(list) {
  const value = list[counter % list.length];
  counter += 1;
  return value;
}

function titleCase(value) {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generate({ capability, prompt, context = {} }) {
  await delay(450);
  const subject = (prompt || context.headlineText || context.metaText || 'your brand').trim();

  switch (capability) {
    case AI_CAPABILITIES.headline:
      return { success: true, text: pick(HEADLINES) };

    case AI_CAPABILITIES.caption: {
      const place = context.metaText ? titleCase(context.metaText) : 'Northern Kenya';
      return {
        success: true,
        text: `${subject} — captured in the heart of ${place}. An invitation to slow down, look closer, and experience hospitality the Ewaso way.`,
      };
    }

    case AI_CAPABILITIES.cta:
      return { success: true, text: pick(CTAS) };

    case AI_CAPABILITIES.hashtags: {
      const shuffled = [...HASHTAG_POOL].sort(() => 0.5 - Math.random()).slice(0, 6);
      return { success: true, text: shuffled.join(' ') };
    }

    case AI_CAPABILITIES.rewrite: {
      const base = context.bodyText1 || subject;
      return {
        success: true,
        text: `${base.replace(/\.$/, '')} — refined for a premium, editorial tone that speaks to discerning travelers.`,
      };
    }

    case AI_CAPABILITIES.layoutSuggestions:
      return {
        success: true,
        text: 'Recommended layouts for this content:',
        suggestions: LAYOUT_SUGGESTIONS[context.layoutId] ?? LAYOUT_SUGGESTIONS.editorial,
      };

    default:
      return { success: false, error: 'Unsupported capability.' };
  }
}

export const mockProvider = {
  id: 'mock',
  name: 'Local Assistant',
  configured: true,
  generate,
};
