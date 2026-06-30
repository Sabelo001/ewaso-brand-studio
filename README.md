# Ewaso Designer

**Version 1.0** — Branded social media content creation platform built for [Ewaso Digital](https://ewasodigital.co.ke).

Ewaso Designer is not a generic design tool. It is a dedicated studio where you select a content type, choose a layout, edit a few fields, and export — everything else follows the Ewaso Digital brand system.

## Quick Start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

## Features

- **Layout Gallery** — 19 searchable, categorized layouts with live previews
- **Brand System** — Centralized colors, fonts, spacing, shadows, and signature
- **Canvas Editor** — Snap guides, zoom, fit-to-screen, image pan/zoom, keyboard shortcuts
- **Asset Library** — Logos, backgrounds, patterns, icons, photography with favorites and recent
- **Templates** — Save, rename, duplicate, delete, and load designs (local storage)
- **Export Engine** — PNG, JPG, transparent PNG, 2×/4× scale, quality control, custom filename
- **Studio Settings** — Dark/light mode, canvas preferences, default export options
- **AI Architecture** — Provider abstraction for OpenAI, Gemini, and Claude (interfaces only)
- **Autosave** — All design state persisted locally

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Export with default settings |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Ctrl+D` | Duplicate (snapshot) |
| `Delete` / `Backspace` | Reset hero image |
| `+` / `-` | Zoom canvas view |
| `F` | Fit canvas to screen |
| `0` | Reset view |

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Folder Structure](./docs/FOLDER_STRUCTURE.md)
- [Roadmap](./docs/ROADMAP.md)

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4

## License

Proprietary — Ewaso Digital. All rights reserved.
