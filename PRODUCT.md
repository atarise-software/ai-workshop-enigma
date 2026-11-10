# ENIGMA: product decisions

This file wins over the design when they disagree. Decisions come from the product owner interview on 2026-11-10.

## Goal and user

ENIGMA lets players explore a city through a detective story: they pick a route, unlock it with the code printed on their business card and solve puzzles at real locations. The first version targets a player who already has a code and wants to get through the core loop with no sign-in, no setup and no required permissions.

## First version scope

In:

- Route selection, filtered by city picked from the dropdown.
- Access code screen with validation.
- Puzzle screen: story, task, cipher hint, answer field, progress bar, map with the approximate target.
- Completion state after the last step.
- Placeholder for routes that have no steps yet.

Out:

- ENIGMA footer, bottom tab bar, sign-in, menu, notifications (per `CLAUDE.md`).
- Route photos (dark block with an icon instead).
- Required location access and any check of the player's position.
- Hints beyond the cipher hint shown in the design.
- Saving progress between app launches.

## Screen decisions

### Screen 1: route selection (`src/app/index.tsx`)

- Location is optional and must never block the flow. The player can always pick a city from the dropdown instead.
- "Odnajdź najbliższą tajemnicę" stays visible. `expo-location` is not installed, so in this version the button is inactive (see open questions).
- The route list shows routes for the selected city. Default city: Kraków, so the playable route (Tajemnica Zegarmistrza) is visible on first launch.
- "Szczegóły" goes to `/access?gameId=…`.
- Routes without steps (Widmo Ekspresu, Archiwum Alchemika) look like any other route on the list.

### Screen 2: access code (`src/app/access.tsx`)

- The code is compared case-insensitively, ignoring surrounding whitespace (same rule as `isCorrectAnswer`).
- Wrong code: inline error under the field, "Nieprawidłowy kod, spróbuj ponownie". No attempt limit, no lockout.
- Correct code: go to `/puzzle?gameId=…`.
- "Wejdź do gry" in the "Nie znasz hasła?" section goes back to the route list.
- Unknown or missing `gameId`: short message and a way back to the route list.

### Screen 3: puzzle (`src/app/puzzle.tsx`)

- Wrong answer: inline error under the field. No attempt limit.
- No hint system. The only help is the "Szyfr wejściowy" box from the design.
- Correct answer: move to the next step and update the progress bar.
- The progress label uses the real step count from `games.ts`. The design's "1 z 8 punktów (pozostało 9)" is sample copy and inconsistent.
- The map shows only the approximate target of the current step ("Przybliżona lokalizacja celu"). It does not show or check the player's position.
- After the last correct answer (HEJNAŁ): completion state on the same screen with the progress bar at 100%, a short message such as "Zagadka rozwiązana!" and a "Wróć do tras" button.
- Route with no steps: show "Ta trasa będzie dostępna wkrótce" and a button back to the route list.
- Progress lives in memory only. After the app restarts, the player enters the code again and starts from the first step.

## Open questions

- Optional location: when should `expo-location` be added, and should "Odnajdź najbliższą tajemnicę" pick the nearest city or sort routes by distance?
- City filter vs design: the design shows all three routes with Warszawa selected. Should "Najpopularniejsze trasy" ignore the city filter?
- Progress persistence: should a later version resume an unfinished route after the app restarts?
- Hints: is a hint system (with or without a penalty) planned for a later version?
- Content for Widmo Ekspresu and Archiwum Alchemika: who writes the steps, and when?
