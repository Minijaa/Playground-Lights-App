import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Md5} from "ts-md5";
import {AccountProvider} from "../../providers/account/account";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AccountProvider]
})
export class RegisterPage {

  private username: string;
  private password: string;
  private mail: string;
  private confPassword: string;
  response: any;
  responseString: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public accProvider: AccountProvider, public alertCtrl: AlertController) {
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Användarvillkor',
      message: '<p>LjusKul och GDPR<br /><br />Stockholms stad v&auml;rnar om din dataintegritet. LjusKul h&auml;mtar in och visar upp ungef&auml;rligt bes&ouml;karantal, men sparar inte uppgifter om individuella anv&auml;ndare. Check-in (frivillig funktion) sparas i 30 minuter och &auml;r bara synligt f&ouml;r anv&auml;ndare du har godk&auml;nt. Stockholms stads dataskyddsombud kan kontaktas p&aring; 08 508 00 508 <br /><br />N&auml;r du registrerar ett anv&auml;ndarkonto godk&auml;nner du att vi lagrar och behandlar dina personuppgifter i v&aring;r verksamhet i den utstr&auml;ckning det beh&ouml;vs. Syftet med lagringen &auml;r att tillhandah&aring;lla inloggning till Stockholm Ljuskul ("appen"). All behandling sker konfidentiellt och vi delar aldrig med oss av dina uppgifter till tredje part.<br /><br />N&auml;r du skapar ett konto i appen s&aring; lagras de uppgifter du sj&auml;lv anger vid registreringen; namn och e-postadress. Syftet med lagringen &auml;r att tillhandah&aring;lla ett anv&auml;ndarkonto i applikationen. Vill du ta bort ditt konto g&aring;r det bra genom att kontakta oss.<br /><br />&Ouml;nskar du som kund att ta del av den informationen som lagras om dig kan detta g&ouml;ras kostnadsfritt en g&aring;ng per kalender&aring;r. Du som kund har r&auml;tt att beg&auml;ra r&auml;ttelse eller radering av felaktiga personuppgifter.</p>\n' +
      '<p>GDPR [General Data Protection Regulation] <br /><br />Definition<br />GDPR primarily reflects a change in how data ownership is viewed. Processing, storage and protection are the three legal cornerstones. <br /><br /><br /><br /><br />Regulations are EU-wide binding legal acts. The purpose of the legislation is to protect consumers as well as enable user control over how personal data is used/processed.<br /><br />Basic Principles<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Only collect and manage personal data if it is allowed<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Inform users whose data is collected. This may include data about customers, suppliers and employees<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Decide in advance what the information will be used for and do not use it for any other purpose<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Do not collect more data than what is needed. Never collect data that might &ldquo;come in handy&rdquo;<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Make sure data is correct and up to date<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Erase data that is no longer needed<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Protect data from unauthorized use and unauthorized access<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Document how data processing is supposed to be managed<br /><br />Three main principles<br />1.&nbsp;&nbsp;&nbsp;&nbsp; Do not collect more data than necessary and only in a certain, in advance selected purpose<br />2.&nbsp;&nbsp;&nbsp;&nbsp; Do not save data longer than what is necessary <br />3.&nbsp;&nbsp;&nbsp;&nbsp; Protect the data that is managed in the organization <br /><br />Guidelines<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Secure data structures<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Consider requirements on subcontractors (if applicable)<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Provide users access to their data<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Allow data ownership transfers to users<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Incident report should be logged within 72 h (to both affected users and authorities)<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Keep Minimum data kept<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data Controller<br /><br />The City of Stockholm is both Data Controller and Processor for the data. <br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data Processor<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data Subjects and Age<br />-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data Protection Officer (DPO) &ndash; needed as the service is provided by an authority. The city of Stockholm (Stockholm municipality) needs to provide access to a data protection officer for the app.<br /><br />How does it affect the app and its connected services?<br />Concerning the app and the services connected it is important that users (in this case parents) are aware of how the data is collected and used, that consent can be provided (or declined) and revoked.<br />The service relies on anonymized data for processing. E.g. while there are sensors counting the approximate number of visitors at the different locations, the identityof the visitors is not processed. <br />There is a service that enables users to connect with friends. This service does keep a list of friends, and enables real-time check-in, but does notkeep personalized historic data of previous visits. The check in process is voluntary for each visit.</p>\n' +
      '<p>The main takeaway for the LjusKul application is to:<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Make customers aware of what data collection and processing takes place<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Provide a choice to permit, deny or revoke said data usage<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Make sure customer data is not stored longer than necessary<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Make sure customer data is not shared inappropriately<br />&bull;&nbsp;&nbsp;&nbsp;&nbsp; Provide contact details for City of Stockholm DPO.</p>\n' +
      '<p><br />As the data for visitor activityis anonymousand approximate, it doesn&rsquo;t present a challenge for GDPR compliance. What should be noted, however, is that the check-in feature (for friends) does mean data is collected and processed but is not kept infinitely (as a check-in lasts for only 30 minutes) and is not shared (beyond registered users). User data is stored but not shared. The current assumption is that the app could use incident reporting tools already developed by the City of Stockholm.</p>',
      buttons: ['Jag accepterar']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAcc() {
    if (this.password === this.confPassword) {
      var hash = Md5.hashStr(this.password);
      this.accProvider.createAcc(this.username, this.mail, hash,)
        .then(data => {
          this.responseString = JSON.stringify(data);
          this.response = JSON.parse(this.responseString);
          //var r = String(this.response.data);
          if (this.response.data === "A user with this email adress already exists.") {
            alert(this.response.data);
            this.navCtrl.push(TabsPage);
          } else {
            alert("Your account has been created!");
            this.navCtrl.push(LoginPage);
          }
        });
    } else {
      alert("Both password fields must be identical");
      this.password = "";
      this.confPassword = "";
    }
  }

}
