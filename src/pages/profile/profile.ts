import { Component, OnInit } from '@angular/core';
import { Profile } from 'api/models';
import { AlertController, IonicPage, NavController, Platform } from 'ionic-angular';
import { MeteorObservable } from 'meteor-rxjs';
import { MainPage } from "../pages";
import { Pictures } from 'api/collections';
import { PictureService } from "../../providers/picture/picture";

@IonicPage()
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  picture: string;
  profile: Profile;

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private pictureService: PictureService,
              private platform: Platform) {
  }

  ngOnInit(): void {
    this.profile = Meteor.user().profile || {
      name: ''
    };

    MeteorObservable.subscribe('user').subscribe(() => {
      let platform = this.platform.is('android') ? "android" :
        this.platform.is('ios') ? "ios" : "";
      platform = this.platform.is('cordova') ? platform : "";

      this.picture = Pictures.getPictureUrl(this.profile.pictureId, platform);
    });
  }

  selectProfilePicture(): void {
    this.pictureService.select().then((blob) => {
      this.uploadProfilePicture(blob);
    })
      .catch((e) => {
        this.handleError(e);
      });
  }

  uploadProfilePicture(blob: File): void {
    this.pictureService.upload(blob).then((picture) => {
      this.profile.pictureId = picture._id;
      this.picture = picture.url;
    })
      .catch((e) => {
        this.handleError(e);
      });
  }

  updateProfile(): void {
    MeteorObservable.call('updateProfile', this.profile).subscribe({
      next: () => {
        this.navCtrl.push(MainPage);
      },
      error: (e: Error) => {
        this.handleError(e);
      }
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
