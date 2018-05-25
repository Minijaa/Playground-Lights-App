import {Component, ViewChild} from "@angular/core";
import {AlertController, NavController, NavParams, ToastController, ViewController} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {CallNumber} from '@ionic-native/call-number'

@Component({
  selector: 'page-map-modal',
  templateUrl: './map-modal.html'
})
export class MapModalPage {
  @ViewChild('name') name;
  park: any;
  error: any;

  constructor(public params: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController, public callNumber: CallNumber){
    console.log(this.params)
    this.park = this.params.data.test;
    console.log(this.park)
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  showCallConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Ringer',
      message: 'Är du säker på att du vill ringa ' + this.park.phone + "?",
      buttons: [
        {
          text: 'Avbryt',
          handler: () => {
            console.log('Avbryt');
          }
        },
        {
          text: 'Ring',
          handler: () => {
            this.callPhone()
            console.log('Ringer');
          }
        }
      ]
    });
    confirm.present();
  }
  callPhone(){
    console.log(this.park.phone)
    if(this.park.phone != null){
      this.callNumber.callNumber(this.park.phone, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
  }
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Beröm',
      value: '0',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Felanmälan',
      value: '1',
    });
    alert.addInput({
      type: 'radio',
      label: 'Fråga',
      value: '2',
    });
    alert.addInput({
      type: 'radio',
      label: 'Idé',
      value: '3',
    });
    alert.addInput({
      type: 'radio',
      label: 'Klagomål',
      value: '4',
    });

    alert.addButton('Avbryt');
    alert.addButton({
      text: 'Nästa',
      handler: data => {
      this.showReport(data)
      }
    });
    alert.present();
  }

  showReport(data){
    var title;
    var message;
    var toast;
    if(data == 0) {
      console.log(data);
      title = "Beröm";
      message = "Skriv det du vill berömma på denna park:";
      toast = "Tack för att du har tyckt till!";
    }else if(data == 1) {
      title = "Felanmälan";
      message = "Skriv kortfattat vad som behövs fixas på denna park:";
      toast = "Tack för felanmälan!";
    }else if( data == 2) {
      title = "Fråga";
      message = "Skriv det du undrar över angående denna park:";
      toast = "Vi återkommer till dig så fort vi kan";
    }else if(data == 3) {
      title = "Idé";
      message = "Skriv hur vi kan förbättra denna park:";
      toast = "Tack för att du har tyckt till!";
    }else if(data == 4) {
      title = "Klagomål";
      message = "Skriv hur vi kan förbättra denna park:";
      toast = "Tack för att du har tyckt till!";
    }else{
      title = "ERROR";
      message = "ERROR";
      toast = "ERROR";
    }

    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: [{
        name: "feedback",
        placeholder: "Skriv här"
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
            this.sendReport(toast);
            console.log("Skicka")

    }
        }
      ]
    });
    alert.present();
  }

  sendReport(message){
      let toast = this.toastCtrl.create({
        message: message, duration: 5000
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
