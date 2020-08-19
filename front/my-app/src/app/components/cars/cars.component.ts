import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  namecopmany: CarCompany[];
  createCarForm: FormGroup;
  selectedValue: any;
  constructor(private userService: UserService,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.carAdminService
    .GetAllCompanies()
    .subscribe(
      (res: any) => {
        this.namecopmany = res;
        console.log(this.namecopmany);
      }
      );
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }
  onSubmit() {}
 

}
