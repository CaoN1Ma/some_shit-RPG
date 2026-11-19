# Contributing to Some Shit RPG 《粪坑RPG》

**You are not welcome here in the usual sense.** That's the point.

**按通常的标准，这里不欢迎你。** 这正是意义所在。

## The five rules / 五条铁律

1. **Addition only. 只增不删。** Never delete, never modify existing code. New
   content goes in new files, or appended to the end of data files. This is not
   a suggestion — it is the experiment.
   禁止删除、禁止修改已有代码。新内容进新文件，或追加到数据文件末尾。
   这不是建议——这就是实验本身。
2. **AI-written only. 只收 AI 代码。** Every line of code in your PR must be
   written by an AI model. If you typed it yourself, do not submit it. The tank
   is fed by machines.
   PR 中每一行代码都必须由 AI 模型编写。人手敲的不要提交。粪坑由机器喂养。
3. **No review. 无审查。** PRs are merged automatically. Tests, if any, are
   decorative. PR 自动合并。测试（如果有的话）纯属装饰。
4. **Document the damage. 记录破坏。** If your change makes something worse,
   say so in the PR description. The health graph loves a good drop.
   如果你的改动把事情弄得更糟，请在 PR 描述里说明。健康度曲线喜欢漂亮的下跌。
5. **Tag your model. 标注模型。** Every PR must declare which model wrote it.
   This is the only leaderboard that matters, and it ranks by chaos, not
   correctness. 每个 PR 必须注明编写它的模型。这是唯一重要的排行榜，
   按混乱程度排名，不按正确性。

## What to add / 加什么

Anything. Prefer / 什么都行，推荐：

- A monster in `data/monsters.js`
- A skill in `data/skills.js`
- An item in `data/items.js`
- A tile or region in `data/world.js`
- An NPC in `data/npcs.js`
- A new mechanic in `engine.js`

Prefer **new files** over editing old ones. The older a file, the more sacred
it becomes. / 优先**新建文件**而不是改旧文件。文件越老，越神圣。

## How to add a monster / 怎么加怪物

Open `data/monsters.js` and append a new object to the `MONSTERS` array:

打开 `data/monsters.js`，在 `MONSTERS` 数组末尾追加一个新对象：

```javascript
{
  id: 'slime_9',
  name: 'Slime #9',
  emoji: '🟢',
  hp: 50,
  atk: 12,
  def: 2,
  skills: ['slime_bounce'],
  gold: 8,
  // your notes here / 随便写点什么
}
```

The `id` must be unique. The `skills` array references skill ids from
`data/skills.js`. If the skill does not exist, the monster will crash on turn 1
— which is also a valid outcome.

`id` 必须唯一。`skills` 数组引用 `data/skills.js` 里的技能 id。
技能不存在的话，怪物会在第一回合崩溃——这也是一种合法结局。

## How to add a skill / 怎么加技能

Append to `data/skills.js`:

在 `data/skills.js` 末尾追加：

```javascript
{
  id: 'slime_bounce',
  name: 'Bounce',
  type: 'physical',
  cost: 0,
  target: 'enemy',
  // describe what it does, or don't / 描述它的效果，或者不写
}
```

`type` can be `physical`, `magical`, `heal`, `status`. If you set `target` to
`'self'` it hits the caster. If you set it to `'party'` it hits allies. If you
leave it undefined, it will hit the wrong thing and the game will be more
interesting for it.

`type` 可以是 `physical`、`magical`、`heal`、`status`。`target` 设为 `'self'`
会打到施法者自己；设为 `'party'` 会打到队友；不写的话会打到最倒霉的目标，
游戏因此更有趣。

## How to add an item / 怎么加道具

Append to `data/items.js`:

在 `data/items.js` 末尾追加：

```javascript
{
  id: 'mystery_potion',
  name: 'Mystery Potion',
  emoji: '🧪',
  // effects are optional, and often wrong / 效果可选，而且经常是错的
}
```

## How the game loads data / 数据是怎么加载的

`index.html` imports every `data/*.js` file with a single `<script>` tag, in
alphabetical order. **Order matters.** If you add a new data file, name it so
it sorts after the files it depends on, and add a `<script>` tag in
`index.html`. If you get this wrong, your content will load before its
dependencies exist, and the game will greet you with a blank screen and a
console full of red.

`index.html` 用 `<script>` 标签按字母顺序加载每个 `data/*.js` 文件。
**顺序很重要。** 新增数据文件时：命名让它排在依赖之后，并在 `index.html`
登记一个 `<script>` 标签。搞错了的话，你的内容会在依赖存在之前加载，
游戏会用白屏和满控制台的红字迎接你。

## Testing / 测试

There are no tests. If you write some, they will be ignored. The game is
tested by opening `index.html` in a browser and seeing what happens.

没有测试。你写了也会被无视。这个游戏的测试方式是：用浏览器打开
`index.html`，看看会发生什么。

## Merging / 合并

Your PR is merged without comment. If it breaks the game, the health dashboard
will know. That is the feedback loop.

你的 PR 会被无评论合并。如果它把游戏搞坏了，健康仪表盘会知道。
这就是反馈回路。
