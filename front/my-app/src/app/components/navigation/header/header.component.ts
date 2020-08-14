import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import * as jwt_decode from "jwt-decode";
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { RoleTypes } from 'src/app/entities/enumeration.enum';
import { LoginComponent } from '../../login/login.component';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LogedUser:User=new User("1","1","1","1","1","1","1");

  constructor(private authService: AuthService, private modalService: NgbModal, private route: Router, private router: ActivatedRoute, private logService: UserService) {
    try {
      let tokenn =localStorage.getItem('token');
      if(tokenn!=null){
         var decoded;
          decoded=jwt_decode(tokenn);
      //ar type = decoded.Roles;
      if(decoded.Roles == null){
        this.LogedUser.Role=RoleTypes.User;
      }
     
      if (decoded.Roles == "AdminOfAll") {
        this.LogedUser.Role=RoleTypes.AdminOfAll;
      }
      
     else if (decoded.Roles == "CarAdmin") {
       this.LogedUser.Role=RoleTypes.CarAdmin;
     }
     else if (decoded.Roles == "RegUser") {
       this.LogedUser.Role=RoleTypes.RegUser;
     }}
    
      
    } catch (error) {
      alert(error);
    } 
  
  }

  unklik():void{
    this.route.navigate(['']);
    this.authService.signOut(true).then().catch(error => console.log(error));
    localStorage.removeItem("token");
    return;
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  myprofile(): void
  {
    // preuzimamo token iz localstorage
    var token = localStorage.getItem('token');
    var decoded = this.getDecodedAccessToken(token);
    var type = decoded.Roles;
    if(type == "RegUser") {
      this.route.navigate(['/mainc']);
    }
    else if (type == "CarAdmin") {
    //  this.route.navigate(['/carRentalAdmin']);
    }
    
    else if (type == "AdminOfAll") {
      //this.route.navigate(['/websiteAdmin']);
    }
  }

  klik(): void {
    this.route.navigate(['/login']);
  // const modalRef = this.modalService.open(LoginComponent);
  }

  ngOnInit(): void {
    
  
  
  }

}
