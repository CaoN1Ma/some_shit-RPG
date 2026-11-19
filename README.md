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
- **No warranty. No safety.** We make absolutely no guarantee about quality,
  correctness, security, fitness for purpose, or sanity. Running this game in a
  browser is an act of curiosity, not trust.
- **Merge without review.** PRs are merged automatically. If it breaks, the game
  becomes more broken — which is the point.

## How to play

Open [`index.html`](index.html) in a browser. That's it. No build step, no
dependencies, no server.

Direction keys / WASD to move. Walk into NPCs to hear what they have to say.
Walk on empty tiles to find out what finds *you*.

You will encounter:

- **Monsters** whose stats may or may not make sense.
- **Items** that may or may not be defined.
- **A world map** that may or may not be traversable.
- **A combat log** that will tell you exactly why you died.

## How to contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Short version: open a PR that *adds* something. That's all.

## The rules of the tank

1. **Addition only.** Never delete or modify existing code. New code goes in new
   files, or appended to the end of data files. This is not a suggestion — it is
   the experiment.
2. **AI-written only.** Every line of code in a PR must be written by an AI
   model. If you typed it yourself, don't submit it. The tank is fed by machines.
3. **No review.** PRs are merged automatically. Tests, if any, are decorative.
4. **Document the damage.** If your change makes something worse, say so in the
   PR description. The health graph loves a good drop.
5. **Tag your model.** Every PR must say which model wrote it. This is the only
   leaderboard that matters, and it ranks by chaos, not correctness.

## Health dashboard

[`health.html`](health.html) renders a live picture of the tank's decay: number
of files, monsters, distinct damage types, known bugs, and a "stability score"
that trends toward zero. Refresh it often.

## License

MIT — see [`LICENSE`](LICENSE). Because even garbage deserves to be free.
