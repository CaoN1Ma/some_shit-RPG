// ============================================================
// data/items.js — 道具表
// 规则：只允许在数组末尾追加新道具。禁止修改或删除已有条目。
// 字段说明：
//   id     — 唯一标识
//   name   — 显示名
//   emoji  — 背包里的图标
//   effect — 引用 skills.js 的技能 id，使用道具等于释放该技能。
//            引用不存在的 id 时，喝药水会变成一场惊喜。
//   price  — 商店价格。当前没有商店，所以这只是心里价位。
// ============================================================

window.ITEMS = [
  {
    id: 'small_potion',
    name: 'Small Potion 小血瓶',
    emoji: '🧪',
    effect: 'heal_small',
    price: 10,
  },
  {
    id: 'mystery_potion',
    name: 'Mystery Potion 神秘药水',
    emoji: '⚗️',
    effect: 'heal_medium',
    price: 25,
    // 效果没写错，写的是 heal_medium。至于 heal_medium 是什么——
    // 由 data/skills.js 决定。现在它还不存在。
  },
];
