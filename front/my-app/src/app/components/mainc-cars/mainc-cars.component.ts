import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuickReservation } from 'src/app/entities/QuickReservation';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-mainc-cars',
  templateUrl: './mainc-cars.component.html',
  styleUrls: ['./mainc-cars.component.css']
})
export class MaincCarsComponent implements OnInit {
  id: number;
  allCars: Car[];
  quickCars: QuickReservation[];
  to: string;
  from: string;
  searchQuickReservation:FormGroup;
  idUser: string;
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private router: Router,) { 
    route.params.subscribe(params => { this.id = params['id']; });
    
  }

  ngOnInit(): void {
    let token =localStorage.getItem('token');  
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.idUser = decodedToken.UserID;
    console.log(this.idUser);
    this.initData();
    this.load();
   
  }

  initData(){
    this.carAdminService.GetCarsOfCompanyAllUsers(this.id).subscribe((res: any) => {
      this.allCars = res;
       console.log(res);
     },
     err => {

    }
     );
  }

  onBook(c){
    console.log(c);
    this.router.navigate(['/mainc/' + c.id + '/reservation']);
  }
  onRent(c){
    console.log(c);
    this.carAdminService.CreateQucikReservation(c).subscribe((res: any) => {
      this.initData();
     },
     err => {
      if (err.status == 400)
      this.toastrService.error('Can not rent same car 2x.', 'Reservation failed.');
    else
      console.log(err);
    }
     );
  }

  onSubmit(){

      this.to =  this.searchQuickReservation.value["startDate"];
      this.from =  this.searchQuickReservation.value["endDate"];
      console.log(this.to);
      console.log(this.from);
    this.carAdminService.searchQuickReservationCar(this.to, this.from, this.idUser).subscribe((res: any) => {
      this.quickCars = res;
       console.log(res);
       this.searchQuickReservation.reset();
     },
     err => {
      if (err.status == 400)
      this.toastrService.error('Error with quick reservation.', 'Create failed.');
    else
      console.log(err);
  });
  }

  private load(){
    let startDate = "";
    let endDate = "";

  
    this.searchQuickReservation = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),

    });
  }


}
