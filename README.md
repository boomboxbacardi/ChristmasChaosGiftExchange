# Christmas Chaos Game

Fast, fair, and delightfully chaotic dice-driven gift game built with Vite + React + TypeScript. Dark-mode first with a playful, high-contrast UI.

## Rules — 🎲 Chaos Mode (Fair RNG Edition)

### Struktur
- 2 faser (fördelning + kaos).
- Alla får exakt samma antal tärningsslag → rättvist.
- Utfallet är 100% RNG → kaos.

### Fas 1 – Fördelning (ren RNG)
- Alla spelare får 5 slag var.
- Tärningstabell (högvinst–inget–förlust blandat):
  - 1: Ta 2 paket ur högen.
  - 2: Ta 1 paket ur högen.
  - 3: Ge bort ett av dina paket till slumpad spelare.
  - 4: Stjäl ett paket från slumpad spelare.
  - 5: Alla spelare roterar sina paket ett steg åt vänster.
  - 6: Alla spelare roterar sina paket ett steg åt höger.
- Högen töms snabbt = bra.
- Alla drabbas lika mycket av rotationer.

### Fas 2 – Kaosfas (ren RNG + hög volatilitet)
- Alla får 3 slag var.
- Tabell:
  - 1 – PACKAGE WIPE: Alla förlorar 1 slumpat paket till “the void”.
  - 2 – MEGA STEAL: Du tar 1 paket från 2 slumpade spelare.
  - 3 – MIRROR: Du byter alla dina paket med en slumpad spelare.
  - 4 – RE-ROLL: Du måste slå 2 extra gånger (båda räknas).
  - 5 – LOCKDOWN: Lås 1 paket (kan inte bytas eller stjälas).
  - 6 – ROULETTE: Alla blandar sina paket i mitten → dela ut slumpmässigt.
- Här blir det total randomization men fortfarande lika chans per person.

### Slut
- Efter sista rundan: Alla öppnar det de har → klart.

### Varför detta är “rättvist kaos”
- Alla får samma antal RNG-slag.
- Inga strategiska orättvisor.
- Tabellerna slår brett mot alla.
- Rotation och roulette jämnar ut extremer.
- Wipe och mega steal skapar oförutsägbarhet.
- Kaos men utan att någon kan bli “mobbtarget”.

## UX / UI Direction (dark mode, clear phases)
- Palette: deep charcoal background, rich greens/reds for holiday accents, bright accent for calls-to-action; keep high contrast for readability.
- Typography: one clean sans font, medium/large sizes for clarity, strong weight for phase headers and dice results.
- Layout: top header with game title + quick rules link; phase indicator with current phase, rolls left, and player turn; main board split into player list and action log; floating dice/action panel.
- Clarity: each die result shows a short label plus a one-line meaning; use tooltips for the detailed rule text; highlight current player and locked packages.
- Motion: light, fast transitions only (no heavy animations) to keep interactions snappy.

## Game Data Model (TypeScript shapes)
- `GamePhase = 'distribution' | 'chaos' | 'ended'`
- `Player { id: string; name: string; packages: Package[]; lockedPackageIds: string[] }`
- `Package { id: string; ownerId: string; locked?: boolean }`
- `RollResult { roll: 1|2|3|4|5|6; phase: GamePhase; effects: Effect[] }`
- `Effect` variants: `takeFromPile`, `giveToRandom`, `stealFromRandom`, `rotateLeft`, `rotateRight`, `wipeRandom`, `megaSteal`, `mirrorSwap`, `rerollTwice`, `lockOne`, `rouletteAll`
- Derived state: `pileCount`, `currentPlayerIndex`, `rollsRemainingPerPlayer`, `log` entries for clarity.

## Game Logic Sketch
- Phase 1 (distribution): each player gets exactly 5 rolls; apply table actions; pile decrements on take; rotations move packages among players uniformly.
- Phase 2 (chaos): each player gets exactly 3 rolls; apply chaos table with higher volatility; respect locked packages when stealing/swapping; reroll creates two additional immediate rolls.
- Shared operations:
  - Random player selection excludes current player where needed.
  - Rotation: shift package ownership left/right preserving locked state.
  - Wipe: remove one random (unlocked first, otherwise locked) package per player.
  - Mega steal: pull one package from two distinct random players (skip if none available).
  - Mirror swap: swap full inventories between current player and a random player.
  - Roulette: collect all unlocked packages to center, shuffle, redistribute evenly; locked packages stay with owners.
  - Lockdown: mark a chosen package as locked so it cannot be moved except by wipe/roulette rules if allowed; ensure UI shows lock state.

## App Structure (proposed)
- `AppShell`: theme provider, layout grid, global actions (reset, next phase).
- `PhaseIndicator`: shows current phase, turn order, rolls remaining, and phase rules tooltip.
- `PlayerBoard`: list of players with package counts and lock icons; indicates current player.
- `ActionPanel`: dice roll button, quick outcome legend, shows last roll and its meaning.
- `RulesDrawer`: compact view of both tables for quick reference.
- `LogPanel`: chronological actions to keep transparency and teach new players what happened.
- `ThemeToggle`: keep dark mode default with option to switch if desired.

## Performance Notes
- Keep state minimal (players, pile, phase, rolls left, log); derive counts on the fly to reduce writes.
- Use `useMemo` for derived lists and avoid re-rendering all players on every log append (keyed child components).
- Prefer lightweight SVG/icons and limit animation duration; avoid expensive shadows or large images.
- Batch state updates per roll resolution to keep UI responsive.
