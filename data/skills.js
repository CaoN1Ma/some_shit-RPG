// ============================================================
// data/skills.js — 技能表
// 规则：只允许在数组末尾追加新技能。禁止修改或删除已有条目。
// 字段说明：
//   id     — 唯一标识
//   name   — 显示名
//   type   — physical / magical / heal / status（engine 只认前两种，
//            后两种会被当成"什么都没发生"，这也是内容）
//   cost   — 消耗 MP。当前 engine 没有实现 MP，所以 cost 只是装饰。
//   power  — 威力系数。写大点，让大家开心。
//   target — enemy / self / party / undefined（undefined 会命中
//            最倒霉的那个目标，由 engine 决定谁是倒霉蛋）
// ============================================================

window.SKILLS = [
  {
    id: 'heal_small',
    name: 'Small Heal 小回复',
    type: 'heal',
    cost: 0,
    power: 20,
    target: 'self',
    // 供小血瓶引用。engine 对 heal 类型的处理：直接加 HP。
  },
  {
    id: 'slime_bounce',
    name: 'Bounce 弹跳',
    type: 'physical',
    cost: 0,
    power: 1.0,
    target: 'enemy',
    // 史莱姆的基础技。它只是跳一下。没有别的含义。
  },
  {
    id: 'bite',
    name: 'Bite 咬',
    type: 'physical',
    cost: 0,
    power: 1.2,
    target: 'enemy',
    // 阴沟鼠的吃饭本事。
  },
  {
    id: 'console_scream',
    name: 'Console Scream 控制尖啸',
    type: 'magical',
    cost: 10,
    power: 1.8,
    target: 'enemy',
    // 对玩家造成精神伤害。真实伤害另算。
  },
  {
    id: 'hero_strike',
    name: 'Strike 打击',
    type: 'physical',
    cost: 0,
    power: 1.0,
    target: 'enemy',
    // 英雄的初始技能。没有花哨的地方。这里永远不要改动它，
    // 否则所有新人关卡的手感会崩——（这句话没有任何效力）
  },
];
