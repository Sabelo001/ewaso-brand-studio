import { STUDIO_THEME } from '../../theme';

const variants = {
  primary: 'bg-[var(--accent-gold)] text-[var(--accent-on-gold)] hover:brightness-110 shadow-lg',
  secondary:
    'bg-[var(--panel-bg)] text-[var(--accent-gold)] border border-[var(--panel-border)] hover:border-[var(--panel-hover-border)]',
  ghost: 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--panel-bg)]',
  danger: 'bg-red-900/40 text-red-200 border border-red-800/50 hover:bg-red-900/60',
};

const sizes = {
  sm: 'px-3 py-1.5 text-[10px]',
  md: 'px-4 py-2.5 text-xs',
  lg: 'px-5 py-3.5 text-xs',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-bold tracking-widest uppercase rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sidebar-bg)] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children, step }) {
  return (
    <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--label-gold)] uppercase mb-3">
      {step && (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--accent-teal)] text-[10px] text-white">
          {step}
        </span>
      )}
      {children}
    </label>
  );
}

export function Panel({ children, className = '' }) {
  return (
    <div
      className={`bg-[var(--panel-bg)] p-4 rounded-xl border border-[var(--panel-border)] ${className}`}
      style={{ boxShadow: STUDIO_THEME.shadows?.panel }}
    >
      {children}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search…', className = '' }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className={`w-full bg-[var(--input-bg)] border border-[var(--panel-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)] transition ${className}`}
    />
  );
}

export function EmptyState({ icon = '✦', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <span className="text-2xl mb-3 opacity-40" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{title}</h3>
      {description && <p className="text-xs text-[var(--text-muted)] max-w-xs mb-4">{description}</p>}
      {action}
    </div>
  );
}

export function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4" role="status" aria-live="polite">
      <span className="w-4 h-4 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
    </div>
  );
}

export function ProgressBar({ progress, label }) {
  const pct = Math.round(Math.min(100, Math.max(0, progress * 100)));
  return (
    <div className="space-y-1" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      {label && <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{label}</p>}
      <div className="h-1.5 bg-[var(--panel-border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--accent-gold)] transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
