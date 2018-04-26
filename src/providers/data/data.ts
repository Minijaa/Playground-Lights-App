import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }
  // getUsers() {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'/users').subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }
  getTest() {
    return this.http.get('http://localhost:8080/object')// 'https://pvt.dsv.su.se/Group05/Hello'
  }
}
