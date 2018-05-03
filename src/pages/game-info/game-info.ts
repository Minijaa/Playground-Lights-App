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
  //progress bar test things
  pbStroke: number = 15;
  pbRadius: number = 75;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = false;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  rate:number;
  //end progress bar test things

  timer: any;
  game: any;
  countdown: number=10.0;
  countdownMax: number=10.0; //this is for the progressbar

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
      if (this.countdown <= 0){
        this.countdown = 10.0;
        this.getLogic();
      }

      this.countdown -= 0.1;

      if (this.countdown > 0) {
        this.StartTimer();
      }



    }, 100);

  }


  getLogic(){

    //här får vi trycka in något från Samuels logik
    //game.logic

  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.pbRadius / 3.5 + 'px'
    };
  }


}
