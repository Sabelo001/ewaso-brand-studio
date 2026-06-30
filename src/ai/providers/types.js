/** AI provider capability types — architecture only, no API connections */

export const AI_CAPABILITIES = {
  headline: 'headline',
  caption: 'caption',
  cta: 'cta',
  hashtags: 'hashtags',
  rewrite: 'rewrite',
  layoutSuggestions: 'layoutSuggestions',
};

/**
 * @typedef {Object} AIGenerationRequest
 * @property {keyof typeof AI_CAPABILITIES} capability
 * @property {string} prompt
 * @property {Record<string, string>} [context]
 */

/**
 * @typedef {Object} AIGenerationResult
 * @property {boolean} success
 * @property {string} [text]
 * @property {string[]} [suggestions]
 * @property {string} [error]
 */

/**
 * @typedef {Object} AIProvider
 * @property {string} id
 * @property {string} name
 * @property {boolean} configured
 * @property {(request: AIGenerationRequest) => Promise<AIGenerationResult>} generate
 */

export const AI_PROVIDER_IDS = {
  openai: 'openai',
  gemini: 'gemini',
  claude: 'claude',
};

export function createUnconfiguredProvider(id, name) {
  return {
    id,
    name,
    configured: false,
    async generate() {
      return {
        success: false,
        error: `${name} provider is not configured. Connect an API key in a future release.`,
      };
    },
  };
}
