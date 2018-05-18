import {Component, ViewChild} from "@angular/core";
import {NavController, NavParams, ToastController, ViewController} from "ionic-angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-map-modal',
  templateUrl: './map-modal.html'
})
export class MapModalPage {
  @ViewChild('name') name;
  park: any;
  error: any;

  constructor(public params: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController, public navCtrl: NavController){
    console.log(this.params)
    this.park = this.params.data.test;
    console.log(this.park)
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  sendReport(){
      let toast = this.toastCtrl.create({
        message: "Skickat!", duration: 2000
      });
      toast.present();
      this.dismiss();
  }

  ionViewDidLoad(){
    setTimeout(() => {
      //this.name.setFocus();
    }, 150);
  }
}
