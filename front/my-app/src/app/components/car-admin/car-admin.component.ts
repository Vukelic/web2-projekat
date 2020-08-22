import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewCarsComponent } from '../view-cars/view-cars.component';

@Component({
  selector: 'app-car-admin',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.css']
})
export class CarAdminComponent implements OnInit {
  namecopmany: CarCompany[];
  username: string;
  id: number;
  constructor(private userService: UserService,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) {
      
     }

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

  onClick( c){
          this.router.navigate(['/caradmin/' + c.id + '/details']);
  }

  onEdit(c){
    this.router.navigate(['/caradmin/' + c.id + '/edit']);
  }

 


}
