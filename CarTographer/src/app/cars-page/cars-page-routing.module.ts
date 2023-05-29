import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarsPagePage } from './cars-page.page';

const routes: Routes = [
  {
    path: '',
    component: CarsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsPagePageRoutingModule {}
