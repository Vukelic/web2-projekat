import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { ReservationCar } from "src/app/entities/ReservationCar";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-reservation-car',
  templateUrl: './reservation-car.component.html',
  styleUrls: ['./reservation-car.component.css']
})
export class ReservationCarComponent implements OnInit {
  id: number;
  $: any;
  myCar: Car;
  carid: string;
  babyseat: string;
  navigation: string;
  createReservationForm: FormGroup;
  pom: any;
  LocationFrom: string;
  LocationTo:string;
  i: number = 0;
  selectedValue: any;
  selectedValue2: any;
  city: Array<string>;
   to: string;
   from: string;
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private router: Router,) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
   this.load();
   this.loadMyCompany();
   this.carAdminService
   .getCar(this.id)
   .subscribe(
     (res: any) => {
       this.myCar = res;
       this.carid = res.id;
       this.pom = this.carid;
       console.log(this.carid);
     }
     );
     console.log(this.babyseat);

  }

  onSubmit(){
    this.to =this.createReservationForm.value["startDate"];
    this.from = this.createReservationForm.value["endDate"]; 
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(this.carid);
    this.LocationFrom = this.selectedValue.name;
    this.LocationTo = this.selectedValue2.name;
    const reservationCar = new ReservationCar(
      "0",
      this.LocationFrom,
      this.LocationTo,
       this.createReservationForm.value["pickUpTime"],
       this.createReservationForm.value["returnTime"],
       this.createReservationForm.value["startDate"],
       this.createReservationForm.value["endDate"],
       this.babyseat,
       this.navigation,
       "0",      
        decodedToken.UserID,
        this.pom.toString(),
        "",
        "0"
     );
     
     this.carAdminService.createReservationCar(reservationCar).subscribe(
      (res: any) => {
        this.toastrService.success(        
          "Car is reserved!",
          "Succesfull"
        );
        console.log(reservationCar);
        this.createReservationForm.reset();
      },
      err => {
        if (err.status == 400)
          this.toastrService.error('Car is rented in that period.', 'Reservation failed.');
        else
          console.log(err);
      }
    );

    console.log(reservationCar);
 
  }
  toggleEditable(event) {
    if ( event.target.checked ) {
      this.navigation = "included";
  }
  else{
      this.navigation = "not included ";
    }
   console.log(this.navigation);
}
toggleEditable2(event) {
  if ( event.target.checked ) {
      this.babyseat = "included";
  }
  else{
      this.babyseat = "not included ";
    }
    console.log(this.babyseat);
 }

 loadMyCompany(){
  this.carAdminService
  .GetMyExposituresByCar(this.id)
  .subscribe(
    (res: any) => {
      this.city = res;
      console.log(this.city);
    }
    );
}



private load() {
  let startDate = "";
  let endDate = "";
  let pickUpTime = "";
  let returnTime = "";
  let pickupLocation = "";
  let dropoffLocation = "";

  this.createReservationForm = new FormGroup({
    startDate: new FormControl(startDate, Validators.required),
    endDate: new FormControl(endDate, Validators.required),
    pickUpTime: new FormControl(pickUpTime, Validators.required),
    returnTime: new FormControl(returnTime, Validators.required),
    pickupLocation: new FormControl(pickupLocation, Validators.required),
    dropoffLocation: new FormControl(dropoffLocation, Validators.required),
    babyseat: new FormControl(""),
    navigation: new FormControl("")
  });
}

}
