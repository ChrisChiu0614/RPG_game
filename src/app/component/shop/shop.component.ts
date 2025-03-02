import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';
import { ItemList } from '../../data/item-list';
import { SkillBook, SkillBookList } from '../../models/skill-book.model';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent{
  character: Character = new Character();
  selectedCategory: 'weapon' | 'armor' | 'potion' | 'skillbook' = 'weapon';

  // 整合所有可購買物品
  itemsForSale = [
    ...ItemList,
    ...SkillBookList.map(sb => ({
      name: sb.skill.name,
      type: 'skillbook',
      effect: 0,
      description: sb.skill.description,
      price: sb.price,
      icon: sb.icon, // ✅ 確保技能書有 `icon`
      originalSkillBook: sb
    }))
  ];


  get filteredItems() {
    return this.itemsForSale.filter(item => item.type === this.selectedCategory);
  }

  setCategory(category: 'weapon' | 'armor' | 'potion' | 'skillbook') {
    this.selectedCategory = category;
  }

  buyItem(item: any) {
    if (this.character.gold < item.price) {
      alert('金幣不足！');
      return;
    }
    this.character.gold -= item.price;

    if (item.type === 'skillbook' && item.originalSkillBook) {
      // ✅ 直接使用 `originalSkillBook` 來學習技能
      this.character.learnSkill(item.originalSkillBook);
    } else {
      this.character.addItem(item);
    }
  }
}
