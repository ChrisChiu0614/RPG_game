import { Item } from '../models/item.model';

export const ItemList: Item[] = [
  new Item('短劍', 'weapon', 5, '一把普通的短劍，攻擊力 +5', 50, 'sword.png'),
  new Item('鐵甲', 'armor', 3, '堅固的鐵甲，防禦力 +3', 75, 'Cotton_Shirt.png'),
  new Item('紅色藥水', 'potion', 50, '恢復 50 HP', 20, 'Red_Potion.png'),
  new Item('橙色藥水', 'potion', 100, '恢復 100 HP', 40, 'Orange_Potion.png'),
  new Item('橙色藥水', 'potion', 150, '恢復 150 HP', 50, 'Orange_Potion.png'),
  new Item('銀幣袋', 'misc', 0, '可以賣給商人換錢', 100, 'Silver_Coin_Moneybag.png'),
];
