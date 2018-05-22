import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the GameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class GameProvider {
  ip = 'http://localhost:8080';
  //ip = 'http://192.168.0.17:8080';
  apiUrl = this.ip + '/games';
  startURL = this.ip + '/game?type=';
  stopURL = this.ip + '/stopgames';
  setActiveURL = this.ip + '/setactive?gamename=';
  setDifficultyURL = this.ip + '/difficulty?level=';

  // apiUrl = 'http://192.168.0.17:8080/games'
  // startURL = 'http://192.168.0.17:8080/game?type='
  // stopURL = 'http://192.168.0.17:8080/stopgames'


  constructor(public http: HttpClient) {
    console.log('Hello GameProvider Provider');
  }

  getGames() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  startGame(gameName){
    console.log("Game " + gameName + " is Started");
    //var request: string = this.apiUrl + gameName;
    fetch(this.startURL + gameName);
  }

  stopGame(gameName){
    console.log("Game " + gameName + " is Stopped");
    fetch(this.stopURL);
  }

  setActive(gameName){
    console.log("Game " + gameName + " is Active");
    fetch(this.setActiveURL + gameName);
  }
  setDifficulty(difficulty){
    console.log("Difficulty " + difficulty + " is set");
    fetch(this.setDifficultyURL + difficulty);
  }

}

