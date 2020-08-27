import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ActivityPage } from './activity.page';
import { ActivityPageRoutingModule } from './activity-routing.module'
import { ActivityModal } from './activity.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityPageRoutingModule,
    SharedModule, // shared modules
  ],
  declarations: [
      ActivityPage,
      ActivityModal
  ],
})
export class ActivityPageModule {}
