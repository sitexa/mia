import { Component } from '@angular/core';
import { IonicPage, ModalController, ViewController } from 'ionic-angular';
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
              private pictureService: PictureService) {
  }

  sendPicture(): void {
    this.pictureService.select().then((file: File) => {
      this.viewCtrl.dismiss({
        messageType: MessageType.PICTURE,
        selectedPicture: file
      });
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
}
