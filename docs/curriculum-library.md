# Curriculum Library

`assets/cycle3-domain-library.js` is the shared Cycle 3 curriculum source for:

- `studio.html`
- `planning.html`
- `assess.html`

Studio and Planner read `window.CYCLE3_DOMAIN_LIBRARY` directly.

Assess also reads `window.CYCLE3_DOMAIN_LIBRARY`, then uses `window.CYCLE3_ASSESS_DOMAIN_MAP` from the same file to convert Studio/Planner domain names into the French-labelled domain names used in CycleAssess.

When changing curriculum domains, subdomains, or outcomes, update the shared asset first so the three tools stay aligned.
