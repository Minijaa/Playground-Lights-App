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
  search = this.apiUrl + '/search?name=';
  addFriendURL = this.apiUrl + '/addFriend?emailOne=samuel@slk.se&emailTwo='

  constructor(public http: HttpClient) {
    console.log('Hello FriendProvider Provider');
  }

  searchFriends(name) {
    return new Promise (resolve => {
      this.http.get(this.search + name).subscribe(data => {
        resolve(data);
        console.log(data);
      })
    })
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

  addFriend(email){
    return new Promise(resolve => {
      this.http.get(this.addFriendURL+email).subscribe(data => {
        resolve(data);
        console.log(data);
      })
    })

  }

}
