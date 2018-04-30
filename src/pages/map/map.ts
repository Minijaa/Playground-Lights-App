import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapProvider} from "../../providers/map/map";
import {CoordinateHandler} from "./CoordinateHandler";
declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  playgrounds: any;
  //infos: [0];
 /* infoWindow = new google.maps.InfoWindow({
    maxwidth: 300
  });*/

  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider, public coordHandler: CoordinateHandler) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    this.getPlaygrounds();
  }
  loadMap(){
    let latLng = new google.maps.LatLng(59.4072096,17.9460351);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  getPlaygrounds() {
    this.mapProvider.getPlaygrounds()
      .then(data => {
        this.playgrounds = data;
        this.populateMap();

      });
  }
  populateMap() {
    for (var i = 0; i < this.playgrounds.length; i++){
      var name = this.playgrounds[i].Name;
      var pos = this.coordHandler.gridToGeodetic(this.playgrounds[i].GeographicalPosition.X,this.playgrounds[i].GeographicalPosition.Y);
      //var position = new google.maps.LatLng(pos.lat, pos.lon);
      var position = new google.maps.LatLng(pos[0], pos[1]);
      var parkMarker = new google.maps.Marker({position:position, title:this.playgrounds[i].Name, map: this.map, id:i});
      var content = "test hej" + name;
      var infoWindow = new google.maps.InfoWindow;

      google.maps.event.addListener(parkMarker, "click", (function(parkMarker, content, infoWindow) {
        return function () {
         // closeInfos();
          infoWindow.setContent(content);
          infoWindow.open(this.map, parkMarker);
        //  this.infos[0] = infoWindow;
        };
      })(parkMarker, content, infoWindow));
    }

    //Används inte just nu!!!
    function closeInfos(){
      if(this.infos.length > 0){
        this.infos[0].set("parkMarker", null);
        this.infos[0].close();
        this.infos.length = 0;
      }

    }
  }
}
