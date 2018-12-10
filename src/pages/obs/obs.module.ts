import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObsPage } from './obs';

@NgModule({
  declarations: [
    ObsPage,
  ],
  imports: [
    IonicPageModule.forChild(ObsPage),
  ],
})
export class ObsPageModule {}
