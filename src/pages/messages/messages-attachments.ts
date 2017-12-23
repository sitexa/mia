import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, Platform, ViewController } from 'ionic-angular';
import { MessageType } from 'api/models';
import { PictureService } from "../../providers/picture/picture";

@IonicPage()
@Component({
  selector: 'messages-attachments',
  templateUrl: 'messages-attachments.html'
})
export class MessagesAttachmentsComponent {
  constructor(private viewCtrl: ViewController,
              private modelCtrl: ModalController,
              private pictureService: PictureService,
              private platform: Platform,
              private alertCtrl: AlertController) {
  }

  sendPicture(camera: boolean): void {
    if (camera && !this.platform.is('cordova')) {
      return console.warn('Device must run cordova in order to take pictures');
    }

    //todo step1:getPicture
    this.pictureService.getPicture(camera, true)
      .then((blob: File) => {
        console.log("step1 selected or taken by camera file:"+blob.name);
        this.viewCtrl.dismiss({
          messageType: MessageType.PICTURE,
          selectedPicture: blob
        });
      })
      .catch((e) => {
        this.handleError(e);
      });
  }

  sendLocation(): void {
    const locationModal = this.modelCtrl.create('NewLocationMessageComponent');
    locationModal.onDidDismiss((location) => {
      if (!location) {
        this.viewCtrl.dismiss();

        return;
      }

      this.viewCtrl.dismiss({
        messageType: MessageType.LOCATION,
        selectedLocation: location
      });
    });

    locationModal.present();
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
