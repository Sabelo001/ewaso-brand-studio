import { useCallback, useState } from 'react';
import { AI_CAPABILITIES, AI_PROVIDERS, getProviderById } from './providers';

const CAPABILITY_LABELS = {
  [AI_CAPABILITIES.headline]: 'Generate Headline',
  [AI_CAPABILITIES.caption]: 'Write Caption',
  [AI_CAPABILITIES.cta]: 'Suggest CTA',
  [AI_CAPABILITIES.hashtags]: 'Generate Hashtags',
  [AI_CAPABILITIES.rewrite]: 'Rewrite Copy',
  [AI_CAPABILITIES.layoutSuggestions]: 'Layout Suggestions',
};

export function AISidebar({ studio }) {
  const [providerId, setProviderId] = useState(AI_PROVIDERS[0].id);
  const [capability, setCapability] = useState(AI_CAPABILITIES.headline);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const provider = getProviderById(providerId);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await provider.generate({
        capability,
        prompt: studio.headlineText || studio.metaText || 'Ewaso Digital brand content',
        context: {
          metaText: studio.metaText,
          headlineText: studio.headlineText,
          bodyText1: studio.bodyText1,
          layoutId: studio.layoutId,
        },
      });
      setResult(response);
    } catch {
      setResult({ success: false, error: 'Generation failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }, [provider, capability, studio]);

  const applyResult = useCallback(() => {
    if (!result?.success || !result.text) return;
    switch (capability) {
      case AI_CAPABILITIES.headline:
        studio.setHeadlineText(result.text);
        break;
      case AI_CAPABILITIES.cta:
        studio.setCtaText(result.text);
        break;
      case AI_CAPABILITIES.caption:
      case AI_CAPABILITIES.rewrite:
        studio.setBodyText1(result.text);
        break;
      case AI_CAPABILITIES.hashtags:
        studio.setBodyText2(result.text);
        break;
      default:
        break;
    }
  }, [result, capability, studio]);

  const canApply = result?.success && result.text && capability !== AI_CAPABILITIES.layoutSuggestions;

  return (
    <div className="space-y-4">
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        AI-assisted copy generation. The Local Assistant works offline with no API key; OpenAI, Gemini, and Claude
        connect to the same interface in a future release.
      </p>

      <div>
        <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">Provider</label>
        <select
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
          className="w-full bg-[var(--input-bg)] border border-[var(--panel-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
        >
          {AI_PROVIDERS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} {p.configured ? '' : '(Not configured)'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">Action</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(CAPABILITY_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCapability(key)}
              className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                capability === key
                  ? 'bg-[var(--accent-teal)] text-white'
                  : 'bg-[var(--panel-bg)] text-[var(--text-muted)] border border-[var(--panel-border)] hover:border-[var(--panel-hover-border)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 bg-[var(--accent-gold)] text-[var(--accent-on-gold)] font-bold tracking-widest uppercase rounded-xl transition hover:brightness-110 disabled:opacity-50"
      >
        {loading ? 'Processing…' : 'Generate'}
      </button>

      {result && (
        <div
          className={`p-3 rounded-xl border text-xs ${
            result.success
              ? 'bg-[var(--accent-teal)]/20 border-[var(--accent-teal)] text-[var(--text-primary)]'
              : 'bg-amber-900/20 border-amber-700/50 text-amber-200'
          }`}
          role="status"
        >
          {result.success ? (
            <>
              {result.text && <p className="mb-2">{result.text}</p>}
              {result.suggestions?.map((s) => (
                <p key={s} className="text-[var(--text-muted)]">
                  • {s}
                </p>
              ))}
              {canApply && (
                <button
                  type="button"
                  onClick={applyResult}
                  className="mt-3 w-full py-2 bg-[var(--accent-teal)] text-white font-bold tracking-wider uppercase text-[10px] rounded-lg transition hover:brightness-110"
                >
                  Apply to Design
                </button>
              )}
            </>
          ) : (
            <p>{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
