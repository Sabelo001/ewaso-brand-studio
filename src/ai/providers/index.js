import { openaiProvider } from './openai';
import { geminiProvider } from './gemini';
import { claudeProvider } from './claude';

export const AI_PROVIDERS = [openaiProvider, geminiProvider, claudeProvider];

export function getProviderById(id) {
  return AI_PROVIDERS.find((p) => p.id === id) ?? openaiProvider;
}

export { AI_CAPABILITIES } from './types';
