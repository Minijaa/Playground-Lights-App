import {Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import {IonicPage, NavController, NavParams, Events, ModalController} from 'ionic-angular';
import {MapProvider} from "../../providers/map/map";
import {CoordinateHandler} from "./CoordinateHandler";
import { DomSanitizer } from '@angular/platform-browser';
import {Map} from "rxjs/util/Map";
import {MapModalPage} from "./map-modal";
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
  hej: string = "test";
  pGrounds: Array<any> = [];
  public openPlayground: any = new Park();



  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider, public coordHandler: CoordinateHandler, public events: Events,
              private zone: NgZone, public modalCtrl: ModalController) {
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
  }


  ionViewDidLoad() {
    this.openPlayground = new Park();
    console.log('ionViewDidLoad MapPage');
    console.log(this.openPlayground);
    this.loadMap();
    this.getPlaygrounds()


  }


  loadMap() {
    let latLng = new google.maps.LatLng(59.4072096, 17.9460351);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  refreshData(){
    this.events.publish('updateScreen');
  }

  getPlaygrounds() {
    this.mapProvider.getPlaygrounds()
      .then(data => {
        this.playgrounds = data;
        console.log(this.playgrounds)
        this.populateMap();

      });
  }

  populateMap() {
    for (var i = 0; i < this.playgrounds.length ; i++) {
      let park = new Park()
      let pos = this.coordHandler.gridToGeodetic(this.playgrounds[i].GeographicalPosition.X, this.playgrounds[i].GeographicalPosition.Y);
      park.position = new google.maps.LatLng(pos[0], pos[1]);
      park.name = this.playgrounds[i].Name;
      park.page = this;
      var pinIcon;
      //
      park.visitors = Math.floor(Math.random()*20);
      //
      if(park.visitors < 5){
        pinIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      } else if (park.visitors >= 5 && park.visitors < 12){
        pinIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      } else if (park.visitors >= 12){
        pinIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      } else {
        pinIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }
      for (var j = 0; j < this.playgrounds[i].Attributes.length; j++) {
        if (this.playgrounds[i].Attributes[j].Id == "Image") {
          park.image = "http://api.stockholm.se/ServiceGuideService/ImageFiles/" + this.playgrounds[i].Attributes[j].Value.Id + "/Data?apikey=71b5f56a324145ceafe0cf289e249316"
        }
        if (this.playgrounds[i].Attributes[j].Id == "ShortDescription") {
          park.content = this.playgrounds[i].Attributes[j].Value
        }
      }

      park.parkMarker = new google.maps.Marker({
        position: park.position,
        title: park.name,
        map: this.map,
        id: i,
        mapPage: this,
        animation: google.maps.Animation.DROP,
        name: park.name,
        icon: pinIcon
      });
      google.maps.event.addListener(park.parkMarker, "click", (function () {
        this.map.setCenter(park.parkMarker.getPosition())
        park.setActive();
      }));
      this.pGrounds.push(park);
    }
  }
  openModal(parkId) {
    let modal = this.modalCtrl.create(MapModalPage, parkId);
    modal.present();
   // modal.onDidDismiss(() => this.ionViewDidLoad());
  }
}
class Park{
  constructor() {
  }
  name: string ="Tryck på en lekplats!";
  content: string ="Det finns ingen information om denna lekplats.";
  position: any;
  parkMarker: any;
  id: any;
  page : any;
  image: any = "<br>test";
  visitors: number;

  setActive(){
    console.log(this.image)
    console.log(this.image)
    this.page.openPlayground = this;
    this.page.refreshData();
  }
}
