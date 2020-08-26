import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuickReservation } from 'src/app/entities/QuickReservation';

@Component({
  selector: 'app-mainc-cars',
  templateUrl: './mainc-cars.component.html',
  styleUrls: ['./mainc-cars.component.css']
})
export class MaincCarsComponent implements OnInit {
  id: number;
  allCars: Car[];
  quickCars: Car[];
  to: string;
  from: string;
  searchQuickReservation:FormGroup;
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private router: Router,) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
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

  onSubmit(){

      this.to =  this.searchQuickReservation.value["startDate"];
      this.from =  this.searchQuickReservation.value["endDate"];
      console.log(this.to);
      console.log(this.from);
    this.carAdminService.searchQuickReservationCar(this.to, this.from).subscribe((res: any) => {
      this.quickCars = res;
       console.log(res);
       this.searchQuickReservation.reset();
     },
     err => {

    }
     );
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
