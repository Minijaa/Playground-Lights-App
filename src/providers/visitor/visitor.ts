import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the VisitorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class VisitorProvider {

  //apiUrl = 'http://10.200.39.140:8080/sensors?parkid='
  apiUrl = 'http://localhost:8080/sensors?parkid='

  constructor(public http: HttpClient) {
    console.log('Hello VisitorProvider Provider');
  }

  getVisitors(parkId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + parkId).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(null);
      });
    });
  }
}

