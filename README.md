# ENIGMA

Workshop project from the AI workflows session at The Shire, Kraków (10 November 2026). ENIGMA is a mobile app for city detective games: the player picks a route, unlocks it with a code and solves puzzles on location. This repo contains the core game loop across three screens, built live with Claude Code from the Figma design.

## What you need installed

1. **Node.js 22 LTS or newer.** Download from [nodejs.org](https://nodejs.org). This also installs `npm`. Check with `node -v`.
2. **Git.** On macOS run `xcode-select --install`; on Windows install [Git for Windows](https://git-scm.com/download/win).
3. **Expo Go on your phone.** [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent). This is how you run the app without building it.
4. **Claude Code**, if you want to keep building with an agent. It needs a Claude Pro or Max plan. Install instructions: [docs.claude.com/en/docs/claude-code](https://docs.claude.com/en/docs/claude-code/overview).

Optional: Xcode with the iOS Simulator (macOS only) or Android Studio with an emulator, if you prefer running the app on your computer instead of your phone.

## Run the app

```sh
git clone https://github.com/atarise-software/ai-workshop-enigma.git
cd ai-workshop-enigma
npm install
npx expo start
```

A QR code appears in the terminal. Scan it with the Camera app on iPhone or from inside Expo Go on Android, and ENIGMA opens on your phone. Every change you save shows up on the phone within a second.

Your phone and computer must be on the same Wi-Fi. If the phone cannot connect (common on office and hotel networks), run `npx expo start --tunnel` instead.

In the same terminal you can press `i` to open the iOS Simulator, `a` for the Android emulator, or `w` for the browser.

## Try it

- Pick **Tajemnica Zegarmistrza** on the first screen.
- Unlock it with the code `QUEST`.
- Puzzle answers, in order: `ZEGAR`, `SUKIENNICE`, `HEJNAŁ`.

All data is sample data in `src/data/games.ts`. The puzzles take place around Rynek Główny in Kraków.

## Build with Claude Code

Open a terminal in the project folder and run `claude`. Write to it in Polish or English, whichever you prefer. The agent reads `CLAUDE.md` first, which describes the project, the rules and what "done" means.

Two project skills come with the repo:

- `/interview` asks you about the product one question at a time, each with a recommended answer, and writes the decisions to `PRODUCT.md`. Use it before starting anything new.
- `/verify-screens` walks the app in the iOS Simulator, compares each screen with the design and fixes the differences. It needs the [agent-device](https://github.com/callstackincubator/agent-device) MCP server.

The habits from the workshop, in short: keep context in files instead of in the chat, let the agent ask before it builds, describe the problem instead of dictating the solution, make the agent prove that it works, and keep each task small with a fresh session.

## Project structure

| Path | What it is |
|---|---|
| `src/app/index.tsx` | Screen 1: route selection |
| `src/app/access.tsx` | Screen 2: unlock with an access code |
| `src/app/puzzle.tsx` | Screen 3: puzzle with map and progress |
| `src/theme.ts` | Colors, fonts and spacing taken from Figma |
| `src/data/games.ts` | Routes, puzzles and codes |
| `design/` | Screenshots of the Figma frames and the file structure |
| `CLAUDE.md` | Instructions for the agent |
| `.claude/skills/` | The `/interview` and `/verify-screens` skills |

## Before you put real data in

Never give the agent real customer data, personal data, passwords or API keys. Use test data only, keep secrets out of the repository, and do not connect the agent to anything in production.
