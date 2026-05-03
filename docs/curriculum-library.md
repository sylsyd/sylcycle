# Curriculum Library

`assets/cycle3-domain-library.js` is the original shared Cycle 3 curriculum source. It is still loaded by:

- `studio.html`
- `planning.html`
- `assess.html`

Planner, Studio, and Assess now read through the multi-cycle wrapper below so they can switch between Cycle 1, Cycle 2, and Cycle 3. The wrapper reuses `window.CYCLE3_DOMAIN_LIBRARY` for its Cycle 3 data.

`assets/cycle-domain-library.js` is the newer multi-cycle wrapper introduced in Planner first, then loaded by Studio and Assess. It currently exposes:

- `cycle1`: Cycle 1 domain/subdomain structure and imported official outcomes.
- `cycle2`: Cycle 2 domain/subdomain structure and imported official outcomes.
- `cycle3`: the existing `window.CYCLE3_DOMAIN_LIBRARY` data.

Studio now has cycle/year controls, cycle-aware difficulty options, defaults older saved items to Cycle 3, stores cycle/year in saved resources and history, and sends the selected cycle/year into its worksheet, answer-key, learning-outcome detection, and quality-check prompts. Assess has a cycle/year preference shell, can switch its active curriculum library, snapshots cycle/year onto new assessment and session records, filters Insights/Coverage, student profile views, roster summary cards, student autocomplete previews, session history, and Excel exports to the active cycle, and prompts before reopening a saved batch from another cycle. Older Assess data still defaults to Cycle 3.

Assess normalizes older saved records that used French-labelled domain names so existing assessment history still counts under the matching shared domain.

## Assess cycle behaviour

CycleAssess treats the selected cycle/year in Settings as the active teacher profile. Teachers should normally set this once for the school year and leave it alone.

Each new assessment and batch session stores its own `cycle` and `yearLevel` snapshot when it is created. This lets an admin test multiple cycles in one browser without mixing records in Insights, profiles, or Excel exports.

When Settings changes cycle, CycleAssess switches the active curriculum library and filters cycle-aware views to that active cycle. JSON backups remain full-data backups and are not cycle-filtered.

CycleAssess destructive clear actions are also full-data actions across all cycles. Their UI wording should stay explicit about this unless a future cycle-scoped delete is added.

If a saved batch belongs to another cycle, CycleAssess asks before switching Settings to that saved cycle/year and reopening the grid.

When changing curriculum domains, subdomains, or outcomes, update the shared asset first so the three tools stay aligned.
