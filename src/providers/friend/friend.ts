import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FriendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FriendProvider {

  ip = 'http://localhost:8080';
  apiUrl = this.ip + '/db';
  onlineFriends = this.apiUrl + '/online?email=';
  offlineFriends = this.apiUrl + '/offline?email=';
  testURL: string = 'http://localhost:8080/db/getFriends?email=samuel@slk.se';

  constructor(public http: HttpClient) {
    console.log('Hello FriendProvider Provider');
  }

  getFriends(email){
    return new Promise(resolve => {
      console.log(this.onlineFriends+email);
      this.http.get(this.onlineFriends+email).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  testGetFriends(){
    return new Promise(resolve => {
      this.http.get(this.testURL).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
