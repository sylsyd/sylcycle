# Cycle Curriculum Sources

Cycle Suite should only add Cycle 1 and Cycle 2 curriculum data from official sources. Do not invent domains, subdomains, or learning outcomes.

## Stable Baseline

The last stable build before Cycle 1 and Cycle 2 work is recorded in `docs/stable-builds.md`.

## Official Sources

- Cycle 1 overview: Eduscol "Enseigner au cycle 1" confirms the 2025 programmes for language and mathematical tools, plus unchanged 2021 programmes for other domains.
- Cycle 1 language: Bulletin officiel no. 41, 31 October 2024, Annexe 1, "Programme d'enseignement pour le developpement et la structuration du langage oral et ecrit du cycle 1".
- Cycle 1 mathematics: Bulletin officiel no. 41, 31 October 2024, Annexe 2, "Programme d'enseignement pour l'acquisition des premiers outils mathematiques du cycle 1".
- Cycle 1 other domains: the unchanged 2021 Cycle 1 programme referenced from Eduscol.
- Cycle 1 Exploring the World: official maternelle programme, "Explorer le monde", including time, space, living things, matter, objects, and digital tools.
- Cycle 1 Artistic Activities: official maternelle programme, "Agir, s'exprimer, comprendre a travers les activites artistiques", including visual/plastic productions, images/artworks, sound worlds, and live performance.
- Cycle 1 EVAR: Bulletin officiel no. 6, 6 February 2025, maternelle entries in "Programme d'education a la vie affective et relationnelle, et a la sexualite".
- Cycle 1 Physical Activity: official maternelle programme, "Agir, s'exprimer, comprendre a travers l'activite physique", including acting in space/time/with objects, adapting balance and movement, expressive/artistic movement, and cooperating/opposing.
- Cycle 2 overview: Eduscol "J'enseigne au cycle 2" confirms CP, CE1, and CE2, and identifies which 2025 programmes are new or unchanged.
- Cycle 2 French: Bulletin officiel no. 41, 31 October 2024, Annexe 3, "Programme de francais du cycle 2".
- Cycle 2 mathematics: Bulletin officiel no. 41, 31 October 2024, Annexe 4, "Programme de mathematiques du cycle 2".
- Cycle 2 EMC: Bulletin officiel no. 24, 13 June 2024, "Programme d'enseignement moral et civique du cours preparatoire a la classe terminale", with staged rollout by year level.
- Cycle 2 EVAR: Bulletin officiel no. 6, 6 February 2025, "Programme d'education a la vie affective et relationnelle, et a la sexualite", with Cycle 2 entries for CP, CE1, and CE2.
- Cycle 2 unchanged areas: Eduscol identifies languages, arts, PE, and "questionner le monde" as unchanged for CP, CE1, and CE2.
- Cycle 2 Questioning the World: Bulletin officiel special no. 11, 26 November 2015, Cycle 2 programme, "Questionner le monde".
- Cycle 2 Visual Arts: official Cycle 2 programme, "Enseignements artistiques - Arts plastiques", with the programme questions "La representation du monde", "L'expression des emotions", and "La narration et le temoignage par les images".
- Cycle 2 Music and PE: official Cycle 2 programme, "Education musicale" and "Education physique et sportive".

## Implementation Notes

- Start with `planning.html` only.
- The first code move is a preference shell: Planner can store a preferred teaching cycle, switch the year-level dropdown between PS/MS/GS, CP/CE1/CE2, and CM1/CM2 options, and ask first-time users to choose a cycle.
- The second code move adds a domain/subdomain structure for Cycle 1 and Cycle 2 in `assets/cycle-domain-library.js`, with outcome lists intentionally left empty until the official outcome text is imported.
- The first outcome import fills Cycle 1 language/mathematics and Cycle 2 literacy/mathematics from the 2025 BO programmes. Other Cycle 1 and Cycle 2 areas remain empty until their official programme sources are imported separately.
- The next Cycle 2 import fills `Questioning the World` from the official Cycle 2 programme structure: living things/matter/objects, space/time, and organisations of the world.
- The next Cycle 2 import fills `Civics and Moral Education` from the official 2024 EMC programme. Planner keeps the programme's annualised structure with CP, CE1, and CE2 subdomains.
- The next Cycle 2 import fills `Affective and Relational Education` from the official 2025 EVAR programme. Planner keeps the CP, CE1, and CE2 year-level structure across body respect, emotions/relationships, consent, protection, equality, and digital awareness.
- The next Cycle 2 import fills `Visual Arts` from the official Cycle 2 arts-plastiques programme.
- The next Cycle 2 import fills `Music` and `PE` from the official Cycle 2 education musicale and EPS programmes, even though those subjects may usually have dedicated teachers.
- The first remaining Cycle 1 import fills `Exploring the World` from the official maternelle programme structure: time, space, living things, matter, objects, and digital tools.
- The next Cycle 1 import fills `Artistic Activities` from the official maternelle programme structure: visual/plastic productions, looking at images and artworks, sound worlds, and live performance.
- The next Cycle 1 import fills `Affective and Relational Education` from the official 2025 EVAR programme, using the maternelle age bands before age 4, from age 4, and from age 5.
- The final Cycle 1 import fills `Physical Activity` from the official maternelle programme structure: acting in space/time/with objects, adapting balance and movement, expressive movement, and cooperating/opposing.
- Planner generates only from domains whose outcomes exist in `assets/cycle-domain-library.js`. Empty domains, if added in future, remain visible but disabled until their source-backed outcomes are added.
- Keep the existing Cycle 3 library working as-is while Cycle 1 and Cycle 2 data are added.
- Store the user's preferred cycle. It is fine to remember the last selected year level too, as long as the year-level dropdown remains easy to change each time.
- Keep UI names English-facing, matching Studio and Planner style, while preserving a clear source trail back to the official French programme names.
- Cycle 2 uses the English-facing domain name `Literacy` for the official French programme source, because the app workflow is for English teachers. `Modern Languages` is not included in Planner's Cycle 2 app scope.
- Add compatibility carefully if existing saved plans mention Cycle 3-only defaults.
