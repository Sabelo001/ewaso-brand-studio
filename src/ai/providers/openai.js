import { createUnconfiguredProvider, AI_PROVIDER_IDS } from './types';

export const openaiProvider = createUnconfiguredProvider(AI_PROVIDER_IDS.openai, 'OpenAI');
export const geminiProvider = createUnconfiguredProvider(AI_PROVIDER_IDS.gemini, 'Google Gemini');
export const claudeProvider = createUnconfiguredProvider(AI_PROVIDER_IDS.claude, 'Anthropic Claude');
