import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataProvider]
})

export class HomePage {
  hello: any;
  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
    this.hello = this.dataProvider.getTest();
    //alert(this.hello.name);
    //console.log(this.hello);
    //this.getUsers();//
  }
  // getUsers(){
  //   this.dataProvider.getUsers()
  //     .then(data => {
  //       this.hello = data;
  //       console.log(this.hello);
  //     });
  // }
}
