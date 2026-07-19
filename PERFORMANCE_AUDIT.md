# Performance Audit — VibeOverlay Studio

This document reviews rendering cycles, memoization, bundle sizes, and runtime memory optimization paths.

---

## 1. Render Cycles & Memoization

### The Issue
Previously, any mouse movement (such as dragging resizer controls or updates in the properties panel) triggered a state update in the global store. Because `EditorCanvas` selects the active scene widgets from the store, it re-rendered. This forced the child `SceneRenderer` component to completely reconstruct the DOM elements for all widgets in the scene on every pixel moved.

### The Optimization
We wrapped the `SceneRenderer` in `React.memo` with a custom equality checking function:
- Prevents re-renders unless visual properties like `zoom`, `timerSource`, `hoveredId`, `isDragging`, `isResizing`, or individual properties inside `widgets`/`selectedIds` change.
- Drastically reduces unnecessary Virtual DOM diffing during high-frequency mouse actions.

---

## 2. Bundle Size Review

Running `npm run build` generates the production client assets:

```
dist/index.html                   0.61 kB │ gzip:   0.37 kB
dist/assets/index-DUFPHsLO.css   25.80 kB │ gzip:   5.46 kB
dist/assets/index-Bo2Qi1kU.js   707.90 kB │ gzip: 198.48 kB
```

### Analysis
- **CSS Bundle (25.80 kB)**: Extremely compact and lightweight, utilizing vanilla CSS parameters without bulky utilities.
- **JS Bundle (707.90 kB)**: Contains React, Zustand, lucide-react, react-moveable, and all 8 broadcast packs.
- **Future Code-Splitting Path**: When migrating to Tauri desktop client in the next milestone, we can configure Rolldown/Vite code-splitting to lazily load individual widgets or complex packs on-demand using React `Suspense` and dynamic `import()`.

---

## 3. Memory & Object Allocations

- **State Subscription Throttling**: The global subscription to auto-save compares a serialized representation of the content instead of pushing save events on every mouse interaction. This cuts IndexedDB/LocalStorage write operations and garbage collection spikes.
- **Unused Component Cleanup**: Removed `WelcomeWizard.tsx`, reducing memory footprint and cleaning up build time dependency trees.
