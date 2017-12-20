import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NewChatComponent } from "./new-chat";

@NgModule({
  declarations: [
    NewChatComponent,
  ],
  imports: [
    IonicPageModule.forChild(NewChatComponent),
    TranslateModule.forChild(),
  ],
  exports: [
    NewChatComponent
  ]
})
export class NewChatsComponentModule {
}
