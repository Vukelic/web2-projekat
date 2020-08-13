import { Component, OnInit, Inject, ViewChild, Injectable, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SocialUser } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from "jwt-decode";
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }

  /*userData = {
    UserId: '',
    Provider: '',
    FirstName: '',
    LastName:'',
    EmailAddress: '',
    PictureUrl: '',
    IdToken: '',
    AuthToken: '',
  };*/
 // resultMessage: string;
  constructor(private router: Router,private service: UserService, private toastr: ToastrService,
    private authService: AuthService,private modalService: NgbModal,) {
   
   }

  ngOnInit() {
    //this.authService.authState.subscribe((user) => {
   //   this.korisnik = user;
    //});
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.checkToken();
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }

    checkToken()
    {
      let tokenn =localStorage.getItem('token');
     
      var decoded;
     try {
       decoded=jwt_decode(tokenn);
       
       if (decoded.Roles == "RegUser") {
         this.router.navigateByUrl('/mainc');
       }
       else if (decoded.Roles == "AdminOfAlll") {
      //   this.rrouter.navigate(['/admin-list']);
       }
       else if (decoded.Roles == "CarAdmin") {
       //  if(decoded.Activated=="True")
        // this.rrouter.navigate(['/admin-home-airline']);
         //else
         {
         //  this.rrouter.navigate(['/admin-info']);
         }
       }      
     } catch (error) 
     {
       alert(error);
     }
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