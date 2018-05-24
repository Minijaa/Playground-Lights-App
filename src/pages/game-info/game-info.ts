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
  countdown: number = 5;
  countdownMax: number = 5; //this is for the progressbar
  firstRun: boolean = true;
  gameStopped: boolean = false;
  showToggle: boolean = true;
  difficulty: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gameProvider: GameProvider) {
    this.game = navParams.get('game')
    this.difficulty = "easy";
    // if (this.game.name === "redlamp"){
    //   document.getElementById('sas').setAttribute("class", "startandstop2");
    //   console.log("redllllight");
    // }
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
    if (this.game.name === "redlamp"){
      this.gameProvider.startGame(this.game.name);
      return;
    }
    this.countdown = 5;
    this.gameStopped = true;
    this.gameProvider.stopGame(this.game.name);
  }

  startTimer() {
    if (this.game.name === "redlamp"){
      this.gameProvider.startGame(this.game.name);
      return;
    }
    if (this.firstRun) {
      this.gameProvider.startGame(this.game.name);
      this.firstRun = false;
      this.gameStopped = false;

    } else if (this.gameStopped) {
      this.gameStopped = false;
      this.countdown = 5;
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
    if (this.game.name === "redlamp"){

      return {
        'top': isSemi ? '0' : '0%',
        'bottom': isSemi ? '0%' : '0',
        'left': '0%',
        'transform': 0,
        '-moz-transform': 0,
        '-webkit-transform': 0,
        'font-size': 0 //this.pbRadius / 2.5 + 'px'
      };
    }


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

  difficultyChanged() {
    this.gameProvider.setDifficulty(this.difficulty);
    console.log(this.difficulty);
  }

  getButtonColors(){
    if (this.game.name === 'runhere'){
      return "light";
    }else if(this.game.name === 'danger'){
      return "primary";
    }else return "secondary";
  }

  getRules(){
    var htmlstring = this.game.rules.replace(/(\r\n|\n|\r)/gm, '"\n"');
    return htmlstring;

    //text = text.replace(/(rn|r|n)/g, 'n'); return text.replace(doublenewlinesRE, "$1nn$2"); }
  }

  getStart() {
    if (this.game.name === "redlamp"){
      return "Grön!";
    }
    return "Start";
  }

  getStop(){
    if (this.game.name === "redlamp"){
      return "Röd!";
    }else {
      return "Stopp"
    }
  }
}
