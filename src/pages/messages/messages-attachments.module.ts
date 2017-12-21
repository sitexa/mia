import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesAttachmentsComponent } from "./messages-attachments";

@NgModule({
  declarations: [
    MessagesAttachmentsComponent
  ],
  imports: [
    IonicPageModule.forChild(MessagesAttachmentsComponent),
    TranslateModule.forChild()
  ],
  exports: [
    MessagesAttachmentsComponent
  ]
})
export class MessagesAttachmentsComponentModule {
}
