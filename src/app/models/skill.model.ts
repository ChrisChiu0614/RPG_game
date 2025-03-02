
export class Skill {
  name: string;
  type: 'attack' | 'magic' | 'heal';
  mpCost: number;
  power: number;
  cooldown: number;
  requiredJob: 'swordsman' | 'mage' | 'priest';
  description: string;

  constructor(name: string, type: 'attack' | 'magic' | 'heal', mpCost: number, power: number, cooldown: number, requiredJob: 'swordsman' | 'mage' | 'priest', description: string) {
    this.name = name;
    this.type = type;
    this.mpCost = mpCost;
    this.power = power;
    this.cooldown = cooldown;
    this.requiredJob = requiredJob;
    this.description = description;
  }
}

export class SkillBook {
  skill: Skill;
  price: number;
  dropRate: number;

  constructor(skill: Skill, price: number, dropRate: number) {
    this.skill = skill;
    this.price = price;
    this.dropRate = dropRate;
  }
}
