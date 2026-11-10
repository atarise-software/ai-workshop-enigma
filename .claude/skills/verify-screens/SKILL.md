---
name: verify-screens
description: Walk the ENIGMA flow in the iOS simulator, compare every screen with the Figma design and fix the differences. Use after screen tickets are implemented, or when the user asks to test, verify or check the UI.
---

# Verify screens

A verification loop. Three rounds at most.

## 1. Run

- If Metro is not running on port 8081, start `npx expo start` in the background.
- Open the app in Expo Go on the iOS simulator with agent-device (`exp://127.0.0.1:8081`).

## 2. Walk the flow

1. Route selection: the "Tajemnica Zegarmistrza" card → Szczegóły.
2. Access: enter a wrong code and expect an error message. Then `QUEST` and Aktywuj.
3. Puzzle: enter a wrong answer and expect an error. Then `ZEGAR`; expect the second step and updated progress.

## 3. Compare

On every screen take a screenshot and put it next to `design/0X-*.png`. Check section order, copy, colors, typography, spacing. Ignore the footer, the bottom tab bar and route photos.

List the differences in a table: screen, difference, severity (high, medium, low).

## 4. Fix

Fix high and medium differences, run `npx tsc --noEmit`, go back to step 1.

## Report

Short, in the user's language: what was checked, what was fixed, what is left. Include paths to the final screenshots.
