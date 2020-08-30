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
  searchAvaiableCars: FormGroup;
  company: string;
  model: string;
  seats: string;
  maxprice:string;
  isValidDate: boolean;
  error:any={isError:false,errorMessage:''};
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService,
    private router: Router,) { 
    route.params.subscribe(params => { this.id = params['id']; });
    this.company = this.id + "";
  }

  ngOnInit(): void {
    let token =localStorage.getItem('token');  
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.idUser = decodedToken.UserID;
    console.log(this.idUser);
    this.initData();
    this.load();
    this.load2();   
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
      this.isValidDate = this.ValidateDate(this.to, this.from);
      if(this.isValidDate){
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
else
{
  alert('End date should be grater then start date..');
}

  }
  onAvaiable(){
    this.to =  this.searchAvaiableCars.value["fromDate"];
    this.from =  this.searchAvaiableCars.value["toDate"];
    this.model =  this.searchAvaiableCars.value["modelName"];
    this.seats =  this.searchAvaiableCars.value["numberOfseats"] +"";
    this.maxprice = this.searchAvaiableCars.value["maxPrice"] + "";
    console.log(this.to);
    console.log(this.from);
    this.isValidDate = this.ValidateDate(this.to, this.from);
    if(this.isValidDate){
    this.carAdminService.SearchAvaiableCars(this.to, this.from, this.company, this.model, this.seats,this.maxprice).subscribe((res: any) => {
      this.allCars = res;
       console.log(res);
       this.searchAvaiableCars.reset();
     },
     err => {
      if (err.status == 400)
      this.toastrService.error('Error with available cars.', 'Check available failed.');
    else
      console.log(err);
  });
    }
    else
    {
      alert('End date should be grater then start date..');
    }
  }
  private load(){
    let startDate = "";
    let endDate = "";

  
    this.searchQuickReservation = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required)
    });
  }

  private load2(){
    let fromDate = "";
    let toDate = "";
    let modelName = "";
    let numberOfseats="";
    let maxPrice="";

    this.searchAvaiableCars = new FormGroup({
      fromDate: new FormControl(fromDate, Validators.required),
      toDate: new FormControl(toDate, Validators.required),
      modelName: new FormControl(modelName, Validators.required),
      numberOfseats: new FormControl(numberOfseats, Validators.required),
      maxPrice: new FormControl(maxPrice, Validators.required)
    });
  }

   ValidateDate(sDate: string, eDate: string){
    this.isValidDate = true;
    if(eDate < sDate){
      this.error={isError:true,errorMessage:'End date should be grater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
   }


}
