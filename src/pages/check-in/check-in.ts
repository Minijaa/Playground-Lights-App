import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FriendRequestPage} from "../friend-request/friend-request";
import {AddFriendPage} from "../add-friend/add-friend";
import {FriendProvider} from "../../providers/friend/friend";

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
  providers: [FriendProvider]
})
export class CheckInPage {

  onlineFriends : any;

  constructor(public navCtrl: NavController, public friendProvider: FriendProvider) {
    this.getOnlineUsers();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
  }

  getOnlineUsers(){
    this.friendProvider.getOnlineFriends("sven@sven.com")
      .then(data => {
        this.onlineFriends = data;
        console.log(this.onlineFriends);
      });
  }

  openPageAddFriend() {
    console.log("Hej");
    this.navCtrl.push(AddFriendPage);


  }

  openPageFriendRequest() {
    this.navCtrl.push(FriendRequestPage);


  }

}
