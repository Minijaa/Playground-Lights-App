import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Md5} from "ts-md5";
import {AccountProvider} from "../../providers/account/account";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AccountProvider]
})
export class RegisterPage {

  private username: string;
  private password: string;
  private mail: string;
  private confPassword: string;
  response: any;
  responseString: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public accProvider: AccountProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAcc(){
    var hash = Md5.hashStr(this.password);
    this.accProvider.createAcc(this.username, this.mail, hash, )
      .then(data => {
        this.responseString = JSON.stringify(data);
        this.response = JSON.parse(this.responseString);
        //var r = String(this.response.data);
        if (this.response.data === "A user with this email adress already exists.") {
          alert(this.response.data)
          this.navCtrl.push(TabsPage);
        } else {
          alert("Your account has been created!");
          this.navCtrl.push(LoginPage);
        }
      });
  }

}
