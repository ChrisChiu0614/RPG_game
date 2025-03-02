import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-info',
  standalone: false,
  templateUrl: './role-info.component.html',
  styleUrl: './role-info.component.css'
})
export class RoleInfoComponent implements OnInit{

  character:Character = new Character();

  constructor(private router: Router) {}

  ngOnInit(): void {
      // 從 localStorage 讀取角色資料
      const savedCharacter = localStorage.getItem('character');
      if(savedCharacter){
        this.character = Character.fromJSON(JSON.parse(savedCharacter));
      }
  }
  allocateStats() {
    this.router.navigate(['/allocate-stats']);
  }

   /** ✅ 測試：按按鈕給角色增加經驗值 */
   gainExp() {
    this.character.addExp(50); // 測試增加 50 經驗值
    this.saveCharacter(); // 保存更新後的角色數據
  }

  /** ✅ 保存角色數據到 localStorage */
  saveCharacter() {
    localStorage.setItem('character', JSON.stringify(this.character));
  }

}
