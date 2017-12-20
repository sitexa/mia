import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagesOptionsComponent } from "./messages-options";

@NgModule({
  declarations: [
    MessagesOptionsComponent,
  ],
  imports: [
    IonicPageModule.forChild(MessagesOptionsComponent),
    TranslateModule.forChild(),
  ],
  exports: [
    MessagesOptionsComponent
  ]
})
export class MessagesOptionsComponentModule {
}
