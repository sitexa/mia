import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController } from 'ionic-angular';
import { PhoneService } from '../../providers/providers';
import { MainPage } from "../pages";

@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private phone = '';
  private password = '';

  constructor(private alertCtrl: AlertController,
              private phoneService: PhoneService,
              private navCtrl: NavController) {
  }

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.login();
    }
  }

  login(phone: string = this.phone): void {

    this.phoneService.loginUser("+86" + this.phone, this.password)
      .then(() => {
        this.navCtrl.push(MainPage);
      }).catch((e) => {
      this.handleError(e);
    })

    /*const alert = this.alertCtrl.create({
      title: 'Confirm',
      message: `Would you like to proceed with the phone number ${phone}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleLogin(alert);
            return false;
          }
        }
      ]
    });

    alert.present();*/
  }

  handleLogin(alert: Alert): void {
    alert.dismiss().then(() => {
      return this.phoneService.verify("+86" + this.phone);
    })
      .then(() => {
        this.navCtrl.push('VerificationPage', {
          phone: "+86" + this.phone
        });
      })
      .catch((e) => {
        this.handleError(e);
      });
  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }
}
