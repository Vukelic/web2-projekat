import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Params } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  namecopmany: CarCompany;
  createCarForm: FormGroup;
  selectedValue: any;
  username: string;
  cadmin: string;

  constructor(private userService: UserService,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private route: ActivatedRoute) { 
    
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
        this.cadmin = res.cadmin;
        console.log(this.namecopmany);
        console.log(this.cadmin);
      });

    this.load();
  }
  
  onFileChanged(event) {
    const file = event.target.files[0];
  }
  onSubmit() {
    const car = new Car(
      this.createCarForm.value["description"],
      this.createCarForm.value["modelofcar"],
      this.createCarForm.value["seats"] + "",
      this.createCarForm.value["price"] + "",
       "0",
     this.createCarForm.value["imagepic"],
     this.cadmin,
    "false"
    );

    
    console.log("pre vr");


    this.carAdminService.CreateCar(car).subscribe(
      (res: any) => {
        this.createCarForm.reset();
        
      },
      err => {
      console.log(err);
        
      }
    );
  }
 
  private load() {
    let description = "";
    let modelofcar = "";
    let seats = "";
    let price = "";
    let imagepic = "";


    this.createCarForm = new FormGroup({
      description: new FormControl(description, Validators.required),
      modelofcar: new FormControl(modelofcar, Validators.required),
      seats: new FormControl(seats, Validators.required),
      price: new FormControl(price, Validators.required),
      imagepic: new FormControl(imagepic, Validators.required)       
    });
  }

}
