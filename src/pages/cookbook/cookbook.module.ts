import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CookbookPage } from './cookbook';

@NgModule({
  declarations: [
    CookbookPage,
  ],
  imports: [
    IonicPageModule.forChild(CookbookPage),
  ],
})
export class CookbookPageModule {}
