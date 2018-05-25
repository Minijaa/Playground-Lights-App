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

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
    this.testGetFriends();
  }

  getOnlineUsers(){
    this.friendProvider.getOnlineFriends("sven@sven.com")
      .then(data => {
        this.onlineFriends = data;
        console.log(this.onlineFriends);
      });
  }

  //Tänk på att denna metod nu enbart drar den hårdkodade sven@sven.com... får skapa en till metod i friendProvider
  // och fixa url byggandet lite mer, skicka med den egna mailadress (som går att komma åt via user-data provider)
  testGetFriends(){
    console.log("Started testGetFriends");
    this.friendProvider.testGetFriends()
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
