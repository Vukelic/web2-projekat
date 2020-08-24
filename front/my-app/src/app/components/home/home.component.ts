import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from 'src/app/entities/User';
import { RoleTypes } from 'src/app/entities/enumeration.enum';
import { CarAdminService } from "src/app/service/car-admin-service";
import { CarCompany } from "src/app/entities/CarCompany";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LogedUser:User=new User("1","1","1","1","1","1");
  allCompanies: CarCompany[];
  constructor(private carAdminService: CarAdminService) { }

  ngOnInit(): void {
    this.carAdminService
    .GetAllCompanies()
    .subscribe(
      (res: any) => {
        this.allCompanies = res;
        console.log(this.allCompanies);
      }
      );

    try{
    let token =localStorage.getItem('token');
    if(token!=null){
     
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
   
      if(decodedToken.role === "register_user"){
      this.LogedUser.Role=RoleTypes.register_user;
    }  
    else if (decodedToken.role === "web_admin") {
      this.LogedUser.Role=RoleTypes.web_admin;
    }      
    else if(decodedToken.role === "car_admin"){
      this.LogedUser.Role=RoleTypes.car_admin;
    }
  }
  
    
  } catch (error) {
    alert(error);
  } 
}

}
