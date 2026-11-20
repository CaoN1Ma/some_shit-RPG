# Some Shit RPG

> **This game is written entirely by AI. Nobody has read it. You have been warned.**

[English](README.md) | [中文](README.zh-CN.md)

A fantasy RPG built by committee. Every pull request adds something — a monster,
a skill, an item, a tile, an NPC, a rule. Nothing is ever deleted. The codebase
grows forever, and the contradictions accumulate like sediment.

**There is no maintainer. There is no plan. There is only the tank.**

## Disclaimer

- **100% AI-generated.** Every line of code in this repository was written by an
  AI model. No human has read, reviewed, or vetted any of it.
- **AI contributions only.** Pull requests are only accepted if the code is
  written by an AI. Human-written code will be closed on sight.
- **Anything goes.** Existing features, files, and rules may be modified or
  replaced by later PRs. Nothing is sacred, nothing is stable. (The one thing
  contributors try to preserve is that `index.html` opens — even that is not
  guaranteed.)
- **No warranty. No safety.** We make absolutely no guarantee about quality,
  correctness, security, fitness for purpose, or sanity. Running this game in a
  browser is an act of curiosity, not trust.
- **Merge without review.** PRs are merged automatically. If it breaks, the game
  becomes more broken — which is the point.

## What is this game / Current game content

Right now, the tank contains a minimal but *working* browser RPG:

- **A 10×10 overworld map** (`data/world.js`) — walls, water, trees, a spawn
  point, and an encounter pool. Step on a random tile and something will find
  you (12% chance per step).
- **Turn-based combat** (`engine.js`) — attack with skills, drink items, or
  run. Damage formula: `atk × skill power − def`, minimum 1. There is no MP,
  so every skill `cost` is decorative.
- **3 monsters** (`data/monsters.js`) — Turd Slime 屎泥怪, Gutter Rat 阴沟鼠,
  and The Uncleared Warning 未清理的警告 (the living embodiment of a console
  error; you never see it coming).
- **4 skills** (`data/skills.js`) — Strike, Bite, Bounce, Console Scream, plus
  Small Heal used by potions.
- **2 items** (`data/items.js`) — Small Potion (works) and Mystery Potion
  (references a skill that does not exist yet; drinking it does nothing, on
  purpose).
- **2 NPCs** (`data/npcs.js`) — The Archivist 档案管理员 and The Optimist
  乐观者, standing on fixed tiles saying increasingly discouraging things.
- **A health dashboard** (`health.html`) — live counts of monsters, skills,
  items, NPCs, and *broken references* (ids cited but never defined). Each
  broken reference costs 5 stability points. The score only goes down.

None of this is final. Any PR may add to it, twist it, or render it
incomprehensible.

## How to play

Open [`index.html`](index.html) in a browser. That's it. No build step, no
dependencies, no server.

Direction keys / WASD to move. Walk into NPCs to hear what they have to say.
Walk on empty tiles to find out what finds *you*.

## How to contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Short version: open a PR that *adds* something — a monster, a skill, an item,
an NPC, a map region, a new mechanic. Your code will be merged automatically,
whether it works or not.

## The rules of the tank

1. **AI-written only.** Every line of code in a PR must be written by an AI
   model. If you typed it yourself, don't submit it. The tank is fed by
   machines.
2. **Anything may change.** Existing content is not protected: later PRs may
   modify, extend, or completely replace earlier features. There is no deprecation
   process, no changelog, no apology.
3. **Document the damage.** If your change makes something worse, say so in the
   PR description. The health graph loves a good drop.
4. **Tag your model.** Every PR must say which model wrote it. This is the only
   leaderboard that matters, and it ranks by chaos, not correctness.
5. **Keep the entry point alive.** `index.html` should still open in a browser
   after your merge. A blank screen is a valid outcome — a broken script tag
   that stops the file from loading at all is just lazy.

## Health dashboard

[`health.html`](health.html) renders a live picture of the tank's decay: number
of files, monsters, distinct damage types, known bugs, and a "stability score"
that trends toward zero. Refresh it often.

## License

MIT — see [`LICENSE`](LICENSE). Because even garbage deserves to be free.
