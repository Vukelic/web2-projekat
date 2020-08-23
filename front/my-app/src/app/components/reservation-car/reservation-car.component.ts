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
  i: number = 0;
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private router: Router,) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
   this.load();
   this.carAdminService
   .getCar(this.id)
   .subscribe(
     (res: any) => {
       this.myCar = res;
       this.carid = res.id;
       console.log(this.carid);
     }
     );
     console.log(this.babyseat);

  }

  onSubmit(){
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    const reservationCar = new ReservationCar(
      "0",
       this.createReservationForm.value["pickupLocation"],
       this.createReservationForm.value["dropoffLocation"],
       this.createReservationForm.value["pickUpTime"],
       this.createReservationForm.value["returnTime"],
       this.createReservationForm.value["startDate"],
       this.createReservationForm.value["endDate"],
       this.babyseat,
       this.navigation,
       "0",        
        decodedToken.UserID,
        this.carid + "",
     );

     this.carAdminService.createReservationCar(reservationCar).subscribe(
      (res: any) => {
        this.toastrService.success(
          "Car is reserved!",
          "Succesfull"
        );
        this.createReservationForm.reset();
      },
      err => {
        this.toastrService.error("Error", "Error");
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
