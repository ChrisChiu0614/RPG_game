export class Monster {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  expReward: number;
  goldReward: number;
  image: string;
  isBoss: boolean;
  skills: string[]; // ✅ 怪物技能
  loot: string[];   // ✅ 掉落物品

  constructor(name: string, hp: number, attack: number, defense: number, expReward: number, goldReward: number, image: string, isBoss: boolean = false, skills: string[] = [], loot: string[] = []) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.attack = attack;
    this.defense = defense;
    this.expReward = expReward;
    this.goldReward = goldReward;
    this.image = image;
    this.isBoss = isBoss;
    this.skills = skills;
    this.loot = loot;

  }
}
