import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindDetailsPage } from './find-details';

@NgModule({
  declarations: [
    FindDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FindDetailsPage),
  ],
})
export class FindDetailsPageModule {}
