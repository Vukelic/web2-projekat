import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-car-admin',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.css']
})
export class CarAdminComponent implements OnInit {
  namecopmany: CarCompany[];
  username: string;
  constructor(private userService: UserService,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    let token =localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken.UserID);
    this.username = decodedToken.UserID;

    this.carAdminService
    .GetAllCompaniesCarAdmin(this.username)
    .subscribe(
      (res: any) => {
        this.namecopmany = res;
        console.log(this.namecopmany);
        console.log(this.username);
      }
      );

  }


}
