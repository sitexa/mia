import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagesPage } from "./messages";
import { MomentModule } from "angular2-moment";

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesPage),
    TranslateModule.forChild(),
    MomentModule
  ],
  exports: [
    MessagesPage
  ]
})
export class MessagePageModule {
}
