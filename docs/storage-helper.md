# Storage Helper

`assets/storage.js` contains tiny wrappers around browser `localStorage`.

It exposes `window.SylCycleStorage` with:

- `readJson(key, fallback)`
- `writeJson(key, value)`
- `removeItem(key)`

Current usage:

- `planning.html` uses it through the existing `readJSON` and `writeJSON` wrappers.
- `assess.html` uses it in the `DB` layer for app data and settings.

`storage.js` only handles local browser storage. Cloud saving still happens in each app through `SylCycle.cloudSave`.

Do not move CycleStudio storage in one large pass. Studio has extra handling for saved worksheets, image-heavy history, quota fallbacks, and editor state. Move those pieces one small wrapper at a time.
