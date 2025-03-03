import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-create-role',
  standalone: false,
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})

export class CreateRoleComponent implements OnInit {
  character: Character = new Character();

  // ✅ 定義職業選擇列表
  availableJobs = [
    { name: '戰士', str: 10, agi: 5, vit: 8, dex: 5, luk: 3, int: 2 },
    { name: '弓箭手', str: 5, agi: 10, vit: 5, dex: 8, luk: 5, int: 2 },
    { name: '法師', str: 3, agi: 5, vit: 5, dex: 5, luk: 5, int: 10 },
    { name: '盜賊', str: 6, agi: 8, vit: 5, dex: 8, luk: 6, int: 2 }
  ];

  // ✅ 明確定義可用的屬性，避免 TypeScript 推測錯誤
  readonly stats: Array<'str' | 'agi' | 'vit' | 'dex' | 'luk' | 'int'> = ['str', 'agi', 'vit', 'dex', 'luk', 'int'];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('角色創建初始化');

    // ✅ 預設角色職業為 "戰士"
    this.character.job = this.availableJobs[0].name;
    this.setJobAttributes(this.availableJobs[0]);
  }

  /** 當玩家更換職業時，更新屬性 */
  onJobChange(): void {
    const selectedJob = this.availableJobs.find(job => job.name === this.character.job);
    if (selectedJob) {
      this.setJobAttributes(selectedJob);
    }
  }

  /** ✅ 設定角色屬性 */
  setJobAttributes(job: any): void {
    this.character.str = job.str;
    this.character.agi = job.agi;
    this.character.vit = job.vit;
    this.character.dex = job.dex;
    this.character.luk = job.luk;
    this.character.int = job.int;
    this.character.updateStats(); // 更新 HP、MP、攻擊力等
  }

  /** 增減能力值 */
  adjustStat(stat: 'str' | 'agi' | 'vit' | 'dex' | 'luk' | 'int', amount: number): void {
    if (amount > 0 && this.character.statPoints <= 0) return; // 沒有剩餘點數不能加
    if (amount < 0 && (this.character[stat] as number) <= 5) return; // 屬性最小值為 5

    (this.character[stat] as number) += amount;
    this.character.statPoints -= amount;
    this.character.updateStats(); // 重新計算基礎屬性
  }

  /** 確認角色創建 */
  confirmCharacter(): void {
    if (!this.character.name || !this.character.job) {
      alert('請填寫名稱與職業');
      return;
    } else if (this.character.statPoints > 0) {
      alert('初始配點尚未完成');
      return;
    }

    // 儲存角色到 localStorage（未來可改為 API 儲存）
    localStorage.setItem('character', JSON.stringify(this.character));

    // 跳轉至主畫面
    this.router.navigate(['/game']);
    console.log('角色創建成功', this.character);
  }
}
