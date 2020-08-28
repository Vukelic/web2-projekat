import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Params } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { QuickReservation } from 'src/app/entities/QuickReservation';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  namecopmany: CarCompany;
  createCarForm: FormGroup;
  createQuickReservationForm: FormGroup;
  selectedValue: any;
  username: string;
  cadmin: string;
  cars: Car[];


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
    this.carAdminService.GetAllCompaniesCarAdmin(this.username).subscribe(
      (res: any) => {
        this.namecopmany = res;
        this.cadmin = res.cadmin;
        console.log(this.namecopmany);
        console.log(this.cadmin);
      });

    this.loadCars();
    this.load();
    this.loadQuickReservation();
  }

  loadCars(){
    this.carAdminService.GetCarsOfCompany(this.username).subscribe(
      (res: any) => {
        this.cars = res;
        console.log(res);
      });
  }

  CreateQuick(){
    const qucik = new QuickReservation(
      "0",
      this.createQuickReservationForm.value["startDate"],
      this.createQuickReservationForm.value["endDate"],
      this.selectedValue.id + "",
      "0",
      "0",
      "0",
      "0"
    );
console.log(this.selectedValue.id);
    this.carAdminService.createQuickReservationCar(qucik).subscribe(
      (res: any) => {
        this.createQuickReservationForm.reset();
        
      },
      err => {
        this.toastrService.error("Car is rented in that period!", "Reservation is unsuccesfull!");
        console.log(err);
      }
    );
  }
  
  onFileChanged(event) {
    const file = event.target.files[0];
  }
  onSubmit() {
    const car = new Car(
      "0",
      this.createCarForm.value["description"],
      this.createCarForm.value["modelofcar"],
      this.createCarForm.value["seats"] + "",
      this.createCarForm.value["price"] + "",
       "0",
     this.createCarForm.value["imagepic"],
     this.cadmin,
    "false",
    "0"
    );

    this.carAdminService.CreateCar(car).subscribe(
      (res: any) => {
        this.createCarForm.reset();
        this.loadCars();
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

  private loadQuickReservation() {
    let startDate = "";
    let endDate = "";
    let cars = "";
   
    this.createQuickReservationForm = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),
      cars: new FormControl(cars, Validators.required)
    });
  }

}
