import {Component, ElementRef, ViewChild, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, ModalController, ToastController} from 'ionic-angular';
import {MapProvider} from "../../providers/map/map";
import {CoordinateHandler} from "./CoordinateHandler";
import {DomSanitizer} from '@angular/platform-browser';
import {Map} from "rxjs/util/Map";
import {MapModalPage} from "./map-modal";
import {VisitorProvider} from "../../providers/visitor/visitor";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {FriendProvider} from "../../providers/friend/friend";

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
  searchQuery: string = '';
  searchedParks: string[] = [];
  allParkNames: string[] = [];
  amountofParksOnMap: number = 0;
  allParksLoaded: boolean = false;
  /*userEmail: string;
  friends: any;
  friendsAtParks: any[] = [];*/

  addParkNo(){
    this.amountofParksOnMap++;
    if(this.amountofParksOnMap == this.pGrounds.length) {
      this.allParksLoaded = true;
    }
  }

  // Uppdaterar array över sökträffar
  getSearchItems(ev: any) {
    this.searchedParks.length = 0;
    console.log("getSearch");
    let val = ev.target.value;
    if (val && val.trim() != '') {
      document.getElementById('searchBox').hidden = false;
      this.searchedParks = this.allParkNames.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      document.getElementById('searchBox').hidden = true;
    }
  }
  //Centrerar den valda parken ur sökresultaten på kartan
  centerSearchedPark(parkName: string) {
    if(this.allParksLoaded) {
      document.getElementById('searchBox').hidden = true;
      let chosenPark: any;
      for (let i = 0; i < this.pGrounds.length; i++) {
        if (this.pGrounds[i].name === parkName) {
          chosenPark = this.pGrounds[i];
        }
      }
      this.searchedParks = [];
      console.log(this.searchQuery)
      chosenPark.setActive();
    }else{
      let toast = this.toastCtrl.create({
        message: "Var god vänta, kartan laddas...", duration: 2000
      });
      toast.present();
    }

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider, public coordHandler: CoordinateHandler, public events: Events,
              private zone: NgZone, public modalCtrl: ModalController, public visitorProvider: VisitorProvider, public toastCtrl: ToastController, public userData: UserDataProvider, public friendProvider: FriendProvider) {
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
    /*page.userEmail = page.userData.getEmail()*/
    setInterval(function () {
      page.updateIcons()
      }, 60000
    )
  }

 /* updateFriends(){
    console.log("kommer inte hit updateFriends1")
    var page = this;
    this.friendProvider.testGetFriends()
      .then(data => {
        page.friendsAtParks.length = 0;
        page.friends = data;
        console.log(page.friends)
        console.log(page.friends.length)
        for (var i = 0; i < page.friends.length; i++) {
          console.log(page.friends[i])
          if (page.friends[i].checkedIn == true){
            page.friendsAtParks.push(page.friends[i])
            console.log(page.friendsAtParks)
          }
        }
        console.log(page.friendsAtParks)
        console.log("kommer inte hit updateFriends slut")
        page.updateIcons()
         this.populateMap();
      });
  }*/

  updateIcons() {
    for (var i = 0; i < this.pGrounds.length; i++) {
     /* var friendsAtThisPark = []
      console.log("kommer inte hit2")
      for (var j = 0; j < this.friendsAtParks.length; j++){
        console.log(this.friendsAtParks[j].checkedInPlayground)
        console.log(this.pGrounds[i].Id)
        if (this.friendsAtParks[j].checkedInPlayground == this.pGrounds[i].Id){
          console.log("FSAFPIJASFIPJ")
          console.log(this.friendsAtParks[j].checkedInPlayground)
          console.log(this.pGrounds[i].Id)
          friendsAtThisPark.push(this.friendsAtParks[j])
        }

      }*/
/*      console.log(friendsAtThisPark)*/
      this.pGrounds[i].getVisitor();
    }

  }

  centerOnPosition(){
    this.closeInfoBox()
    this.map.setZoom(15);
    this.map.panTo(new google.maps.LatLng(59.407150, 17.946250));
  }
  openInfoBox() {
    if(!this.infoBoxOpened) {
      document.getElementById('textBox').hidden = false;
      document.getElementById('map').style.height = "77%";
      document.getElementById('centerBox').style.bottom = "23%";
      console.log("bottom 23")
      this.infoBoxOpened = true;

    }
    if(this.openPlayground.image != null){
      document.getElementById('imgBox').hidden = false;
    }else{
      document.getElementById('imgBox').hidden = true;
    }
  }

  closeInfoBox() {
    if(this.infoBoxOpened) {
      document.getElementById('textBox').hidden = true;
      document.getElementById('imgBox').hidden = true;
      document.getElementById('map').style.height = "100%";
      document.getElementById('centerBox').style.bottom = "0";
      console.log("bottom 0")
      this.infoBoxOpened = false;
      this.openPlayground = new Park(this.visitorProvider);
    }
    this.refreshData();
  }




  loadMap() {

    let latLng = new google.maps.LatLng(59.407126, 17.946450);
    let myStyles =[
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: myStyles
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.MapPage = this;
    var positionCircle = new google.maps.Circle({
      strokeColor: '#0000FF',
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.30,
      map: this.map,
      center: new google.maps.LatLng(59.407150, 17.946250),
      radius: 40,
    });

    this.map.addListener("click", (function () {
      this.MapPage.closeInfoBox();
      document.getElementById('searchInput').hidden = true
      document.getElementById('searchBox').hidden = true
      setTimeout(function () {
        document.getElementById('searchInput').hidden = false
      }, 1);


    }))
  }

  refreshData() {
    this.events.publish('updateScreen');
  }

  getPlaygrounds() {
    this.mapProvider.getPlaygrounds()
      .then(data => {
        this.playgrounds = data;
        this.createParks();
        /* this.populateMap();*/
      });
  }

  createParks() {

/*    let park = new Park(this.visitorProvider)
    park.position = new google.maps.LatLng(59.407126, 17.946450);
    park.name = "L70"
    park.id = "l70dsvsu";
    park.page = this;
    park.getVisitor();
    park.area = "Rinkeby-Kista";
    park.imgHidden = false;
    park.image = "assets/imgs/l70.png";
    park.content = "L70 på DSV"
    park.address = "Borgarfjordsgatan 12"
    park.postal = "164 55 Kista"
    park.phone = "08-599 004 33"
    this.pGrounds.push(park)*/

    console.log("start")
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
        if (this.playgrounds[i].Attributes[j].Id == "PhoneNumber") {
          park.phone = this.playgrounds[i].Attributes[j].Value;
        }
      }
      this.pGrounds.push(park)
    }
    console.log("end")

    for (let i = 0; i < this.pGrounds.length; i++) {
      this.allParkNames.push(this.pGrounds[i].name);
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

class Park {
  constructor(public visitorProvider: VisitorProvider) {
  }
  readonly markerPurple: string = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
  readonly markerBlue: string = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  readonly markerRed: string = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  readonly markerYellow: string = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
  readonly markerGreen: string = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"

  name: string = "ERROR!";
  content: string = "Det finns ingen information om denna lekplats.";
  position: any;
  parkMarker: any;
  id: any;
  page: any;
  image: any;
  visitors: any;
  onMap: boolean = false;
  address: string;
  area: string;
  postal: any;
  imgHidden: boolean = true;
  phone: string;
  friendNames: string[] = [];

  checkForFriends(){
    this.friendNames.length = 0;
    if(this.id == "0d6051fd-afe9-44cf-986d-8e11c240f823"){
      this.friendNames.push("Emelie Karlsson")
      this.friendNames.push("Oscar Westin")
      this.friendNames.push("Wilma Edberg")
    }
    if(this.id == "3ebc12ad-7c94-4174-b82e-3257f9d06850"){
      this.friendNames.push("Charlotte Rosberg")
    }
  }

  getPinIcon() {
    this.checkForFriends();
    if(this.friendNames.length > 0){
      return this.markerPurple
    }else if(this.visitors == null){
      return this.markerBlue
    } else if(this.visitors < 25 && this.visitors >= 0) {
      return this.markerGreen
    } else if (this.visitors >= 25 && this.visitors < 45) {
      return this.markerYellow
    } else if (this.visitors >= 45) {
      return this.markerRed
    } else {
      return this.markerBlue
    }
  }

  getVisitor(){
   /* if(friends =! undefined){
      for (var i = 0; i < friends.length; i++){
        this.friendNames.push(friends[i].name)
      }
    }*/
/*    console.log(this.friendNames)*/

    this.visitorProvider.getVisitors(this.id)
      .then(data => {
        this.visitors = data;
        this.putOnMap(this.getPinIcon())
      });
  }


  setActive() {
    this.page.openPlayground = this;
    this.parkMarker.setMap(this.page.map)
    this.page.openInfoBox();
    this.page.refreshData();
    console.log(this.parkMarker.getPosition())
    this.parkMarker.map.panTo(this.parkMarker.getPosition())
    this.parkMarker.map.setZoom(15);
  }

  putOnMap(icon) {
    this.parkMarker = new google.maps.Marker({
      position: this.position,
      title: this.name,
      map: this.page.map,
      name: this.name,
      icon: icon,
      park: this
    });
    google.maps.event.addListener(this.parkMarker, "click", (function () {
      this.park.setActive();
    }))
    if(this.onMap != true) {
      this.onMap = true;
      this.page.addParkNo();
    }
  }
}
