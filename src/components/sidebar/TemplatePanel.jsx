import { useState } from 'react';
import { Button, EmptyState, SectionLabel } from '../ui';

export function TemplatePanel({ templates, onSave, onLoad, onRename, onDuplicate, onDelete }) {
  const [name, setName] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  return (
    <div className="space-y-4">
      <SectionLabel>Templates</SectionLabel>

      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Template name"
          className="flex-1 bg-[var(--input-bg)] border border-[var(--panel-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
        />
        <Button size="sm" onClick={() => { onSave(name); setName(''); }}>
          Save
        </Button>
      </div>

      {templates.recentTemplates.length > 0 && (
        <div>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">Recent</p>
          <div className="space-y-1">
            {templates.recentTemplates.map((t) => (
              <TemplateRow
                key={t.id}
                template={t}
                renamingId={renamingId}
                renameValue={renameValue}
                setRenamingId={setRenamingId}
                setRenameValue={setRenameValue}
                onLoad={onLoad}
                onRename={onRename}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-2">All Templates</p>
        {templates.templates.length === 0 ? (
          <EmptyState title="No saved templates" description="Save your current design as a reusable template." />
        ) : (
          <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
            {templates.templates.map((t) => (
              <TemplateRow
                key={t.id}
                template={t}
                renamingId={renamingId}
                renameValue={renameValue}
                setRenamingId={setRenamingId}
                setRenameValue={setRenameValue}
                onLoad={onLoad}
                onRename={onRename}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateRow({
  template,
  renamingId,
  renameValue,
  setRenamingId,
  setRenameValue,
  onLoad,
  onRename,
  onDuplicate,
  onDelete,
}) {
  const isRenaming = renamingId === template.id;

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--panel-bg)] border border-[var(--panel-border)] hover:border-[var(--panel-hover-border)] transition group">
      {isRenaming ? (
        <input
          autoFocus
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onRename(template.id, renameValue);
              setRenamingId(null);
            }
            if (e.key === 'Escape') setRenamingId(null);
          }}
          className="flex-1 bg-[var(--input-bg)] border border-[var(--panel-border)] rounded px-2 py-1 text-xs text-[var(--text-primary)]"
        />
      ) : (
        <button
          type="button"
          onClick={() => onLoad(template.id)}
          className="flex-1 text-left text-xs font-bold text-[var(--text-primary)] truncate hover:text-[var(--accent-gold)]"
        >
          {template.name}
        </button>
      )}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button type="button" onClick={() => { setRenamingId(template.id); setRenameValue(template.name); }} className="text-[10px] text-[var(--text-muted)] hover:text-[var(--accent-gold)]" aria-label="Rename">✎</button>
        <button type="button" onClick={() => onDuplicate(template.id)} className="text-[10px] text-[var(--text-muted)] hover:text-[var(--accent-gold)]" aria-label="Duplicate">⧉</button>
        <button type="button" onClick={() => onDelete(template.id)} className="text-[10px] text-red-400 hover:text-red-300" aria-label="Delete">×</button>
      </div>
    </div>
  );
}
