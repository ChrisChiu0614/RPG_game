import { Item } from "./item.model";
import { SkillBook } from "./skill-book.model";
import { Skill } from "./skill.model";

export class Character {
  name: string;
  job: string;
  level: number;
  exp: number;
  nextExp: number;
  statPoints: number; // 自由分配點數
  str: number;
  agi: number;
  vit: number;
  dex: number;
  luk: number;
  int: number; // ✅ 新增智力影響 MP
  hp: number;
  maxHp: number;
  mana: number;   // ✅ 新增魔力值
  maxMana: number; // ✅ 新增最大魔力值
  attack: number;
  defense: number;
  evasion: number;
  critRate: number;
  luck: number;
  gold: number;

  inventory: Item[] = [];
  equippedWeapon: Item | null = null;
  equippedArmor: Item | null = null;

  skills: Skill[] = [];
  constructor(
    name: string = '',
    job: string = '',
    level: number = 1,
    str: number = 5,
    agi: number = 5,
    vit: number = 5,
    dex: number = 5,
    luk: number = 5,
    int: number = 5,  // ✅ 預設智力
    exp: number = 0,
    gold: number = 0
  ) {
    this.name = name;
    this.job = job;
    this.level = level;
    this.exp = exp;
    this.statPoints = 10; // 初始可分配 10 點能力值
    this.str = str;
    this.agi = agi;
    this.vit = vit;
    this.dex = dex;
    this.luk = luk;
    this.int = int; // ✅ 初始化智力
    this.gold = gold;
    this.nextExp = this.calculateNextExp();
    // ✅ 在 constructor 內初始化能力值
    this.hp = 0;
    this.maxHp = 0;
    this.mana = 0;   // ✅ 初始化 MP
    this.maxMana = 0; // ✅ 初始化最大 MP
    this.attack = 0;
    this.defense = 0;
    this.evasion = 0;
    this.critRate = 0;
    this.luck = 0;

    this.updateStats(); // ✅ 自動計算能力值

  }

  /** 計算下一級所需經驗值 */
  private calculateNextExp(): number {
    return 100 + (this.level * 20);
  }

  /** 更新能力值（依照屬性影響能力） */
  public updateStats(): void {
    this.maxHp = 100 + this.vit * 5;  // HP = 100 + VIT * 5
    this.hp = this.maxHp;  // 升級時恢復 HP
    this.maxMana = 50 + this.int * 5; // ✅ 智力影響 MP
    this.mana = this.maxMana;
    this.attack = 10 + this.str * 2;  // 物理攻擊 = 10 + STR * 2
    this.defense = this.vit;  // 防禦值 = VIT
    this.evasion = this.agi;  // 迴避值 = AGI
    this.critRate = 5 + this.dex * 1;  // 爆擊值 = DEX
    this.luck = this.luk * 0.5;  // 幸運值 = LUK * 0.5
  }

  /** 增加經驗值，並自動升級 */
  addExp(amount: number): void {
    this.exp += amount;
    while (this.exp >= this.nextExp) {
      this.levelUp();
    }
  }

  /** 角色升級 */
  private levelUp(): void {
    this.exp -= this.nextExp;
    this.level++;
    this.nextExp = this.calculateNextExp();
    this.statPoints += 5; // 升級後獲得 5 點自由分配點數
    this.updateStats();
  }

  /** 自由分配能力點數 */
  allocateStat(stat: 'str' | 'agi' | 'vit' | 'dex' | 'luk' | 'int', amount: number): boolean {
    if (this.statPoints < amount) return false;
    this[stat] += amount;
    this.statPoints -= amount;
    this.updateStats();
    return true;
  }

  /** 轉換 JSON */
  static fromJSON(json: any): Character {
    return Object.assign(new Character(), json);
  }

  /** ✅ 加入道具到背包 */
  addItem(item: Item) {
    this.inventory.push(item);
  }

  /** ✅ 使用道具 */
  useItem(item: Item) {
    if (item.type === 'potion') {
      this.hp = Math.min(this.hp + item.effect, this.maxHp);
      this.inventory = this.inventory.filter(i => i !== item);
    }
  }

  /** ✅ 裝備武器/防具 */
  equipItem(item: Item) {
    if (item.type === 'weapon') {
      this.equippedWeapon = item;
      this.attack += item.effect;
    } else if (item.type === 'armor') {
      this.equippedArmor = item;
      this.defense += item.effect;
    }
  }



  learnSkill(skillBook: SkillBook): boolean {
    if (this.job !== skillBook.skill.requiredJob) {
      alert('你的職業不能學這個技能！');
      return false;
    }
    if (this.skills.some(skill => skill.name === skillBook.skill.name)) {
      alert('你已經學會這個技能！');
      return false;
    }
    this.skills.push(skillBook.skill);
    alert(`成功學習技能：${skillBook.skill.name}`);
    return true;
  }
}
