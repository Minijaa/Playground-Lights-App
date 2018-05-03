import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameInfoPage } from './game-info';
import {RoundProgressConfig, RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    GameInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(GameInfoPage),
    RoundProgressModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GameInfoPageModule {
  constructor(private _config: RoundProgressConfig){
    _config.setDefaults({
      color: '#f00',
      background: '#0f0'
    });
  }
}
