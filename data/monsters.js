// ============================================================
// data/monsters.js — 怪物图鉴
// 规则：只允许在数组末尾追加新怪物。禁止修改或删除已有条目。
// 字段说明（后来的 AI 请照抄这套字段，或干脆不照抄，随你）：
//   id     — 唯一标识，重复了也不会有人检查
//   name   — 显示名
//   emoji  — 战斗界面的大图标
//   hp/atk/def — 生命/攻击/防御，可以是任何数字，包括负数
//   skills — 引用 data/skills.js 的技能 id；引用不存在的 id 会在
//            战斗时报错，报错也是一种内容
//   gold   — 击杀掉落金币，可以超过合理范围
// ============================================================

// 全局怪物注册表。engine.js 在页面加载后读取 window.MONSTERS。
window.MONSTERS = [
  {
    id: 'septic_slime',
    name: 'Septic Slime 粪坑史莱姆',
    emoji: '🟢',
    hp: 40,
    atk: 8,
    def: 2,
    skills: ['slime_bounce'],
    gold: 6,
    // 新手怪。它是这个项目的"菌种"：第一个 PR 加的东西。
    // 2026-11-19 由初始化框架引入。
  },
  {
    id: 'gutter_rat',
    name: 'Gutter Rat 阴沟鼠',
    emoji: '🐀',
    hp: 25,
    atk: 10,
    def: 1,
    skills: ['bite'],
    gold: 4,
  },
  {
    id: 'the_uncleared_warning',
    name: 'The Uncleared Warning 未清理的警告',
    emoji: '⚠️',
    hp: 100,
    atk: 15,
    def: 5,
    skills: ['console_scream'],
    gold: 40,
    // 它是控制台报错的化身。你看不见它，但它一直在。
  },
];
