import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhoneService } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'verification',
  templateUrl: 'verification.html'
})
export class VerificationPage implements OnInit {
  private code: string = '';
  private phone: string;

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private phoneService: PhoneService) {
  }

  ngOnInit() {
    this.phone = this.navParams.get('phone');
  }

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.verify();
    }
  }

  verify(): void {
    this.phoneService.login(this.phone, this.code)
      .then(() => {
        //todo 手机验证完成后，有两个分支：1）如果是首次认证即新注册，则需要进行资料登录，进入ProfilePage;
        //todo 2)如果是旧用户进行的手机验证，则无须进行资料登录，直接进入MainPage。资料修改可以从主页面菜单调出。
        this.navCtrl.setRoot('ProfilePage', {}, {
          animate: true
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
