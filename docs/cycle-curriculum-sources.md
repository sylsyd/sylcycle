# Cycle Curriculum Sources

Cycle Suite should only add Cycle 1 and Cycle 2 curriculum data from official sources. Do not invent domains, subdomains, or learning outcomes.

## Stable Baseline

The last stable build before Cycle 1 and Cycle 2 work is recorded in `docs/stable-builds.md`.

## Official Sources

- Cycle 1 overview: Eduscol "Enseigner au cycle 1" confirms the 2025 programmes for language and mathematical tools, plus unchanged 2021 programmes for other domains.
- Cycle 1 language: Bulletin officiel no. 41, 31 October 2024, Annexe 1, "Programme d'enseignement pour le developpement et la structuration du langage oral et ecrit du cycle 1".
- Cycle 1 mathematics: Bulletin officiel no. 41, 31 October 2024, Annexe 2, "Programme d'enseignement pour l'acquisition des premiers outils mathematiques du cycle 1".
- Cycle 1 other domains: the unchanged 2021 Cycle 1 programme referenced from Eduscol.
- Cycle 2 overview: Eduscol "J'enseigne au cycle 2" confirms CP, CE1, and CE2, and identifies which 2025 programmes are new or unchanged.
- Cycle 2 French: Bulletin officiel no. 41, 31 October 2024, Annexe 3, "Programme de francais du cycle 2".
- Cycle 2 mathematics: Bulletin officiel no. 41, 31 October 2024, Annexe 4, "Programme de mathematiques du cycle 2".
- Cycle 2 EMC: Eduscol's EMC resources note the updated programme and staged rollout by year level.
- Cycle 2 EVAR: Eduscol's Cycle 2 overview identifies EVAR as a new programme for CP, CE1, and CE2.
- Cycle 2 unchanged areas: Eduscol identifies languages, arts, PE, and "questionner le monde" as unchanged for CP, CE1, and CE2.

## Implementation Notes

- Start with `planning.html` only.
- The first code move is a preference shell: Planner can store a preferred teaching cycle, switch the year-level dropdown between PS/MS/GS, CP/CE1/CE2, and CM1/CM2 options, and ask first-time users to choose a cycle.
- Keep the existing Cycle 3 library working as-is while Cycle 1 and Cycle 2 data are added.
- Store the user's preferred cycle. It is fine to remember the last selected year level too, as long as the year-level dropdown remains easy to change each time.
- Keep UI names English-facing, matching Studio and Planner style, while preserving a clear source trail back to the official French programme names.
- Add compatibility carefully if existing saved plans mention Cycle 3-only defaults.
