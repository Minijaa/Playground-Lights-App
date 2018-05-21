import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DataProvider} from '../providers/data/data';
import {HttpClientModule} from "@angular/common/http";
import {MapPage} from "../pages/map/map";
import {GamesPage} from "../pages/games/games";
import {GameInfoPage} from "../pages/game-info/game-info";
import {CheckInPage} from "../pages/check-in/check-in";
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import {Facebook} from '@ionic-native/facebook';
import {MapProvider} from "../providers/map/map";
import {CoordinateHandler} from "../pages/map/CoordinateHandler";
import {RoundProgressModule} from "angular-svg-round-progressbar";
import {MapModalPage} from "../pages/map/map-modal";
import { VisitorProvider } from '../providers/visitor/visitor';

import {FriendRequestPage} from "../pages/friend-request/friend-request";
import {AddFriendPage} from "../pages/add-friend/add-friend";
import {RegisterPage} from "../pages/register/register";
import { AccountProvider } from '../providers/account/account';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    GamesPage,
    GameInfoPage,
    CheckInPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    MapModalPage,
    FriendRequestPage,
    AddFriendPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    GamesPage,
    GameInfoPage,
    CheckInPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MapModalPage,
    AddFriendPage,
    FriendRequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    MapProvider,
    HttpClientModule,
    Facebook,
    CoordinateHandler,
    VisitorProvider,
    AccountProvider
  ]
})
export class AppModule {
}
