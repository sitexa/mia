import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhoneService } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'verification',
  templateUrl: 'verification.html'
})
export class VerificationPage implements OnInit,AfterContentInit {
  private code: string = '';
  private phone: string;
  private password: string;
  private password2: string;
  private tips: string = "";

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private phoneService: PhoneService) {
  }

  ngOnInit() {
    this.phone = this.navParams.get('phone');
  }

  ngAfterContentInit() {
    this.phoneService.getSMS()
      .then((code: string) => {
        this.code = code;
        this.verify();
      })
      .catch((e: Error) => {
        if (e) {
          console.error(e.message);
        }
      });
  }

  onInputKeypress({keyCode}: KeyboardEvent): void {
    this.tips = "";
    if (keyCode === 13) {
      this.verify();
    }
  }

  verify(): void {
    if (this.password2 != this.password) {
      this.tips = "password not match.";
      return;
    }
    this.phoneService.login(this.phone, this.code, this.password)
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
