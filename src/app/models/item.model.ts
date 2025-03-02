export class Item {
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'misc'; // 類型
  effect: number;  // 效果值 (傷害、護甲、回血)
  description: string; // 道具描述
  price: number; // 價格
  icon: string; // ✅ 新增 icon 屬性

  constructor(name: string, type: 'weapon' | 'armor' | 'potion' | 'misc', effect: number, description: string, price: number, icon: string) {
    this.name = name;
    this.type = type;
    this.effect = effect;
    this.description = description;
    this.price = price;
    this.icon = icon; // ✅ 設定 icon
  }
}
