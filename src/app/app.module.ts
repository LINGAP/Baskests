import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent,routingComponents],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//    {provide: HAMMER_GESTURE_CONFIG, useClass: HammerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}