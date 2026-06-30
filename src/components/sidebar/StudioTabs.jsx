import { useState } from 'react';

const TABS = [
  { id: 'design', label: 'Design', icon: '◈' },
  { id: 'assets', label: 'Assets', icon: '▣' },
  { id: 'templates', label: 'Templates', icon: '▤' },
  { id: 'ai', label: 'AI', icon: '✦' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
];

export function StudioTabs({ activeTab, onTabChange, children }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <nav
        className="flex gap-1 mb-4 p-1 bg-[var(--panel-bg)] rounded-xl border border-[var(--panel-border)]"
        role="tablist"
        aria-label="Studio panels"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition ${
              activeTab === tab.id
                ? 'bg-[var(--accent-teal)] text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--input-bg)]'
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
      <div id={`panel-${activeTab}`} role="tabpanel" className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
        {children}
      </div>
    </div>
  );
}

export function useStudioTab(initial = 'design') {
  const [activeTab, setActiveTab] = useState(initial);
  return { activeTab, setActiveTab };
}
