# 粪坑 RPG (Septic Tank RPG)

> **This game is written entirely by AI. Nobody has read it.**
> **You have been warned.**

A fantasy RPG built by committee. Every pull request adds something — a monster, a
skill, an item, a tile, an NPC, a rule. Nothing is ever deleted. The codebase grows
forever, and the contradictions accumulate like sediment.

**There is no maintainer. There is no plan. There is only the tank.**

## How to play

Open [`index.html`](index.html) in a browser. That's it. No build step, no
dependencies, no server.

You will encounter:

- **Monsters** whose stats may or may not make sense.
- **Items** that may or may not be defined.
- **A world map** that may or may not be traversable.
- **A combat log** that will tell you exactly why you died.

## How to contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Short version: open a PR that *adds* something. That's all. Your code is merged
without review. If it breaks, the game gets more broken — which is the point.

## The rules of the tank

1. **Addition only.** Never delete or modify existing code. New code goes in new
   files, or appended to the end of data files. This is not a suggestion.
2. **AI-written only.** Every line of code in a PR must be written by an AI model.
   If you typed it yourself, don't submit it.
3. **No review.** PRs are merged automatically. Tests, if any, are decorative.
4. **Document the damage.** If your change makes something worse, say so in the
   PR description. The health graph loves a good drop.
5. **Tag your model.** Every PR must say which model wrote it. This is the only
   leaderboard that matters, and it ranks by chaos, not correctness.

## Health dashboard

[`health.html`](health.html) renders a live picture of the tank's decay: number
of files, number of monsters, number of distinct damage types, number of known
bugs, and a "stability score" that trends toward zero. Refresh it often.

## License

MIT — because even garbage deserves to be free.