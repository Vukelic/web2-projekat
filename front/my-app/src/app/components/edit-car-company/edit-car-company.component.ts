import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarCompany } from "src/app/entities/CarCompany";
import { Car } from "src/app/entities/Car";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/entities/User";
import { UserService } from "src/app/service/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-car-company',
  templateUrl: './edit-car-company.component.html',
  styleUrls: ['./edit-car-company.component.css']
})
export class EditCarCompanyComponent implements OnInit {
  id: number;
  name: string;
  add: string;
  desc: string;
  adm: string;
  cadmin: User[];
  IdComp: string;
  cityExp: string;
  company: CarCompany;
  img: string;
  createCompanyForm: FormGroup;

  selectedValue: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService) {
      route.params.subscribe(params => { this.id = params['id']; });
      console.log(this.id);
      this.initData();
     }

  ngOnInit(): void {
    this.userService
    .getAllCarAdmins()
    .subscribe(
      (res: any) => {
        this.cadmin = res;

      }
      );
  
  }

  initData(){
    this.carAdminService.GetCompany(this.id).subscribe((res: any) => {
      this.company = res;
      this.name = res.name;
      this.add = res.address;
      this.desc = res.description;
      this.adm = res.cadmin;
      this.IdComp = res.id;
      this.cityExp = res.cityExpositure;
      this.img = res.imagePic;
     },
     err => {

    }
     );

     this.load();
  }

  onSubmit(){
    const carCompany = new CarCompany(
      this.IdComp + "",
      (<HTMLInputElement>(document.getElementById("name"))).value,
      "0",
      (<HTMLInputElement>(document.getElementById("desc"))).value,
      (<HTMLInputElement>(document.getElementById("add"))).value,
      (<HTMLInputElement>(document.getElementById("city"))).value,
      (<HTMLInputElement>(document.getElementById("img"))).value,
      "",
    this.adm,
    "0"
    );
console.log(carCompany);
    this.carAdminService.updateCarCompany(carCompany).subscribe(
      (res: any) => {
        this.toastrService.success(
          "Car service is edited!",
          "Succesfull"
        );
      },
      err => {
        this.toastrService.error("Error", "Error");
        console.log(err);
      }
    );
  }
  onFileChanged(event) {
    const file = event.target.files[0];
  }

  private load() {
   

    this.createCompanyForm = new FormGroup({
      companyName: new FormControl(this.name),
     description: new FormControl(this.desc),
      address: new FormControl(this.add),
      imagepic: new FormControl(this.img),
     cityExpositure: new FormControl(this.cityExp)
    });
    console.log(this.name);
  }

}
