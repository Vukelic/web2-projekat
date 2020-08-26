import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  myCar: Car;
  desc: string;
  seats: string;
  model: string;
  img: string;
  price: string;
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private router: Router,) {
    route.params.subscribe(params => { this.id = params['id']; });
   
   }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.carAdminService.getCar(this.id).subscribe((res: any) => {
      this.myCar = res;
      this.desc = res.description;
      this.seats = res.numberOfSeats;
      this.model = res.modelOfCar;
      this.img = res.imagePic;
      this.price = res.price;
       console.log(res);
     },
     err => {

    }
     );
  }

  onClick(c){
    this.carAdminService.DeleteCar(c.id).subscribe((res:any) =>{
      this.router.navigate(['/caradmin/']);
    },
    err => {
      this.toastrService.error(
        "Error while delete a car",
        "Car not deleted because you can't delete reserved car"
      );
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
