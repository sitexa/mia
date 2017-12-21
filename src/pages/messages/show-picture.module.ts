import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowPictureComponent } from "./show-picture";

@NgModule({
  declarations: [
    ShowPictureComponent
  ],
  imports: [
    IonicPageModule.forChild(ShowPictureComponent),
    TranslateModule.forChild()
  ],
  exports: [
    ShowPictureComponent
  ]
})
export class ShowPictureComponentModule {
}
