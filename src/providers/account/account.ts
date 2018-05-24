import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {
  ip = "http://localhost:8080";
  //ip = "http://10.200.39.140:8080";

  addUserName = this.ip+"/db/dbadd?name=";
  addUserEmail = "&email=";
  addUserPass = "&password=";
  loginEmail = this.ip+"/db/login?email=";
  loginPass = "&password=";
  getUserName = this.ip+"/db/get?email=";

  constructor(public http: HttpClient) {
    console.log('Hello AccountProvider Provider');
  }

  login(username, pass){
    return new Promise(resolve => {
      this.http.get<string>(this.loginEmail + username + this.loginPass + pass).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createAcc(username, email, pass) {
    return new Promise(resolve => {
      this.http.get(this.addUserName + username + this.addUserEmail + email + this.addUserPass + pass).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getUsernameByEmail(email){
    return new Promise(resolve => {
      this.http.get(this.getUserName + email).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
