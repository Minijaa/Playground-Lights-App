import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {GameProvider} from '../../providers/game/game';

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
  providers: [GameProvider]
})
export class GamesPage {
  games: any;
  constructor(public navCtrl: NavController, public gameProvider: GameProvider) {
    this.getGames();
  }

getGames(){
  this.gameProvider.getGames()
    .then(data => {
      this.games = data;
      console.log(this.games);
    });
}

}
