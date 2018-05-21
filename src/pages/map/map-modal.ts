import {Component, ViewChild} from "@angular/core";
import {AlertController, NavController, NavParams, ToastController, ViewController} from "ionic-angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-map-modal',
  templateUrl: './map-modal.html'
})
export class MapModalPage {
  @ViewChild('name') name;
  park: any;
  error: any;

  constructor(public params: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController){
    console.log(this.params)
    this.park = this.params.data.test;
    console.log(this.park)
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  showReport(){
    let alert = this.alertCtrl.create({
      title: "Feedback",
      message: "Skriv din feedback:",
      inputs: [{
        name: "feedback",
        placeholder: "Skriv din feedback här"
      },
      ],
      buttons:[
        {
          text: "Avbryt",
          handler: data => {
            console.log("Avbryt")
          }
        },
        {
          text: "Skicka",
          handler: data => {
            this.sendReport();
            console.log("Skicka")

    }
        }
      ]
    });
    alert.present();
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
