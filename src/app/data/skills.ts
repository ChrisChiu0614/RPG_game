import { Skill, SkillBook } from '../models/skill.model';

export const SkillList: Skill[] = [
  new Skill('強力揮砍', 'attack', 10, 1.5, 2, 'swordsman', '用全力揮砍敵人，造成 1.5 倍傷害'),
  new Skill('猛衝斬', 'attack', 15, 2.0, 3, 'swordsman', '高速衝向敵人造成 2 倍傷害'),
  new Skill('火球術', 'magic', 20, 2.0, 3, 'mage', '發射一顆火球，造成 2 倍魔法傷害'),
  new Skill('雷擊術', 'magic', 25, 2.5, 4, 'mage', '召喚雷擊敵人，造成 2.5 倍魔法傷害'),
  new Skill('治癒術', 'heal', 15, 2.0, 2, 'priest', '恢復 2 倍智力值的 HP'),
  new Skill('神聖光輝', 'magic', 30, 2.5, 4, 'priest', '召喚神聖光輝，造成 2.5 倍魔法傷害'),
];

export const SkillBookList: SkillBook[] = [
  new SkillBook(SkillList.find(skill => skill.name === '強力揮砍')!, 100, 0.1),
  new SkillBook(SkillList.find(skill => skill.name === '猛衝斬')!, 150, 0.05),
  new SkillBook(SkillList.find(skill => skill.name === '火球術')!, 200, 0.1),
  new SkillBook(SkillList.find(skill => skill.name === '雷擊術')!, 250, 0.07),
  new SkillBook(SkillList.find(skill => skill.name === '治癒術')!, 180, 0.12),
  new SkillBook(SkillList.find(skill => skill.name === '神聖光輝')!, 300, 0.05),
];
