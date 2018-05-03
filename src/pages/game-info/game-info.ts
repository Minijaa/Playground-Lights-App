import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgModule} from '@angular/core';
import {RoundProgressModule} from 'angular-svg-round-progressbar'

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
  timer: any;
  game: any;
  countdown: number=2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.game = navParams.get('game')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameInfoPage');
  }

  setContent(game: any){
    this.game = game;
  }

  startGame(){

  }

  StartTimer() {
    this.timer = setTimeout(x => {
      // if (this.countdown <= 0) {
      // }
      if (this.countdown == 0){
        this.countdown = 2;
        this.getLogic();
      }

      this.countdown -= 1;

      if (this.countdown > 0) {
        this.StartTimer();
      }



    }, 1000);

  }


  getLogic(){

    //här får vi trycka in något från Samuels logik
    //game.logic

  }

}
