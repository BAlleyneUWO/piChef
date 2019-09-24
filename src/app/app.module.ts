import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http'


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FindPage } from '../pages/find/find';
import { CookbookPage } from '../pages/cookbook/cookbook';
import { RecipesService } from '../services/recipes';
import { HealthPage } from '../pages/health/health';
import { FindDetailsPage } from '../pages/find-details/find-details';
import { HealthDetailsPage } from '../pages/health-details/health-details';
import { AdMobFree } from '@ionic-native/admob-free';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    CookbookPage,
    FindPage,
    TabsPage,
    HealthPage,
    FindDetailsPage,
    HealthDetailsPage
 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CookbookPage,
    FindPage,
    TabsPage,
    HealthPage,
    FindDetailsPage,
    HealthDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RecipesService,
    AdMobFree,
    LocalNotifications,
   // HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
