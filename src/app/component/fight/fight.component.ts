import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';
import { Monster } from '../../models/monster.model';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-fight',
  standalone: false,
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.css'
})
export class FightComponent implements OnInit{
  character: Character = new Character();
  monster = { name: '', hp: 0, maxHp: 0, attack: 0, defense: 0, expReward: 0, goldReward: 0, image: '', isBoss:false, skills:[],loot: []};
  backgrounds: string[] = ['grassland.jpg', 'mountain.jpg', 'cave.jpg']; // 戰鬥背景
  monsters: Monster[] = [
    new Monster('史萊姆', 30, 5, 2, 20, 10, 'Slime Windi.png'),
    new Monster('哥布林', 50, 8, 4, 30, 15, 'Goblin Grunt.png'),
    new Monster('大野狼', 80, 10, 5, 50, 20, 'Corrupted Fire Wolf.png'),
    new Monster('黑暗騎士', 200, 25, 10, 100, 50, 'Boss Legendary Knight Remment.png', true, ['黑暗斬擊'], ['黑暗寶石'])
  ];

  battleLog: string[] = [];
  background: string = '';
  isFighting = false;
  isDead = false;

  ngOnInit() {
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      this.character = Character.fromJSON(JSON.parse(savedCharacter));
    }
    this.startBattle();
  }

  /** ✅ 開始戰鬥 */
  startBattle() {
    this.background = `assets/backgrounds/${this.getRandomElement(this.backgrounds)}`;
    this.monster = Object.assign({}, this.getRandomElement(this.monsters));
    this.monster.maxHp = this.monster.hp;
    this.isFighting = true;
    this.battleLog = [];
    this.battleLog.unshift(`你遇到了 ${this.monster.isBoss ? 'BOSS' : ''} ${this.monster.name}！`);
  }

  /** ✅ 回合制攻擊 */
  attack() {
    if (this.isDead || !this.isFighting) return;

    const playerTurn = this.character.agi >= this.monster.attack; // AGI 影響攻擊順序

    if (playerTurn) {
      this.playerAttack();
      if (this.monster.hp > 0) this.monsterAttack();
    } else {
      this.monsterAttack();
      if (this.character.hp > 0) this.playerAttack();
    }
  }

  /** ✅ 角色攻擊怪物 */
  private playerAttack() {
    if (this.isDead) return;

    let damage = this.character.attack - this.monster.defense;
    damage = Math.max(damage, 1); // 最少造成 1 點傷害

    const critChance = Math.random() < this.character.critRate / 100;
    if (critChance) {
      damage *= 2;
      this.battleLog.unshift(`暴擊！你對 ${this.monster.name} 造成 ${damage} 點傷害！`);
    } else {
      this.battleLog.unshift(`你對 ${this.monster.name} 造成 ${damage} 點傷害！`);
    }

    this.monster.hp -= damage;
    if (this.monster.hp <= 0) this.victory();
  }

  /** ✅ 怪物攻擊角色 */
  monsterAttack() {
    let damage = this.monster.attack - this.character.defense;
    damage = Math.max(damage, 1);

    if (this.monster.skills.length > 0 && Math.random() < 0.3) { // 30% 機率使用技能
      const skill = this.getRandomElement(this.monster.skills);
      damage *= 1.5; // 技能傷害增加
      this.battleLog.unshift(`${this.monster.name} 使用了 ${skill}，造成 ${damage} 點傷害！`);
    } else {
      this.battleLog.unshift(`${this.monster.name} 對你造成 ${damage} 點傷害！`);
    }

    this.character.hp -= damage;
    if (this.character.hp <= 0) {
      this.character.hp = 0;
      this.isDead = true;
    }
  }

  /** ✅ 角色勝利，獲得獎勵 */
private victory() {
  this.battleLog.unshift(`你打敗了 ${this.monster.name}！獲得 ${this.monster.expReward} 經驗 & ${this.monster.goldReward} 金幣！`);

  this.character.addExp(this.monster.expReward);
  this.character.gold += this.monster.goldReward;

  this.saveCharacter();
  this.isFighting = false; // ✅ 結束戰鬥，等待玩家點擊「下一場戰鬥」
}

  /** ✅ 儲存角色數據 */
  saveCharacter() {
    localStorage.setItem('character', JSON.stringify(this.character));
  }

  /** ✅ 復活角色 */
  revive() {
    this.character.hp = this.character.maxHp;
    this.isDead = false;
    this.battleLog.unshift('你復活了！');
    this.saveCharacter();
    this.startBattle();
  }

  /** ✅ 隨機選擇陣列內的元素 */
  private getRandomElement(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** ✅ 讓玩家重新開始新戰鬥 */
startNewBattle() {
  this.startBattle();
}
useSkill(skill: Skill) {
  if (this.character.mana < skill.mpCost) {
    alert('MP 不足！');
    return;
  }

  this.character.mana -= skill.mpCost;

  let damage = 0;
  if (skill.type === 'attack') {
    damage = this.character.attack * skill.power;
  } else if (skill.type === 'magic') {
    damage = this.character.int * skill.power;
  } else if (skill.type === 'heal') {
    const healAmount = this.character.int * skill.power;
    this.character.hp = Math.min(this.character.hp + healAmount, this.character.maxHp);
    this.battleLog.unshift(`你使用了 ${skill.name}，恢復了 ${healAmount} HP！`);
    return;
  }

  this.monster.hp -= damage;
  this.battleLog.unshift(`你使用了 ${skill.name}，造成 ${damage} 點傷害！`);
  if (this.monster.hp <= 0) this.victory();
}



}
