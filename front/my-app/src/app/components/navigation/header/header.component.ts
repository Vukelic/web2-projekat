import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import * as jwt_decode from "jwt-decode";
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { RoleTypes } from 'src/app/entities/enumeration.enum';
import { LoginComponent } from '../../login/login.component';
import { User } from 'src/app/entities/User';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LogedUser:User=new User("1","1","1","1","1","1");

  constructor(private authService: AuthService, 
    private modalService: NgbModal, 
    private route: Router, 
    private router: ActivatedRoute, private logService: UserService) {
   
  
  }

  unklik():void{
    this.route.navigate(['']);
    this.authService.signOut(true).then().catch(error => console.log(error));
    localStorage.removeItem("token");
    return;
  }

  
  klik(): void {
    this.route.navigate(['/login']);
  // const modalRef = this.modalService.open(LoginComponent);
  }

  ngOnInit(): void {
    try {
      let token =localStorage.getItem('token');
      var decodedToken = this.getDecodedAccessToken(token);
      if(token!=null)
      {      
        if((decodedToken.exp * 1000) > Date.now())
        {
        if(decodedToken.role === "register_user"){
        this.LogedUser.Role=RoleTypes.register_user;
        }  
      else if (decodedToken.role === "web_admin") {
        this.LogedUser.Role=RoleTypes.web_admin;
        }      
      else if(decodedToken.role === "car_admin"){
        this.LogedUser.Role=RoleTypes.car_admin;
       }
      }else{
        alert("Not registered");
      this.unklik();
      }
    }else{
      
    }
    
      
    } catch (error) {
      alert(error);
     
    } 
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
