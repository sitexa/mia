import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from "./register";

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    TranslateModule.forChild()
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule { }
