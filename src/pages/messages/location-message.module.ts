import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLocationMessageComponent } from "./location-message";
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    NewLocationMessageComponent
  ],
  imports: [
    IonicPageModule.forChild(NewLocationMessageComponent),
    TranslateModule.forChild(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA'
    })
  ],
  exports: [
    NewLocationMessageComponent
  ],
  providers:[
    Geolocation
  ]
})
export class NewLocationMessageComponentModule {
}
