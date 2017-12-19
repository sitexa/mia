import 'meteor-client';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { MeteorObservable } from "meteor-rxjs";

Meteor.startup(() => {
  const subscription = MeteorObservable.autorun().subscribe(() => {

    console.log("Meteor.loggingIn:" + Meteor.loggingIn());

    if (Meteor.loggingIn()) {
      return;
    }

    setTimeout(() => subscription.unsubscribe());
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
});
