import { useCallback, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage, STORAGE_KEYS } from '../storage/localStorage';

const DEFAULT_SETTINGS = {
  theme: 'dark',
  canvasGrid: false,
  snapGuides: true,
  defaultExportFormat: 'png',
  defaultAspectRatio: '9:16',
  exportQuality: 0.92,
  exportScale: 1,
  showAlignmentGuides: true,
};

export function useStudioSettings() {
  const [settings, setSettings] = useState(() => readStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS));

  useEffect(() => {
    writeStorage(STORAGE_KEYS.settings, settings);
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.classList.toggle('light-theme', settings.theme === 'light');
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return useMemo(
    () => ({
      settings,
      updateSetting,
      resetSettings,
    }),
    [settings, updateSetting, resetSettings]
  );
}
