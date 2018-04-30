import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {
  public apiUrl = "http://api.stockholm.se/ServiceGuideService/ServiceUnitTypes/9da341e4-bdc6-4b51-9563-e65ddc2f7434/DetailedServiceUnits/json?apikey=56010af30b114502bfbf8db404ef41a4";

  constructor(public http: HttpClient) {
    console.log('Hello MapProvider Provider');
  }

  getPlaygrounds() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
        console.log("done");
      }, err => {
        console.log(err);
      });
    });
  }
}
