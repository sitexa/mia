import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'show-picture',
  templateUrl: 'show-picture.html'
})
export class ShowPictureComponent {
  pictureSrc: string;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,) {
    this.pictureSrc = this.navParams.get('pictureSrc');
  }
}
