# Curriculum Library

`assets/cycle3-domain-library.js` is the shared Cycle 3 curriculum source for:

- `studio.html`
- `planning.html`
- `assess.html`

Studio, Planner, and Assess read `window.CYCLE3_DOMAIN_LIBRARY` directly, so the three tools use the same English-facing domain names and learning outcomes.

`assets/cycle-domain-library.js` is the newer multi-cycle wrapper introduced in Planner first and now loaded by Studio as a foundation step. It currently exposes:

- `cycle1`: Cycle 1 domain/subdomain structure, with outcomes still pending official import.
- `cycle2`: Cycle 2 domain/subdomain structure, with outcomes still pending official import.
- `cycle3`: the existing `window.CYCLE3_DOMAIN_LIBRARY` data.

Studio now has cycle/year controls and still defaults to Cycle 3 for existing users while prompt and export behavior are being made cycle-aware. Assess still uses the Cycle 3 asset directly for now.

Assess normalizes older saved records that used French-labelled domain names so existing assessment history still counts under the matching shared domain.

When changing curriculum domains, subdomains, or outcomes, update the shared asset first so the three tools stay aligned.
