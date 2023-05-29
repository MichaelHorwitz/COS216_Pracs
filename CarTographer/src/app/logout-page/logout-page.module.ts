import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutPagePageRoutingModule } from './logout-page-routing.module';

import { LogoutPagePage } from './logout-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutPagePageRoutingModule
  ],
  declarations: [LogoutPagePage]
})
export class LogoutPagePageModule {}
