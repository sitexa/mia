import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ChatsPage } from "./chats";
import { MomentModule } from "angular2-moment";

@NgModule({
  declarations: [
    ChatsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatsPage),
    TranslateModule.forChild(),
    MomentModule
  ],
  exports: [
    ChatsPage
  ]
})
export class ChatsPageModule {
}
