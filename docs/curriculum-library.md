# Curriculum Library

`assets/cycle3-domain-library.js` is the shared Cycle 3 curriculum source for:

- `studio.html`
- `planning.html`
- `assess.html`

Studio, Planner, and Assess read `window.CYCLE3_DOMAIN_LIBRARY` directly, so the three tools use the same English-facing domain names and learning outcomes.

Assess normalizes older saved records that used French-labelled domain names so existing assessment history still counts under the matching shared domain.

When changing curriculum domains, subdomains, or outcomes, update the shared asset first so the three tools stay aligned.
