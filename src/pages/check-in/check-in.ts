import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FriendRequestPage} from "../friend-request/friend-request";
import {AddFriendPage} from "../add-friend/add-friend";
import {FriendProvider} from "../../providers/friend/friend";
import {MapPage} from "../map/map";
import {UserDataProvider} from "../../providers/user-data/user-data";

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

  friends : any;

  constructor(public navCtrl: NavController, public friendProvider: FriendProvider, public userData: UserDataProvider) {

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');

  }
  ionViewDidEnter(){
    this.testGetFriends();
  }

  getOnlineUsers(){
    this.friendProvider.getFriends("samuel@slk.se")
      .then(data => {
        this.friends = data;
        console.log(this.friends);
      });
  }

  //Tänk på att denna metod nu enbart drar den hårdkodade sven@sven.com... får skapa en till metod i friendProvider
  // och fixa url byggandet lite mer, skicka med den egna mailadress (som går att komma åt via user-data provider)
  testGetFriends(){
    console.log("Started testGetFriends");
    this.friendProvider.testGetFriends()
      .then(data => {
        this.friends = data;
        console.log(this.friends);
      });
  }

  openPageAddFriend() {
    console.log("Hej");
    this.navCtrl.push(AddFriendPage);


  }

  goToPark(park){
    if(park.string != "") {
      if(park.string == "Vasaparken"){
        this.userData.setPark("Vasaparkens parklek")
        console.log(park)
        this.navCtrl.parent.select(0)
      }else{
        this.userData.setPark(park.string)
        console.log(park)
        this.navCtrl.parent.select(0)
      }
    }
  }

  openPageFriendRequest() {
    this.navCtrl.push(FriendRequestPage);


  }

}
