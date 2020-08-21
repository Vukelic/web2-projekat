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
  company: CarCompany;
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
       console.log(res);
       console.log(this.adm);
       console.log(res.id);
       console.log(this.IdComp);

     },
     err => {

    }
     );

     this.load();
  }

  onSubmit(){
    const carCompany = new CarCompany(
      this.IdComp + "",
      this.createCompanyForm.value["companyName"],
      "1",
      this.createCompanyForm.value["description"],
      this.createCompanyForm.value["address"],
     "",
     this.createCompanyForm.value["imagepic"],
      "",
    this.selectedValue.userName
    );
    console.log(carCompany);
    console.log("pre vr");
    console.log(this.selectedValue);
    console.log(this.IdComp);
    this.carAdminService.updateCarCompany(carCompany).subscribe(
      (res: any) => {
        this.createCompanyForm.reset();
        this.toastrService.success(
          "Car service is created!",
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
    let companyName = "";
    let description = "";
    let address = "";
    let cadmin = "";
    let imagepic = "";

    this.createCompanyForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      description: new FormControl(description, Validators.required),
      address: new FormControl(address, Validators.required),
      cadmin: new FormControl(cadmin, Validators.required),
      imagepic: new FormControl(imagepic, Validators.required),
    });
  }

}
