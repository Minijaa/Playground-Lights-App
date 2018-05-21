import { Injectable } from '@angular/core';

// Behöver endast se ut som nedan i klassen man vill uttnyttja datan i...
// OBS, skriv inte in under @Component att providern finns med, då skapas en ny instans och det kommer ej funka.
// mail: string;
// username: string;
//
//   constructor(public navCtrl: NavController, public navParams: NavParams, userData: UserDataProvider){
//   this.mail = userData.getEmail();
//   this.username = userData.getUsername();
// }

@Injectable()
export class UserDataProvider {

  private username: string;
  private mail: string;

  constructor() {
    console.log('Hello UserDataProvider Provider');
    this.username = 'blank';
    this.mail = 'blank@blank'
  }

  setUsername(username){
    this.username = username;
  }

  setEmail(email){
    this.mail = email;
  }

  getUsername(){
    return this.username;
  }

  getEmail(){
    return this.mail;
  }

}
