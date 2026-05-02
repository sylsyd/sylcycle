# Curriculum Library

`assets/cycle3-domain-library.js` is the original shared Cycle 3 curriculum source for:

- `studio.html`
- `planning.html`
- `assess.html`

Assess still reads `window.CYCLE3_DOMAIN_LIBRARY` directly. Planner and Studio now read through the multi-cycle wrapper below so they can switch between Cycle 1, Cycle 2, and Cycle 3.

`assets/cycle-domain-library.js` is the newer multi-cycle wrapper introduced in Planner first and now loaded by Studio as a foundation step. It currently exposes:

- `cycle1`: Cycle 1 domain/subdomain structure and imported official outcomes.
- `cycle2`: Cycle 2 domain/subdomain structure and imported official outcomes.
- `cycle3`: the existing `window.CYCLE3_DOMAIN_LIBRARY` data.

Studio now has cycle/year controls, defaults older saved items to Cycle 3, stores cycle/year in saved resources and history, and sends the selected cycle/year into its worksheet, answer-key, learning-outcome detection, and quality-check prompts. Assess still uses the Cycle 3 asset directly for now.

Assess normalizes older saved records that used French-labelled domain names so existing assessment history still counts under the matching shared domain.

When changing curriculum domains, subdomains, or outcomes, update the shared asset first so the three tools stay aligned.
