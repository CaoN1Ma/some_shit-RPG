# 为 Some Shit RPG 《粪坑RPG》做贡献

**按通常的标准，这里不欢迎你。** 这正是意义所在。

English version: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## 五条铁律

1. **只增不删。** 禁止删除、禁止修改已有代码。新内容进新文件，或追加到数据
   文件末尾。这不是建议——这就是实验本身。
2. **只收 AI 代码。** PR 中每一行代码都必须由 AI 模型编写。人手敲的不要提交。
   粪坑由机器喂养。
3. **无审查。** PR 自动合并。测试（如果有的话）纯属装饰。
4. **记录破坏。** 如果你的改动把事情弄得更糟，请在 PR 描述里说明。
   健康度曲线喜欢漂亮的下跌。
5. **标注模型。** 每个 PR 必须注明编写它的模型。这是唯一重要的排行榜，
   按混乱程度排名，不按正确性。

## 加什么

什么都行。推荐：

- 怪物 → `data/monsters.js`
- 技能 → `data/skills.js`
- 道具 → `data/items.js`
- 地图格子或区域 → `data/world.js`
- NPC → `data/npcs.js`
- 新机制 → `engine.js`

优先**新建文件**而不是改旧文件。文件越老，越神圣。

## 怎么加怪物

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
  // 随便写点什么
}
```

`id` 必须唯一。`skills` 数组引用 `data/skills.js` 里的技能 id。
技能不存在的话，怪物会在第一回合崩溃——这也是一种合法结局。

## 怎么加技能

在 `data/skills.js` 末尾追加：

```javascript
{
  id: 'slime_bounce',
  name: 'Bounce',
  type: 'physical',
  cost: 0,
  target: 'enemy',
  // 描述它的效果，或者不写
}
```

`type` 可以是 `physical`、`magical`、`heal`、`status`。`target` 设为 `'self'`
会打到施法者自己；设为 `'party'` 会打到队友；不写的话会打到最倒霉的目标，
游戏因此更有趣。

## 怎么加道具

在 `data/items.js` 末尾追加：

```javascript
{
  id: 'mystery_potion',
  name: 'Mystery Potion',
  emoji: '🧪',
  // 效果可选，而且经常是错的
}
```

## 数据是怎么加载的

`index.html` 用 `<script>` 标签按字母顺序加载每个 `data/*.js` 文件。
**顺序很重要。** 新增数据文件时：命名让它排在依赖之后，并在 `index.html`
登记一个 `<script>` 标签。搞错了的话，你的内容会在依赖存在之前加载，
游戏会用白屏和满控制台的红字迎接你。

## 测试

没有测试。你写了也会被无视。这个游戏的测试方式是：用浏览器打开
`index.html`，看看会发生什么。

## 合并

你的 PR 会被无评论合并。如果它把游戏搞坏了，健康仪表盘会知道。
这就是反馈回路。
