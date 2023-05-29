import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarsPagePageRoutingModule } from './cars-page-routing.module';

import { CarsPagePage } from './cars-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarsPagePageRoutingModule
  ],
  declarations: [CarsPagePage]
})
export class CarsPagePageModule {}
