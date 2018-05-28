import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FriendProvider} from "../../providers/friend/friend";

/**
 * Generated class for the AddFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {

  searchQuery: string = '';
  results: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public friendProvider : FriendProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
  }

  getItems(ev: any){
    console.log("search: " + ev.target.value);
    let searchPhrase = ev.target.value;
    this.friendProvider.searchFriends(searchPhrase).then(data => {
      this.results = data;
    })

    console.log("Results " + this.results);
  }

  addFriend(email: any) {
    console.log("add friend.ts: " + email);
    this.friendProvider.addFriend(email).then(data => {
      var responseString = JSON.stringify(data);
      var response = JSON.parse(responseString);
      if (response.data === "added") {
          this.showAlert();
      }
    })
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Tillagd!',
      subTitle: 'Personen har nu blivit tillagd som din vän.',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
    ]
    });
    alert.present();
  }

}
