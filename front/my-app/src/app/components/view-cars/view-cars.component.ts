import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {
  id: number;
  allCars: Car[];
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService) {
    route.params.subscribe(params => { this.id = params['id']; });
   
   }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.carAdminService.GetCarsOfCompany(this.id).subscribe((res: any) => {
      this.allCars = res;
       console.log(res);
     },
     err => {

    }
     );
  }

  onClick(c){
    this.carAdminService.DeleteCar(c.id).subscribe((res:any) =>{
      
      console.log(c);
      this.initData();
    },
    err => {

      });
 
  }

  onEdit(c){

      c.description = (<HTMLInputElement>(
        document.getElementById("description")
      )).value;
      c.price = +(<HTMLInputElement>(
        document.getElementById("price")
      )).value;
       c.numberOfSeats = +(<HTMLInputElement>document.getElementById("numberOfSeats"))
        .value;
      c.modelOfCar = (<HTMLInputElement>document.getElementById("model"))
        .value;
     
  console.log(c);
      this.carAdminService.UpdateCar(c).subscribe(
        res => {
          this.toastrService.success(
            "You updated a car.",
            "Car succesfully updated"
          );
        },
        err => {
          this.toastrService.error(
            "Error while updating a car",
            "Car not updated"
          );
        }
      );
    
  }
}
