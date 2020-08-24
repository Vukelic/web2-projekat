import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-mainc-cars',
  templateUrl: './mainc-cars.component.html',
  styleUrls: ['./mainc-cars.component.css']
})
export class MaincCarsComponent implements OnInit {
  id: number;
  allCars: Car[];
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


}
