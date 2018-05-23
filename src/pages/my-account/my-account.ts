import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyApp} from "../../app/app.component";
import {TabsPage} from "../tabs/tabs";
import {UserDataProvider} from "../../providers/user-data/user-data";

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  username: string;
  mail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserDataProvider) {

  }

  ionViewDidLoad() {
    this.username = this.userData.getUsername();
    this.mail = this.userData.getEmail();
    console.log('ionViewDidLoad MyAccountPage');
  }

  backButtonClick(){
    this.navCtrl.push(TabsPage);
  }
}
