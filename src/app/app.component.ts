import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage, MainPage } from '../pages/pages';
import { Settings } from '../providers/providers';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {title: 'Tutorial', component: 'TutorialPage'},
    {title: 'Welcome', component: 'WelcomePage'},
    {title: 'Tabs', component: 'TabsPage'},
    {title: 'Cards', component: 'CardsPage'},
    {title: 'Content', component: 'ContentPage'},
    {title: 'Signin', component: 'SigninPage'},
    {title: 'Signup', component: 'SignupPage'},
    {title: 'Master Detail', component: 'ListMasterPage'},
    {title: 'Menu', component: 'MenuPage'},
    {title: 'Settings', component: 'SettingsPage'},
    {title: 'Search', component: 'SearchPage'},
    {title: 'Messages', component: 'MessagesPage'}
  ];

  constructor(private translate: TranslateService,
              platform: Platform,
              settings: Settings,
              private config: Config,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.rootPage = Meteor.user() ? MainPage : FirstRunPage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //keyboard.hideFormAccessoryBar(false);

      if (platform.is('ios')) {
        let
          appEl = <HTMLElement>(document.getElementsByTagName('ION-APP')[0]),
          appElHeight = appEl.clientHeight;

        //Keyboard.disableScroll(true);
        //keyboard.hideFormAccessoryBar(true);

        window.addEventListener('native.keyboardshow', (e) => {
          //appEl.style.height = (appElHeight - (<any>e).keyboardHeight) + 'px';
          appEl.style.height = (appElHeight-66) + 'px';
        });

        window.addEventListener('native.keyboardhide', () => {
          appEl.style.height = '100%';
        });
      }
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
