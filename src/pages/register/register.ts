import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController } from 'ionic-angular';
import { PhoneService } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private phone = '';

  constructor(private alertCtrl: AlertController,
              private phoneService: PhoneService,
              private navCtrl: NavController) {
  }

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.register();
    }
  }

  register(phone: string = this.phone): void {
    const alert = this.alertCtrl.create({
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
            this.handleRegister(alert);
            return false;
          }
        }
      ]
    });

    alert.present();
  }

  handleRegister(alert: Alert): void {
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
