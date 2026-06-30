import { useCallback, useMemo, useState } from 'react';
import { readStorage, writeStorage, STORAGE_KEYS } from '../storage/localStorage';

const MAX_TEMPLATES = 50;
const MAX_RECENT = 8;

function generateId() {
  return `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useTemplates() {
  const [templates, setTemplates] = useState(() => readStorage(STORAGE_KEYS.templates, []));
  const [recentIds, setRecentIds] = useState(() => readStorage(`${STORAGE_KEYS.templates}:recent`, []));

  const persist = useCallback((next, nextRecent = recentIds) => {
    setTemplates(next);
    setRecentIds(nextRecent);
    writeStorage(STORAGE_KEYS.templates, next);
    writeStorage(`${STORAGE_KEYS.templates}:recent`, nextRecent);
  }, [recentIds]);

  const saveTemplate = useCallback(
    (name, state) => {
      const entry = {
        id: generateId(),
        name: name.trim() || `Template ${templates.length + 1}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        state,
      };
      const next = [entry, ...templates].slice(0, MAX_TEMPLATES);
      const nextRecent = [entry.id, ...recentIds.filter((id) => id !== entry.id)].slice(0, MAX_RECENT);
      persist(next, nextRecent);
      return entry;
    },
    [templates, recentIds, persist]
  );

  const renameTemplate = useCallback(
    (id, name) => {
      const next = templates.map((t) =>
        t.id === id ? { ...t, name: name.trim() || t.name, updatedAt: Date.now() } : t
      );
      persist(next);
    },
    [templates, persist]
  );

  const duplicateTemplate = useCallback(
    (id) => {
      const source = templates.find((t) => t.id === id);
      if (!source) return null;
      const entry = {
        ...source,
        id: generateId(),
        name: `${source.name} (Copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const next = [entry, ...templates].slice(0, MAX_TEMPLATES);
      persist(next);
      return entry;
    },
    [templates, persist]
  );

  const deleteTemplate = useCallback(
    (id) => {
      const next = templates.filter((t) => t.id !== id);
      const nextRecent = recentIds.filter((rid) => rid !== id);
      persist(next, nextRecent);
    },
    [templates, recentIds, persist]
  );

  const loadTemplate = useCallback(
    (id) => {
      const template = templates.find((t) => t.id === id);
      if (!template) return null;
      const nextRecent = [id, ...recentIds.filter((rid) => rid !== id)].slice(0, MAX_RECENT);
      persist(templates, nextRecent);
      return template.state;
    },
    [templates, recentIds, persist]
  );

  const recentTemplates = useMemo(
    () => recentIds.map((id) => templates.find((t) => t.id === id)).filter(Boolean),
    [recentIds, templates]
  );

  return {
    templates,
    recentTemplates,
    saveTemplate,
    renameTemplate,
    duplicateTemplate,
    deleteTemplate,
    loadTemplate,
  };
}
