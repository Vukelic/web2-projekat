import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { User } from "src/app/entities/User";
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { AdminService } from "src/app/service/admin-service";
import { ToastrService } from "ngx-toastr";
var $;
@Component({
  selector: 'app-car-copmany',
  templateUrl: './car-copmany.component.html',
  styleUrls: ['./car-copmany.component.css']
})

export class CarCopmanyComponent implements OnInit {
  createCompanyForm: FormGroup;
  selectedValue: any;
  admins: User[];
  cars: Car[] = [];
  constructor(private userService: UserService,
    private adminService: AdminService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  
    this.initForm();
  }
  
  onSubmit() {
    const carCompany = new CarCompany(
      0,
      this.createCompanyForm.value["companyName"],
      3.5,
      this.createCompanyForm.value["description"],
      this.createCompanyForm.value["address"],
     // this.createCompanyForm.value["city"],
     "",
     "",
      "",
      //this.cars,
    //  [],
    this.createCompanyForm.value["cadmin"],
   //   this.selectedValue //admin

    );
    console.log(carCompany);

    this.adminService.createCarCompany(carCompany).subscribe(
      (res: any) => {
        this.createCompanyForm.reset();
        this.toastrService.success(
          "You are succesfully created new Car company!",
          "Succesfull"
        );
      },
      err => {
        this.toastrService.error("Error", "Oops, something went wrong :(");
        console.log(err);
      }
    );
  }



  private initForm() {
    let companyName = "";
    let description = "";
    let address = "";
    let cadmin = "";
    //let admins = "";

    this.createCompanyForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      description: new FormControl(description, Validators.required),
      address: new FormControl(address, Validators.required),
      cadmin: new FormControl(cadmin, Validators.required),
    //  admins: new FormControl(admins, Validators.required)
    });
  }
  

}
