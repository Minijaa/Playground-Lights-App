import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GameInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-info',
  templateUrl: 'game-info.html',
})
export class GameInfoPage {
  game: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.game = navParams.get('game')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameInfoPage');
  }

  setContent(game: any){
    this.game = game;
  }

}
