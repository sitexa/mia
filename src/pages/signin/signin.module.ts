import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SigninPage } from './Signin';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage),
    TranslateModule.forChild()
  ],
  exports: [
    SigninPage
  ]
})
export class SigninPageModule { }
