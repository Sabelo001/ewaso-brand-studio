# Architecture

## Overview

Ewaso Designer follows a modular React architecture with clear separation between **presentation**, **state**, **layout engine**, **export pipeline**, and **persistence**.

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                              │
│  useStudioState · useStudioSettings · useTemplates · etc.   │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
        ┌───────▼───────┐             ┌───────▼───────┐
        │    Sidebar    │             │ CanvasWorkspace│
        │  (tab panels) │             │ LayoutRenderer │
        └───────┬───────┘             └───────┬───────┘
                │                             │
                └──────────────┬──────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   useStudioState    │
                    │  (single source of   │
                    │       truth)        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
      ┌───────▼──────┐ ┌───────▼──────┐ ┌───────▼──────┐
      │ Layout Engine│ │ Export Engine│ │  localStorage │
      │ registry +   │ │ canvas 2D    │ │  autosave     │
      │ presets      │ │ renderers    │ │  templates    │
      └──────────────┘ └──────────────┘ └──────────────┘
```

## State Management

`useStudioState` is the single source of truth for the active design. It:

- Initializes from localStorage (with legacy key migration)
- Debounces saves via `useAutosave`
- Applies layout presets from `layouts/presets.js`
- Integrates image pan/zoom via `useImagePan`
- Supports undo/redo snapshots via `useHistory`

## Layout Engine

Layouts are registered in `layouts/registry.js`. Each layout entry defines:

- `id`, `label`, `desc`, `category`, `keywords`
- `baseLayout` — maps to a React component and canvas renderer
- `preview` — colors for gallery thumbnails

Selecting a layout calls `getPresetPatch()` which returns style tokens and default copy.

### Base Layouts

| Base | Used For |
|------|----------|
| `editorial` | Hero-focused vertical layouts |
| `split` | Half image / half content |
| `feature` | Full-bleed with floating card |
| `quote` | Typography-first |
| `statistics` | Metrics-focused |
| `beforeAfter` | Side-by-side comparison |

Preview rendering (`LayoutRenderer.jsx`) and export rendering (`layoutRenderers.js`) share the same base mapping via `getBaseLayoutId()`.

## Export Pipeline

1. Read preview container dimensions for pan/zoom mapping
2. Create offscreen canvas at `EXPORT_WIDTH × getExportHeight()` × scale
3. Fill background (or transparent for PNG)
4. Call `renderLayoutToCanvas()` — mirrors preview structure
5. Draw border frame
6. `toDataURL()` and download

PDF export is stubbed at `exportDesignPdf()` for future implementation.

## Brand System

All design tokens live in `src/theme/`:

- `brand.js` — colors, fonts, logo, signature, spacing, radius, shadows
- `colorOptions.js` — picker palette
- `studioTheme.js` — shell UI tokens

CSS variables in `index.css` mirror studio chrome for dark/light themes.

## AI Architecture

Provider abstraction in `src/ai/providers/`:

- `types.js` — interfaces and capability enums
- `openai.js`, `gemini.js`, `claude.js` — unconfigured stubs
- `AISidebar.jsx` — UI wired to provider interface

No API keys or network calls are implemented in v1.0.

## Asset Library

Built-in SVG assets in `assetLibrary.js`. User uploads persist via `useAssetLibrary` → localStorage. `syncAssetsFromCloud()` is a no-op stub for future cloud sync.

## Error Handling

`ErrorBoundary` wraps the app root. Storage operations fail silently on quota errors. Input is sanitized via `utils/validation.js`.

## Performance

- Layout components and canvas workspace are memoized
- Asset images use `loading="lazy"` in the gallery
- Autosave is debounced (500ms)
- Export uses a single offscreen canvas pass
