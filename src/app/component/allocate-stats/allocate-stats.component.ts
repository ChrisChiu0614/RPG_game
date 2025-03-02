import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocate-stats',
  standalone: false,
  templateUrl: './allocate-stats.component.html',
  styleUrl: './allocate-stats.component.css'
})
export class AllocateStatsComponent implements OnInit{
  character: Character = new Character();
  tempCharacter: Character = new Character(); // 暫存角色數據（取消時回復）
  originalStats: { [key: string]: number } = {}; // 升級前的屬性
  readonly stats: Array<'str' | 'agi' | 'vit' | 'dex' | 'luk' | 'int'> = ['str', 'agi', 'vit', 'dex', 'luk', 'int'];

  constructor(private router: Router) {}

  ngOnInit() {
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      this.character = Character.fromJSON(JSON.parse(savedCharacter));
      this.tempCharacter = Character.fromJSON(JSON.parse(savedCharacter)); // 先複製一份暫存
      this.saveOriginalStats(); // 儲存升級前的屬性
    }
  }

  /** 儲存升級前的能力值 */
  saveOriginalStats() {
    this.stats.forEach(stat => {
      this.originalStats[stat] = this.character[stat];
    });
  }

  /** 調整能力值，並即時更新基礎屬性 */
  adjustStat(stat: 'str' | 'agi' | 'vit' | 'dex' | 'luk' | 'int', amount: number) {
    if (amount > 0 && this.character.statPoints <= 0) return; // 沒有剩餘點數不能加
    if (amount < 0 && this.character[stat] <= this.originalStats[stat]) return; // 不能低於原始數值

    this.character[stat] += amount;
    this.character.statPoints -= amount;
    this.character.updateStats(); // 重新計算基礎屬性
  }

  /** 確定分配 */
  confirmAllocation() {
    if (this.character.statPoints > 0) {
      alert('請分配所有能力點數！');
      return;
    }
    localStorage.setItem('character', JSON.stringify(this.character));
    this.router.navigate(['/game']); // 回到角色資訊
  }

  /** 取消分配，回復原始角色數據 */
  cancelAllocation() {
    this.character = Object.assign(new Character(), this.tempCharacter);
    this.router.navigate(['/game']); // 回到角色資訊
  }
}
