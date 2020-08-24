import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule} from './material.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './service/user.service';
import { AdminService} from './service/admin-service';
import { CarAdminService} from './service/car-admin-service';


import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider,AuthService } from "angularx-social-login";
import { MaincComponent } from './components/mainc/mainc.component';
import { WebAdminComponent } from './components/web-admin/web-admin.component';
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { CarCopmanyComponent } from './components/car-copmany/car-copmany.component';
import { CarsComponent } from './components/cars/cars.component';
import { ViewCarsComponent } from './components/view-cars/view-cars.component';
import { EditCarCompanyComponent } from './components/edit-car-company/edit-car-company.component';
import { MaincCarsComponent } from './components/mainc-cars/mainc-cars.component';
import { ReservationCarComponent } from './components/reservation-car/reservation-car.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TokenInterceptor } from './auth/token.interceptor';

let config = new AuthServiceConfig([
  { 
     id: GoogleLoginProvider.PROVIDER_ID,
     provider: new GoogleLoginProvider('178355553911-qsb81bmpj9gefihhi9q6hvbf954d2kni.apps.googleusercontent.com')
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    MaincComponent,
    WebAdminComponent,
    CarAdminComponent,
    CarCopmanyComponent,
    CarsComponent,
    ViewCarsComponent,
    EditCarCompanyComponent,
    MaincCarsComponent,
    ReservationCarComponent,
    MyAccountComponent,
    MyReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    SocialLoginModule.initialize(config)
  ],
  providers: [
    CookieService,
    UserService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
        },
    AdminService,
    CarAdminService,
    AuthService,  
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
