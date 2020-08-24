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
  cadmin: User[];
  cars: Car[] = [];
  constructor(private userService: UserService,
    private adminService: AdminService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loadAdmins();
      
      
     
    this.load();
  }
  
  onSubmit() {
    const carCompany = new CarCompany(
     "0",
      this.createCompanyForm.value["companyName"],
      "1",
      this.createCompanyForm.value["description"],
      this.createCompanyForm.value["address"],
     this.createCompanyForm.value["cityExpositure"],
     this.createCompanyForm.value["imagepic"],
      "",
    this.selectedValue.userName
    );
    console.log(carCompany);
    console.log("pre vr");
    console.log(this.selectedValue);

    this.adminService.createCarCompany(carCompany).subscribe(
      (res: any) => {
        this.createCompanyForm.reset();
        this.toastrService.success(
          "Car service is created!",
          "Succesfull"
        );
        this.loadAdmins();
      },
      err => {
        this.toastrService.error("Error", "Error");
        console.log(err);
      }
    );
  }
  onFileChanged(event) {
    const file = event.target.files.fullName;
 
  }

  private load() {
    let companyName = "";
    let description = "";
    let address = "";
    let cadmin = "";
    let imagepic = "";
    let cityExpositure = "";

    this.createCompanyForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      description: new FormControl(description, Validators.required),
      address: new FormControl(address, Validators.required),
      cadmin: new FormControl(cadmin, Validators.required),
      imagepic: new FormControl(imagepic, Validators.required),
      cityExpositure: new FormControl(cityExpositure, Validators.required)
    });
  }

  loadAdmins(){
    this.userService
    .getAllCarAdmins()
    .subscribe(
      (res: any) => {
        this.cadmin = res;
        console.log(this.cadmin);
      }
      );
  }
  

}
