@AGENTS.md

# ENIGMA

Mobile app for city detective games. The player picks a route, unlocks it with a code and solves puzzles on location. This is a workshop project: we build only the core game loop across three screens.

Reply in the language the user writes in. All in-app copy is Polish; code, comments and file names are English.

## Where things are

- `src/app/index.tsx`: Screen 1, route selection. Design: `design/01-route-selection.png`
- `src/app/access.tsx`: Screen 2, access code. Design: `design/02-access-code.png`
- `src/app/puzzle.tsx`: Screen 3, puzzle with map and progress. Design: `design/03-puzzle.png`
- `src/theme.ts`: colors, fonts (Montserrat), spacing taken from Figma
- `src/data/games.ts`: routes, steps, codes, plus `findGame` and `isCorrectAnswer`
- `PRODUCT.md`: product decisions; when it exists it wins over the design
- `design/figma-metadata.xml`: structure of the whole Figma file (layer names and copy)

## Parallel work

Several agents work at once, one screen each.

- A screen ticket changes only its own file in `src/app/` and new files in `src/components/<screen>/` (`route-selection`, `access`, `puzzle`).
- Do not change `src/theme.ts`, `src/data/games.ts`, `src/app/_layout.tsx`, `src/components/shared/`, `package.json` or `app.json`. If something is missing there, say so in your summary instead.
- Do not install packages. Available: `@expo/vector-icons`, `react-native-maps`, `expo-image`.
- Do not call the Figma MCP (tight rate limit). The design is in `design/`.

## Scope

- Out of scope: the ENIGMA footer, bottom tab bar, sign-in, menu.
- No route photos: use a dark block with an icon in their place.
- Navigation: route selection → `/access?gameId=…` → `/puzzle?gameId=…`.

## Test data

- Access code for Tajemnica Zegarmistrza: `QUEST`
- Puzzle answers in order: `ZEGAR`, `SUKIENNICE`, `HEJNAŁ`

## Done when

`npx tsc --noEmit` and `npx expo lint` pass with no errors.
