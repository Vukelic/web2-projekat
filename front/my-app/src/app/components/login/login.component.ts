import { Component, OnInit, Inject, ViewChild, Injectable, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from "jwt-decode";
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


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


  constructor(private rrouter: Router,private service: UserService, private router: Router, private toastr: ToastrService,
    private authService: AuthService) {
    //if(localStorage.getItem('token')!=null){
     // this.checkToken();
   // }
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

    checkToken(){
      let tokenn =localStorage.getItem('token');
     
      var decoded;
     try {
       decoded=jwt_decode(tokenn);
       
       if (decoded.Roles == "RegUser") {
         this.rrouter.navigateByUrl('/mainc');
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

}
