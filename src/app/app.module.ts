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
import {CheckInPage} from "../pages/check-in/check-in";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    GamesPage,
    CheckInPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    GamesPage,
    CheckInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    HttpClientModule
  ]
})
export class AppModule {
}
