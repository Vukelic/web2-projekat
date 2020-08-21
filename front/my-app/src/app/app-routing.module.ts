import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { MaincComponent } from './components/mainc/mainc.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { WebAdminComponent } from './components/web-admin/web-admin.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { CarCopmanyComponent } from './components/car-copmany/car-copmany.component';
import { CarsComponent } from './components/cars/cars.component';
import { ViewCarsComponent } from './components/view-cars/view-cars.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'mainc',
    component: MaincComponent
  },
  {
    path: 'webadmin',
    component: WebAdminComponent
  },
  {
    path: 'myacc',
    component: MyAccountComponent
  },
  {
    path: 'caradmin',
    children: [
      { path: "", component: CarAdminComponent },
      { path:  ":id/details", component: ViewCarsComponent}
    ]
  },
  {
    path: 'carcompany',
    component: CarCopmanyComponent
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
