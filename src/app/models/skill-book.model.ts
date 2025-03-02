import { SkillList } from "../data/skills";
import { Skill } from "./skill.model";

export class SkillBook {
  skill: Skill;
  price: number; // 商店價格
  dropRate: number; // 怪物掉落機率 (0 ~ 1)
  icon: string; // ✅ 新增 icon 屬性

  constructor(skill: Skill, price: number, dropRate: number, icon: string) {
    this.skill = skill;
    this.price = price;
    this.dropRate = dropRate;
    this.icon = icon; // ✅ 設定 icon
  }
}


export const SkillBookList: SkillBook[] = [
  new SkillBook(SkillList.find(skill => skill.name === '強力揮砍')!, 100, 0.1, 'Skill_Book.png'),
  new SkillBook(SkillList.find(skill => skill.name === '猛衝斬')!, 150, 0.05, 'Skill_Book.png'),
  new SkillBook(SkillList.find(skill => skill.name === '火球術')!, 200, 0.1, 'Skill_Book.png'),
  new SkillBook(SkillList.find(skill => skill.name === '雷擊術')!, 250, 0.07, 'Skill_Book.png'),
  new SkillBook(SkillList.find(skill => skill.name === '治癒術')!, 180, 0.12, 'Skill_Book.png'),
  new SkillBook(SkillList.find(skill => skill.name === '神聖光輝')!, 300, 0.05, 'Skill_Book.png'),
];

