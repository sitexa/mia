import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagesPage } from "./messages";
import { MomentModule } from "angular2-moment";

import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesPage),
    TranslateModule.forChild(),
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA'
    })
  ],
  exports: [
    MessagesPage
  ],
  providers:[
    Geolocation
  ]
})
export class MessagePageModule {
}
