import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ChatsOptionsComponent } from "./chats-options";
import { MomentModule } from "angular2-moment";

@NgModule({
  declarations: [
    ChatsOptionsComponent,
  ],
  imports: [
    IonicPageModule.forChild(ChatsOptionsComponent),
    TranslateModule.forChild(),
    MomentModule
  ],
  exports: [
    ChatsOptionsComponent
  ]
})
export class ChatsOptionsComponentModule {
}
