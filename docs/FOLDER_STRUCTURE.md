# Folder Structure

```
ewaso-brand-studio/
├── docs/                    # Developer documentation
├── public/                  # Static assets (favicon)
├── src/
│   ├── ai/                  # AI provider abstraction + sidebar UI
│   │   ├── providers/       # OpenAI, Gemini, Claude stubs
│   │   └── AISidebar.jsx
│   ├── assets/              # Asset library definitions
│   ├── components/
│   │   ├── canvas/          # Canvas workspace, toolbar, snap guides
│   │   ├── error/           # Error boundary
│   │   ├── header/          # Brand header
│   │   ├── icons/           # SVG icon components
│   │   ├── preview/         # Layout preview modules (hero, typography, footer)
│   │   ├── sidebar/         # All sidebar panels and tabs
│   │   └── ui/              # Reusable UI primitives
│   ├── hooks/               # React hooks (state, settings, export, etc.)
│   ├── layouts/             # Layout registry, presets, renderer
│   ├── storage/             # localStorage helpers
│   ├── theme/               # Brand tokens and studio theme
│   ├── utils/               # Export engine, canvas text, image utils, validation
│   ├── App.jsx              # Root application
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles + CSS variables
├── index.html
├── package.json
└── vite.config.js
```

## Key Files

| File | Purpose |
|------|---------|
| `hooks/useStudioState.js` | Central design state |
| `layouts/registry.js` | All 19 layout definitions |
| `layouts/presets.js` | Preset patches + default copy |
| `layouts/LayoutRenderer.jsx` | React layout components |
| `utils/layoutRenderers.js` | Canvas export renderers |
| `utils/exportEngine.js` | High-res export pipeline |
| `theme/brand.js` | Ewaso Digital brand tokens |
| `storage/localStorage.js` | Namespaced persistence |

## Adding a New Layout

1. Add entry to `layouts/registry.js`
2. Add style + copy patch to `layouts/presets.js`
3. If new base type needed: add component to `LayoutRenderer.jsx` and renderer to `layoutRenderers.js`
4. Gallery preview auto-generates from `baseLayout` in `LayoutPreviewThumb.jsx`
