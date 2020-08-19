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

      this.load();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }
  onSubmit() {
    const car = new Car(
      0,
      this.createCarForm.value["description"],
      this.createCarForm.value["modelofcar"],
      this.createCarForm.value["seats"],
      this.createCarForm.value["price"],
       "0",
     this.createCarForm.value["imagepic"],
     this.selectedValue.name,
    "false"
    );

    
    console.log("pre vr");
    console.log(this.selectedValue);

    this.carAdminService.CreateCar(car).subscribe(
      (res: any) => {
        this.createCarForm.reset();
        this.toastrService.success(
          "Car is created!",
          "Succesfull"
        );
      },
      err => {
        this.toastrService.error("Error", "Error");
        console.log(err);
      }
    );
  }
 
  private load() {
    let description = "";
    let namecopmany = "";
    let modelofcar = "";
    let seats = "";
    let price = "";
    let imagepic = "";


    this.createCarForm = new FormGroup({
      description: new FormControl(description, Validators.required),
      modelofcar: new FormControl(modelofcar, Validators.required),
      seats: new FormControl(seats, Validators.required),
      price: new FormControl(price, Validators.required),
      imagepic: new FormControl(imagepic, Validators.required),
      namecopmany: new FormControl(namecopmany, Validators.required),
      
    
    });
  }

}
