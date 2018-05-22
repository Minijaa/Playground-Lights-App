import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FriendRequestPage} from "../friend-request/friend-request";
import {AddFriendPage} from "../add-friend/add-friend";

/**
 * Generated class for the CheckInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html',
})
export class CheckInPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
  }

  openPageAddFriend() {
    console.log("Hej");
    this.navCtrl.push(AddFriendPage);


  }

  openPageFriendRequest() {
    this.navCtrl.push(FriendRequestPage);


  }

}
