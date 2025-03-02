import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoleComponent } from './component/create-role/create-role.component';
import { GameComponent } from './component/game/game.component';
import { AllocateStatsComponent } from './component/allocate-stats/allocate-stats.component';
import { FightComponent } from './component/fight/fight.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { ShopComponent } from './component/shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: 'create-role', pathMatch: 'full' },
  { path: 'create-role', component: CreateRoleComponent },
  { path: 'game', component: GameComponent },
  { path: 'allocate-stats', component: AllocateStatsComponent },// 加入新的能力分配頁面
  { path: 'fight', component: FightComponent }, // 戰鬥系統
  { path: 'inventory', component: InventoryComponent }, // 背包系統
  { path: 'shop', component: ShopComponent }, // 商店系統
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
