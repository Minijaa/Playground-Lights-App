import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {Md5} from "ts-md5";
import {RegisterPage} from "../register/register";
import {AccountProvider} from "../../providers/account/account";
import {TabsPage} from "../tabs/tabs";
import {UserDataProvider} from "../../providers/user-data/user-data";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AccountProvider]
})
export class LoginPage {

  private mail: string;
  private password: string;
  userIsLoggedIn = false;
  userData: any;
  hash = Md5.hashStr("password");

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook, public accProvider: AccountProvider, public userDataProvider: UserDataProvider) {
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

  registerAccount(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    var hash = Md5.hashStr(this.password);
    this.accProvider.login(this.mail, hash)
      .then(data => {
        //this.response = data;
        var responseString = JSON.stringify(data);
        var response = JSON.parse(responseString);
        //var r = String(this.response.data);
        if (response.data === "logged in") {
          this.setUserData(this.mail)
          this.navCtrl.push(TabsPage);
        } else {
          alert(response.data);
        }
      });
  }

  setUserData(email: string){
    this.userDataProvider.setEmail(email);
    this.accProvider.getUsernameByEmail(email)
      .then(data => {
        //this.response = data;
        var responseString = JSON.stringify(data);
        var response = JSON.parse(responseString);
        this.userDataProvider.setUsername(response.data);
      });

  }

}
