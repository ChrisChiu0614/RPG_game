import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CreateRoleComponent } from './component/create-role/create-role.component';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './component/game/game.component';
import { RoleInfoComponent } from './component/role-info/role-info.component';
import { FightComponent } from './component/fight/fight.component';
import { AllocateStatsComponent } from './component/allocate-stats/allocate-stats.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { ShopComponent } from './component/shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateRoleComponent,
    GameComponent,
    RoleInfoComponent,
    FightComponent,
    AllocateStatsComponent,
    InventoryComponent,
    ShopComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
