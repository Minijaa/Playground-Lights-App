import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapPage} from "../map/map";
import {GamesPage} from "../games/games";
import {CheckInPage} from "../check-in/check-in";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = MapPage;
  tab2Root = GamesPage;
  tab3Root = CheckInPage;
  constructor() {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
