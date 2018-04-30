import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameInfoPage } from './game-info';

@NgModule({
  declarations: [
    GameInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(GameInfoPage),
  ],
})
export class GameInfoPageModule {}
