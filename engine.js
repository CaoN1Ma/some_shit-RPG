// ============================================================
// engine.js — Some Shit RPG 《粪坑RPG》唯一的"引擎"文件
//
// 设计原则（写给后来的 AI）：
// 1. 本文件是初始框架的一部分。你可以新增文件、新增全局函数，
//    但如果非要改这里，请追加函数而不是修改已有函数。
// 2. 所有数据都在 window.* 全局变量里（data/*.js 注入），
//    engine 只负责读取和渲染。缺数据就跳过，别让页面白屏。
// 3. 任何 catch 到的错误都写进战斗日志，而不是吞掉。
//    报错是游戏内容的一部分。
// 4. 本文件刻意不使用任何构建工具、模块系统、测试框架。
//    这是实验设定，不是技术债。（好吧，也是技术债。）
// ============================================================

/* global MONSTERS, SKILLS, ITEMS, NPCS, WORLD */

// ---------- 全局游戏状态 ----------
// 一个对象装下整个世界的真相。没有存档、没有回滚。
const G = {
  player: null,        // { hp, maxHp, gold, items: [], skills: [] }
  pos: [0, 0],         // 玩家在地图上的格子坐标 [x, y]
  enemy: null,         // 当前战斗的敌人（monsters.js 的引用副本）
  mode: 'overworld',   // overworld | combat | gameover
  stepCount: 0,        // 走的步数，用于触发遭遇战
};

// ---------- 小工具 ----------

// 向战斗/世界日志追加一行。target 传 'combat' 或 'world'。
function log(text, target = 'combat') {
  const el = document.getElementById(target === 'combat' ? 'combat-log' : 'world-log');
  if (!el) return;
  const line = document.createElement('div');
  line.textContent = text;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

// 从数组里按 weight 加权随机抽一个元素。数据坏了返回 undefined。
function weightedPick(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  const total = arr.reduce((s, e) => s + (Number(e.weight) || 0), 0);
  if (total <= 0) return arr[0];
  let roll = Math.random() * total;
  for (const e of arr) {
    roll -= (Number(e.weight) || 0);
    if (roll <= 0) return e;
  }
  return arr[arr.length - 1];
}

// 按 id 在全局注册表里找数据。找不到就 console 警告并返回 undefined。
// 这里故意不抛错：缺内容的世界应该继续运转，只是缺一块。
function lookup(registry, id, kind) {
  const list = window[registry];
  if (!Array.isArray(list)) {
    console.warn(`[engine] 注册表 ${registry} 不存在，找不到 ${kind} "${id}"`);
    return undefined;
  }
  const found = list.find((e) => e && e.id === id);
  if (!found) {
    console.warn(`[engine] ${kind} "${id}" 未定义——它被引用了，但没人实现过它。`);
  }
  return found;
}

// ---------- 玩家 ----------

function newPlayer() {
  return {
    name: 'Hero 英雄',
    hp: 60,
    maxHp: 60,
    gold: 0,
    // 初始技能。英雄的拳头。
    skills: ['hero_strike'],
    // 初始道具：两个小血瓶。mystery_potion 故意不给——它要靠 PR 获得。
    items: [
      { def: 'small_potion', count: 2 },
    ],
  };
}

// 玩家造成的基础伤害公式。允许被任何 PR 里的新机制修改吗？
// 不允许改这一行，但允许在别处加新的伤害修正函数并调用它。
function playerAttackPower() {
  return 12; // 英雄的裸攻击力。永远的 12。直到有人改它。
}

// ---------- 战斗 ----------

// 开一场遭遇战。enemyId 来自 world.js 的遭遇池。
function startCombat(enemyId) {
  const def = lookup('MONSTERS', enemyId, '怪物');
  if (!def) {
    log(`遭遇了某个不存在的东西（${enemyId}）。它羞愧地离开了。`, 'world');
    return;
  }
  // 深拷贝，避免战斗中改坏了数据本体（虽然没人会检查）。
  G.enemy = JSON.parse(JSON.stringify(def));
  G.enemy.hpNow = G.enemy.hp;
  G.mode = 'combat';
  document.getElementById('overworld').classList.add('hidden');
  document.getElementById('combat').classList.remove('hidden');
  log(`遭遇 ${G.enemy.name}！`);
  renderCombat();
}

// 计算一次攻击伤害。公式简单到令人不安：
//   伤害 = 攻击力 × 技能威力 − 防御，最低 1。
function calcDamage(atk, skill, def) {
  const power = Number(skill && skill.power) || 1;
  const raw = atk * power - (Number(def) || 0);
  // 最低 1 点伤害：慈悲，或敷衍。
  return Math.max(1, Math.round(raw + (Math.random() * 4 - 2)));
}

// 玩家行动：用某个技能打敌人。
function playerUseSkill(skillId) {
  if (G.mode !== 'combat' || !G.enemy) return;
  const skill = lookup('SKILLS', skillId, '技能');
  if (!skill) {
    log('你试图使用一个不存在的技能。空气凝固了几秒。');
    return;
  }
  if (skill.type === 'heal') {
    const amount = Number(skill.power) || 0;
    G.player.hp = Math.min(G.player.maxHp, G.player.hp + amount);
    log(`你使用了 ${skill.name}，回复 ${amount} HP。`);
    renderCombat();
    enemyTurn();
    return;
  }
  // physical / magical 都走伤害公式；status / 其他类型 = 空过一回合。
  if (skill.type === 'physical' || skill.type === 'magical') {
    const dmg = calcDamage(playerAttackPower(), skill, G.enemy.def);
    G.enemy.hpNow -= dmg;
    log(`你使用 ${skill.name}，造成 ${dmg} 伤害。`);
    if (G.enemy.hpNow <= 0) {
      winCombat();
      return;
    }
  } else {
    log(`你使用 ${skill.name}。什么都没有发生。`);
  }
  renderCombat();
  enemyTurn();
}

// 敌人回合。技能池坏了就普攻；普攻也坏了就罚站。
function enemyTurn() {
  if (G.mode !== 'combat' || !G.enemy) return;
  let skillId = null;
  const pool = G.enemy.skills;
  if (Array.isArray(pool) && pool.length > 0) {
    skillId = pool[Math.floor(Math.random() * pool.length)];
  }
  const skill = skillId ? lookup('SKILLS', skillId, '技能') : undefined;
  if (skill && (skill.type === 'physical' || skill.type === 'magical')) {
    const dmg = calcDamage(Number(G.enemy.atk) || 5, skill, 0); // 玩家没有 def，永远裸奔
    G.player.hp -= dmg;
    log(`${G.enemy.name} 使用 ${skill.name}，对你造成 ${dmg} 伤害。`);
  } else {
    const dmg = calcDamage(Number(G.enemy.atk) || 5, null, 0);
    G.player.hp -= dmg;
    log(`${G.enemy.name} 攻击你，造成 ${dmg} 伤害。`);
  }
  if (G.player.hp <= 0) {
    gameOver();
    return;
  }
  renderCombat();
}

// 胜利结算。
function winCombat() {
  const gold = Math.max(0, Number(G.enemy.gold) || 0);
  G.player.gold += gold;
  log(`${G.enemy.name} 倒下了。掉落 ${gold} 金币。`);
  G.enemy = null;
  G.mode = 'overworld';
  document.getElementById('combat').classList.add('hidden');
  document.getElementById('overworld').classList.remove('hidden');
  renderWorld();
}

// 死亡结算。
function gameOver() {
  G.mode = 'gameover';
  G.player.hp = 0;
  document.getElementById('combat').classList.add('hidden');
  document.getElementById('overworld').classList.add('hidden');
  document.getElementById('gameover').classList.remove('hidden');
  const text = document.getElementById('death-text');
  if (text) {
    text.textContent = `你在第 ${G.stepCount} 步死去。金币 ${G.player.gold}。粪坑不发表评论。`;
  }
}

// ---------- 世界 ----------

// 判断某格能不能走。规则只有一条：'#' 是墙。其他全都能走，
// 包括 engine 不认识的字符（console 会嘀咕，但放行）。
function walkable(ch) {
  if (ch === '#') return false;
  if ('.~^TS'.includes(ch)) return true;
  if (ch === 'A') return true; // 'A' 是什么？档案管理员广场。NPC 站的格子。
  console.warn(`[engine] 未知地形字符 "${ch}"——按平地处理。世界在膨胀，规则没有。`);
  return true;
}

// NPC 站位表：把 npcs.js 的坐标铺成 "x,y" -> npc 的 map。
function npcAt(x, y) {
  const list = window.NPCS;
  if (!Array.isArray(list)) return null;
  return list.find((n) => Array.isArray(n.tile) && n.tile[0] === x && n.tile[1] === y) || null;
}

// 玩家走一步。dx/dy 是方向。每步有概率踩到遭遇战。
function move(dx, dy) {
  if (G.mode !== 'overworld') return;
  const [x, y] = G.pos;
  const nx = x + dx;
  const ny = y + dy;
  const map = window.WORLD && Array.isArray(window.WORLD.tiles) ? window.WORLD.tiles : [];
  if (ny < 0 || ny >= map.length) return;
  const row = String(map[ny] || '');
  if (nx < 0 || nx >= row.length) return;
  const ch = row[nx];
  if (!walkable(ch)) return;

  G.pos = [nx, ny];
  G.stepCount += 1;

  // 遇到 NPC：不触发战斗，说一句话。
  const npc = npcAt(nx, ny);
  if (npc) {
    const lines = Array.isArray(npc.lines) ? npc.lines : ['……'];
    log(`${npc.name}: ${lines[Math.floor(Math.random() * lines.length)]}`, 'world');
    renderWorld();
    return;
  }

  // 遭遇战判定：每步 12% 概率。数字来自拍脑袋，欢迎 PR 修改（不行，不能改）。
  if (Math.random() < 0.12) {
    const enc = weightedPick(window.WORLD && window.WORLD.encounters);
    if (enc && enc.monster) {
      startCombat(enc.monster);
      return;
    }
  }
  renderWorld();
}

// ---------- 渲染 ----------

function renderWorld() {
  const map = window.WORLD && Array.isArray(window.WORLD.tiles) ? window.WORLD.tiles : [];
  const container = document.getElementById('world-map');
  if (!container) return;
  container.innerHTML = '';
  for (let y = 0; y < map.length; y++) {
    const row = String(map[y]);
    for (let x = 0; x < window.WORLD.W; x++) {
      const cell = document.createElement('div');
      cell.className = 'tile';
      const ch = row[x] || '.';
      let glyph = ch === '.' ? '·' : ch;
      const npc = npcAt(x, y);
      if (npc) glyph = npc.emoji || '👤';
      if (G.pos[0] === x && G.pos[1] === y) {
        glyph = '🛡️';
        cell.classList.add('current');
      }
      cell.textContent = glyph;
      container.appendChild(cell);
    }
  }
  document.getElementById('gold').textContent = `Gold: ${G.player ? G.player.gold : 0}`;
  document.getElementById('party').textContent = `Steps: ${G.stepCount}`;
}

function renderCombat() {
  if (!G.enemy) return;
  document.getElementById('enemy-name').textContent = G.enemy.name || '???';
  document.getElementById('enemy-emoji').textContent = G.enemy.emoji || '❓';
  const ratio = Math.max(0, (G.enemy.hpNow / (Number(G.enemy.hp) || 1)) * 100);
  document.getElementById('enemy-hp-fill').style.width = `${ratio}%`;
  const pRatio = Math.max(0, (G.player.hp / G.player.maxHp) * 100);
  document.getElementById('player-hp-fill').style.width = `${pRatio}%`;
  document.getElementById('gold').textContent = `Gold: ${G.player.gold}`;
  renderSkillPicker();
}

function renderSkillPicker() {
  const picker = document.getElementById('skill-picker');
  if (!picker || !G.player) return;
  picker.innerHTML = '';
  for (const id of G.player.skills) {
    const skill = lookup('SKILLS', id, '技能');
    const btn = document.createElement('button');
    btn.textContent = skill ? `${skill.name}` : `${id}（未定义）`;
    btn.onclick = () => playerUseSkill(id);
    picker.appendChild(btn);
  }
}

function renderItemList() {
  const picker = document.getElementById('item-picker');
  if (!picker || !G.player) return;
  picker.innerHTML = '';
  if (G.player.items.length === 0) {
    const empty = document.createElement('button');
    empty.textContent = '背包空空如也。';
    empty.disabled = true;
    picker.appendChild(empty);
    return;
  }
  for (const slot of G.player.items) {
    const def = lookup('ITEMS', slot.def, '道具');
    const btn = document.createElement('button');
    btn.textContent = def ? `${def.emoji || ''} ${def.name} ×${slot.count}` : `${slot.def}（未定义）×${slot.count}`;
    btn.onclick = () => useItem(slot.def);
    picker.appendChild(btn);
  }
}

// 使用道具。道具的 effect 指向 skills.js 的技能 id。
// 引用不存在的技能时：药水白喝，回合照过。这很公平。
function useItem(itemId) {
  if (G.mode !== 'combat') return;
  const slot = G.player.items.find((s) => s.def === itemId);
  if (!slot) return;
  const def = lookup('ITEMS', itemId, '道具');
  if (!def) {
    log(`你盯着 ${itemId} 看了很久。它什么都没做。`);
    renderCombat();
    enemyTurn();
    return;
  }
  const skill = lookup('SKILLS', def.effect, '技能');
  if (skill && skill.type === 'heal') {
    const amount = Number(skill.power) || 0;
    G.player.hp = Math.min(G.player.maxHp, G.player.hp + amount);
    log(`你喝下了 ${def.name}，回复 ${amount} HP。`);
  } else {
    log(`你喝下了 ${def.name}。${def.effect ? `效果 "${def.effect}" 未实现。` : '毫无感觉。'}`);
  }
  slot.count -= 1;
  if (slot.count <= 0) {
    G.player.items = G.player.items.filter((s) => s !== slot);
  }
  renderCombat();
  enemyTurn();
}

// ---------- 视图切换 ----------

function showView(name) {
  for (const id of ['combat', 'overworld', 'gameover']) {
    document.getElementById(id).classList.toggle('hidden', id !== name);
  }
  G.mode = name === 'gameover' ? 'gameover' : (name === 'combat' ? 'combat' : 'overworld');
}

// ---------- 初始化 ----------

function newGame() {
  G.player = newPlayer();
  G.pos = (window.WORLD && Array.isArray(window.WORLD.spawn)) ? [...window.WORLD.spawn] : [0, 0];
  G.enemy = null;
  G.stepCount = 0;
  document.getElementById('combat-log').innerHTML = '';
  document.getElementById('world-log').innerHTML = '';
  showView('overworld');
  renderWorld();
  log('你在一个由未经审查的 pull request 组成的世界里醒来。', 'world');
  log('方向键 / WASD 移动。踩到 NPC 会说话，踩到空地可能踩到战斗。', 'world');
}

// 键盘绑定。Arrow + WASD。
document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'arrowup' || k === 'w') { e.preventDefault(); move(0, -1); }
  else if (k === 'arrowdown' || k === 's') { e.preventDefault(); move(0, 1); }
  else if (k === 'arrowleft' || k === 'a') { e.preventDefault(); move(-1, 0); }
  else if (k === 'arrowright' || k === 'd') { e.preventDefault(); move(1, 0); }
});

// 按钮绑定。
document.getElementById('btn-attack').addEventListener('click', () => {
  document.getElementById('skill-picker').classList.toggle('hidden');
  document.getElementById('item-picker').classList.add('hidden');
  renderSkillPicker();
});
document.getElementById('btn-item').addEventListener('click', () => {
  document.getElementById('item-picker').classList.toggle('hidden');
  document.getElementById('skill-picker').classList.add('hidden');
  renderItemList();
});
document.getElementById('btn-skill').addEventListener('click', () => {
  document.getElementById('skill-picker').classList.toggle('hidden');
  document.getElementById('item-picker').classList.add('hidden');
  renderSkillPicker();
});
document.getElementById('btn-run').addEventListener('click', () => {
  if (G.mode !== 'combat') return;
  log('你尝试逃跑。');
  if (Math.random() < 0.5) {
    log('逃跑了！');
    G.enemy = null;
    showView('overworld');
    renderWorld();
  } else {
    log('没能逃掉。');
    enemyTurn();
  }
});
document.getElementById('btn-restart').addEventListener('click', newGame);

// 启动。
newGame();
