import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {RoundProgressModule} from 'angular-svg-round-progressbar'
import {GameProvider} from "../../providers/game/game";
import {BaseInput} from "ionic-angular/util/base-input";
import {T} from "@angular/core/src/render3";

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
  providers: [GameProvider]
})
export class GameInfoPage {
  //progress bar test things
  pbStroke: number = 15;
  pbRadius: number = 90;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = false;
  color: string = '#696969'//'#488aff';//'#45ccce';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  rate: number;
  //end progress bar test things

  timer: any;
  game: any;
  countdown: number = 10;
  countdownMax: number = 10; //this is for the progressbar
  firstRun: boolean = true;
  gameStopped: boolean = false;
  showToggle: boolean = true;
  difficulty: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gameProvider: GameProvider) {
    this.game = navParams.get('game')
    this.difficulty = "easy";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameInfoPage');
  }

  setContent(game: any) {
    this.game = game;
  }

  toggleStartStop() {
    if (this.showToggle == true) {
      this.showToggle = false;
    } else {
      this.showToggle = true;
    }
  }

  getCountDown() {
    if (this.countdown > 0) {
      return this.countdown;
    } else {
      return "Go!";
    }
  }

  resetTimer() {
    this.countdown = 10;
    this.gameStopped = true;
    this.gameProvider.stopGame(this.game.name);
  }

  startTimer() {
    if (this.firstRun) {
      this.gameProvider.startGame(this.game.name);
      this.firstRun = false;
      this.gameStopped = false;

    } else if (this.gameStopped) {
      this.gameStopped = false;
      this.countdown = 10;
      this.firstRun = true;
      return;
    }

    this.timer = setTimeout(x => {

      this.countdown -= 1;

      if (this.countdown > 0) {
        this.startTimer();
      } else {

        this.firstRun = true;
      }
    }, 1000);

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
      'font-size': this.pbRadius / 2.5 + 'px'
    };
  }

  difficultyChanged(difficulty) {
    // kör en funktion och skicka med difficultyn som argument
    console.log(this.difficulty);
  }
}
