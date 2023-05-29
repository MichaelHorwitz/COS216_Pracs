import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPagePage } from './login-page.page';
import { CarsPagePage } from '../cars-page/cars-page.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPagePage
  },
  { path: 'home', component: CarsPagePage, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPagePageRoutingModule {}
