import { Component, OnInit, Inject, ViewChild, Injectable, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SocialUser } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router,private service: UserService, private toastr: ToastrService,
    private authService: AuthService,private modalService: NgbModal,) {
   
   }

  ngOnInit() {
   
  }

  onSubmit(formModel: NgForm) {
    this.service.login(formModel.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(res.token);
        console.log(decodedToken.role);
        if(decodedToken.role === "register_user"){
          this.router.navigateByUrl('/mainc');
        }else if(decodedToken.role === "web_admin"){
          this.router.navigateByUrl('/webadmin');
        }
        else if(decodedToken.role === "car_admin"){
          this.router.navigateByUrl('/caradmin');
        }
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }

    

  //logIn with google method. Takes the platform (Google) parameter.
  logInWithGoogle(platform: string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    //Sign In and get user Info using authService that we just injected
    this.authService.signIn(platform).then(
      (response) => {        
        this.service.socialLogIn(response).subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token); 
            this.router.navigateByUrl('/mainc');         
          });
          console.log(response);
        });   
  }
}