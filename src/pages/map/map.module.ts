import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import {MapModalPage} from './map-modal'


@NgModule({
  declarations: [
    MapPage,
    MapModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
  ],
  entryComponents:[
    MapModalPage
  ]
})
export class MapPageModule {}
