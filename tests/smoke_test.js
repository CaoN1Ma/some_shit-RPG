// ============================================================
// tests/smoke_test.js — 冒烟测试（唯一存在的一丝理智）
//
// 本项目规则是"代码不检查，直接合并"，测试是装饰性的。
// 但初始框架必须自己先能跑起来——粪坑的地基不能是空的。
// 项目名：Some Shit RPG 《粪坑RPG》
//
// 用无头 DOM 桩模拟浏览器环境，在 Node 里驱动 engine.js
// 的核心流程：新游戏 → 移动 → 遭遇战 → 攻击 → 胜利/死亡。
//
// 运行：node tests/smoke_test.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// ---------- 最小 DOM 桩 ----------
// 只实现 engine.js 用到的部分：getElementById、createElement、
// classList、addEventListener、style。元素是自 forget 的假对象。

function makeClassList() {
  const set = new Set();
  return {
    add: (c) => set.add(c),
    remove: (c) => set.delete(c),
    toggle: (c, force) => {
      if (force === undefined) { set.has(c) ? set.delete(c) : set.add(c); }
      else if (force) { set.add(c); } else { set.delete(c); }
    },
    contains: (c) => set.has(c),
  };
}

function makeEl(id) {
  return {
    id,
    textContent: '',
    innerHTML: '',
    children: [],
    disabled: false,
    style: {},
    classList: makeClassList(),
    scrollTop: 0,
    scrollHeight: 0,
    appendChild(child) { this.children.push(child); this.scrollHeight += 10; },
    addEventListener() {},
    onclick: null,
  };
}

const elements = {};
const sandbox = {
  console,
  Math,
  JSON,
  document: {
    getElementById: (id) => (elements[id] ||= makeEl(id)),
    createElement: () => makeEl(''),
    addEventListener() {},
  },
  window: {},
  setTimeout,
};

// ---------- 加载数据与引擎（顺序与 index.html 一致） ----------
const ctx = vm.createContext(sandbox);
for (const f of ['data/items.js', 'data/monsters.js', 'data/npcs.js', 'data/skills.js', 'data/world.js', 'engine.js']) {
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
  vm.runInContext(code, ctx, { filename: f });
}

// ---------- 测试 ----------
let passed = 0;
let failed = 0;
function check(name, cond) {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.error(`  ✗ ${name}`); }
}

console.log('== 冒烟测试 ==');

// 数据完整性：初始世界必须自洽。
const w = sandbox.window;
check('世界地图 10 行', Array.isArray(w.WORLD.tiles) && w.WORLD.tiles.length === 10);
check('每行长度 = W', w.WORLD.tiles.every((r) => r.length === w.WORLD.W));
check('怪物注册表非空', w.MONSTERS.length > 0);
check('技能注册表非空', w.SKILLS.length > 0);

// 引擎状态：新游戏已自动启动。
const G = vm.runInContext('G', ctx);
check('新游戏已启动（玩家存在）', !!G.player);
check('玩家 HP 为满', G.player.hp === G.player.maxHp);
check('出生点来自 world.js', Array.isArray(G.pos) && G.pos.join() === w.WORLD.spawn.join());

// 随机性消除：移动断言只关心"走没走到"，不该被 12% 的随机遭遇
// 搅局（否则整个测试每 8 次就随机挂一次，刚才真的挂过）。
// 做法是临时清空遭遇池，测完立刻还原——测试不许改变世界。
const savedEncounters = w.WORLD.encounters;
w.WORLD.encounters = [];

// 移动：出生点 (1,1) 下方 (1,2) 是 '.'，可走。
vm.runInContext('move(0, 1)', ctx);
check('向下走一步生效', G.pos.join() === '1,2');
check('步数计数 +1', G.stepCount === 1);

// 从 (1,2) 向右走到 (2,2)——那是档案管理员的格子，不会遇敌。
vm.runInContext('move(1, 0)', ctx);
check('踩 NPC 格子仍可移动', G.pos.join() === '2,2' && G.mode === 'overworld');

// 还原遭遇池：之后的测试照常使用 world.js 的原始随机遭遇数据。
w.WORLD.encounters = savedEncounters;

// 强制开一场战斗并打死它。
vm.runInContext('startCombat("turd_slime")', ctx);
check('遭遇战开始', G.mode === 'combat' && G.enemy && G.enemy.id === 'turd_slime');
check('敌人 HP 快照初始化', typeof G.enemy.hpNow === 'number');

// 反复攻击直到胜利（史莱姆 40 HP，每次至少 1 伤，最多几十回合）。
let guard = 0;
while (G.mode === 'combat' && guard < 200) {
  vm.runInContext('playerUseSkill("hero_strike")', ctx);
  guard++;
}
check(`战斗结束（${guard} 回合内）`, guard < 200);
check('战斗后回到世界模式（胜利或阵亡）', G.mode === 'overworld' || G.mode === 'gameover');

// 断链引用：引用不存在的怪物不应崩溃。
vm.runInContext('startCombat("ghost_that_never_was")', ctx);
check('引用不存在的怪物不崩溃', G.mode !== undefined);

// 结果汇总。
console.log(`\n结果: ${passed} 通过, ${failed} 失败`);
process.exit(failed > 0 ? 1 : 0);
