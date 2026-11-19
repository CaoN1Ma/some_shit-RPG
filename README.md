# Some Shit RPG 《粪坑RPG》

> **This game is written entirely by AI. Nobody has read it. You have been warned.**
>
> **本游戏完全由 AI 编写。没有任何人读过这些代码。后果自负。**

[English](README.md) | [中文](README.zh-CN.md)

A fantasy RPG built by committee. Every pull request adds something — a monster,
a skill, an item, a tile, an NPC, a rule. Nothing is ever deleted. The codebase
grows forever, and the contradictions accumulate like sediment.

一个由"委员会"构建的幻想 RPG。每个 PR 往世界里加一样东西——怪物、技能、道具、
地图、NPC、规则。没有任何东西会被删除。代码库永远生长，矛盾像沉积物一样堆积。

**There is no maintainer. There is no plan. There is only the tank.**
**没有维护者。没有计划。只有粪坑。**

## Disclaimer 免责声明

- **100% AI-generated.** Every line of code in this repository was written by an
  AI model. No human has read, reviewed, or vetted any of it.
  本仓库每一行代码都由 AI 模型编写。没有任何人类读过、审过或验证过其中任何部分。
- **AI contributions only.** Pull requests are only accepted if the code is
  written by an AI. Human-written code will be closed on sight.
  只接受 AI 生成的代码提交。人类手写的代码一律拒收。
- **No warranty. No safety.** We make absolutely no guarantee about quality,
  correctness, security, fitness for purpose, or sanity. Running this game in a
  browser is an act of curiosity, not trust.
  不保证质量、正确性、安全性、可用性或理智。在浏览器里打开它，是出于好奇，而非信任。
- **Merge without review.** PRs are merged automatically. If it breaks, the game
  becomes more broken — which is the point.
  无审查直接合并。坏了就让它更坏——这正是目的。

## How to play / 如何游玩

Open [`index.html`](index.html) in a browser. That's it. No build step, no
dependencies, no server.

用浏览器打开 [`index.html`](index.html)。就这样。无需构建、无依赖、无服务器。

Direction keys / WASD to move. Walk into NPCs to hear what they have to say.
Walk on empty tiles to find out what finds *you*.

方向键 / WASD 移动。踩到 NPC 会听它说话。踩到空地，会知道是什么东西找到了*你*。

You will encounter / 你会遇到:

- **Monsters** whose stats may or may not make sense. 数值可能合理也可能不合理的怪物。
- **Items** that may or may not be defined. 可能存在也可能未被定义的道具。
- **A world map** that may or may not be traversable. 可能走得通也可能走不通的地图。
- **A combat log** that will tell you exactly why you died. 会确切告诉你死因的战斗日志。

## How to contribute / 如何贡献

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Short version: open a PR that *adds* something. That's all.

简短版：提交一个"往世界里加了东西"的 PR。仅此而已。

## The rules of the tank / 粪坑铁律

1. **Addition only. 只增不删。** Never delete or modify existing code. New code
   goes in new files, or appended to the end of data files.
   禁止删除或修改已有代码。新代码进新文件，或追加到数据文件末尾。
2. **AI-written only. 只收 AI 代码。** Every line of code in a PR must be written
   by an AI model. If you typed it yourself, don't submit it.
   PR 中每一行代码都必须由 AI 模型编写。人手敲的不要提交。
3. **No review. 无审查。** PRs are merged automatically. Tests, if any, are
   decorative. PR 自动合并。测试（如果有的话）纯属装饰。
4. **Document the damage. 记录破坏。** If your change makes something worse, say
   so in the PR description. The health graph loves a good drop.
   如果你的改动把事情弄得更糟，请在 PR 描述里说明。健康度曲线喜欢漂亮的下跌。
5. **Tag your model. 标注模型。** Every PR must say which model wrote it. This is
   the only leaderboard that matters, and it ranks by chaos, not correctness.
   每个 PR 必须注明编写它的模型。这是唯一重要的排行榜，按混乱程度排名，不按正确性。

## Health dashboard / 健康仪表盘

[`health.html`](health.html) renders a live picture of the tank's decay: number
of files, monsters, distinct damage types, known bugs, and a "stability score"
that trends toward zero. Refresh it often.

[`health.html`](health.html) 实时展示粪坑的腐化程度：文件数、怪物数、伤害类型数、
已知 bug 数，以及一个趋向零的"稳定分"。多刷新，常回来看看。

## License / 许可

MIT — see [`LICENSE`](LICENSE). Because even garbage deserves to be free.

MIT — 见 [`LICENSE`](LICENSE)。因为垃圾也值得自由。
