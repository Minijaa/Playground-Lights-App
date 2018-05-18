import {Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import {IonicPage, NavController, NavParams, Events, ModalController} from 'ionic-angular';
import {MapProvider} from "../../providers/map/map";
import {CoordinateHandler} from "./CoordinateHandler";
import { DomSanitizer } from '@angular/platform-browser';
import {Map} from "rxjs/util/Map";
import {MapModalPage} from "./map-modal";
import {VisitorProvider} from "../../providers/visitor/visitor";
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
  providers: [VisitorProvider, MapProvider]
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('imgBox') imgElement: ElementRef;
  map: any;
  playgrounds: any;
  pGrounds: Array<any> = [];
  public openPlayground: any = new Park(this.visitorProvider);
  infoBoxOpened: boolean = false;



  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider, public coordHandler: CoordinateHandler, public events: Events,
              private zone: NgZone, public modalCtrl: ModalController, public visitorProvider: VisitorProvider) {
    this.getPlaygrounds()
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');

      });
    });
  }


  ionViewDidLoad() {
    var page = this;
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    setInterval(function() {
      page.updateIcons()
    }, 60000
    )


  }

  updateIcons(){
    for (var i = 0; i < this.pGrounds.length; i++){
      this.pGrounds[i].getVisitor();
    }

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

  openInfoBox(){
    document.getElementById('textBox').hidden = false;
    document.getElementById('map').style.height = "70%";
    this.infoBoxOpened = true;
  }

  refreshData(){
    if(!this.infoBoxOpened) {
      this.openInfoBox();
    }
    this.events.publish('updateScreen');
  }

  getPlaygrounds() {
    this.mapProvider.getPlaygrounds()
      .then(data => {
        this.playgrounds = data;
        console.log(this.playgrounds)
        this.createParks();
       /* this.populateMap();*/
      });
  }
  createParks() {
    for (var i = 0/*272*/; i < /*300*/this.playgrounds.length; i++) {
      let park = new Park(this.visitorProvider)
      let pos = this.coordHandler.gridToGeodetic(this.playgrounds[i].GeographicalPosition.X, this.playgrounds[i].GeographicalPosition.Y);
      park.position = new google.maps.LatLng(pos[0], pos[1]);
      park.name = this.playgrounds[i].Name;
      park.id = this.playgrounds[i].Id;
      park.page = this;
      park.getVisitor();
      park.area = this.playgrounds[i].GeographicalAreas[0].Name;

      for (var j = 0; j < this.playgrounds[i].Attributes.length; j++) {
        if (this.playgrounds[i].Attributes[j].Id == "Image") {
          park.imgHidden = false;
          park.image = "http://api.stockholm.se/ServiceGuideService/ImageFiles/" + this.playgrounds[i].Attributes[j].Value.Id + "/Data?apikey=71b5f56a324145ceafe0cf289e249316"
        }
        if (this.playgrounds[i].Attributes[j].Id == "ShortDescription") {
          park.content = this.playgrounds[i].Attributes[j].Value
        }
        if (this.playgrounds[i].Attributes[j].Id == "StreetAddress") {
          park.address = this.playgrounds[i].Attributes[j].Value;
        }
        if (this.playgrounds[i].Attributes[j].Id == "PostalCode") {
          park.postal = this.playgrounds[i].Attributes[j].Value + " " + park.postal;
        }
        if (this.playgrounds[i].Attributes[j].Id == "PostalAddress") {
          park.postal = this.playgrounds[i].Attributes[j].Value;
        }

      }
      this.pGrounds.push(park)
    }
  }


/*  populateMap(){
    for(var i = 0;i < this.pGrounds.length; i++) {
        console.log(this.pGrounds[i])
    }
  }*/
  openModal(parkId) {
    this.navCtrl.push(MapModalPage, parkId);

   // modal.onDidDismiss(() => this.ionViewDidLoad());
  }
}
class Park{
  constructor(public visitorProvider: VisitorProvider) {
  }
  readonly markerBlue :string = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  readonly markerRed :string = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  readonly markerYellow :string = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
  readonly markerGreen :string = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"

  name: string ="Tryck på en lekplats!";
  content: string ="Det finns ingen information om denna lekplats.";
  position: any;
  parkMarker: any;
  id: any;
  page : any;
  image: any;
  visitors: any;
  onMap: boolean = false;
  address: string;
  area: string;
  postal: any;
  imgHidden: boolean = true;

  getPinIcon(){
    if(this.visitors < 33){
      return this.markerGreen
    } else if (this.visitors >= 33 && this.visitors < 65){
      return this.markerYellow
    } else if (this.visitors >= 65){
      return this.markerRed
    } else {
      return this.markerBlue
    }
  }

  getVisitor(){
   this.visitorProvider.getVisitors(this.id)
     .then(data => {
       this.visitors = data;
       this.putOnMap()
     });
  }

  setActive(){
    this.page.openPlayground = this;
    this.parkMarker.setMap(this.page.map)
    console.log("going to refresh")
    this.page.refreshData();
    console.log("ended")
  }

  putOnMap(){
    this.parkMarker = new google.maps.Marker({
      position: this.position,
      title: this.name,
      map: this.page.map,
      name: this.name,
      icon: this.getPinIcon(),
      park: this
    });
    google.maps.event.addListener(this.parkMarker, "click", (function () {
      this.map.setCenter(this.getPosition())
      this.park.setActive();
    }))
  }
}
