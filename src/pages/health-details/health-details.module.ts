import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDetailsPage } from './health-details';

@NgModule({
  declarations: [
    HealthDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDetailsPage),
  ],
})
export class HealthDetailsPageModule {}
