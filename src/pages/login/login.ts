import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse} from "@ionic-native/facebook";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData = null;
  userIsLoggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
    fb.getLoginStatus()
      .then( res => {
      console.log(res.status);
    })
      .catch(err => console.log(err));
  }

  /**
   * The user is logged in with the Facebook app on the phone
   * Saves:
   * @param name, first_name, email, picture
   */
  loginWithFB() {
    this.fb.login(['email', 'public_profile'])
      .then((response: FacebookLoginResponse) => {
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', [])
          .then(profile => {
            this.userData = {
              email: profile['email'],
              first_name: profile['first_name'],
              picture: profile['picture_large']['data']['url'],
              username: profile['name']
            };
            this.userIsLoggedIn = true;
          })
      } )
      .catch(err => {
          console.log("Fel ", err);
        }
      )
  }

  logoutFromFB() {
    this.fb.logout()
      .then( res => this.userIsLoggedIn = false)
      .catch(err => console.log("Fel: ", err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
