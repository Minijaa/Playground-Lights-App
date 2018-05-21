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

  addUserName = "http://localhost:8080/db/dbadd?name=";
  addUserEmail = "&email=";
  addUserPass = "&password=";
  loginEmail = "http://localhost:8080/db/login?email=";
  loginPass = "&password=";
  getUserName = "http://localhost:8080/db/get?email=";

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
