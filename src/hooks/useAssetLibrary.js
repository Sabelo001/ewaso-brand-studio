import { useCallback, useMemo, useState } from 'react';
import { readStorage, writeStorage, STORAGE_KEYS } from '../storage/localStorage';
import { getAssetCategories, getAssetsByCategory as getBuiltinByCategory } from '../assets/assetLibrary';

function generateId() {
  return `asset_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadUserAssets() {
  return readStorage(STORAGE_KEYS.assets, {});
}

function loadAssetMeta() {
  return readStorage(STORAGE_KEYS.assetMeta, { favorites: [], recent: [] });
}

export function useAssetLibrary() {
  const [userAssets, setUserAssets] = useState(loadUserAssets);
  const [meta, setMeta] = useState(loadAssetMeta);

  const persistAssets = useCallback((next) => {
    setUserAssets(next);
    writeStorage(STORAGE_KEYS.assets, next);
  }, []);

  const persistMeta = useCallback((next) => {
    setMeta(next);
    writeStorage(STORAGE_KEYS.assetMeta, next);
  }, []);

  const allAssets = useMemo(() => {
    const categories = getAssetCategories();
    return categories.flatMap((cat) => {
      const builtin = getBuiltinByCategory(cat);
      const custom = userAssets[cat] ?? [];
      return [...builtin, ...custom].map((a) => ({ ...a, category: cat }));
    });
  }, [userAssets]);

  const addAsset = useCallback(
    (category, asset) => {
      const entry = {
        id: generateId(),
        name: asset.name || 'Untitled',
        src: asset.src,
        category,
        createdAt: Date.now(),
        userUploaded: true,
      };
      const next = {
        ...userAssets,
        [category]: [...(userAssets[category] ?? []), entry],
      };
      persistAssets(next);
      const nextRecent = [entry.id, ...(meta.recent ?? [])].slice(0, 20);
      persistMeta({ ...meta, recent: nextRecent });
      return entry;
    },
    [userAssets, meta, persistAssets, persistMeta]
  );

  const deleteAsset = useCallback(
    (id) => {
      const next = { ...userAssets };
      for (const cat of Object.keys(next)) {
        next[cat] = (next[cat] ?? []).filter((a) => a.id !== id);
      }
      persistAssets(next);
      persistMeta({
        favorites: (meta.favorites ?? []).filter((fid) => fid !== id),
        recent: (meta.recent ?? []).filter((rid) => rid !== id),
      });
    },
    [userAssets, meta, persistAssets, persistMeta]
  );

  const toggleFavorite = useCallback(
    (id) => {
      const favorites = meta.favorites ?? [];
      const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [id, ...favorites];
      persistMeta({ ...meta, favorites: next });
    },
    [meta, persistMeta]
  );

  const markRecent = useCallback(
    (id) => {
      const nextRecent = [id, ...(meta.recent ?? []).filter((r) => r !== id)].slice(0, 20);
      persistMeta({ ...meta, recent: nextRecent });
    },
    [meta, persistMeta]
  );

  const searchAssets = useCallback(
    (query, category = 'all') => {
      const q = query.trim().toLowerCase();
      return allAssets.filter((a) => {
        if (category !== 'all' && a.category !== category) return false;
        if (!q) return true;
        return (a.name ?? '').toLowerCase().includes(q) || a.category.includes(q);
      });
    },
    [allAssets]
  );

  const favorites = useMemo(
    () => allAssets.filter((a) => (meta.favorites ?? []).includes(a.id)),
    [allAssets, meta.favorites]
  );

  const recent = useMemo(
    () =>
      (meta.recent ?? [])
        .map((id) => allAssets.find((a) => a.id === id))
        .filter(Boolean),
    [allAssets, meta.recent]
  );

  return {
    categories: getAssetCategories(),
    allAssets,
    favorites,
    recent,
    addAsset,
    deleteAsset,
    toggleFavorite,
    markRecent,
    searchAssets,
    isFavorite: (id) => (meta.favorites ?? []).includes(id),
  };
}
