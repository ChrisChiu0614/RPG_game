import { Component, OnInit } from '@angular/core';
import { Character } from './models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  character: Character | null = null;
  selectedComponent = 'roleInfo';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      this.character = JSON.parse(savedCharacter);
    } else {
      // 沒有角色則導向角色創建頁面
      this.router.navigate(['/create-role']);
    }
  }

  setComponent(component: string) {
    this.selectedComponent = component;
  }
}
