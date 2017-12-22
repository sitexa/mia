import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
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
