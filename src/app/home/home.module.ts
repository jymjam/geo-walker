import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NavHeader } from '../shared/nav-header.page';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule // shared modules
  ],
  declarations: [
    HomePage,
  ],
  providers: [
    Geolocation
  ]
})
export class HomePageModule {}
