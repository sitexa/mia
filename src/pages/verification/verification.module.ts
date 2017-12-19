import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { VerificationPage } from "./verification";

@NgModule({
  declarations: [
    VerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(VerificationPage),
    TranslateModule.forChild()
  ],
  exports: [
    VerificationPage
  ]
})
export class VerificationPageModule {
}
