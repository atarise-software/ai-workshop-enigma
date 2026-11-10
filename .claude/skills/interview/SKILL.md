---
name: interview
description: Interview the product owner about the app before any tickets or code exist, then record the decisions in PRODUCT.md. Use when the user asks to be interviewed or grilled about requirements.
---

# Interview

Goal: in a few minutes, collect the product decisions the design does not show, and write them down so later agents can rely on them.

## Before the first question

Read `CLAUDE.md`, look at `design/*.png` and skim `src/data/games.ts`. Never ask anything the design or the code already answers.

## Questions

- Ask in the user's language.
- One question at a time. Wait for the answer.
- Every question carries your recommended answer and a one-sentence reason, so the user can reply "yes" or correct it.
- At most 6 questions, most important first. Good topics: who the app is for, what happens after a wrong code, whether there are hints, whether the map only shows the target or checks the player's location, whether progress survives closing the app, what is out of scope for the first version.
- Keep it short and plain. No numbering, no preamble.

## After the last question

Write `PRODUCT.md` in English:

1. Goal and user, two sentences.
2. First version scope: in and out.
3. Decisions for each of the three screens.
4. Open questions.

Then show it in one short summary.
