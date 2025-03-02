import { Component } from '@angular/core';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  character: Character = new Character();

  useItem(item: Item) {
    this.character.useItem(item);
  }

  equipItem(item: Item) {
    this.character.equipItem(item);
  }
}
